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
    path('timetable', views.TimeTableView.as_view(), name='timetable'),
    path('check', views.AuthCheckView.as_view(), name='check'),
    path('notice/<int:pk>', views.NoticeUpdateView.as_view(), name='notice'),
    path('assignment/<int:pk>', views.AssignmentView.as_view(), name="assignment"),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
