from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Classes, TimeTable, Assignment, AssignmentStatus, Notice, LinkClasses, Team, Message, LikeCategory, LikeUser
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (_("重要な情報の編集"), {"fields": ("user_id", "password")}),
        (_("Personal info"), {"fields": ("user_last", "user_first", "user_grade","user_icon", "user_stdNum")}),
        (_("Permissions"), 
            {
            "fields": (
                "is_active", "is_staff", "is_superuser", "is_teacher"
                )
            }
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    )

    list_display = ("user_id", "user_last", "user_first", "user_grade", "user_first",  "user_icon", "user_stdNum", "is_teacher")

    search_fields = ("user_id", "user_stdNum", "is_teacher")
    filter_horizontal = ("groups", "user_permissions")
    ordering = ("user_grade",)
    list_filter = ("is_teacher", "user_grade")
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("user_id","password1", "password2"),
            },
        ),
    )

CustomUser = get_user_model()
admin.site.register(CustomUser, CustomUserAdmin)


class ClassesAdmin(admin.ModelAdmin):
    list_display = ('class_id', 'class_name', 'class_grade', 'class_teacher')
    ordering = ('class_grade',)

admin.site.register(Classes, ClassesAdmin)

class TimeTableAdmin(admin.ModelAdmin):
    list_display = ('time_id', 'time_classes','time_grade', 'time_section', 'time_day')

admin.site.register(TimeTable, TimeTableAdmin)

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('ast_id', 'ast_classes', 'ast_title', 'ast_disc', 'ast_limit')

admin.site.register(Assignment, AssignmentAdmin)

class AssignmentStatusAdmin(admin.ModelAdmin):
    list_display = ('state_id', 'state_ast', 'state_std', 'state_flg')

admin.site.register(AssignmentStatus, AssignmentStatusAdmin)

class NoticeAdmin(admin.ModelAdmin):
    list_display = ('notice_id', 'notice_classes', 'notice_user', 'notice_main', 'notice_date')

admin.site.register(Notice, NoticeAdmin)

class LinkClassesAdmin(admin.ModelAdmin):
    list_display = ('link_id', 'link_classes', 'link', 'link_name', 'link_date')

admin.site.register(LinkClasses, LinkClassesAdmin)

class TeamAdmin(admin.ModelAdmin):
    list_display = ('team_id', 'team_grade', 'team_name')

admin.site.register(Team, TeamAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('message_id', 'message_team', 'message_user', 'message', 'message_date')

admin.site.register(Message, MessageAdmin)

class LikeCategoryAdmin(admin.ModelAdmin):
    list_display = ('like_id', 'like_name')

admin.site.register(LikeCategory, LikeCategoryAdmin)

class LikeUserAdmin(admin.ModelAdmin):
    list_display = ('conf_id', 'conf_like', 'conf_user')

admin.site.register(LikeUser, LikeUserAdmin)