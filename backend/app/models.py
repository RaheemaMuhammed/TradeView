from django.db import models

# Create your models here.


class Trade(models.Model):
    CURRENCY_CHOICES = [
        ('USDINR', 'USDINR'),
        ('USDJPY', 'USDJPY'),
        ('GBPUSD', 'GBPUSD'),
        ('EURUSD', 'EURUSD'),
    ]

    currency_pair = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    last_value =models.DecimalField(max_digits=20, decimal_places=5, null=True, blank=True)
    change_value=models.DecimalField(max_digits=20, decimal_places=5, null=True, blank=True)
    change_percent=models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    trade_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.currency_pair} - {self.trade_date}"
