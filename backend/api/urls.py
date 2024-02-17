from django.urls import path
from . import views
from django.contrib.staticfiles.urls import static  
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings

app_name = 'api'
urlpatterns = [
    path('userView', views.UserViewSet.as_view(), name='userView'),
    path('userView/teacher', views.GetTeacherView.as_view(), name='teacher'),
    path('signup', views.RegisterView.as_view(), name='signup'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('myaccount', views.MyaccountView.as_view(), name='myaccount'),
    path('mypage', views.MyPageView.as_view(), name='myaccount'),
    path('myaccount/update', views.MyaccountUpdateView.as_view(), name='update'),
    path('classes/<int:pk>', views.ClassPageView.as_view(), name='classes'),
    path('check', views.AuthCheckView.as_view(), name='check'),
    path('notice/<int:pk>', views.NoticeUpdateView.as_view(), name='notice'),
    path('assignment/<int:pk>', views.AssignmentView.as_view(), name="assignment"),
    path('assignment/submition/<int:pk>', views.AssignmentSubmitionView.as_view(), name="assignmentsubmit"),
    path('assignment/notsubmissions', views.NotSubmissionsView.as_view(), name='notsubmissions'),
    path('assignment/status/<int:pk>', views.GetAssignmentsView.as_view(), name='aststate'),
    path('timetable', views.TimeTableView.as_view(), name='timetable'),
    path('timetable/today', views.TodayTimeTableView.as_view(), name='todaytimetable'),
    path('team', views.TeamView.as_view(), name='team'),
    path('team/change/<int:pk>', views.TeamView.as_view(), name='teampatch'),
    path('team/chat/<int:pk>', views.TeamChatView.as_view(), name='teamchat'),
    path('team/file/<int:pk>', views.TeamFileView.as_view(), name='teamfile'),
    path('team/link/<int:pk>', views.TeamLinkView.as_view(), name='teamlink'),
    path('myaccount/like', views.LikeUserView.as_view(), name='like'),
    path('likecategory', views.LikeCategoryView.as_view(), name='likecategory'),
    path('settings/like', views.MypageSettingView.as_view(), name='settings/like'),
    path('settings/like/set', views.LikeUserView.as_view(), name='likeset'),
    path('settings/like/delete/<int:pk>', views.LikeUserView.as_view(), name='likedelete'),
    path('classes', views.ClassesView.as_view(), name='classes'),
    path('classes/update/<int:pk>', views.ClassesView.as_view(), name='classupdate'),
    path('classes/teacher', views.GetMyClassesView.as_view(), name='getclasses')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
