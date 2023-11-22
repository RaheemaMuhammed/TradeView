from rest_framework.views import APIView
from .serializers import *
from .consumers import TradeConsumer
from .models import *
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models import Max

from rest_framework.response import Response
# Create your views here.
class TradeView(APIView):
    def get(self,request):
        try:
            print(request)
            currency=request.GET.get('currency')
            trades=Trade.objects.filter(currency_pair=currency).order_by('trade_date')
            serializers=TradeSerializer(trades,many=True)
            return Response({'payload':serializers.data,'status':200,'message':'OK'})
        except Exception as e:
            return Response({'error':str(e),'status':404})

    def post(self,request):
        try:
            data=request.data
            serializer=TradeSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                
                channel_layer=get_channel_layer()

                async_to_sync(channel_layer.group_send)(
                             'trade_group',
                             {
                                  "type":"send_trade_update_to_group",
                                  'data': serializer.data
            
                             },
                        )

                return Response({'status':201,'message':'Data added'})
            else:
                return Response({'status':400,'message':'Invalid Data','error':serializer.errors})
        except Exception as e:
            return Response({'status':400,'message':'something went wrong','error':str(e)})

    def patch(self,request):
        try:
            data=request.data
            id=data['id']
            trade=Trade.objects.get(id=id)
            serializer=TradeSerializer(instance=trade,data=data,partial=True)
            if serializer.is_valid():
                serializer.save()
                channel_layer=get_channel_layer()

                async_to_sync(channel_layer.group_send)(
                             'trade_group',
                             {
                                  "type":"send_trade_update_to_group",
                                  'data': serializer.data
            
                             },
                        ) 
                return Response({'status':200,'message':'Updated Successfully'})
            else:
                return Response({'status':400,'error':serializer.errors,'message':'Invalid Data'})
            
        except Exception as e:
            return Response({'status':400,'error':str(e),'message':'Something Went Wrong'})
    
    def delete(self,request):
        try:
            id=request.GET.get('id')
            trade=Trade.objects.get(id=id)
            channel_layer=get_channel_layer()

            async_to_sync(channel_layer.group_send)(
                             'trade_group',
                             {
                                  "type":"send_trade_update_to_group",
                                  'data': ''
            
                             },
                        ) 
            
            trade.delete()
            return Response({'status':200,'message':"OK"})
        except Exception as e:
            return Response({'status':400,'message':"Something went Wrong",'error':str(e)})
        

class LatestTradeView(APIView):
    def get(self,request):
        try:
            pairs=['EURCAD','USDJPY','GBPUSD','EURUSD']
            res=[]
            for pair in pairs:
                trades = Trade.objects.filter(currency_pair=pair).order_by('-trade_date')[:2]

                if len(trades) >= 2:
                    latest_trade = trades[0]
                    second_last= trades[1]
                    is_greater=latest_trade.last_value > second_last.last_value
                    serializer_latest= TradeSerializer(latest_trade).data
                    serializer_latest['is_greater'] =is_greater
                    res.append(serializer_latest)
                else:
                    serialized_trades = TradeSerializer(trades, many=True).data
                    res.extend(serialized_trades)

            return Response({'status': '200', 'message': 'OK', 'payload': res})
    
        except Exception as e:
            return Response({'status':400,'message':"Something went Wrong",'error':str(e)})
