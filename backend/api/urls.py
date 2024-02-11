from django.urls import path
from . import views
from django.contrib.staticfiles.urls import static  
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings

app_name = 'api'
urlpatterns = [
    path('userView', views.UserViewSet.as_view(), name='userView'),
    path('signup', views.RegisterView.as_view(), name='signup'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('myaccount', views.MyaccountView.as_view(), name='myaccount'),
    path('myaccount/update', views.MyaccountUpdateView.as_view(), name='update'),
    path('classes/<int:pk>', views.ClassPageView.as_view(), name='classes'),
    path('check', views.AuthCheckView.as_view(), name='check'),
    path('notice/<int:pk>', views.NoticeUpdateView.as_view(), name='notice'),
    path('assignment/<int:pk>', views.AssignmentView.as_view(), name="assignment"),
    path('assignment/submition/<int:pk>', views.AssignmentSubmitionView.as_view(), name="assignmentsubmit"),
    path('timetable', views.TimeTableView.as_view(), name='timetable'),
    path('timetable/delete/<int:pk>', views.TimeTableView.as_view(), name='timedelete'),
    path('team', views.TeamView.as_view(), name='team'),
    path('team/chat/<int:pk>', views.TeamChatView.as_view(), name='teamchat'),
    path('team/file/<int:pk>', views.TeamFileView.as_view(), name='teamfile'),
    path('team/link/<int:pk>', views.TeamLinkView.as_view(), name='teamlink'),
    path('myaccount/like', views.LikeUserView.as_view(), name='like'),
    path('like', views.LikeCategoryView.as_view(), name='likecategory')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
