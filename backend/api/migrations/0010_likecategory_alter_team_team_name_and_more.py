# Generated by Django 4.2.6 on 2024-01-24 07:51

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_team_alter_linkclasses_link_name_message'),
    ]

    operations = [
        migrations.CreateModel(
            name='LikeCategory',
            fields=[
                ('like_id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True, verbose_name='好きなものID')),
                ('like_name', models.TextField(verbose_name='好きなもの名')),
                ('like_icon', models.ImageField(blank=True, default='icon/like/default_icon.png', null=True, upload_to=api.models.savePath, verbose_name='アイコン')),
            ],
            options={
                'verbose_name': '好きなものカテゴリ',
                'verbose_name_plural': '好きなものカテゴリ',
            },
        ),
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.TextField(default='<function now at 0x7f46ef11e050>', verbose_name='チーム名'),
        ),
        migrations.AlterField(
            model_name='usertable',
            name='user_icon',
            field=models.ImageField(blank=True, default='icon/user/default_icon.png', null=True, upload_to=api.models.savePath, verbose_name='アイコン'),
        ),
        migrations.CreateModel(
            name='LikeUser',
            fields=[
                ('conf_id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True, verbose_name='好きなもの設定ID')),
                ('conf_like', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.likecategory', verbose_name='好きなもの')),
                ('conf_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ユーザー')),
            ],
            options={
                'verbose_name': '好きなもの設定',
                'verbose_name_plural': '好きなもの設定',
            },
        ),
    ]
