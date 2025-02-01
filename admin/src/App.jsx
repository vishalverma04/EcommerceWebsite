import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderTrackingPage from "./pages/orders/oneOrder";

const BaseLayout = React.lazy(() => import('./layout/baselayout'));
const AddNewProduct = React.lazy(() => import('./pages/products/addNewProduct'));
const dashboard = React.lazy(() => import('./pages/dashboard'));
const AdminLogin = React.lazy(() => import('./pages/login'));
const OrdersPage = React.lazy(() => import('./pages/orders/orders'));
const SettingsPage = React.lazy(() => import('./pages/settingsPage/setting'));
const ProductManagement = React.lazy(() => import('./pages/products/ProductManagment'));
const customersManagment = React.lazy(() => import('./pages/customer/customersManagment'));
const CustomerDetails = React.lazy(() => import('./pages/customer/customerDetails'));
const ServiceDetailsPage = React.lazy(() => import('./pages/serviceRequists/serviceDetails'));
const ServicePage = React.lazy(() => import('./pages/serviceRequists/servicePage'));
const SalesOverview =React.lazy(() => import('./pages/SalesOverview'));
// const AdminSignUp = React.lazy(() => import('./pages/signup'));
// const Verifyotp =React.lazy(()=> import ('./pages/OtpPage'))

import { useAuth } from "./contexts/AuthContext";


const App = () => {
  const {isLoggedIn}=useAuth()
  return (
    <Router>
      <Routes>
      {isLoggedIn ? 
      (
        <Route  element={<BaseLayout />}>
          <Route path="/" Component={dashboard}></Route>
          <Route path="/addNewProduct" Component={AddNewProduct}></Route>
          <Route path="/products" Component={ProductManagement}></Route>
          <Route path="/orders" Component={OrdersPage}></Route>
          <Route path="/settings" Component={SettingsPage}></Route>
          <Route path="/order/:id" Component={OrderTrackingPage}></Route>
          <Route path="/customers" Component={customersManagment}></Route>
          <Route path="/customers/:id" Component={CustomerDetails}></Route>
          <Route path='/service' Component={ServicePage}></Route>
          <Route path="/service/:id" Component={ServiceDetailsPage}></Route>
          <Route path="/sales" Component={SalesOverview}></Route>

          <Route path="/*" element={<h1>Not Found</h1>}></Route>
        </Route>
      ):(
        <>
        <Route path="/" element={<AdminLogin/>}></Route>
        {/* <Route path="/signup" element={<AdminSignUp/>}></Route> */}
        {/* <Route path="/verifyotp" element={<Verifyotp/>}></Route> */}
        </>
      )
      }

        
        
      </Routes>
    </Router>
  );
};

export default App;
