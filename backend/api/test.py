from api.models import LikeCategory

user = LikeCategory.objects.all()

for item in user:
    icon = item.like_icon.name.split('.')[0]
    item.like_icon = f'{icon}.webp'
    item.save()