import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { axiosInstance } from '../api/instance'
import { useState,useEffect } from 'react'
const Chart = ({active,wsData}) => {
    const [tradeData,setTradeData]=useState([])

    useEffect(() => {
      try {
        const fetchTrade=async()=>{
          const response=await axiosInstance.get('trade/',{params:{currency:active}})
          setTradeData(response.data.payload)
        }
       fetchTrade()
      } catch (error) {
        console.log(error);
      }

      
    }, [active,wsData])

    
   

    const dates = tradeData.map((data) =>( new Date(data.trade_date)).toLocaleDateString());
    const lastValues = tradeData.map((data) => data.last_value);

    const dataSets ={
        labels: dates,
        datasets:[
            {
                label: active,
                data: lastValues,
                borderColor: "black",
              }, 
        ]
    }
    const options = {
        title: {
          display: true,
          text:'Users'
          
      }, plugins: {
        legend: {
          display: true,
          position: "top",
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 100,
            suggestedMax: 50000
          },
        },
      },
        responsive: true,
      };
  return (
        <div className='my-5'>

          <Line options={options} data={dataSets} height={200} />

        </div>  
)
}

export default Chart
 


