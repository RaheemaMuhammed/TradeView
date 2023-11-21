# Generated by Django 4.1.5 on 2023-11-20 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trade',
            name='currency_pair',
            field=models.CharField(choices=[('USDINR', 'USDINR'), ('USDJPY', 'USDJPY'), ('GBPUSD', 'GBPUSD'), ('EURUSD', 'EURUSD')], max_length=10),
        ),
        migrations.DeleteModel(
            name='CurrencyPair',
        ),
    ]
