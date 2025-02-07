import Landingpage from './components/Landingpage'
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'

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
import StripeCheckout from './components/StripeCheckout'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {


  return (
    
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Landingpage /> }/>
        <Route path='/register' element={<Signup /> }/>
        <Route path='/login' element={<SignIn /> }/>
        <Route path='/about' element={<About /> }/>
        <Route path='/contact' element={<Contact /> }/>
        <Route path='/tenant/*' element={<TenantDashboard /> }/>
        <Route path='/landlord/*' element={<LandlordDashboard /> }/>
        <Route path='/contact' element={<Contact />} />
        <Route path="property/property-details" element={<PropertyDetails />} />

        <Route path="/checkout" element={<StripeCheckout />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    
  )
}

export default App
