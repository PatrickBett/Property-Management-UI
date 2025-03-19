import Landingpage from './components/Landingpage'
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import SignIn from './components/SignIn'
import Signup from './components/SignUp'
import TenantDashboard from './components/Tenant/TenantDashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Contact from './components/Contact'
import LandlordDashboard from './components/Landlord/LandlordDashboard'
import Header from './components/Header'
import PropertyDetails from './components/Tenant/PropertyDetails'
import Footer from './components/Footer'
import About from './components/About'
import PaymentCancel from './components/PaymentCancel'
import PaymentSuccess from './components/PaymentSuccess'
import "bootstrap-icons/font/bootstrap-icons.css";
import Payment from './components/Payment'

import { useNavigate } from 'react-router-dom'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTenant, setIsTenant] = useState(false)
  const navigate = useNavigate()



  //FUNCTION TO LOGOUT USER
  const handleLogout =() =>{
    
    try{
      
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/login')
      
    }
    catch(error){
      alert(error)
      setIsLoggedIn(false)
    }

  }


  return (
    
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} isTenant={isTenant}  />
      <Routes>
        <Route path='/' element={<Landingpage setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/register' element={<Signup setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/login' element={<SignIn setIsLoggedIn={setIsLoggedIn} setIsTenant={setIsTenant} /> }/>
        <Route path='/about' element={<About setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/contact' element={<Contact setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/tenant/*' element={<TenantDashboard setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/landlord/*' element={<LandlordDashboard setIsLoggedIn={setIsLoggedIn} /> }/>
        <Route path='/contact' element={<Contact setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="property/property-details" element={
           
              <PropertyDetails setIsLoggedIn={setIsLoggedIn} />}
            />
        <Route path="payment" element={<Payment setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/payment-success" element={<PaymentSuccess setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/payment-cancel" element={<PaymentCancel setIsLoggedIn={setIsLoggedIn} />} />

      </Routes>
      <Footer />
      </>
    
  )
}

export default App
