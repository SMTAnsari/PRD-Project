from django.db import models

class UserProfile(models.Model):
    profile_image = models.ImageField(upload_to='profile_images', blank=True)

    def __str__(self):
        return f"Profile {self.pk}"
