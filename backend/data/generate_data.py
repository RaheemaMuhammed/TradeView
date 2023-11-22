import random
from datetime import datetime, timedelta
from itertools import count
from django.utils import timezone
def generate_dummy_trade_data():
    currencies = ['USDJPY', 'EURUSD', 'GBPUSD', 'EURCAD'] 
    last_value = random.uniform(100, 200)  
    change_value = random.uniform(1, 10) 
    change_percent = random.uniform(0.5, 5) 
    currency_pair = random.choice(currencies)  
    trade_date = timezone.now()
   
    print(trade_date)
    return {
        'currency_pair': currency_pair,
        'last_value': round(last_value, 5),  
        'change_value': round(change_value, 5),
        'change_percent': round(change_percent, 2),
        'trade_date': trade_date.strftime('%Y-%m-%d %H:%M:%S') 
    }
