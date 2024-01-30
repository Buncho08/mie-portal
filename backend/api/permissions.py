from rest_framework.permissions import BasePermission 
from .serializers import UserSerilaizer

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        print(request.user.is_teacher)
        return request.user and (request.user.is_superuser or request.user.is_teacher)

