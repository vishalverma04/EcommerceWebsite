import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const getProductCount= async () => {
  const {data} = await axios.get(`${SERVER_URL}/api/v1/admin/productcount`);
  return data.totalProducts;
};

const getCategoriesCount = async () => {
    const {data} = await axios.get(`${SERVER_URL}/api/v1/settings/getcategorycount`);
    return data.totalCategory;
}

const getTotalUserCount = async () => {
        const {data} = await axios.get(`${SERVER_URL}/api/v1/admin/usercount`);
        return data.totalUsers;
}

    export { 
      getProductCount, 
      getCategoriesCount,
      getTotalUserCount,
    
    };