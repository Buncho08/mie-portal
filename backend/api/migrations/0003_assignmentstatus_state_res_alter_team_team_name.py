# Generated by Django 4.2.6 on 2024-02-06 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_team_team_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignmentstatus',
            name='state_res',
            field=models.TextField(blank=True, null=True, verbose_name='提出物'),
        ),
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.TextField(default='<function now at 0x7f1e5e7b6050>', verbose_name='チーム名'),
        ),
    ]
