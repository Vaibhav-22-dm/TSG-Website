from django.urls import path
from django.urls import include
from .views import *
from .auth import *
from .customviews import *
from .adminViews import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('user', UserView, basename='user')
router.register('event', EventView, basename='event')
router.register('hall', HallView, basename='hall')
router.register('soc', SocOrResearchGroupView, basename='soc')
router.register('tag', TagView, basename='tag')
router.register('achievement', AchievementView, basename='achievement')
router.register('grievance', GrievanceView, basename='grievance')
router.register('contact', ContactView, basename='contact')
router.register('faculty', FacultyView, basename='faculty')
router.register('interiit', InterIITView, basename='interiit')
router.register('gc', GeneralChampionshipView, basename='gc')
router.register('post', PostView, basename='post')
router.register('bill', BillReimbursementView, basename='bill')
router.register('alumni', NotableAlumniView, basename='alumni')
router.register('department', DepartmentView, basename='department')
router.register('subject', SubjectView, basename='subject')
router.register('course', CourseView, basename='course')
router.register('cdc', CDCProfileView, basename='cdc')
router.register('news', NewsView, basename='news')
router.register('quicklinks', QuickLinkView, basename='quicklinks')
router.register('activity', ActivityView, basename='activity')
router.register('governororfounder', GovernorOrFounderView,
                basename='governororfounder')
router.register('studentproject', StudentProjectView,
                basename='studentproject')
# basic working of Default router is that
# get request to get all data  eg /user/   ,
# to create new  post req to /user/  ,
# to retrieve particular user get req to  /user/id/ ,
# to delete a user  delete req to     /user/id/
# to update a user put req to /user/id/
#  req path can be anything mentioned above  eg event hall or soc

urlpatterns = [
    path('', index, name='index'),
    path('', include(router.urls)),
    path('otp_send/', OTPSendView.as_view(), name='otp_send'),
    path('otp_login/', OTPLoginView.as_view(), name='otp_login'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login_check/', LoginCheckView.as_view(), name='logincheck'),
    path('event_list/', EventListView.as_view(), name='event_list'),
    path('studentdata/', studentProfileView.as_view(), name='student_data_extra'),
    path('tsgcontacts/', TSGContactView.as_view(), name='tsgcontacts'),
    path('findsubjects/', findSubjectView.as_view(), name='findsubjects'),
    path('fileupload/', fileUploadView.as_view(), name='fileupload'),
    path('getsocevent/',billPortalCustomView.as_view(), name='getsocevent'),
    path('fetchbill/',fetchBillView.as_view(),name='getbill'),
    path('fetchgrievance/',fetchGrievanceView.as_view(),name='getgrievance'),
    path('quickInfoPages/<int:pk>/',QuickInfoPages.as_view(),name='quickInfoPages'),
    path('gcstats/',gcStats.as_view(),name='gcstats'),
    path('cdcstats/',cdcStats.as_view(),name='cdcstats'),
    path('tsgevents/',TSGEvents.as_view(),name='tsgevents'),
    path('socorrgevents/',SocOrRgEvents.as_view(),name='socorrgevents'),
    path('tsgeventresults/',TSGEventResults.as_view(),name='tsgeventresults'),
    path('featuredEvents/', featuredEvents.as_view(), name='featuredEvents'),
    path('getnews/',getNews.as_view(),name='getnews'),
    
    
]


# admin url patterns

urlpatterns += [
    path('studentdataadmin/', studentDataAdmin.as_view(), name='studentdataadmin'),
    path('finduser/', findUserAdminView.as_view(), name='finduser'),
    path('findevent/', findEventAdminView.as_view(), name='findevent'),
    path('findnews/', findNewsAdminView.as_view(), name='findnews'),
]
