from django.urls import path
from .consumers import TradeConsumer
websocket_urlpatterns=[
    path('ws/new_trade/', TradeConsumer.as_asgi()),

]