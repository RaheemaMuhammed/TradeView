import { useState,useEffect,useRef } from 'react'
import Chart from './Components/Chart';
import { axiosInstance } from './api/instance';
import Table from './Components/Table';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    const [latestData,setLatestData]=useState([])
    const [active,setActive]=useState('EURCAD')
    const [wsData,setWsData]=useState({})
    const [table,setTable] =useState(false)
    
  
    

  useEffect(() => {
    const socket= new WebSocket(`ws://127.0.0.1:8000/ws/new_trade/`)
        socket.onopen=()=>{
            console.log('WebSocket connection opened.');  
        }
        socket.onmessage = (event) => { 
            const data = JSON.parse(event.data);
            console.log('message', data);
            
            setWsData(event.data)
            
            setLatestData(prevData => {
                const newData = prevData.map(item => {
                    if (item.currency_pair === data.currency_pair) {
                        return { ...item, ...data };
                    }
                    return item;
                });
                return newData;
            });
        };
        socket.onerror=(error)=>{           
            console.log(error,'iam the error');
        }

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
            
        };
  
    
  }, [])

  
  useEffect(() => {
    try {
        const getLatestTrade=async()=>{
            const response=await axiosInstance.get('latest/')
            setLatestData(response.data.payload)
        }
        getLatestTrade()
    } catch (error) {
        console.log(error);
    }
       
  }, [wsData])
  

  return (
    <>
            <ToastContainer/>
  <div className='w-full lg:flex h-full'>
    <div className='lg:w-2/3 border-2 border-gray-300 '>
        {table? <Table active={active} wsData={wsData}/> :
        <Chart active={active} wsData={wsData}/>
        
    }

    </div>
    <div className='border-2 border-gray-300 lg:w-1/3'>
      

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-5 py-3">
                    Currency
                </th>
                <th scope="col" className="px-5 py-3">
                    Last
                </th>
                <th scope="col" className="px-5 py-3">
                    Chg
                </th>
                <th scope="col" className="px-5 py-3">
                    Chg%
                </th>
                <th scope="col" className="px-5 py-3">
                   
                </th>
            </tr>
        </thead>
        <tbody>
        
            {latestData?.map((item,indx)=>{
                const colorClass = item.is_greater  ? 'text-myGreen' :  'text-myRed';
                return(
                <tr className={`bg-white ${active==item.currency_pair && ' border-blue-400 border-2'} hover:bg-gray-200 cursor-pointer  `} key={indx} >
                <th scope="row" className="px-6 py-3 font-medium  text-gray-900 whitespace-nowrap " onClick={()=>{setActive(item.currency_pair);setTable(false)}}>
                    {item.currency_pair}
                </th>
                <td className={`px-6 py-4 ${colorClass}`}>
                    {item.last_value}
                </td>
                <td className={`px-6 py-4 ${colorClass}`}>
                    {item.change_value}
                </td>
                <td className={`px-6 py-4 ${colorClass}`}>
                    {item.change_percent}
                </td>
                <td className="px-6 py-4 " >
                    <p className='bg-blue-400 border rounded-lg p-1 text-white text-base text-center cursor-pointer' onClick={()=>setTable(!table)}>More</p>
                </td>
            </tr>
)})}
            
          
        </tbody>
    </table>
</div>


    </div>

  </div>
  </>
  )
}

export default App
