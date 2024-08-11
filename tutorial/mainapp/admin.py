from django.contrib import admin

# Register your models here.
from .models import Note, UserInfo

admin.site.register(Note)
admin.site.register(UserInfo)
