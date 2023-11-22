import {Fragment,useEffect,useRef,useState} from 'react'
import { useFormik } from 'formik'
import { Dialog,Transition } from '@headlessui/react'
import { axiosInstance } from '../api/instance'
import { toast } from 'react-toastify'


const EditModal = ({editModal,setEditModal,item,refresh,setRefresh}) => {
    const cancelButtonRef = useRef(null)
    const onSubmit= async()=>{
        const form =new FormData()
        form.append('id',item.id)

        const changedValues = {};
      
        if (values.last_value !== item.last_value) {
          changedValues.last_value = values.last_value;
        }
      
        if (values.change_value !== item.change_value) {
          changedValues.change_value = values.change_value;
        }
      
        if (values.change_percent !== item.change_percent) {
          changedValues.change_percent = values.change_percent;
        }
      
        if (values.trade_date !== item.trade_date) {
          changedValues.trade_date = values.trade_date;
        }
      
        
        Object.entries(changedValues).forEach(([key, value]) => {
          form.append(key, value);
          
        });
       
        try{
            
            const response = await axiosInstance.patch('trade/',form)
            if(response.data.status===200){
                setEditModal(false)
                setRefresh(!refresh)
                toast.success('Succefully edited!!')

            }else{
                toast.error('Something went wrong')
            }
        }catch(error){
            console.log(error);
        }
    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues:{
            currency_pair:item.currency_pair,
            last_value:item.last_value,
            change_value:item.change_value,
            change_percent:item.change_percent,
            trade_date:item.trade_date,
            
        },
        onSubmit,
       
    })
    
  
    
  return (
    <>
    
    <Transition.Root show={editModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setEditModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <button onClick={()=>{
                                    setEditModal(false)
                                }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <p className='font-bold text-2xl'>{item.currency_pair}</p>
                                        <form className="space-y-4 md:space-y-6"   onSubmit={handleSubmit} encType="multipart/form-data">
            
                                        <div>
                <label htmlFor="last_value">Last</label>
                <input type="text"
                 name="last_value"  
                   value={values.last_value}
                 onChange={handleChange}
                 onBlur={handleBlur} id="last_value"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                
                
            </div>
            <div>
                <label htmlFor="change_value">Change</label>
                <input type="text"
                 name="change_value"  
                   value={values.change_value}
                 onChange={handleChange}
                 onBlur={handleBlur} id="change_value"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                
                
            </div>
            <div>
                <label htmlFor="change_percent">Change% </label>
                <input type="text"
                 name="change_percent"  
                   value={values.change_percent}
                 onChange={handleChange}
                 onBlur={handleBlur} id="change_percent"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                
                
            </div>
            <div>
                <label htmlFor="trade_date">date</label>
                <input type="text"
                 name="trade_date"  
                   value={values.trade_date}
                 onChange={handleChange}
                 onBlur={handleBlur} id="trade_date"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                
                
            </div>

                                            <button type="submit" className="w-full text-black bg-myGreen focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Edit</button>

                                            <div className="flex items-center justify-between">



                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

    
    </>
   
  )
}

export default EditModal

