import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const BaseLayout = React.lazy(() => import('./layout/baselayout'));
const AddNewProduct = React.lazy(() => import('./pages/products/addNewProduct'));
const dashboard = React.lazy(() => import('./pages/dashboard'));
const AdminLogin = React.lazy(() => import('./pages/login'));
const UpdateProduct = React.lazy(() => import('./pages/products/updateProduct'));
const OrdersPage = React.lazy(() => import('./pages/orders'));
const CustomerPage = React.lazy(() => import('./pages/customer'));
const SettingsPage = React.lazy(() => import('./pages/settingsPage/setting'));
const ProductManagement = React.lazy(() => import('./pages/products/ProductManagment'));

const App = () => {
  const [login, setLogin] = useState(true);
  return (
    <Router>
      <Routes>
      {login ? 
      (
        <Route  element={<BaseLayout />}>
          <Route path="/" Component={dashboard}></Route>
          <Route path="/addNewProduct" Component={AddNewProduct}></Route>
          <Route path="/products" Component={ProductManagement}></Route>
          <Route path="/updateproduct/:id" Component={UpdateProduct}></Route>
          <Route path="/orders" Component={OrdersPage}></Route>
          <Route path="/customers" Component={CustomerPage}></Route>
          <Route path="/settings" Component={SettingsPage}></Route>


          <Route path="/*" element={<h1>Not Found</h1>}></Route>
        </Route>
      ):(
        <Route path="/" element={<AdminLogin setLogin={setLogin} />}></Route>
      )
      }

        
        
      </Routes>
    </Router>
  );
};

export default App;
