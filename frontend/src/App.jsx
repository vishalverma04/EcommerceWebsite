import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom"

const Navbar = React.lazy(() => import('./components/Navbar'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductOverview = React.lazy(() => import('./components/ProductOverwiew'));
const Footer = React.lazy(() => import('./components/footer'));
const ContactUs = React.lazy(() => import('./pages/contactus'));
const Services = React.lazy(() => import('./pages/servicePage'));
const CartPage = React.lazy(() => import('./pages/Cart'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const AboutPage = React.lazy(() => import('./pages/About'));
const SearchedItems = React.lazy(() => import('./pages/searchedItems'));


function App() {

  return (
    <>
     
      <BrowserRouter>
      
      <Navbar/>
         <Routes>
           <Route path="/" Component={HomePage}></Route>
           <Route path="/product" Component={ProductOverview}></Route>
           <Route path="contact" Component={ContactUs} ></Route>
           <Route path="services" Component={Services}></Route>
           <Route path="cart" Component={CartPage}></Route>
           <Route path="login" Component={LoginPage}></Route>
           <Route path="/about" Component={AboutPage}></Route>
           <Route path="/searched-items" element={<SearchedItems />} />
         </Routes>
          <Footer/>
      </BrowserRouter>
      
      </>
  )
}

export default App
