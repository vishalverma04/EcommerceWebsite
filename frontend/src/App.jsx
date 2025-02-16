import React from "react";
import {Routes,Route } from "react-router-dom"


const Navbar = React.lazy(() => import('./components/Navbar'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductOverview = React.lazy(() => import('./components/ProductOverwiew'));
const Footer = React.lazy(() => import('./components/footer'));
const ContactUs = React.lazy(() => import('./pages/contactus'));
const CartPage = React.lazy(() => import('./pages/Cart'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const AboutPage = React.lazy(() => import('./pages/About'));
const SignupPage = React.lazy(()=>import('./pages/signup/Signup'));
const OTPPage = React.lazy(()=>import('./pages/signup/otp'));
const CheckoutAddressHandler = React.lazy(()=>import('./pages/CheckoutAddressHandler'));
const { Error404 } = React.lazy(() => import('./pages/Error404'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const ProfilePage = React.lazy(() => import('./components/profile/MainProfile'));
const PaymentSuccess = React.lazy(() => import('./pages/paymentSuccess'));
const ServiceRequestDetails = React.lazy(() => import('./components/profile/serviceRequistDetail'));
const SocialMediaIcons = React.lazy(() => import('./components/SocialMedia'));
const ServicesPage = React.lazy(() => import('./pages/servicePage/servicePage'));
const ROServicePage = React.lazy(() => import('./pages/servicePage/Roservice'));
const WarrantyPage = React.lazy(() => import('./pages/servicePage/warranty'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const Developer = React.lazy(() => import('./pages/developer/MyProfile'));

import { useAuth } from "./contexts/AuthContext";
function App() {
const {fullName,isLoggedIn}=useAuth()
  return (
    <>
      <Navbar fullName={fullName} isLoggedIn={isLoggedIn}/>
         <Routes>
           <Route path="/" Component={HomePage}></Route>
           <Route path="/product/:title" Component={ProductOverview}></Route>
           <Route path="/contact" Component={ContactUs} ></Route>
           <Route path="/services" Component={ServicesPage}></Route>
           <Route path="/services/warranty" Component={WarrantyPage}/>
           <Route path="/services/ro-service" Component={ROServicePage}/>
           <Route path="/cart" Component={CartPage}></Route>
           <Route path="/login" Component={LoginPage}></Route>
           <Route path="/about" Component={AboutPage}></Route>
           <Route path="/signup" Component={SignupPage} />
           <Route path="/verifyemail" Component={OTPPage} />
           <Route path="/search/:searchQuery" Component={SearchPage} />
           <Route path="/profile" Component={ProfilePage} /> 
           <Route path="/payment/success" Component={PaymentSuccess} />
           <Route path="/checkout" Component={CheckoutAddressHandler} /> 
           <Route path="/service-requests/:requestId" Component={ServiceRequestDetails} /> 
           <Route path="/resetpassword/:token" Component={ResetPassword} /> 
           <Route path="/developer" Component={Developer} />       
           <Route path="/*" Component={Error404} /> 
         </Routes>
          <Footer/>
          <SocialMediaIcons/>
      
      </>
  )
}

export default App
