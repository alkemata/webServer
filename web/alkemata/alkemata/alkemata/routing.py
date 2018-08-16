# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.consumers import ChatConsumer
from django.conf.urls import url

application = ProtocolTypeRouter({
    'websocket':         URLRouter(
            [url(r"^chat/stream/$", ChatConsumer),]
        ),
})