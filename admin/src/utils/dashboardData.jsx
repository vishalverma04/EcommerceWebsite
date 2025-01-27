import axios from 'axios';
const getProductCount= async () => {
  const {data} = await axios.get('/api/v1/admin/productcount');
  return data.totalProducts;
};

const getCategoriesCount = async () => {
    const {data} = await axios.get('/api/v1/settings/getcategorycount');
    return data.totalCategory;
}

const getTotalUserCount = async () => {
        const {data} = await axios.get('/api/v1/admin/usercount');
        return data.totalUsers;
}

    export { 
      getProductCount, 
      getCategoriesCount,
      getTotalUserCount,
    
    };