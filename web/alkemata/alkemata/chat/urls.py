# chat/urls.py
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.chatIndex, name='index'),
        url(r'^Kernel/', views.chatKernel, name='kernel'),
    url(r'^Chat/(?P<room_name>[^/]+)/$', views.chat, name='room'),
]