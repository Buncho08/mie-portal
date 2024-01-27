from dataclasses import field
from django import forms
from .models import UserTable, Classes, TimeTable, Assignment, AssignmentStatus, Notice, LinkClasses, Team, Message, LikeCategory, LikeUser


class ClassesRegister(forms.ModelForm):

    class_teacher = forms.ModelChoiceField(queryset=UserTable.objects.filter(is_teacher=True))

    class Meta:
        model = Classes
        fields = []