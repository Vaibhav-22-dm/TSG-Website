import re
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import serializers
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .api import *
from django.contrib.auth import authenticate
import jwt
import datetime
from django.core.mail import EmailMessage
import random
from django.utils import timezone
# from cryptography.fernet import Fernet
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# Create your views here.
import datetime
import json
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser

from .decorators import *
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination


class studentDataAdmin(APIView):
    def get(self, request):
        choice = request.GET.get('choice')
        dept = request.GET.get('dept')
        roll_no = request.GET.get('roll_no')
        year = request.GET.get('year')
        start = request.GET.get('start')
        count = request.GET.get('count')
        course = request.GET.get('course')
        if choice == 'True':
            if roll_no != 'null':
                user = MyUser.objects.get(roll_no=roll_no)
                serializer = MyUserSerializer(user, many=False)
                return Response(serializer.data)
            else:
                if year != 'null':
                    users = MyUser.objects.filter(eaa=year)
                if dept != 'null':
                    users = users.filter(dept=dept)
                if course == 'null':
                    users = users.filter(course=course)
                users = users[int(start):(int(start)+int(count))]
                serializer = MyUserSerializer(users, many=True)
                return Response(serializer.data)
        else:
            if count == '0':
                try:
                    user = MyUser.objects.get(id=int(start))
                    student = MyUserSerializer(user, many=False)
                    achievements = user.achievement_set.all()
                    achievements = AchievementSerializer(
                        achievements, many=True)
                    posts = user.posts_set.all()
                    posts = PostSerializer(posts, many=True)
                    projects = user.studentproject_set.all()
                    projects = ProjectSerializer(projects, many=True)
                    tags = Tag.objects.all()
                    tags_list = []
                    for tag in tags:
                        tags_list.append(tag.name)
                    societies = SocOrResearchGroup.objects.all()
                    socorhall_list = []
                    for soc in societies:
                        socorhall_list.append(soc.name)
                    halls = HallOfResidence.objects.all()
                    for hall in halls:
                        socorhall_list.append(hall.name)
                    socorhall_list.append('TSG')
                    userdata = {
                        "user":student.data,
                        "achievements": achievements.data,
                        "posts": posts.data, 
                        "projects": projects.data,
                        "tags":json.dumps(tags_list),
                        "socorhall_list":json.dumps(socorhall_list)
                        }
                    return Response({"userdata": userdata})
                except MyUser.DoesNotExist:
                    return Response({"message":"No such user exists!"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                users = MyUser.objects.all()[int(start)*10:(int(start)*10 + int(count))]
                serializer = MyUserSerializer(users, many=True)
                dept_list = []
                depts = Department.objects.all()
                for x in depts:
                    dept_list.append(x.name)
                course_list = []
                courses = Course.objects.all()
                for x in courses:
                    course_list.append({
                        "name":x.name,
                        "dept":x.department.name
                    })
                return Response({"users":serializer.data, "depts_list":dept_list,"course_list":course_list})
            

    def post(self, request):
        token = request.data['token']
        if token is not None:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = MyUser.objects.filter(id=int(payload['id'])).first()

                if user is not None:
                    hall = HallOfResidence.objects.get(request.data["user_data"]["hall"])
                    try:
                        user = MyUser.objects.create(
                            first_name=request.data["user_data"]["first_name"],
                            middle_name=request.data["user_data"]["middle_name"],
                            last_name=request.data["user_data"]["last_name"],
                            roll_no=request.data["user_data"]["roll_no"],
                            email=request.data["user_data"]["email"],
                            personal_mail=request.data["user_data"]["personal_mail"],
                            phone=request.data["user_data"]["phone"],
                            course = request.data["user_data"]["course"],
                            department=request.data["user_data"]["department"],
                            batch=request.data["user_data"]["batch"],
                            eaa=request.data["user_data"]["eaa"],
                            about=request.data["user_data"]["about"],
                            user_type=request.data["user_data"]["user_type"],
                            hall=hall
                            )
                        user.save()
                        return Response({"message":"You have successfully added a new user!"})
                    except Exception as e:
                        return Response({"message":str(e)}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"message": "No such user exists!"}, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                return Response({"message":str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"message":"You are not authenticated"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        token = request.data['token']
        if token is not None:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                admin = MyUser.objects.filter(id=int(payload['id'])).first()

                if admin is not None:
                    if admin.user_type in ["admin", "tsgbearer"]:
                        message = []
                        if 'user_id' in request.data:
                            user = MyUser.objects.get(id=int(request.data['user_id']))
                        if 'about' in request.data:
                            print(request.data['about'])
                            try:
                                user.about = request.data['about']
                                user.save()
                                message.append({'aboutSuccess':'You have successfully updated about!'})
                                print(message)
                            except Exception as e:
                                message.append({'aboutError':str(e)})
                        if 'post' in request.data:
                            body = request.data['post']['body']
                            try:
                                society = SocOrResearchGroup.objects.get(name=body)
                                try:
                                    post = Posts.objects.create(user=user, post=request.data['post']['designation'], tenure=request.data['post']['tenure'], status=request.data['post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'] ,society=society)
                                    post.save()
                                    message.append({'postSuccess':'Added a post successfully!'})
                                except Exception as e:
                                    message.append({'postError':str(e)})
                            except SocOrResearchGroup.DoesNotExist:
                                try:
                                    hall = HallOfResidence.objects.get(name=body)
                                    try:
                                        post = Posts.objects.create(user=user, post=request.data['post']['designation'], tenure=request.data['post']['tenure'], status=request.data['post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'] ,hall=hall)
                                        post.save()
                                        message.append({'postSuccess':'Added a post successfully!'})
                                    except Exception as e:
                                        message.append({'postError':str(e)})

                                except HallOfResidence.DoesNotExist:
                                    try:
                                        post = Posts.objects.create(user=user, post=request.data['post']['designation'],tenure=request.data['post']['tenure'], status=request.data['post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'] ,body=body)
                                        post.save()
                                        message.append({'postSuccess':'Added a post successfully!'})
                                    except Exception as e:
                                        message.append({'postError':str(e)})
                        if 'project' in request.data:
                            try:
                                project = studentProject.objects.create(user=user, title=request.data['project']['title'], about=request.data['project']['about'], link=request.data['project']['link'])
                                project.save()
                                if 'tags' in request.data['project']:
                                    tagsList = list(request.data['project']['tags'])
                                    for x in tagsList:
                                        try:
                                            tag = Tag.objects.get(name=x)
                                            print(tag)
                                            project.tag.add(tag)
                                            project.save()
                                        except Tag.DoesNotExist:
                                            message.append({'tagsError':str(x) + " is not saved as a tag. Please create it first."})
                                            return Response({'message':json.dumps(message)}, status=status.HTTP_400_BAD_REQUEST )
                                message.append({'projectSuccess':'Added an project successfully!'})
                            except Exception as e:
                                message.append({'projectError':str(e)})
                        return Response({'message':json.dumps(message)})
                    else:
                        return Response({"message": "You are not authorized to do this!"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST )

class findUserAdminView(APIView):
    @method_decorator(allowed_posts(allowed_roles=['admin','tsgbearer']))
    def post(self,request):
        try:
            department=request.data.get('department')
            
            year=request.data.get('year')
            roll_no=request.data.get('roll_no')
            page_size=request.data.get('page_size')
            if department != None and  year != None:
                department=Department.objects.get(name=department)
                users=MyUser.objects.filter(department=department)
                listuser=list(users)
                if listuser !=[]:
                    date=datetime.datetime.now().year()[2:]
                    presentyear=date-year;
                    print(presentyear)
                    users=users.filter(roll_no__startswith=str(presentyear)).order_by('roll_no')
                
                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(users,request)
                serializer = MyUserSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            if roll_no != None:
                users=MyUser.objects.filter(roll_no__startswith=roll_no).order_by('roll_no')
                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(users,request)
                serializer = MyUserSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            # now to valid input so we will give all data
            users=MyUser.objects.all().order_by('-roll_no')
            paginator=PageNumberPagination()
            paginator.page_size=page_size if page_size != None else 10
            result_page=paginator.paginate_queryset(users,request)
            serializer = MyUserSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class findEventAdminView(APIView):
    
    # @method_decorator( allowed_posts(allowed_roles=['tsgbearer','admin']))
    def post(self,request):
        try:
            page_size=request.data.get('page_size')
            month=request.data.get('month')
            socorhall=request.data.get('socorhall')
            if month != None and socorhall != None:
                socorhalldata=SocOrResearchGroup.objects.get(name=socorhall)
                hall =False
                if socorhalldata == None:
                    socorhalldata=HallOfResidence.objects.get(name=socorhall)
                    hall=True
                if hall:
                    events= Event.objects.filter(organiserHall=socorhalldata ,eventDate__month=month).order_by('-eventDate')
                else:
                    events= Event.objects.filter(organiserSociety=socorhalldata ,eventDate__month=month).order_by('-eventDate')

                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(events,request)
                serializer = EventSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            else:
                events= Event.objects.all().order_by('-eventDate')
                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(events,request)
                serializer = EventSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
                
                
                
        except Exception as e:
            return Response({"message": "some error occurred "+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class findNewsAdminView(APIView):
    # @method_decorator(allowed_posts(allowed_roles=['admin','tsgbearer']))
    def post(self, request):
        try:
            page_size=request.data.get('page_size')
            date=request.data.get('date')
            print(date)
            if date != None:
                news=News.objects.filter(date__date=date).order_by('-date')
                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(news,request)
                serializer = NewsSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            else:
                events= News.objects.all().order_by('-date')
                paginator=PageNumberPagination()
                paginator.page_size=page_size if page_size != None else 10
                result_page=paginator.paginate_queryset(events,request)
                serializer = NewsSerializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({"message": "some error occurred "+str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
        
        
        
        
        
        
        
        
        
        
        