# signals.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Trade
import json

@receiver(post_save, sender=Trade)
def send_trade_update_to_frontend(sender, instance, created, **kwargs):
        
        print('hello from signal')
        # Get the newly created trade instance and serialize it
        serialized_trade = {
            'currency_pair': instance.currency_pair,
            'last_value': str(instance.last_value),
            'change_value': str(instance.change_value),
            'change_percent': str(instance.change_percent),
            'trade_date': instance.trade_date.isoformat()  # Convert to ISO format for better compatibility
        }
       

        # Send the data to the frontend using WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'trade_group', 
            {
                'type': 'send_trade_update_to_group',
                'data': json.dumps(serialized_trade)
            }
        )
       