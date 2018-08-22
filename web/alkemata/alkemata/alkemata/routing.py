# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.consumers import ChatConsumer
from django.conf.urls import url
import chat.routing
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter({
    'websocket':       AuthMiddlewareStack(  URLRouter(
            chat.routing.websocket_urlpatterns
        )),
})