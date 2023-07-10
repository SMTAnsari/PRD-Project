from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('pk', 'profile_image')

admin.site.register(UserProfile, UserProfileAdmin)
