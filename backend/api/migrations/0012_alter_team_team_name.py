# Generated by Django 4.2.6 on 2024-02-01 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_team_team_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.TextField(default='<function now at 0x7fcb9152e050>', verbose_name='チーム名'),
        ),
    ]
