from django.urls import path
from .views import *
urlpatterns=[
    path('trade/<int:currency>/',TradeView.as_view())
]