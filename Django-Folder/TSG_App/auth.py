import os
from django.contrib.auth import authenticate
import jwt
import datetime
from django.core.mail import EmailMessage
import random
from django.utils import timezone

# from cryptography.fernet import Fernet
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from TSG_App.serializers import MyUserSerializer
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Enviormnet varibles
# from dotenv import load_dotenv

# load_dotenv()

# SECRET = os.environ.get("OTP_SECRET")
# ALGO = os.environ.get("OTP_ALGO")


SECRET = "SECRET"
ALGO = "HS256"


class LoginCheckView(APIView):
    def post(self, request):
        token = request.data.get("token")
        print(token, request.data)
        tags = Tag.objects.all().order_by('name')
        tags_list = []
        for tag in tags:
            tags_list.append({"id": tag.id, "name": tag.name})
        societies = SocOrResearchGroup.objects.all().order_by('name')
        socorrg_list = []
        for soc in societies:
            socorrg_list.append({"id": soc.id, "name": soc.name})
        hall_list = []
        halls = HallOfResidence.objects.all().order_by('name')
        for hall in halls:
            hall_list.append({"id": hall.id, "name": hall.name})
        course_list = []
        dept_list = []
        courses = Course.objects.all().order_by('name')
        for x in courses:
            course_list.append(
                {"id": x.id, "name": x.name, "dept": x.department.name})
        departments = Department.objects.all().order_by('name')
        for y in departments:
            dept_list.append({"id": y.id, "name": y.name})
        if token is not None:
            try:
                payload = jwt.decode(token, SECRET, algorithms=[ALGO])
                print(payload["id"])

                user = MyUser.objects.filter(id=int(payload["id"])).first()
                if user is not None:

                    return Response(
                        {
                            "user": MyUserSerializer(user).data,
                            "message": "Success",
                            "tags_list": tags_list,
                            "dept_list": dept_list,
                            "course_list": course_list,
                            "socorrg_list": socorrg_list,
                            "hall_list": hall_list,
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {
                            "message": "Not Valid Token",
                            "tags_list": tags_list,
                            "dept_list": dept_list,
                            "course_list": course_list,
                            "socorrg_list": socorrg_list,
                            "hall_list": hall_list,
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except Exception as e:
                return Response(
                    {
                        "message": "Not logged In +" + str(e),
                        "tags_list": tags_list,
                        "dept_list": dept_list,
                        "course_list": course_list,
                        "socorrg_list": socorrg_list,
                        "hall_list": hall_list,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {
                    "message": "Not logged In and no token",
                    "tags_list": tags_list,
                    "dept_list": dept_list,
                    "course_list": course_list,
                    "socorrg_list": socorrg_list,
                    "hall_list": hall_list,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")

        user = MyUser.objects.filter(email=email).first()
        # post = Posts.objects.get(user=user)

        if user is not None:
            if user.user_type not in ["tsgbearer", "admin"]:
                return Response(
                    {"message": "You are not an official"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = authenticate(
                request,
                username=request.data["email"],
                password=request.data["password"],
            )
            if user is not None:
                payload = {
                    "id": user.id,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=12000),
                    "iat": datetime.datetime.utcnow(),
                }
                token = jwt.encode(payload, SECRET, algorithm=ALGO)

                response = Response()

                # response.set_cookie(key='jwt', value=token, httponly=True)

                serializer = MyUserSerializer(user)
                response.data = {
                    "token": token,
                    "user": serializer.data,
                    "message": "Logged in succesfully",
                }
                return response
            else:
                content = {"message": "Incorrect password"}
        else:
            content = {"message": "No such User exist"}

        return Response(content, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            response = Response()
            data = jwt.decode(request.data["token"], SECRET, algorithms=ALGO)
            user = MyUser.objects.get(id=data["id"])
            user.otp = None
            user.otp_sent_time = None
            user.save()
            response.data = {"message": "Logged out successfully"}

            return response
        except Exception as e:
            return Response(
                {"message": "some error occurred is " + str(e)},
                status=status.HTTP_412_PRECONDITION_FAILED,
            )


class OTPSendView(APIView):
    def post(self, request):
        roll_no = request.data.get("roll_no")
        user = MyUser.objects.filter(roll_no=roll_no).first()
        print(user)
        if user is not None:
            email = user.email
            otp = str(random.randint(100000, 999999))
            email_subject = "OTP for Login"
            email_body = (
                "Hi!"
                + user.first_name
                + "Please use this otp to login into your account\n"
                + str(otp)
            )
            email = EmailMessage(
                email_subject, email_body, "itworksonlocal0@gmail.com", [
                    user.email]
            )
            try:
                email.send(fail_silently=False)
            except Exception as e:
                return Response(
                    {
                        "message": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # otp = 000000
            otp = urlsafe_base64_encode(force_bytes(otp))
            user.otp = otp
            user.otp_sent_time = timezone.now()
            user.save()
            return Response({"message": "Please check you email for OTP"})
        else:
            return Response(
                {"message": "Incorrect Roll No."}, status=status.HTTP_400_BAD_REQUEST
            )


class OTPLoginView(APIView):
    def post(self, request):

        otp_receive_time = timezone.now()

        roll_no = request.data.get("roll_no")
        user = MyUser.objects.filter(roll_no=roll_no).first()
        # otp = fernet.decrypt(bytes(otp, encoding='utf-8')).decode()
        # otp = jwt.decode(otp, SECRET, algorithms=ALGO)
        otp = force_text(urlsafe_base64_decode(user.otp))
        print(type(otp))
        otp_received = request.data.get("otp")
        print(type(otp_received))
        otp_sent_time = user.otp_sent_time
        duration = otp_receive_time - otp_sent_time

        if duration.total_seconds() > 300.00:

            return Response(
                {"message": "OTP Expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        elif otp == otp_received:

            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=1200),
                "iat": datetime.datetime.utcnow(),
            }
            # secret= 'it_works_on_local_team_leader_vaibhav_gawd'
            token = jwt.encode(payload, SECRET, algorithm=ALGO)

            response = Response()

            # response.set_cookie(key='jwt', value=token, httponly=True)
            #  we are now setting the token in local storage as name og token
            serializer = MyUserSerializer(user)
            response.data = {
                "token": token,
                "user": serializer.data,
                "message": "Logged in succesfully",
            }
            return response
        else:
            return Response(
                {"message": "OTP is incorrect"}, status=status.HTTP_400_BAD_REQUEST
            )
