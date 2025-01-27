import React, { useState } from 'react';
import {X} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../pages/Loader'

const OrderCancel = ({isopen,orderId}) => {
  
  const [loading,setLoading] = useState(false);
  const [reason,setReason]=useState()

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    
     try{
         await axios.post(`/api/v1/users/${orderId}/cancelorder`, 
            {
            reason,
            cancelledBy:'customer'
            }
        );
        toast.success('Order cancelled Successfully');

        isopen(false);
    
     }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
     }finally{
        setLoading(false);
     }
  };


  if(loading){
    return <Loader/>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Write Cancellation Reason</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} onClick={()=>isopen(false)}/>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Review Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cancel Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="write cancellation reason..."
              required
            />
          </div>
          <div className="flex gap-4">
          <button
              type="button"
              className="px-6 py-2 border text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={()=>isopen(false)}
            >
              Clear 
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel Order
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderCancel;