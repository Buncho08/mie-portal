# Generated by Django 4.2.6 on 2024-01-24 06:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_assignment_assignmentstatus_timetable_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='ast_limit',
            field=models.DateField(default=django.utils.timezone.now, null=True, verbose_name='期限'),
        ),
    ]
