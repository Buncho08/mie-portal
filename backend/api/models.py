from tabnanny import verbose
from django.utils import timezone
from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinLengthValidator, MaxLengthValidator,RegexValidator
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
import os


def savePath(model, filename):
    ext = filename.split('.')[-1]
    new_name = model.user_id + "_icon"
    # ルートはGomaShop/らしい
    path = f'./icon/user/{new_name}.{ext}'
    os_path = f'{settings.MEDIA_ROOT}/icon/user/{new_name}.{ext}'
    if os.path.exists(os_path):
        os.remove(os_path)

    return path

def saveLikePath(model, filename):
    ext = filename.split('.')[-1]
    new_name = str(model.like_name) + "_icon"
    # ルートはGomaShop/らしい
    path = f'./icon/like/{new_name}.{ext}'
    os_path = f'{settings.MEDIA_ROOT}/icon/like/{new_name}.{ext}'
    if os.path.exists(os_path):
        os.remove(os_path)

    return path

class MyUserManager(BaseUserManager):
    use_in_migrations = True
    def _create_user(self, user_id, password=None, **extra_fields):
            if not user_id:
                raise ValueError('ユーザー名は必須項目です')
            
            user = self.model(
                user_id=user_id,
                # 受け取った値をフィールドにぶち込んでいる extra_fields.get()はフィールドの値を取り出している
                # ないとcreatesuperuserしてもスタッフユーザーにならないです
                is_staff=extra_fields.get("is_staff"),
                is_superuser=extra_fields.get("is_superuser")
            )   
            user.set_password(password)
            user.save(using=self._db)
            print('success!')
            return user
            # returnされたらSuperuser created successfully.が表示される
    
    def create_user(self, user_id=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        # ↑指定しない限りdefaultでこれが入るという指定
        return self._create_user(user_id, password, **extra_fields)

    def create_superuser(self, user_id=None, password=None, **extra_fields):
        # ここはis_staffとかのデフォルト値をセットしているだけ
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        # createsuperuserの入力がすべて終わったらprint()された
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        # 例外処理、実際になることはない
        # extra_fields.setdefault("is_staff", Flase)ってすると出てきます（ValueError("")の文字変えると分かると思う
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(user_id, password, **extra_fields)
    

class UserTable(AbstractBaseUser, PermissionsMixin):
    GRADE_CHOICES = [
        (0, '1年'),
        (1, '2年'),
        (2, '教師')
    ]
    # ユーザーID
    user_id = models.CharField(primary_key=True, verbose_name="ユーザーID", max_length=12, unique=True, validators=[RegexValidator(r'^[a-zA-Z0-9_]*$',)])
    # ユーザーの姓
    user_last = models.TextField(verbose_name='姓', max_length=255, validators=[MinLengthValidator(1), MaxLengthValidator(255)])
    # ユーザーの名
    user_first = models.TextField(verbose_name='名', max_length=255, validators=[MinLengthValidator(1), MaxLengthValidator(255)])
    # アイコン
    user_icon = models.ImageField(verbose_name="アイコン", default='icon/user/default_icon.png', upload_to=savePath, null=True, blank=True)
    # 学生番号
    user_stdNum = models.TextField(verbose_name='学生番号', null=True, blank=True, unique=True, validators=[MinLengthValidator(9), MaxLengthValidator(9), RegexValidator(r'^[0-9]*$')])
    # 学年
    user_grade = models.IntegerField(verbose_name='学年', choices=GRADE_CHOICES, default=0)
    # 教師フラグ
    is_teacher = models.BooleanField(verbose_name='教師フラグ', default=False)
    # 登録日
    date_joined = models.DateField(verbose_name="登録日", auto_now_add=True)

    # アクティブユーザーか, 運用停止 -> False
    is_active = models.BooleanField(default=True)
    # adminサイトにははいれる
    is_staff = models.BooleanField(default=False)
    # admin権限
    is_superuser = models.BooleanField(default=False)

    # ユーザーマネージャー
    objects = MyUserManager()

    USERNAME_FIELD = 'user_id'

    class Meta:
        verbose_name = _('ユーザー')
        verbose_name_plural = _('ユーザー')
        abstract = False

    def __str__(self):
        return f'{self.user_stdNum} : {self.user_last} {self.user_first}さん'

    def get_full_name(self):
        full_name = '%s %s' % (self.user_last, self.user_first)
        return full_name.strip()

class Classes(models.Model):
    class Meta:
        verbose_name = _('授業')
        verbose_name_plural = _('授業')

    GRADE_CHOICES = [
        (0, '1年'),
        (1, '2年'),
    ]
    class_id = models.AutoField(verbose_name='授業ID', primary_key=True, editable=False, unique=True)
    class_teacher = models.ForeignKey(verbose_name='教師', to=UserTable, on_delete=models.CASCADE, related_name="class_teacher")
    class_grade = models.IntegerField(verbose_name='学年', choices=GRADE_CHOICES, default=0)
    class_name = models.TextField(verbose_name='授業名', unique=True)

    def __str__(self):
        return f'{self.class_name} : 教員:{self.class_teacher.get_full_name()}'
    
    def save(self, *args, **kwargs):
        # 教員が選択されたかどうかを確認
        is_teacher = self.class_teacher.is_teacher
        if is_teacher:
            super().save(*args, **kwargs)
            s = Notice.objects.get_or_create(notice_classes=self)
        else:
            raise ValidationError('教員を選択してください')


def get_sentinel_classes():
    return Classes.objects.get_or_create(class_name='blank',class_grade=3, class_teacher=UserTable.objects.get(user_id='blankUser'))[0]

class TimeTable(models.Model):
    class Meta:
        verbose_name = _('時間割')
        verbose_name_plural = _('時間割')

    TIME_CHOICES = [
        (0, '1限'),
        (1, '2限'),
        (2, '3限'),
        (3, '4限'),
        (4, '5限'),
        (5, '6限'),
    ]

    DAY_CHOICES = [
        (0, '月曜日'),
        (1, '火曜日'),
        (2, '水曜日'),
        (3, '木曜日'),
        (4, '金曜日'),
    ]


    GRADE_CHOICES = [
        (0, '1年'),
        (1, '2年'),
    ]

    time_id = models.AutoField(verbose_name='時間割ID', primary_key=True, editable=False, unique=True)
    time_classes = models.ForeignKey(verbose_name='授業', to=Classes, on_delete=models.CASCADE, related_name='time_classes')
    time_grade = models.IntegerField(verbose_name='学年', default=0, choices=GRADE_CHOICES)
    time_section = models.IntegerField(verbose_name='コマ', default=0, choices=TIME_CHOICES)
    time_day = models.IntegerField(verbose_name='曜日', default=0, choices=DAY_CHOICES)

    def __str__(self):
        return f'{self.GRADE_CHOICES[self.time_grade][1]} : {self.DAY_CHOICES[self.time_day][1]} {self.TIME_CHOICES[self.time_section][1]} : {self.time_classes.class_name}'


class Assignment(models.Model):
    class Meta:
        verbose_name = _('課題')
        verbose_name_plural = _('課題')

    ast_id = models.AutoField(verbose_name='課題ID', unique=True, primary_key=True, editable=False)
    ast_classes = models.ForeignKey(verbose_name='授業', to=Classes, on_delete=models.CASCADE, related_name='ast_classes')
    ast_title = models.TextField(verbose_name='課題名', blank=True, null=True)
    ast_disc = models.TextField(verbose_name='課題説明', blank=True, null=True)
    ast_limit = models.DateField(verbose_name='期限', default=timezone.now)


class AssignmentStatus(models.Model):
    class Meta:
        verbose_name = _('提出状況')
        verbose_name_plural = _('提出状況')

    state_id = models.AutoField(verbose_name='提出状況ID', unique=True, primary_key=True, editable=False)
    state_ast = models.ForeignKey(verbose_name='課題', to=Assignment, on_delete=models.CASCADE, related_name='state_ast')
    state_std = models.ForeignKey(verbose_name='ユーザー', to=UserTable, on_delete=models.CASCADE, related_name='state_std')
    state_flg = models.BooleanField(verbose_name='提出状況', default=False)
    state_res = models.TextField(verbose_name='提出物', blank=True, null=True)

class Notice(models.Model):
    class Meta:
        verbose_name = _('お知らせ')
        verbose_name_plural = _('お知らせ')

    notice_id = models.AutoField(verbose_name='お知らせID', unique=True, primary_key=True, editable=False)
    notice_classes = models.ForeignKey(verbose_name='授業', to=Classes, on_delete=models.CASCADE, related_name='notice_classes')
    notice_user = models.ForeignKey(verbose_name='更新者', to=UserTable,blank=True, null=True, on_delete=models.CASCADE, related_name='notice_user')
    notice_main = models.TextField(verbose_name='本文', max_length=2048, blank=True, null=True)
    notice_date = models.DateField(verbose_name='更新日時', auto_now=True)



class LinkClasses(models.Model):
    class Meta:
        verbose_name = _('リンク')
        verbose_name_plural = _('リンク')
    
    link_id = models.AutoField(verbose_name='リンクID', unique=True, primary_key=True, editable=False)
    link_classes = models.ForeignKey(verbose_name='授業', to=Classes, on_delete=models.CASCADE, related_name='link_classes')
    link = models.TextField(verbose_name='URL', default='https://yahoo.co.jp', max_length=500)
    link_name = models.TextField(verbose_name='リンク名', default='')
    link_date = models.DateField(verbose_name='作成日時', auto_now_add=True)
    

class Team(models.Model):
    class Meta:
        verbose_name = _('チーム')
        verbose_name_plural = _('チーム')

    GRADE_CHOICES = [
        (0, '1年'),
        (1, '2年'),
    ]
    team_id = models.AutoField(verbose_name='チームID', unique=True, primary_key=True, editable=False)
    team_grade = models.IntegerField(verbose_name='学年', choices=GRADE_CHOICES, default=0)
    team_name = models.TextField(verbose_name='チーム名', default=f'{datetime.now().date()}')

class Message(models.Model):
    class Meta:
        verbose_name = _('メッセージ')
        verbose_name_plural = _('メッセージ')

    message_id = models.AutoField(verbose_name='メッセージID', unique=True, primary_key=True, editable=False)
    message_team = models.ForeignKey(verbose_name='チーム', to=Team, on_delete=models.CASCADE, related_name='message_team')
    message_user = models.ForeignKey(verbose_name='ユーザー', to=UserTable, on_delete=models.CASCADE, related_name='message_user')
    message = models.TextField(verbose_name='本文')
    message_date = models.DateTimeField(verbose_name='投稿日時', auto_now_add=True)

    def get_date(self):
        date = list(str(self.message_date).split(' '))
        day = list(date[0].split('-'))
        time = list(date[1].split('.'))[0].split(':')
        
        return f'{day[0]}年{day[1]}月{day[2]}日 {time[0]}時{time[1]}分'
    
class TeamFile(models.Model):
    class Meta:
        verbose_name = _('チームファイル')
        verbose_name_plural = _('チームファイル')
    
    file_id = models.AutoField(verbose_name='チームファイルID', unique=True, primary_key=True, editable=False)
    file_team = models.ForeignKey(verbose_name='チーム', to=Team, on_delete=models.CASCADE, related_name='file_team')
    file_name = models.TextField(verbose_name='ファイル名')

class TeamLink(models.Model):
    class Meta:
        verbose_name = _('チームリンク')
        verbose_name_plural = _('チームリンク')

    link_id = models.AutoField(verbose_name='チームリンクID', unique=True, primary_key=True, editable=False)
    link_team = models.ForeignKey(verbose_name='チーム', to=Team, on_delete=models.CASCADE, related_name='link_team')
    link_URL = models.TextField(verbose_name='リンク')

class LikeCategory(models.Model):
    class Meta:
        verbose_name = _('好きなものカテゴリ')
        verbose_name_plural = _('好きなものカテゴリ')

    CATEGORY_CHOICES = [
        (0, 'ざっくり'),
        (1, 'ゲーム'),
        (2, '趣味'),
        (3, 'プログラミング'),
        (4, 'いきもの')
    ]
    
    like_id = models.AutoField(verbose_name='好きなものID', unique=True, primary_key=True, editable=False)
    like_name = models.TextField(verbose_name='好きなもの名')
    like_category = models.IntegerField(verbose_name='好きなものカテゴリ', choices=CATEGORY_CHOICES, default=0)
    like_icon = models.ImageField(verbose_name="アイコン", default='icon/like/default_icon.png', upload_to=saveLikePath, null=True, blank=True)

class LikeUser(models.Model):
    class Meta:
        verbose_name = _('好きなもの設定')
        verbose_name_plural = _('好きなもの設定')
    
    conf_id = models.AutoField(verbose_name='好きなもの設定ID', unique=True, primary_key=True, editable=False)
    conf_like = models.ForeignKey(verbose_name='好きなもの', to=LikeCategory, on_delete=models.CASCADE, related_name='conf_like')
    conf_user = models.ForeignKey(verbose_name='ユーザー', to=UserTable, on_delete=models.CASCADE, related_name='conf_user')