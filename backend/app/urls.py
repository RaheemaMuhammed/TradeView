from django.urls import path
from .views import *
urlpatterns=[
    path('trade/',TradeView.as_view()),
    path('latest/',LatestTradeView.as_view())
]