from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework import viewsets
from .decorators import *
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action




        

class UniversalViewSet(viewsets.ViewSet):
    def __init__(self, model=None, serializer_class=None,post=[]):
        self.model = model
        self.serializer_class = serializer_class
        self.allowed_roles=post

        
        
    @action(detail=False,methods=['post'])
    def all(self,request):
        try:
            token = request.data.get('token')
            page_size=request.data.get('page_size')
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
                usertype=user.user_type
                print(usertype)
                if usertype in self.allowed_roles:
                    
                    try:
                        if usertype=="governor":
                            pass
                        queryset = self.model.objects.all().order_by('-id')
                        paginator=PageNumberPagination()
                        paginator.page_size=page_size if page_size != None else 10
                        result_page=paginator.paginate_queryset(queryset,request)
                        serializer = self.serializer_class(result_page, many=True)
                        return paginator.get_paginated_response(serializer.data)
                    except Exception as e:
                        return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
                else:
                     return Response('you are not allowed to access this')
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
    
    def list(self, request):
        try:
            queryset = self.model.objects.all()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            queryset = self.model.objects.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        token = request.data.get('token')
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
            usertype=user.user_type
            print(usertype,self.allowed_roles)
            if usertype in self.allowed_roles:
                
            # main logic start
                try:
                    serializer = self.serializer_class(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        activity=Activity(user=user,type='Create',modelName=self.model, remarks=" created "+self.model.__name__ +" having post "+user.user_type + " with email "+user.email)
                        activity.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({"message": "some error occurred "+str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            # main logic end
            
            else:
                return Response('you are not allowed to access this (contact admin)')
        
        
        
    def update(self, request, pk=None):
        try:
            token = request.data.get('token')
            if not token:
                return Response('Unauthenticated')
            else:
                try:
                    payload = jwt.decode(token, SECRET, algorithms=ALGO)
                except jwt.ExpiredSignatureError:
                    return Response('Token expired')
            user = MyUser.objects.filter(id=int(payload['id'])).first()
            print(user.first_name,user.user_type)
            if user == None:
                return Response('Invalid token')
            else:
                usertype=user.user_type
                print(usertype,self.allowed_roles)
                if usertype in self.allowed_roles:
                    print("success",pk,payload['id'])
                    if (usertype=='student' or usertype=='governor') and self.model.__name__=='MyUser':
                        if int(pk)!=int(payload['id']):
                            return Response('you are not allowed to access this ( no match)' ,status=status.HTTP_400_BAD_REQUEST)
                    if usertype=='tsgbearer' and self.model.__name__=='MyUser':
                        currentuser=MyUser.objects.filter(id=pk).first()
                        if currentuser.user_type=='admin':
                            return Response('tsgbearer cannot access admin details',status=status.HTTP_400_BAD_REQUEST)
                        
                    # main logic start
                    try:
                        instance = self.model.objects.get(pk=pk)
                        serializer = self.serializer_class(
                            instance, data=request.data, partial=True)
                        if serializer.is_valid():
                            serializer.save()
                            activity=Activity(user=user,type='Updated',modelName=self.model.__name__, remarks=" updated "+self.model.__name__+" having post "+user.user_type + " with email "+user.email)
                            activity.save()
                            print("updated")
                            return Response(serializer.data)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    except Exception as e:
                        print(str(e))
                        errorstr="InMemoryUploadedFile'> is not supported."
                        if errorstr in str(e):
                            return Response({"message": "Successfull some problem"})
                        return Response({"message": "some error occurred "+str(e)}, status=status.HTTP_400_BAD_REQUEST)
                        
                    # main logic end
                    
                else:
                    return Response('you are not allowed to access this (contact admin)')
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        


    def destroy(self, request, pk=None):
        try:
            token = request.data.get('token')
            if not token:
                return Response('no Token')
            else:
                try:
                    payload = jwt.decode(token, SECRET, algorithms=ALGO)
                except jwt.ExpiredSignatureError:
                    return Response('Token expired')
            user = MyUser.objects.filter(id=int(payload['id'])).first()
            if user == None:
                return Response('Invalid token')
            else:
                usertype=user.user_type
                print(usertype,self.allowed_roles)
                if usertype in self.allowed_roles:
                    print("success")
                    if (usertype=='student' or usertype=='governor') and self.model.__name__=='MyUser':
                        if int(pk)!=int(payload['id']):
                            return Response('you are not allowed to access this ( no match)' ,status=status.HTTP_400_BAD_REQUEST)
                    if usertype=='tsgbearer' and self.model.__name__=='MyUser':
                        currentuser=MyUser.objects.filter(id=pk).first()
                        if currentuser.user_type=='admin':
                            return Response('tsgbearer cannot access admin details',status=status.HTTP_400_BAD_REQUEST)
                        
                    # main logic start
                    try:
                        instance = self.model.objects.get(pk=pk)
                        instance.delete()
                        activity=Activity(user=user,type='Delete',modelName=self.model, remarks=" deleted "+self.model.__name__+" having post "+user.user_type + " with email "+user.email)
                        activity.save()
                        print("deleted")
                        return Response("deleted successfully",status=status.HTTP_204_NO_CONTENT)
                    except Exception as e:
                        return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
                
                    # main logic end
                    
                else:
                    return Response('you are not allowed to access this (contact admin)')
        except Exception as e:
            return Response({"message": "some error occurred"+str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            
            
            
            


