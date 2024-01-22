import os
from rest_framework.response import Response
import jwt
from .views import *
from .models import *
from rest_framework import status

# Enviormnet varibles
# from dotenv import load_dotenv
# load_dotenv()

# SECRET = os.environ.get('OTP_SECRET')
# ALGO = os.environ.get('OTP_ALGO')


SECRET = "SECRET"
ALGO = "HS256"


def unauthenticated_user(view_func):
    def wrapper_func(request, pk=None, *args, **kwargs):
        token = request.data.get('token')
        print(token)
        if not token:
            return Response('Unauthenticated')
        else:
            try:
                payload = jwt.decode(token, SECRET, algorithms=ALGO)
            except jwt.ExpiredSignatureError:
                return Response('Token expired')
        user = MyUser.objects.filter(id=int(payload['id'])).first()
        if user is None:

            return Response('Invalid token')
        else:
            # if pk != payload['id']:
            #     return Response('you are not allowed to access this')
            return view_func(request, pk)

    return wrapper_func


def allowed_posts(allowed_roles):
    def decorator(view_func):
        def wrapper_func(request, pk=None):
            # print(pk)
            token = request.data.get('token')
            if not token:
                return Response('Unauthenticated',status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    payload = jwt.decode(token, SECRET, algorithms=ALGO)
                except jwt.ExpiredSignatureError:
                    return Response('Token expired')
            user = MyUser.objects.filter(id=int(payload['id'])).first()
            if user is None:
                return Response('Invalid token')
            else:
                usertype=user.user_type;
                print(usertype,allowed_roles)
                if usertype in allowed_roles:
                    print("success")
                    # if usertype=='student':
                    #     if pk!=int(payload['id']):
                    #         return Response('you are not allowed to access this ( no match)',status=status.HTTP_400_BAD_REQUEST)
                    # if usertype=='tsgbearer':
                    #     currentuser=MyUser.objects.filter(id=pk).first()
                    #     if currentuser.user_type=='admin':
                    #         return Response('tsgbearer cannot access admin details')
                        
                    return ( view_func(request)if pk==None else view_func(request, pk))
                else:
                    return Response('you are not allowed to access this (contact admin)',status=status.HTTP_400_BAD_REQUEST)
        return wrapper_func
        
    return decorator
