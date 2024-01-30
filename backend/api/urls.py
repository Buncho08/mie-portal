from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('userView', views.UserViewSet.as_view(), name='userView'),
    path('signup', views.RegisterView.as_view(), name='signup'),
    path('login', views.LoginView.as_view(), name='login'),
    path('myaccount', views.MyaccountView.as_view(), name='myaccount'),
    path('myaccount/update', views.MyaccountUpdateView.as_view(), name='update'),
]
