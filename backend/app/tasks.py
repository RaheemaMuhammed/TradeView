from celery import Celery
from .models import Trade
from data.generate_data import generate_dummy_trade_data
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
app = Celery('backend')

@app.task
def send_trade_data():
    print('helloo')
    dummy_data = generate_dummy_trade_data()

    Trade.objects.create(
            currency_pair=dummy_data['currency_pair'],
            last_value=dummy_data['last_value'],
            change_value=dummy_data['change_value'],
            change_percent=dummy_data['change_percent'],
            trade_date=dummy_data['trade_date']
    )

    channel_layer=get_channel_layer()

    async_to_sync(channel_layer.group_send)(
                                'trade_group',
                                {
                                    "type":"send_trade_update_to_group",
                                    'data': dummy_data
                                },
                            )
    print('Hello from send_trade_data!')

# celery -A backend worker -l info -P gevent
# celery -A backend beat -l info