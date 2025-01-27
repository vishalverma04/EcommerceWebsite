import axios from "axios"
import toast from "react-hot-toast"
export const getAllOrders =async (userId)=>{
 try{
    const response=await axios.get(`/api/v1/users/${userId}/orders`)
    if(response.status===200){
     return response.data.orders
 }
 }catch(error){
     toast.error("Failed to retrieve orders")
 }
}
