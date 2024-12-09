import Landingpage from './components/Landingpage'
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Dashboard from './components/Landlord/Dashboard'
import SignIn from './components/SignIn'
import Signup from './components/Signup'
import TenantDashboard from './components/Tenant/TenantDashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Contact from './components/Contact'

function App() {


  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage /> }/>
        <Route path='/register' element={<Signup /> }/>
        <Route path='/login' element={<SignIn /> }/>
        
        <Route path='/tenant-dashboard' element={<TenantDashboard /> }/>
        <Route path='landlord/*' element={<Dashboard /> }/>
        <Route path='landlord-contact' element={<Contact />} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
