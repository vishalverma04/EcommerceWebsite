import axios from 'axios';
import toast from 'react-hot-toast';


export const getAllAddresses = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/users/${userId}/addresses`);
      return response.data.addresses;
    } catch (error) {
      console.error("Failed to fetch addresses:", error.response?.data || error.message);
      throw error;
    }
};

export const addNewAddress = async (userId, address) => {
    try {
      const response = await axios.post(`/api/v1/users/${userId}/address`, address);
      if(response.status === 201) {
        toast.success("Address added successfully");
        return {address:response.data.address,res:true};
      }
    } catch (error) {
      console.error("Failed to add address:", error.response?.data || error.message);
      throw error;
    }
};

export const deleteAddress = async (userId, addressId) => {
    try {
        if(window.confirm("Are you sure you want to delete this address?")) {
      await axios.delete(`/api/v1/users/${userId}/address/${addressId}`);
        toast.success("Address deleted successfully");
        return true;
        }
    } catch (error) {
      console.error("Failed to delete address:", error.response?.data || error.message);
      throw error;
    }
};