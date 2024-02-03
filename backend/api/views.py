import re
from urllib import response
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .permissions import IsAdmin
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserTable, Classes, TimeTable
from .serializers import MyaccountUpdateSerializer, RegisterSerializer, LoginSerializer, UserSerilaizer, ClassesSerializer, MypageDataSerializer, TimeTableSerializer



# ユーザー情報一覧
# api/userView/
class UserViewSet(views.APIView):
    # 認証ユーザーのみ閲覧可能
    permission_classes = (IsAdmin,)
    def get(self, request, *args, **kwargs):
        queryset = UserTable.objects.all()
        serializer_class = UserSerilaizer(data=queryset, many=True)
        serializer_class.is_valid()
        return Response(serializer_class.data)
    
# 登録ビュー
# api/signup/
class RegisterView(views.APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # エラーなし
            try:
                if serializer.validated_data['user_grade'] == 2:
                    is_teacher=True
                else:
                    is_teacher=False

                user = UserTable(
                    user_id=serializer.validated_data['user_id'],
                    user_stdNum=serializer.validated_data['user_stdNum'],
                    user_grade=serializer.validated_data['user_grade'],
                    is_teacher=is_teacher
                )
                user.set_password(serializer.validated_data['password'])
                user.save()
            except:
                # データベースエラー
                return Response({'error':11}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

# ログアウト
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        # try:
        refresh_token = request.COOKIES["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()

        response = Response(data=request.data, status=status.HTTP_205_RESET_CONTENT)
        try:
            response.delete_cookie('user_grade')
        except Exception as e:
            print(e)
            
        return response

        

        
# 自分のアカウント情報を取得
# api/myaccount/
class MyaccountView(views.APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = MypageDataSerializer
    def get(self, request, *args, **kwargs):
        user_id = request.user.user_id
        myuser = UserTable.objects.get(user_id=user_id)  
        user_classes = Classes.objects.filter(class_grade=myuser.user_grade)

        user_serializers = MypageDataSerializer(instance=myuser)
        classes_serializers = ClassesSerializer(instance=user_classes, many=True)
        
        response_data = user_serializers.data
        response_data['user_classes'] = classes_serializers.data

        return Response(response_data)
        
# アカウント情報のアップデート
# api/myaccount/update
class MyaccountUpdateView(views.APIView):
    serializer_class = MyaccountUpdateSerializer
    permission_classes = [IsAuthenticated, IsAdmin, ]

    def patch(self, request, *args, **kwargs):
        if UserTable.objects.filter(user_id=request.user.user_id).exists():
            user = UserTable.objects.filter(user_id=request.user.user_id).first()
            serializer = MyaccountUpdateSerializer(data=request.data, partial=True)
        else:
            return Response({"message": "No User found"}, status=404)
        
        if serializer.is_valid():
            user.user_last = serializer.validated_data['user_last']
            user.user_first = serializer.validated_data['user_first']
            # user.user_icon = request.data['user_icon']
            user.save()
            response_data = {
                "message" : "情報を更新しました",
                "user":{
                    "user_last":user.user_last,
                    "user_first":user.user_first,
                    # "user_icon":user.user_icon
                }
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            Response({"message": "User updation failed", "cause": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# 授業API
class ClassesView(views.APIView):
    serializer_class = ClassesSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        user_grade = request.user.user_grade
        data = Classes.objects.filter(class_grade=user_grade)
        serializer = ClassesSerializer(data=data, many=True)
        serializer.is_valid()

        return Response(serializer.data)
    
class TimeTableView(views.APIView):
    serializer_class = TimeTableSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        timetable = TimeTable.objects.all()
        print(timetable)
        serializer = TimeTableSerializer(instance=timetable, many=True)
        # serializer.is_valid()
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        if UserTable.objects.filter(user_id=request.user.user_id).exists():
            user = UserTable.objects.filter(user_id=request.user.user_id).first()
            serializer = MyaccountUpdateSerializer(data=request.data, partial=True)
        else:
            return Response({"message": "No User found"}, status=404)
        
        if serializer.is_valid():
            user.user_last = serializer.validated_data['user_last']
            user.user_first = serializer.validated_data['user_first']
            # user.user_icon = request.data['user_icon']
            user.save()
            response_data = {
                "message" : "情報を更新しました",
                "user":{
                    "user_last":user.user_last,
                    "user_first":user.user_first,
                    # "user_icon":user.user_icon
                }
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            Response({"message": "User updation failed", "cause": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    
# 課題登録API

# 提出状況登録
            


  
# # ログイン、使わないかもしれない
# # api/login/
# class LoginView(views.APIView):
#     # だれでもOK
#     permission_classes = [AllowAny]
#     serializer_class = LoginSerializer

#     def post(self, request, *args, **kwargs):

#         serializered = LoginSerializer(data=request.data)
#         if serializered.is_valid(raise_exception=True):

#             user = authenticate(
#                 request=request,
#                 user_id=serializered.validated_data["user_id"],
#                 password=serializered.validated_data["password"],
#             )
#             if not user:
#                 return Response({'detail': "パスワードまたはユーザーIDが間違っています。", 'error': 1})
#             else:
#                 login(request, user)
#                 user_id = serializered.validated_data['user_id']
#                 return Response({'detail': "ログインが成功しました。", 'error': 0, 'user_id':user_id})
#         else:
#             return Response({'error': 1}, status=status.HTTP_400_BAD_REQUEST)