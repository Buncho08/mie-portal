from django.core.validators import RegexValidator
from rest_framework import serializers
from .models import UserTable


    
# ユーザーシリアライザー
class UserSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = '__all__'

# 登録シリアライザー
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = ['user_id', 'user_grade', 'user_stdNum', 'password']
        extra_kwargs = {'password': {'write_only': True}}

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

    
        