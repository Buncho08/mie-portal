
from dataclasses import field
from django.core.validators import RegexValidator
from rest_framework import serializers
from .models import *


    
# ユーザーシリアライザー
class UserSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = ['user_id', 'user_first', 'user_last', 'user_icon', 'user_stdNum', 'user_grade', 'is_teacher']

# 登録シリアライザー
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = ['user_id', 'user_grade', 'user_stdNum', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class LikeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeCategory
        fields = '__all__'

class LikeUserSerializer(serializers.ModelSerializer):
    like_id = serializers.PrimaryKeyRelatedField(queryset=LikeCategory.objects.all(), write_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=UserTable.objects.all(), write_only=True)
    class Meta:
        model = LikeUser
        fields = ['conf_id', 'like_id', 'user_id']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        like_id = validated_data.pop('like_id')

        validated_data['conf_user'] = user_id
        validated_data['conf_like'] = like_id

        conf_model = LikeUser.objects.create(**validated_data)

        return conf_model
    
        #     class_id = validated_data.pop('class_id')
        # validated_data['time_classes'] = class_id      
        # time_model = TimeTable.objects.create(**validated_data)
        # return time_model
# ログインシリアライザー
class LoginSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(
        max_length=12,
        min_length=1,
        validators=[RegexValidator(r'^[a-zA-Z0-9_]*$',)],
        write_only=True
    )
    password = serializers.CharField(
        write_only=True,
        style={'input_type':'password'}
        )
    class Meta:
        model = UserTable
        fields = ["user_id", "password"]

# 登録情報アップデート
class MyaccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = ['user_last', 'user_first', 'user_icon']


# 授業のシリアライザ
class ClassesSerializer(serializers.ModelSerializer):
    # class_teacher = UserSerilaizer()
    # get時は授業担当教師のデータをすべて表示
    class_teacher = UserSerilaizer(read_only=True)
    # postは授業担当教師のprimary keyを指定
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=UserTable.objects.all(), write_only=True)
    class Meta:
        model = Classes
        fields = [
            'class_id',
            'class_grade',
            'class_name',
            'class_teacher',
            'teacher_id'
        ]

# 時間割シリアライザ
class TimeTableSerializer(serializers.ModelSerializer):
    # time_classes = ClassesSerializer()
    # get時はネストされたデータを返す
    time_classes = ClassesSerializer(read_only=True)
    # patchはprimary keyで授業を指定できる
    class_id = serializers.PrimaryKeyRelatedField(queryset=Classes.objects.all(), write_only=True)
    class Meta:
        model = TimeTable
        fields = [
            'time_id',
            'time_grade',
            'time_section',
            'time_day',
            'class_id',
            'time_classes',
        ]
    
    def create(self, validated_data):
        class_id = validated_data.pop('class_id')
        validated_data['time_classes'] = class_id      
        time_model = TimeTable.objects.create(**validated_data)
        return time_model
    

# マイページシリアライザ
class MypageDataSerializer(serializers.ModelSerializer):
    # classes = ClassesSerializer()
    class Meta:
        model = UserTable
        fields = [
            'user_id',
            'user_last',
            'user_first',
            'user_icon',
            'user_stdNum',
            'user_grade'
        ]

# お知らせ
class NoticeSerializer(serializers.ModelSerializer):
    notice_classes = serializers.StringRelatedField()
    class Meta:
        model = Notice
        fields = ['notice_id', 'notice_classes', 'notice_main', 'notice_date']



# 課題
class AssignmentSerializer(serializers.ModelSerializer):
    class_id = serializers.PrimaryKeyRelatedField(queryset=Classes.objects.all(), write_only=True)
    class Meta:
        model = Assignment
        fields = ['ast_id', 'class_id' ,'ast_title', 'ast_disc', 'ast_limit',]
        

    def create(self, validated_data):
        class_id = validated_data.pop('class_id')
        validated_data['ast_classes'] = class_id      
        ast_model = Assignment.objects.create(**validated_data)
        return ast_model

# 課題提出
class AssignmentSubmitionSerializer(serializers.ModelSerializer):
    state_std = UserSerilaizer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=UserTable.objects.all(), write_only=True)
    state_ast = AssignmentSerializer(read_only=True)
    ast_id = serializers.PrimaryKeyRelatedField(queryset=Assignment.objects.all(), write_only=True)
    class Meta: 
        model = AssignmentStatus
        fields = ['state_id', 'state_std', 'state_ast', 'state_res', 'state_flg','user_id', 'ast_id']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        validated_data['state_std'] = user_id
        ast_id = validated_data.pop('ast_id')
        validated_data['state_ast'] = ast_id 
        state_model = AssignmentStatus.objects.create(**validated_data)
        return state_model
    
# クラスページ
class ClassPageSerializer(serializers.ModelSerializer):
    class_teacher = UserSerilaizer(read_only=True)
    notice_classes = NoticeSerializer(many=True, read_only=True)
    notice_id = serializers.PrimaryKeyRelatedField(queryset=Notice.objects.all(), write_only=True)
    class Meta:
        model = Classes
        fields = ['class_id', 'class_teacher','class_grade', 'class_name', 'notice_classes', 'notice_id']

# チーム
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
        
# チームチャット
class TeamChatSerializer(serializers.ModelSerializer):
    message_team = TeamSerializer(write_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)
    message_user = UserSerilaizer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=UserTable.objects.all(), write_only=True)
    message_date = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ['message_id', 'message_team', 'team_id', 'message_user', 'user_id', 'message', 'message_date']

    def get_message_date(self, instance):
        return instance.get_date()
    
    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        team_id = validated_data.pop('team_id')

        validated_data['message_user'] = user_id
        validated_data['message_team'] = team_id

        message_model = Message.objects.create(**validated_data)

        return message_model
    
class TeamFileSerializer(serializers.ModelSerializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)
    file_team = TeamSerializer(write_only=True)
    class Meta:
        model = TeamFile
        fields = ['file_id', 'file_team', 'team_id', 'file_name']

    def create(self, validated_data):
        team_id = validated_data.pop('team_id')

        validated_data['file_team'] = team_id
        validated_data['file_name'] = f"{validated_data['file_team'].team_name}/{validated_data['file_name']}"
        file_model = TeamFile.objects.create(**validated_data)

        return file_model   
    
class TeamLinkSerializer(serializers.ModelSerializer):
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), write_only=True)
    link_team = TeamSerializer(write_only=True)
    class Meta:
        model = TeamLink
        fields = ['link_id', 'link_team', 'team_id', 'link_URL']
    
    def create(self, validated_data):
        team_id = validated_data.pop('team_id')

        validated_data['link_team'] = team_id
        
        link_model = TeamLink.objects.create(**validated_data)

        return link_model   