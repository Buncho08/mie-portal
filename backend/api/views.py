from datetime import datetime, timedelta, timezone
from functools import partial
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from rest_framework.response import Response
from .permissions import IsAdmin
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from .models import *
from .serializers import *

from .utils import file

# ユーザー情報一覧
# api/userView/
class UserViewSet(views.APIView):
    permission_classes = [IsAuthenticated, ]
    def get(self, request, *args, **kwargs):
        first = UserTable.objects.filter(user_grade=0)
        first = UserSerilaizer(instance=first, many=True)
        second = UserTable.objects.filter(user_grade=1)
        second = UserSerilaizer(instance=second, many=True)
        teacher = UserTable.objects.filter(user_grade=2)
        teacher = UserSerilaizer(instance=teacher, many=True)
        res = {
            'first':first.data,
            'second':second.data,
            'teacher':teacher.data
        }
        # serializer_class = UserSerilaizer(instance=queryset, many=True)
        return Response(res, status=status.HTTP_200_OK)
    
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

class MyaccountView(views.APIView):
    serializer_class = UserSerilaizer
    permission_classes = [IsAuthenticated, ]
    def get(self, request, *args, **kwargs):
        user = UserTable.objects.get(user_id=request.user.user_id)
        serializer = UserSerilaizer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# 自分のアカウント情報を取得
# マイページTOPから呼び出される
# api/myaccount/
class MyPageView(views.APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = MypageDataSerializer

    def get(self, request, *args, **kwargs):
        user_id = request.user.user_id
        myuser = UserTable.objects.get(user_id=user_id)
        # 今日の時間割を取得
        day = datetime.now().weekday()
        response_data = {}
        # 教師なら1, 2年のデータを取得
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
            notsubmissions = []
        else:
            user_timetable = TimeTable.objects.filter(time_grade=myuser.user_grade, time_day=day)
            timetable_serializers = TimeTableSerializer(instance=user_timetable, many=True)
            res = timetable_serializers.data
            notsubmissions = NotSubmissionsView.get(self, request).data


        notice = Notice.objects.order_by('notice_date').filter(~Q(notice_main=None))[:3]
        notice_classes = NoticeSerializer(instance=notice, many=True)

        response_data['user_classes'] = res
        response_data['user_notice'] = notice_classes.data
        response_data['user_notsubmissions'] = notsubmissions

        return Response(response_data,status=status.HTTP_200_OK)
    
# すきなものカテゴリビュー
class LikeCategoryView(views.APIView):
    serializer_class = LikeCategorySerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        likecategory = LikeCategory.objects.all()
        serializer = LikeCategorySerializer(instance=likecategory, many=True)

        return Response(serializer.data)

# マイページすきなもの設定ビュー
class MypageSettingView(views.APIView):
    serializer_class = MypageSettingSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        like_ctg = LikeCategory.objects.all()
        # if 'user' in request.GET:
        #     user = UserTable.objects.get(user_id=request.GET['user'])
        #     serializer = MypageSettingSerializer(instance=like_ctg, many=True, user=user)
        # else:
        user = UserTable.objects.get(user_id=request.user.user_id)
        serializer = MypageSettingSerializer(instance=like_ctg, many=True, user=user)
        return Response(serializer.data, status.HTTP_200_OK)


# ユーザーのすきなもの表示
class LikeUserView(views.APIView):
    serializer_class = LikeUserSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        if 'user' in request.GET:
            user = UserTable.objects.get(user_id=request.GET['user'])
        else:
            user = UserTable.objects.get(user_id=request.user.user_id)

        conf_model = LikeUser.objects.filter(conf_user=user)
        serializer = LikeUserSerializer(instance=conf_model, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = LikeUserSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Not found"},status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        data = LikeUser.objects.filter(conf_id=pk)
        if data.exists():
            data.first().delete()
            return Response({'message':'削除しました。'}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)


# アカウント情報のアップデート
# api/myaccount/update
class MyaccountUpdateView(views.APIView):
    serializer_class = MyaccountUpdateSerializer
    permission_classes = [IsAuthenticated, ]

    def patch(self, request, *args, **kwargs):
        if UserTable.objects.filter(user_id=request.user.user_id).exists():
            user = UserTable.objects.filter(user_id=request.user.user_id).first()
            serializer = MyaccountUpdateSerializer(data=request.data, partial=True)
        else:
            return Response({"message": "No User found"}, status=404)
        
        if serializer.is_valid():
            if 'user_icon' in request.FILES:
                user.user_icon = request.FILES['user_icon']
            else:
                user.user_icon = 'icon/user/default_icon.webp'
            
            user.user_last = serializer.validated_data['user_last']
            user.user_first = serializer.validated_data['user_first']
            user.save()
            response_data = {
                "user":{
                    "user_last":user.user_last,
                    "user_first":user.user_first,
                    "user_icon":user.user_icon.name
                }
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"message": "User updation failed", "cause": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


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

# 今日の時間割
class TodayTimeTableView(views.APIView):
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


        return Response(res,status=status.HTTP_200_OK)
    

# 時間割
class TimeTableView(views.APIView):
    serializer_class = TimeTableSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user_grade = request.user.user_grade
        daydate = ['月', '火', '水', '木', '金']
        table = [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ]
        grade = ['first', 'second']
        res = {}
        if user_grade == 2:
            for i in range(2):
                obj = list(TimeTable.objects.order_by('time_day', 'time_section').filter(time_grade=i).values())
                j = 0
                day = 0
                time = 0
                table = [
                    ['', '', '', '', ''],
                    ['', '', '', '', ''],
                    ['', '', '', '', ''],
                    ['', '', '', '', ''],
                    ['', '', '', '', ''],
                    ['', '', '', '', ''],
                ]
                while j < len(obj):
                    
                    if day > 4:
                        day = 0
                        time += 1

                    if time > 5:
                        time = 0
                

                    if obj[j]['time_day'] == day and obj[j]['time_section'] == time:
                        obj[j]['time_classes_id'] = Classes.objects.values().get(class_id=obj[j]['time_classes_id'])
                        table[time][day] = obj[j]
                        j += 1
                        

                    day += 1
                res[grade[i]] = table

            timetable = res
        else:
            obj = list(TimeTable.objects.order_by('time_day', 'time_section').filter(time_grade=request.user.user_grade).values())
            j = 0
            day = 0
            time = 0
            while j != len(obj):
                if day > 4:
                    day = 0
                    time += 1

                if time > 5:
                    time = 0

                if obj[j]['time_day'] == day and obj[j]['time_section'] == time:
                    obj[j]['time_classes_id'] = Classes.objects.values().get(class_id=obj[j]['time_classes_id'])
                    table[time][day] = obj[j]
                    j += 1
                
                day += 1
                
            res[grade[request.user.user_grade]] = table
            timetable = res

        return Response(timetable, status=status.HTTP_200_OK)
    
    # 時間割を登録
    # 教師、管理者のみ操作可能
    # そのコマに授業が存在していたら更新、なかったら新しく登録
    def post(self, request, *args, **kwargs):
        if request.user.is_teacher or request.user.is_superuser:
            time_model = TimeTable.objects.filter(time_grade=request.data['time_grade'], time_day=request.data['time_day'], time_section=request.data['time_section'])
            serializer = TimeTableSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                if time_model.exists():
                    if int(request.data['time_grade']) < 2 and int(request.data['time_day']) < 5 and int(request.data['time_section']) < 6:
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
    
    def delete(self, request, *args, **kwargs):
        delete_obj = TimeTable.objects.filter(time_grade=request.data['time_grade'], time_day=request.data['time_day'], time_section=request.data['time_section'])
        if delete_obj.exists():
            delete_obj.first().delete()
            return Response({'message':'削除しました。'}, status=status.HTTP_202_ACCEPTED)
        else:
            
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)

# 授業編集ぺーじ用の全授業いちらん
class ClassesView(views.APIView):
    serializer_class = ClassesSerializer
    permission_classes = [IsAdmin, ]
    def get(self, request, *args, **kwargs):
        first = Classes.objects.filter(class_grade=0)
        first_serializer = ClassesSerializer(instance=first, many=True)
        second = Classes.objects.filter(class_grade=1)
        second_serializer = ClassesSerializer(instance=second, many=True)
        res = {}
        res['first'] = first_serializer.data
        res['second'] = second_serializer.data
        return Response(res, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ClassesSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            print(serializer.validated_data['class_name'])
            if file.mkdir(dirname=serializer.validated_data['class_name'], ctg='assignments'):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error':'既に存在する授業名です'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'既に存在する授業名です'}, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, pk, *args, **kwargs):
        class_model = Classes.objects.filter(class_id=pk)
        if class_model.exists():
            serializer = ClassesSerializer(class_model.first(), data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response({'error':serializer.error}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, *args, **kwargs):
        class_model = Classes.objects.filter(class_id=pk)
        if class_model.exists():

            file.deleteDir(dirname=class_model.first().class_name, ctg='assignments')
            class_model.first().delete()
            return Response({"message" : "削除しました"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)


# 先生のみ、自分の授業いちらん
class GetMyClassesView(views.APIView):
    serializer_class = ClassesSerializer
    permission_classes = [IsAdmin, ]
    def get(self, request, *args, **kwargs):
        user = UserTable.objects.get(user_id=request.user.user_id)
        classes = Classes.objects.filter(class_teacher=user)
        serializer = ClassesSerializer(instance=classes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# 先生のみ、提出済の課題一覧
class GetAssignmentsView(views.APIView):
    permission_classes = [IsAdmin, ]
    def get(self, request, pk, *args, **kwargs):
        # pkは課題id
        assignments = Assignment.objects.filter(ast_id=pk)
        if assignments.exists():
            assignments = assignments.first()   
            state = AssignmentStatus.objects.filter(state_ast=assignments)
            serializer = AssignmentStatusSerializer(instance=state, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
    
# 先生一覧、授業設定時に使える
class GetTeacherView(views.APIView):
    permission_classes = [IsAdmin, ]
    serializer_class = UserSerilaizer
    def get(self, request, *args, **kwargs):
        teacher = UserTable.objects.filter(user_grade=2)
        serializer = UserSerilaizer(instance=teacher, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
                class_name = Classes.objects.get(class_id=pk).class_name
                dirname = f"{class_name}/{serializer.validated_data['ast_title']}"
                if file.mkdir(dirname=dirname, ctg='assignments'):
                    serializer.save()
                else:
                    return Response({'error':'すでに存在している名前です。'})
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
                dirname = f'{ast_model.first().ast_classes.class_name}/{request.data["ast_title"]}'
                file.renameDir(dirname=dirname, oldname=ast_model.first().ast_title, ctg='assignments')
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
            dirname = f'{ast_model.first().ast_classes.class_name}/{ast_model.first().ast_title}'
            if file.deleteDir(dirname=dirname,ctg='assignments'):
                ast_model.first().delete()
                return Response({"message" : "削除しました"}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'error':'Not found'}, status=status.HTTP_400_BAD_REQUEST)
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
                request.data['state_res'] = f"{user.user_stdNum}_{ast_model.ast_title}.{request.FILES['assignment_file'].name.split('.')[-1]}"
                serializer = AssignmentSubmitionSerializer(data=request.data)
                if serializer.is_valid():
                    dirname = f'{ast_model.ast_classes.class_name}/{ast_model.ast_title}'
                    if file.mkdirToSavefile(file=request.FILES['assignment_file'], name=f"{user.user_stdNum}_{ast_model.ast_title}.{request.FILES['assignment_file'].name.split('.')[-1]}",dirname=dirname, ctg='assignments'):
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
                dirname = f'{state_model.state_ast.ast_classes.class_name}/{state_model.state_ast.ast_title}'
                if file.deleteFile(dirname=dirname, filename=state_model.state_res, ctg='assignments'):
                    state_model.delete()
                    return Response({'message':'削除しました'}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({'error':'存在しないファイルです'}, status=status.HTTP_400_BAD_REQUEST)

# 未提出の課題を返す
class NotSubmissionsView(views.APIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = UserTable.objects.get(user_id=request.user.user_id)
        assignment = Assignment.objects.all()
        serializer = AssignmentSerializer(instance=assignment, many=True)
        res = []
        for i in range(len(serializer.data)):
            state = assignment[i].state_ast.filter(state_std=user)
            if not state.exists():
                res.append(serializer.data[i])

        return Response(res, status=status.HTTP_200_OK)

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
                if file.mkdir(dirname=serializer.validated_data['team_name'], ctg='team'):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error':'すでに存在するチーム名です'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            serializer = TeamSerializer(team_model.first(), data=request.data, partial=True)
            if serializer.is_valid():
                dirname = f'{request.data["team_name"]}'
                if file.renameDir(dirname=dirname, oldname=team_model.first().team_name, ctg='team'):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'error':'同じ名前のチームが存在しています。'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(serializer.errors)
                return Response({'error':serializer.error}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        
# メッセージとチームページ情報API切り分けたい

class TeamChatView(views.APIView):
    serializer_class = TeamChatSerializer
    permission_classes = [IsAuthenticated, ]


    def get(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            team_model = team_model.first()
            team_serializer = TeamSerializer(instance=team_model)
            message_model = Message.objects.filter(message_team=team_model)
            serializer = TeamChatSerializer(instance=message_model, many=True)
            res = {
                'team_id':team_model.team_id,
                'team_name':team_model.team_name,
                'team_message':serializer.data,
                'team_admin':team_serializer.data['team_admin']
            }
            return Response(res, status=status.HTTP_200_OK)
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
        
class TeamFileView(views.APIView):
    serializer_class = TeamFileSerializer
    permission_classes = [IsAuthenticated,]
    def get(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            team_model = team_model.first()
            file_model = TeamFile.objects.filter(file_team=team_model)
            serializer = TeamFileSerializer(instance=file_model, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            team_model = team_model.first()
            file_model = TeamFile.objects.filter(file_team=team_model)
            serializer = TeamFileSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                if file.mkdirToSavefile(dirname=team_model.team_name, file=request.FILES['file_obj'], ctg='team', name=request.data['file_name']):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error':'すでに存在するファイル名です'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, *args, **kwargs):
        file_model = TeamFile.objects.filter(file_id=pk)
        if file_model.exists():
            file_model = file_model.first()

            if file.deleteFile(dirname=file_model.file_team.team_name, filename=file_model.file_name.split('/')[1], ctg='team'):
                file_model.delete()
                return Response({'message':'削除しました'}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'error':'存在しないファイルです'}, status=status.HTTP_400_BAD_REQUEST)  

class TeamLinkView(views.APIView):
    serializer_class = TeamLinkSerializer
    permission_classes = [IsAuthenticated, ]
    def get(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            team_model = team_model.first()
            link_model = TeamLink.objects.filter(link_team=team_model)
            serializer = TeamLinkSerializer(instance=link_model, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, pk, *args, **kwargs):
        team_model = Team.objects.filter(team_id=pk)
        if team_model.exists():
            serializer = TeamLinkSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'not found'}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, *args, **kwargs):
        link_model = TeamLink.objects.filter(link_id=pk)
        if link_model.exists():
            link_model.first().delete()
            return Response({'message':'削除しました'}, status=status.HTTP_202_ACCEPTED)
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