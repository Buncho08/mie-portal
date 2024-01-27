# Generated by Django 4.2.6 on 2024-01-24 05:37

import api.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_id', models.CharField(max_length=12, unique=True, validators=[django.core.validators.RegexValidator('^[a-zA-Z0-9_]*$')], verbose_name='ユーザーID')),
                ('user_last', models.TextField(max_length=255, validators=[django.core.validators.MinLengthValidator(1), django.core.validators.MaxLengthValidator(255)], verbose_name='姓')),
                ('user_first', models.TextField(max_length=255, validators=[django.core.validators.MinLengthValidator(1), django.core.validators.MaxLengthValidator(255)], verbose_name='名')),
                ('user_icon', models.ImageField(blank=True, default='icon/default_icon.png', null=True, upload_to=api.models.savePath, verbose_name='アイコン')),
                ('user_stdNum', models.TextField(blank=True, null=True, unique=True, validators=[django.core.validators.MinLengthValidator(9), django.core.validators.MaxLengthValidator(9), django.core.validators.RegexValidator('^[0-9]*$')], verbose_name='学生番号')),
                ('user_grade', models.IntegerField(choices=[(0, '1年'), (1, '2年'), (2, '教師')], default=0, verbose_name='学年')),
                ('is_teacher', models.BooleanField(default=False, verbose_name='教師フラグ')),
                ('date_joined', models.DateField(auto_now_add=True, verbose_name='登録日')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'ユーザー',
                'verbose_name_plural': 'ユーザー',
                'abstract': False,
            },
            managers=[
                ('objects', api.models.MyUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('grade_id', models.IntegerField(choices=[(0, '1年'), (1, '2年')], default=0, primary_key=True, serialize=False, unique=True, verbose_name='学年')),
            ],
            options={
                'verbose_name': '学年',
                'verbose_name_plural': '学年',
            },
        ),
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('class_id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True, verbose_name='授業ID')),
                ('class_name', models.TextField(unique=True, verbose_name='授業名')),
                ('class_grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.grade')),
                ('class_teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': '授業',
                'verbose_name_plural': '授業',
            },
        ),
    ]
