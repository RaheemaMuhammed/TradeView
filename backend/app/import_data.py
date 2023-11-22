import csv
from datetime import datetime
from app.models import Trade
import os
import pytz

currency_files = ['data/eurcad.csv', 'data/usdjpy.csv', 'data/gbpusd.csv', 'data/eurusd.csv']
max_rows = 10  
data = [
    'EURCAD Historical Data',
    'USDJPY Historical Data',
    'GBPUSD Historical Data',
    'EURUSD Historical Data',
]
i=0
for file_path in currency_files:
    rows_added = 0
    
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        headers = next(reader)  
        for row in reader:
            if rows_added >= max_rows:
                break
            
            # csv to model field
           
            currency_pair = os.path.basename(file_path).split('.')[0].upper()
            date_from_csv = datetime.strptime(row[data[i]], '%m/%d/%Y %H:%M')
            trade_date=pytz.utc.localize(date_from_csv)


            close_price = float(row[None][3])
            change_pips = float(row[None][4])
            change_percent = float(row[None][5])            
            # saving to databse
            Trade.objects.create(
                currency_pair=currency_pair,
                last_value=close_price,
                change_value=change_pips,
                change_percent=change_percent,
                trade_date=trade_date,
            )
            
            rows_added += 1
        i+=1
