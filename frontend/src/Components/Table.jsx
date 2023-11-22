import React,{useState,useEffect} from 'react'
import { axiosInstance } from '../api/instance'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import AddModal from './AddModal'

const Table = ({active,wsData}) => {
    const [tradeData,setTradeData]=useState([])
    const [editModal,setEditModal]=useState(false)
    const [deleteModal,setDeleteModal]=useState(false)
    const [addModal,setAddModal]=useState(false)
    const [item,setItem]=useState({})
    const [refresh,setRefresh]=useState(false)

    useEffect(() => {


      const fetchTrade=async()=>{
        const response=await axiosInstance.get('trade/',{params:{currency:active}})
        setTradeData(response.data.payload)
      }
     fetchTrade()
    }, [active,wsData,refresh])


  return (
    

<div className="relative overflow-x-auto">
    {editModal&&<EditModal editModal={editModal} setEditModal={setEditModal} item={item} refresh={refresh} setRefresh={setRefresh}/>}
    {deleteModal&&<DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} item={item} refresh={refresh} setRefresh={setRefresh}/>}
    {addModal&&<AddModal addModal={addModal} setAddModal={setAddModal} refresh={refresh} setRefresh={setRefresh} active={active}/>}
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-500 uppercase bg-gray-50">
            <tr>

                <th scope="col" className="px-6 py-3">
                    Currency
                </th>
                <th scope="col" className="px-6 py-3">
                    Last
                </th>
                <th scope="col" className="px-6 py-3">
                    Change
                </th>
                <th scope="col" className="px-6 py-3">
                    Change%
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-3 py-3">
                <p className='bg-myGreen border rounded-lg p-1 px-2 text-white text-base text-center cursor-pointer' onClick={()=>{setAddModal(!addModal)}}>Add</p>
                    
                </th>
            </tr>
        </thead>
        <tbody>
            {tradeData.map((item,indx)=>{
                return(
                    <tr key={indx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.currency_pair}
                    </th>
                    <td className="px-6 py-4">
                        {item.last_value}
                    </td>
                    <td className="px-6 py-4">
                        {item.change_value}
                    </td>
                    <td className="px-6 py-4">
               {item.change_percent} 
                     </td>
                     <td className="px-6 py-4">
               {item.trade_date} 
                     </td>
                     <td className="px-4 py-4 flex gap-3" >
                    <p className='text-blue-400 hover:underline font-semibold text-base text-center cursor-pointer' onClick={()=>{setEditModal(!editModal);setItem(item)}}>Edit</p>
                    <p className='text-myRed hover:underline font-semibold text-base text-center cursor-pointer' onClick={()=>{setDeleteModal(!deleteModal);setItem(item)}}>Delete</p>
                </td>
                </tr>
                )
            })

            }
           
           
          
        </tbody>
    </table>
</div>

  )
}

export default Table