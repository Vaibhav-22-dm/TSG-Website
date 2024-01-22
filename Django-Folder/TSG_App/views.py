from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import serializers
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .api import UniversalViewSet
from django.contrib.auth import authenticate
import jwt
import datetime
from django.core.mail import EmailMessage
import random
from django.utils import timezone
# from cryptography.fernet import Fernet
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import pagination
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from .decorators import *
from django.utils.decorators import method_decorator
# Create your views here.
import datetime


def index(request):
    return HttpResponse("Hello")


class UserView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        super().__init__(model=MyUser, serializer_class=MyUserSerializer,post=['admin','tsgbearer','student','governor'])
    # def list(self, request):
    #     pass
    # def retrieve(self, request,pk=None):
    #     pass

    # @method_decorator(allowed_posts(['admin', 'tsgbearer']))
    # def create(self, request):
    #     if 'password' not in request.data:
    #         x=request.data
    #         x['password'] = make_password(request.data['roll_no'])
    #     serializer = MyUserSerializer(data=x)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EventView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Event, serializer_class=EventSerializer,post=['admin','tsgbearer'])


class HallView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=HallOfResidence, serializer_class=HallOfResidencesSerializer,post=['admin','tsgbearer'])


class SocOrResearchGroupView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=SocOrResearchGroup, serializer_class=SocOrResearchGroupSerializer,post=['admin','tsgbearer'])


class TagView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Tag, serializer_class=TagSerializer,post=['admin','tsgbearer'])


class AchievementView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Achievement, serializer_class=AchievementSerializer,post=['admin','tsgbearer'])

    # def create(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GrievanceView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Grievance, serializer_class=GrievanceSerializer,post=['admin','tsgbearer','student','student'])
    def list(self, request):
        pass
    def retrieve(self, request,pk=None):
        pass


class ContactView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Contact, serializer_class=ContactSerializer,post=['admin','tsgbearer'])


class FacultyView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Faculty, serializer_class=FacultySerializer,post=['admin','tsgbearer'])


class InterIITView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=InterIIT, serializer_class=InterIITSerializer,post=['admin','tsgbearer'])


class GeneralChampionshipView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=GeneralChampionship, serializer_class=GeneralChampionshipSerializer,post=['admin','tsgbearer'])


class PostView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Posts, serializer_class=PostSerializer,post=['admin', 'tsgbearer','student','governor'])
    def list(self, request):
        pass
    def retrieve(self, request,pk=None):
        pass
class BillReimbursementView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=BillReimbursement, serializer_class=BillReimbursementSerializer,post=['admin','governor'])
    def list(self, request):
        pass
    def retrieve(self, request,pk=None):
        pass
class NotableAlumniView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=NotableAlumni, serializer_class=NotableAlumniSerializer,post=['admin','tsgbearer'])


class DepartmentView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Department, serializer_class=DepartmentSerializer,post=['admin','tsgbearer'])


class SubjectView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Subject, serializer_class=SubjectSerializer,post=['admin','tsgbearer'])


class CourseView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Course, serializer_class=CourseSerializer,post=['admin','tsgbearer'])


class CDCProfileView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=CDCProfile, serializer_class=CDCProfileSerializer,post=['admin','tsgbearer'])


class NewsView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=News, serializer_class=NewsSerializer,post=['admin','tsgbearer'])


class QuickLinkView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=QuickLink, serializer_class=QuickLinkSerializer,post=['admin','tsgbearer'])

class ActivityView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=Activity, serializer_class=ActivitySerializer,post=['admin','tsgbearer'])


class GovernorOrFounderView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=GovernorOrFounder, serializer_class=GovernorOrFounderSerializer,post=['admin','tsgbearer','governor'])

class StudentProjectView(UniversalViewSet):
    def __init__(self, *args, **kwargs):
        UniversalViewSet.__init__(
            self, model=StudentProject, serializer_class=StudentProjectSerializer,post=['admin','tsgbearer','governor','student'])




# get reqeust of myuser , billreimbursement,grievance, post are not available


# class allUserView(APIView):
#     def post(self, request):
#         users = MyUser.objects.all()
#         paginator=PageNumberPagination()
#         paginator.page_size=10
#         result_page=paginator.paginate_queryset(users,request)
#         serializer = MyUserSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)

# class NewsPagination(ListAPIView):
#     queryset = News.objects.all()
#     serializer_class = NewsSerializer
#     pagination_class = PageNumberPagination
 
