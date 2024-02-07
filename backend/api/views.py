from datetime import datetime, timedelta, timezone
from functools import partial
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from rest_framework.response import Response
from .permissions import IsAdmin
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *
from .serializers import *

from .utils import file

# ユーザー情報一覧
# api/userView/
class UserViewSet(views.APIView):
    # 認証ユーザーのみ閲覧可能
    permission_classes = (IsAdmin,)
    def get(self, request, *args, **kwargs):
        queryset = UserTable.objects.all()
        serializer_class = UserSerilaizer(data=queryset, many=True)
        serializer_class.is_valid()
        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
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
            except Exception as e:
                # データベースエラー
                return Response({'error':e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            return response
        except Exception as e:
            print(e)
            return Response({'error':e}, status=status.HTTP_400_BAD_REQUEST)
            
        

        
# 認証しているかどうかをチェック あとで変えたい
class AuthCheckView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    
    def get(self, request, *args, **kwargs):

        return Response(status=status.HTTP_200_OK)


# 自分のアカウント情報を取得
# マイページTOPから呼び出される
# api/myaccount/
class MyaccountView(views.APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = MypageDataSerializer

    def get(self, request, *args, **kwargs):
        user_id = request.user.user_id
        myuser = UserTable.objects.get(user_id=user_id)
        # 今日の時間割を取得
        day = datetime.now().weekday()

        # 教師なら全て
        if(myuser.is_teacher):
            res = []
            # 1年のデータ
            user_timetable = TimeTable.objects.filter(time_grade=0, time_day=day)
            timetable_serializers = TimeTableSerializer(instance=user_timetable, many=True)
            res.append(timetable_serializers.data)
            # 2年のデータ
            user_timetable = TimeTable.objects.filter(time_grade=1, time_day=day)
            timetable_serializers = TimeTableSerializer(instance=user_timetable, many=True)
            res.append(timetable_serializers.data)

            
        else:
            user_timetable = TimeTable.objects.filter(time_grade=myuser.user_grade, time_day=day)
            timetable_serializers = TimeTableSerializer(instance=user_timetable, many=True)
            res = timetable_serializers.data
        
        notice = Notice.objects.order_by('notice_date').all()[:3]
        notice_classes = NoticeSerializer(instance=notice, many=True)

        user_serializers = MypageDataSerializer(instance=myuser)
        
        
        response_data = user_serializers.data
        response_data['user_classes'] = res
        response_data['user_notice'] = notice_classes.data
        return Response(response_data,status=status.HTTP_200_OK)
        
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


# 授業ぺーじAPI 表示のみ
class ClassPageView(views.APIView):
    serializer_class = ClassPageSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, pk, *args, **kwargs):
        class_id = pk

        class_data = Classes.objects.filter(class_id=class_id)
        if not class_data.exists() or pk == 6:
            return Response({"error": "Not found"},status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = ClassPageSerializer(instance=class_data.first())
            response_data = serializer.data
            return Response(response_data, status=status.HTTP_200_OK)

# おしらせ更新
class NoticeUpdateView(views.APIView):
    serializer_class = NoticeSerializer
    permission_classes = [IsAdmin, ]

    def get(self, request, pk, *args, **kwargs):
        class_model = Classes.objects.filter(class_id=pk)
        if class_model.exists():
            notice = Notice.objects.filter(notice_classes=class_model.first())
            serializer = NoticeSerializer(instance=notice.first())

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, *args, **kwargs):
        class_model = Classes.objects.get(class_id=pk)
        notice = Notice.objects.filter(notice_classes=class_model)
        if notice.exists():
            serializer = NoticeSerializer(instance=notice.first(), data=request.data, partial=True)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()

            return Response({"message" : "情報を更新しました"}, status=status.HTTP_200_OK)
        else:
            Response({"error": "Updation failed", "cause": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# 時間割
class TimeTableView(views.APIView):
    serializer_class = TimeTableSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user_grade = request.user.user_grade
        if user_grade == 2:
            timetable = TimeTable.objects.all()
        else:
            timetable = TimeTable.objects.filter(time_grade=user_grade)

        serializer = TimeTableSerializer(instance=timetable, many=True)
        # serializer.is_valid()
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    # 時間割を登録
    # 教師、管理者のみ操作可能
    # そのコマに授業が存在していたら更新、なかったら新しく登録
    def post(self, request, *args, **kwargs):
        if request.user.is_teacher or request.user.is_superuser:
            time_model = TimeTable.objects.filter(time_grade=request.data['time_grade'], time_day=request.data['time_day'], time_section=request.data['time_section'])
            serializer = TimeTableSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                if time_model.exists():
                    if int(request.data['time_grade']) < 1 and int(request.data['time_day']) < 5 and int(request.data['time_section']) < 6:
                        time_model = time_model.first()
                        class_model = Classes.objects.get(class_id=request.data['class_id'])
                        time_model.time_classes = class_model
                        time_model.save()
                        serializer = TimeTableSerializer(instance=time_model)
                        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                    else:
                        return Response({'error':'不正なデータです'})
                else:
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'権限がありません。'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk, *args, **kwargs):
        delete_obj = TimeTable.objects.filter(time_id=pk)
        if delete_obj.exists():
            delete_obj.first().delete()
            return Response({'message':'削除しました。'}, status=status.HTTP_202_ACCEPTED)
        else:
            
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
    
# 課題API
class AssignmentView(views.APIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk, *args, **kwargs):
        class_model = Classes.objects.filter(class_id=pk)
        user = UserTable.objects.get(user_id=request.user.user_id)
        assignment = Assignment.objects.filter(ast_classes=class_model.first())
        if not class_model.exists() or pk == 6:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = AssignmentSerializer(instance=assignment, many=True)
            for i in range(len(serializer.data)):
                state = assignment[i].state_ast.filter(state_std=user)
                if state.exists():
                    serializer.data[i]['user_state'] = True
                else:
                    serializer.data[i]['user_state'] = False

            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, pk, *args, **kwargs):
        if request.user.is_superuser or request.user.is_teacher:
            serializer = AssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'権限がありません'}, status=status.HTTP_401_UNAUTHORIZED)
        
    def patch(self, request, pk, *args, **kwargs):
        ast_model = Assignment.objects.filter(ast_id=pk)
        if ast_model.exists():
            serializer = AssignmentSerializer(ast_model.first(), data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response({'error':serializer.error}, status=status.HTTP_400_BAD_REQUEST)
        else:

            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, *args, **kwargs):
        ast_model = Assignment.objects.filter(ast_id=pk)
        if ast_model.exists():
            ast_model.first().delete()
            return Response({"message" : "削除しました"}, status=status.HTTP_202_ACCEPTED)
        else:

            return Response({'error':'Not found'}, status=status.HTTP_400_BAD_REQUEST)

# 課題提出API
class AssignmentSubmitionView(views.APIView):
    serializer_class = AssignmentSubmitionSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk, *args, **kwargs):
        # pkは課題のpk
        ast_model = Assignment.objects.filter(ast_id=pk)
        if ast_model.exists():
            user = UserTable.objects.get(user_id=request.user.user_id)
            state_model = AssignmentStatus.objects.filter(state_ast=ast_model.first(), state_std=user)
            serializer = AssignmentSubmitionSerializer(instance=state_model, many=True)
            return Response(serializer.data)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, pk, *args, **kwargs):
        ast_model = Assignment.objects.filter(ast_id=pk)
        if ast_model.exists():
            ast_model = ast_model.first()

            user = UserTable.objects.get(user_id=request.user.user_id)
            state_model = AssignmentStatus.objects.filter(state_ast=ast_model, state_std=user)
    
            if state_model.exists():
                return Response({'error':'既に提出済です。'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(request.FILES['assignment_file'])
                # 存在しなかった=未提出だった場合
                request.data['ast_id'] = pk
                request.data['user_id'] = user.user_id
                request.data['state_flg'] = True
                request.data['state_res'] = request.FILES['assignment_file'].name
                serializer = AssignmentSubmitionSerializer(data=request.data)
                if serializer.is_valid():
                    # 課題名_ユーザー学生番号 という形式で自動保存もできるけどどうでしょうか。
                    if file.mkdirToSavefile(file=request.FILES['assignment_file'], dirname=ast_model.ast_title):
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response({'error':'同じ名前のファイルが存在します。'}, status=status.HTTP_400_BAD_REQUEST)
                else:


                    return Response({'ng':serializer.errors})
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        if not request.user.is_teacher and not request.user.is_superuser:
            return Response({'error':'権限がありません'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            state_model = AssignmentStatus.objects.filter(state_id=pk)
            if state_model.exists():
                state_model = state_model.first()

                if file.deleteFile(dirname=state_model.state_ast.ast_title, filename=state_model.state_res):
                    state_model.delete()
                    return Response({'message':'削除しました'}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'error':'存在しないファイルです'}, status=status.HTTP_400_BAD_REQUEST)
            

class TeamView(views.APIView):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        team_model = Team.objects.all()
        if team_model.exists():
            serializer = TeamSerializer(instance=team_model, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **kwargs):
        team_model = Team.objects.filter(team_name=request.data['team_name'])
        if team_model.exists():
            return Response({'error':f'{request.data["team_name"]}チームはすでに存在します'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = TeamSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TeamChatView(views.APIView):
    serializer_class = TeamChatSerializer
    permission_classes = [IsAuthenticated, ]


    def get(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            team_model = team_model.first()
            message_model = Message.objects.filter(message_team=team_model)
            serializer = TeamChatSerializer(instance=message_model, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
  
    def post(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            serializer = TeamChatSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        message_model = Message.objects.filter(message_id=pk)
        if message_model.exists():
            message_model = message_model.first()
            if (not request.user.is_superuser or not request.user.is_teacher)and(request.user.user_id == message_model.message_user.user_id):
                message_model.delete()
                return Response({'message':'削除しました'}, status=status.HTTP_200_OK)
            else:
                return Response({'error':'権限がありません'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
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