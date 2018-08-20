# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.consumers import ChatConsumer
from django.conf.urls import url
import chat.routing

application = ProtocolTypeRouter({
    'websocket':         URLRouter(
            chat.routing.websocket_urlpatterns
        ),
})