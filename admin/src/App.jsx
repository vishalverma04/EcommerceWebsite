import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BaseLayout from "./layout/baselayout";
import AddNewProduct from "./pages/addNewProduct";
import dashboard from "./pages/dashboard";
import AdminLogin from "./pages/login";
import ProductsPage from "./pages/products";
import UpdateProduct from "./pages/updateProduct";
import OrdersPage from "./pages/orders";
import CustomerPage from "./pages/customer";

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
          <Route path="/products" Component={ProductsPage}></Route>
          <Route path="/updateproduct/:id" Component={UpdateProduct}></Route>
          <Route path="/orders" Component={OrdersPage}></Route>
          <Route path="/customers" Component={CustomerPage}></Route>


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
