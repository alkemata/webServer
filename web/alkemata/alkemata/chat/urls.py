# chat/urls.py
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.chatIndex, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.chat, name='room'),
]