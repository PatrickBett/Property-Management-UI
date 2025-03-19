import { Link, Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Properties from "./Properties";
import ProtectedRoute from "../ProtectedRoute";
import Payment from "../Payment";

import Home from "./Home";


import PaymentsHistory from "./PaymentsHistory";
const TenantDashboard = () => {
  const isAuthenticated = !!localStorage.getItem("access"); // Check authentication



  return (
    
  
      
      <div className=" p-4 border m-2 mt-5">
        <Routes >
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="maintenance-requests" element={<Maintenance />} />
          <Route path="applications" element={<Applications />} />
          <Route path="mypayments-history" element={<PaymentsHistory />} />
          <Route path="account" element={<Account />} />
          
          </Route>
        </Routes>
      </div>
    
  );
};

export default TenantDashboard;
