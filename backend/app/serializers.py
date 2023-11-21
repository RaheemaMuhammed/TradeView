from rest_framework import serializers

from .models import Trade

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = '__all__'

class PostTradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trade
        fields = ('currency_pair','last_value','change_value','change_percent')