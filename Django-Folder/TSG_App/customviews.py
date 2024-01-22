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
from rest_framework.pagination import PageNumberPagination


SECRET = os.environ.get("OTP_SECRET")
ALGO = os.environ.get("OTP_ALGO")


class EventListView(APIView):
    def get(self, request):
        param = request.GET.get('param')
        subparam = request.GET.get('subparam')
        # start = request.GET.get('start')
        # count = request.GET.get('count')
        if param == 'date':
            events = Event.objects.all()
            event_list = []
            for event in events:
                if event.eventDate != None and str(event.eventDate.date()) == subparam:
                    serializer = EventSerializer(event, many=False)
                    event_list.append(serializer.data)
            return Response({"event_list": event_list})
        # elif param == 'type':
        #     if subparam != 'all':
        #         tag = Tag.objects.get(name=subparam)
        #         events = Event.objects.filter(
        #             tag=tag).filter(organiserBody='TSG')
        #     else:
        #         events = Event.objects.filter(organiserBody='TSG')

        #     serializer = EventSerializer(events, many=True)
        #     return Response(serializer.data)
        # elif param == 'soc-rg':
        #     if subparam == 'all':
        #         events = Event.objects.filter(organiserSociety__isnull=False)[
        #             int(start):(int(start)+int(count))]
        #         serializer = EventSerializer(events, many=True)
        #         return Response(serializer.data)
        #     else:
        #         soc = SocOrResearchGroup.objects.get(name=subparam)
        #         events = Event.objects.filter(organiserSociety=soc)
        #         serializer = EventSerializer(events, many=True)
        #         return Response(serializer.data)
        # else:
        #     if subparam == 'all':
        #         event = Event.objects.all()[int(start):(int(start)+int(count))]
        #         serializer = EventSerializer(event, many=True)
        #         return Response(serializer.data)
        #     else:
        #         event = Event.objects.get(pk=subparam)
        #         serializer = EventSerializer(event, many=False)
        #         return Response(serializer.data)


class studentProfileView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if token is not None:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = MyUser.objects.filter(id=int(payload['id'])).first()

                if user is not None:
                    achievements = user.achievement_set.all()
                    achievements = AchievementSerializer(
                        achievements, many=True)
                    posts = user.posts_set.all()
                    posts = PostSerializer(posts, many=True)
                    projects = user.studentproject_set.all()
                    projects = StudentProjectSerializer(projects, many=True)
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
                        "achievements": achievements.data,
                        "posts": posts.data,
                        "projects": projects.data,
                        "tags": json.dumps(tags_list),
                        "socorhall_list": json.dumps(socorhall_list)
                    }
                    # userdata = json.dumps(userdata)
                    return Response({"userdata": userdata})
                else:
                    return Response({"message": "Not Valid Token"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"message": "Not logged In +"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Not logged In and no token"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        token = request.data['token']
        if token is not None:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = MyUser.objects.filter(id=int(payload['id'])).first()
                print(user)

                if user is not None:
                    message = []
                    if 'about' in request.data:
                        print(request.data['about'])
                        try:
                            user.about = request.data['about']
                            user.save()
                            message.append(
                                {'aboutSuccess': 'You have successfully updated about!'})
                            print(message)
                        except Exception as e:
                            message.append({'aboutError': str(e)})

                    if 'post' in request.data:
                        body = request.data['post']['body']
                        try:
                            society = SocOrResearchGroup.objects.get(name=body)
                            try:
                                post = Posts.objects.create(user=user, post=request.data['post']['designation'], tenure=request.data['post']['tenure'], status=request.data[
                                                            'post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'], society=society)
                                post.save()
                                message.append(
                                    {'postSuccess': 'Added a post successfully!'})
                            except Exception as e:
                                message.append({'postError': str(e)})
                        except SocOrResearchGroup.DoesNotExist:
                            try:
                                hall = HallOfResidence.objects.get(name=body)
                                try:
                                    post = Posts.objects.create(user=user, post=request.data['post']['designation'], tenure=request.data['post']['tenure'], status=request.data[
                                                                'post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'], hall=hall)
                                    post.save()
                                    message.append(
                                        {'postSuccess': 'Added a post successfully!'})
                                except Exception as e:
                                    message.append({'postError': str(e)})

                            except HallOfResidence.DoesNotExist:
                                try:
                                    post = Posts.objects.create(user=user, post=request.data['post']['designation'], tenure=request.data['post']['tenure'], status=request.data[
                                                                'post']['status'], roleAndResp=request.data['post']['roles'], rankInOrg=request.data['post']['rank'], body=body)
                                    post.save()
                                    message.append(
                                        {'postSuccess': 'Added a post successfully!'})
                                except Exception as e:
                                    message.append({'postError': str(e)})
                    
                    if 'project' in request.data:
                        try:
                            project = StudentProject.objects.create(
                                user=user, title=request.data['project']['title'], about=request.data['project']['about'], link=request.data['project']['link'])
                            project.save()
                            if 'tags' in request.data['project']:
                                tagsList = list(
                                    request.data['project']['tags'])
                                for x in tagsList:
                                    try:
                                        tag = Tag.objects.get(name=x)
                                        print(tag)
                                        project.tag.add(tag)
                                        project.save()
                                    except Tag.DoesNotExist:
                                        message.append(
                                            {'tagsError': str(x) + " is not saved as a tag. Please create it first."})
                                        return Response({'message': json.dumps(message)}, status=status.HTTP_400_BAD_REQUEST)
                            message.append(
                                {'projectSuccess': 'Added a project successfully!'})
                        except Exception as e:
                            message.append({'projectError': str(e)})
                    return Response({'message': json.dumps(message)})
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TSGContactView(APIView):
    def get(self, request):
        contactsFromContacts = Contact.objects.filter(
            organization='TSG').exclude(designation='President')
        staff = ContactSerializer(contactsFromContacts, many=True)
        contactsFromPosts = Posts.objects.filter(
            body='TSG').exclude(post__startswith='Secretary')
        office_bearers = PostSerializer(contactsFromPosts, many=True)
        contactsFromSecretary = Posts.objects.filter(
            body='TSG').filter(post__startswith='Secretary')
        president = Contact.objects.get(designation='President')
        president = ContactSerializer(president, many=False)
        secretaries = PostSerializer(contactsFromSecretary, many=True)
        return Response({'president': president.data, 'office_bearers': office_bearers.data, 'staff': staff.data, 'secretaries': secretaries.data})


class findSubjectView(APIView):
    def get(self, request):
        param = request.GET.get('param')
        subparam = request.GET.get('subparam')
        if param == 'list':
            course_list = []
            department_list = []
            courses = Course.objects.all()
            for x in courses:
                course_list.append(x.name)
            departments = Department.objects.all()
            for y in departments:
                department_list.append(y.name)
            course = courses[0]
            return Response({"course_list": json.dumps(course_list), "department_list": department_list})
        # elif param == 'default':
        if param == 'default':
            course = Course.objects.all()
            serializer = CourseSerializer(course[0], many=False)
            phySem = serializer.data['phySem']
            chemSem = serializer.data['chemSem']
            return Response({"phySem": phySem, "chemSem": chemSem})
        elif param == 'dept':
            department = Department.objects.get(name=subparam)
            subjects = Subject.objects.filter(department=department)
            subject_list = []
            for x in subjects:
                subject_list.append(
                    {'courseCode': x.courseCode, 'name': x.name})
            serializer = SubjectSerializer(subjects[0], many=False)
            return Response({"subject": serializer.data, "subject_list": json.dumps(subject_list)})
        elif param == 'code':
            subject = Subject.objects.get(courseCode=subparam)
            serializer = SubjectSerializer(subject, many=False)
            return Response(serializer.data)
        else:
            course = Course.objects.get(name=param)
            serializer = CourseSerializer(course, many=False)
            if subparam == '2':
                autumn = serializer.data['semThree']
                spring = serializer.data['semFour']
            elif subparam == '3':
                autumn = serializer.data['semFive']
                spring = serializer.data['semSix']
            elif subparam == '4':
                autumn = serializer.data['semSeven']
                spring = serializer.data['semEight']
            elif subparam == '5':
                autumn = serializer.data['semNine']
                spring = serializer.data['semTen']
            return Response({"autumn": autumn, "spring": spring})


class fileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, pk):
        token = request.data['token']
        if token is not None:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = MyUser.objects.filter(id=int(payload['id'])).first()

                if user is not None:
                    modelName = request.data['modelName']
                    if modelName == 'achievement':
                        file = request.data['file']
                        key = int(pk)
                        try:
                            achievement = Achievement.objects.get(id=key)
                            achievement.supDoc = file
                            achievement.save()
                            return Response({"message": "File uploaded successfully"})
                        except Achievement.DoesNotExist:
                            return Response({"message": "No such achievement saved!"}, status=status.HTTP_400_BAD_REQUEST)
                    if modelName == "user":
                        if "cv" in request.data:
                            file = request.data['cv']
                            user.cv = file
                            user.save()
                            return Response({"message": "File uploaded successfully"})
                        if "profile_pic" in request.data:
                            roll_no = pk
                            if user.user_type in ["admin", "tsg_bearer"]:
                                try:
                                    student = MyUser.objects.get(
                                        roll_no=roll_no)
                                    student.profile_pic = request.data["profile_pic"]
                                    student.save()
                                except Exception as e:
                                    return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                            else:
                                return Response({"message": "You are not authorized to do this!"}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response({"message": "No such user found!"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You are not authenticated!"}, status=status.HTTP_400_BAD_REQUEST)


class billPortalCustomView(APIView):

    @method_decorator(allowed_posts(allowed_roles=['admin', 'tsgbearer', 'governor']))
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get('token')
            payload = jwt.decode(token, SECRET, algorithms=[ALGO])
            governor = GovernorOrFounder.objects.filter(user=payload['id'])
            print(governor)
            datas = []
            for temp in list(governor):
                data = temp.soc.event_set.all().values()
                print(data)
                for temp2 in list(data):
                    datas.append(temp2)
                # datas.append(EventSerializer(data).data)                     #dont know why serializers was not working so i used .values() methos
                # print(datas)
            return Response(datas)

        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class fetchBillView(APIView):

    @method_decorator(allowed_posts(allowed_roles=['admin', 'tsgbearer', 'governor']))
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get('token')
            page_size = request.data.get('page_size')
            payload = jwt.decode(token, SECRET, algorithms=[ALGO])
            governor = GovernorOrFounder.objects.filter(user=payload['id'])
            # print(governor)
            query = BillReimbursement.objects.none()                   #making a empty queryset
            for temp in list(governor):
                # print(temp,temp.soc,temp.soc.id)
                query = query | BillReimbursement.objects.filter(                  #coming various queryset using or operator
                    socyOrRg=temp.soc.id)
            paginator = PageNumberPagination()   
            paginator.page_size = page_size if page_size != None else 10
            result_page = paginator.paginate_queryset(query, request)
            serializer = BillReimbursementSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class Department(APIView):
#     def get(self, request, pk):
#         dept = Department.objects.get(id=pk)
#         faculty = Faculty.objects.filter(department=dept)

#         dept = DepartmentSerializer(dept, many=False)

class TSGEvents(APIView):
    def get(self, request):
        
        if 'page' not in request.GET: page = 1 
        else: page = int(request.GET.get('page'))
        if 'page_size' not in request.GET: page_size = 10
        else: page_size = int(request.GET.get('page_size'))

        if 'param' in request.GET:
            param = request.GET.get('param')
            try:
                events = Event.objects.filter(organiserBody='TSG').order_by('id')[page_size*(page-1):page_size*page]
                print(events)
                tag = Tag.objects.filter(name=param).first()
                if tag is not None:
                    events = events.filter(tag=tag)
                else:
                    return Response({"event_list":[]}, status=200)
            except Exception as e:
                return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            events = Event.objects.filter(organiserBody='TSG').order_by('id')[page_size*(page-1):page_size*page]
        event_list = []
        for event in events:
            serializer = EventSerializer(event, many=False)
            item = {
                "eventName":event.eventName,
                "about":event.about[:50],
                "poster":serializer.data["posterImage"],
                "daysLeft":str((event.eventDate.date()-datetime.datetime.today().date()).days) + ' days',
                "tags": list(event.tag.all().values_list('name',flat=True)),
                "id": event.id
            }
            event_list.append(item)
        print(event_list)
        return Response({"event_list":event_list})
 
class TSGEventResults(APIView):
    def get(self, request):

        #data for pagination
        if 'page' not in request.GET: page = 1 
        else: page = int(request.GET.get('page'))
        if 'page_size' not in request.GET: page_size = 10
        else: page_size = int(request.GET.get('page_size'))

        #Getting all events whose reults are publixhed and are still non-archived
        events = Event.objects.exclude(report__isnull=True).exclude(report='').filter(reportArchive='NA').order_by('-id')
        print(events)
        #If event search is by name
        if 'param' in request.GET and request.GET.get('param') == 'byname':
            events = events.filter(eventName__contains=request.GET.get('subparam'))
        else:
            if 'param' in request.GET:
                param = request.GET.get('param')
                tag = Tag.objects.filter(name=param).first()
                if tag is not None:
                    events = events.filter(tag=tag)
                else:
                    return Response({"event_list":[]}, status=200)
            if 'subparam' in request.GET:
                subparam = request.GET.get('subparam')
                try:
                    soc = SocOrResearchGroup.objects.get(name=subparam)
                    events = events.filter(organiserSociety=soc)
                except Exception as e:
                    try:
                        hall = HallOfResidence.objects.get(name=subparam)
                        events = events.filter(organiserHall=hall)
                    except Exception as e:
                        events = events.filter(organiserBody=request.GET.get('subparam'))

        event_list = []
        for event in events[page_size*(page-1):page_size*page]:
            serializer = EventSerializer(event, many=False)
            item = {
                "eventName":event.eventName,
                "eventDate": datetime.datetime.strptime(str(event.eventDate.date()), '%Y-%m-%d').strftime('%d %b %Y'),
                "report":serializer.data["report"],
                "id":event.id,
            }
            if event.organiserSociety:
                society = event.organiserSociety
                serializer = SocOrResearchGroupSerializer(society, many=False)
                item["organiser"] = society.name
                item["logo"] = serializer.data["logo"]
            elif event.organiserHall:
                item["organiser"] = event.organiserHall.name
            else:
                item["organiser"] = event.organiserBody


            event_list.append(item)
        return Response({"event_list":event_list})

class featuredEvents(APIView):
    def get(self, request):
        events = Event.objects.filter(featured=True)[:10]
        posters = []
        for x in events:
            serializer = EventSerializer(x, many=False)
            posters.append(serializer.data["posterImage"])
        return Response(posters)

class SocOrRgEvents(APIView):
    def get(self, request):

        if 'page' not in request.GET: page = 1 
        else: page = int(request.GET.get('page'))
        if 'page_size' not in request.GET: page_size = 10
        else: page_size = int(request.GET.get('page_size'))

        events = Event.objects.filter(organiserSociety__isnull=False).order_by('id')
        if 'param' in request.GET:
            try:
                soc = SocOrResearchGroup.objects.get(name=request.GET.get('param'))
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)
            events = events.filter(organiserSociety=soc)
        events = events.order_by('id')
        event_list = []
        for event in events[page_size*(page-1):page_size*page]:
            serializer = EventSerializer(event, many=False)
            item = {
                "eventName":event.eventName,
                "organiser":event.organiserSociety.name,
                # "eventDate": datetime.datetime.strptime(str(event.eventDate.date()), '%Y-%m-%d').strftime('%d %b %Y'),
                # "eventTime": datetime.datetime.strptime(str(event.eventDate.time()), "%H:%M:%S").strftime("%I:%M %p"),
                "logo":serializer.data["organiserSociety"]["logo"],
                "posterImage":serializer.data["posterImage"],
                "id":event.id,
                "about":event.about[:50]
            }
            event_list.append(item)
        return Response({"event_list":event_list})

class QuickInfoPages(APIView):
    def get(self, request, pk):
        param = request.GET.get('param')
        #checking whether department data is needed
        if param == 'dept':
            try:
                dept = Department.objects.get(id=pk)
                faculty = Faculty.objects.filter(department=dept)
                #Faculty model has a field called as responsibilities which will contain a json list of all the responsibilities of the faculty. If that list contains 'HOD-<Two letter code of Department>' then that faculty will be considered as HOD of that department.
                hod = faculty.filter(responsibilities__contains=f'HOD-{dept.name[:2]}').first()
                media = MediaFiles.objects.filter(department=dept)
                media = MediaFilesSerializer(media, many=True)
                faculty = FacultySerializer(faculty, many=True)
                hod = FacultySerializer(hod, many=False)
                dept = DepartmentSerializer(dept, many=False)
                return Response({
                    'dept':dept.data,
                    'media':media.data,
                    'faculty':faculty.data,
                    'hod':hod.data
                })
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        elif param=='hall':
            try:
                hall = HallOfResidence.objects.get(id=pk)
                media = MediaFiles.objects.filter(hall=hall)
                #Filtering if the person with post is currently active or not.
                posts = Posts.objects.filter(hall=hall).filter(status='Active')
                hall = HallOfResidencesSerializer(hall, many=False)
                media = MediaFilesSerializer(media, many=True)
                posts = PostSerializer(posts, many=True)
                return Response({
                    'hall':hall.data,
                    'media':media.data,
                    'posts':posts.data
                })
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        elif param=='soc':
            try:
                soc = SocOrResearchGroup.objects.get(id=pk)
                media = MediaFiles.objects.filter(socyOrRg=soc)
                posts = Posts.objects.filter(society=soc).filter(status='Active')
                soc = SocOrResearchGroupSerializer(soc, many=False)
                media = MediaFilesSerializer(media, many=True)
                posts = PostSerializer(posts, many=True)
                return Response({
                    'society':soc.data,
                    'media':media.data,
                    'posts':posts.data
                })
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class gcStats(APIView):
    def get(self, request):
        print('Reached')
        param = request.GET.get('param')
        subparam = request.GET.get('subparam')
        events = GCStats.objects.all()
        events = events.filter(year=param)
        events = events.filter(eventType=subparam)
        item = {
            'year': param,
            'event': subparam
        }
        for x in events:
            item[f'{x.eventName}'] = x.scoreArray

        return Response(item)

class cdcStats(APIView):
    
    def get(self, request):
        try:
            param = request.GET.get('param')
            data = CDCStats.objects.filter(year=param)
            serializer = CDCStatsSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
class getNews(APIView):
    def get(self, request):
        try:
            page_size=request.GET.get('page_size')
            news = News.objects.all().order_by('-id')
            paginator=PageNumberPagination()
            paginator.page_size=page_size if page_size != None else 10
            result_page=paginator.paginate_queryset(news,request)
            serializer = NewsSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        
class fetchGrievanceView(APIView):
    
    @method_decorator(allowed_posts(allowed_roles=['admin', 'tsgbearer', 'governor','student']))
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get('token')
            page_size = request.data.get('page_size')
            payload = jwt.decode(token, SECRET, algorithms=[ALGO])
            user = MyUser.objects.filter(id=payload['id']).first()
            item=Grievance.objects.filter(user=user)
            paginator = PageNumberPagination()   
            paginator.page_size = page_size if page_size != None else 10
            result_page = paginator.paginate_queryset(item, request)
            serializer = GrievanceSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)