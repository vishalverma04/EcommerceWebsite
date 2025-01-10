import axios from 'axios';
const getProductCount= async () => {
  const {data} = await axios.get('/api/v1/admin/productcount');
  return data.totalProducts;
};

const getOrdersCount = async () => {
    const response = await axios.get('/api/v1/orders/count');
    return response.data;
    }

const getCategoriesCount = async () => {
    const response = await axios.get('/api/v1/categories/count');
    return response.data;
    }

    const getTotalUserCount = async () => {
        const {data} = await axios.get('/api/v1/admin/usercount');
        return data.totalUsers;
      }

    export { 
      getProductCount, 
      getOrdersCount, 
      getCategoriesCount,
      getTotalUserCount,
    
    };