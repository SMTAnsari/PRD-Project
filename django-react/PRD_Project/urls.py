from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from App import views
from django.views.generic import TemplateView
from App.views import update_profile_image
from django.conf import settings
from django.conf.urls.static import static



router = routers.DefaultRouter()
router.register(r'update-profile-image', views.update_profile_image, 'App')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    #path('', TemplateView.as_view(template_name='index.html')),
]

# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
