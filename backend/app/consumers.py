import json
from channels.generic.websocket import AsyncWebsocketConsumer


class TradeConsumer(AsyncWebsocketConsumer):
  

    async def connect(self):
        await self.accept()
       
        await self.channel_layer.group_add(
                'trade_group', self.channel_name
            )
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
                'trade_group', self.channel_name
            )
    

    async def send_trade_update_to_group(self, event):
        trade_data = event['data']
        await self.send(text_data=json.dumps(trade_data))