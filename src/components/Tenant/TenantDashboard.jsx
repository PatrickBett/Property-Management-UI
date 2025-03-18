import { Link, Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Properties from "./Properties";
import ProtectedRoute from "../ProtectedRoute";
import Payment from "../Payment";

import Home from "./Home";
import api from "../../api";
import { useEffect, useState } from "react";
import PaymentsHistory from "./PaymentsHistory";
const TenantDashboard = () => {
  const isAuthenticated = !!localStorage.getItem("access"); // Check authentication



  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="bg-dark text-white p-3 d-md-block"
        style={{ minHeight: "100vh" }}
      >

        


        <h5  className="py-3" style={{backgroundColor:"rgb(2, 2, 52)",color:"orange",textAlign:"center"}}>Tenant Menu</h5>
        <ul className="nav flex-column" >
          <li className="nav-item">
            <Link className="nav-link fw-bolder text-white" to="/tenant/" style={{textAlign:"center"}}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white fw-bolder" to="/tenant/properties" style={{textAlign:"center"}}>
              Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white fw-bolder" to="/tenant/maintenance-requests" style={{textAlign:"center"}}>
              Maintenance
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white fw-bolder" to="/tenant/mypayments-history" style={{textAlign:"center"}}>
              Payments History
            </Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link text-white fw-bolder" to="/tenant/account" style={{textAlign:"center"}}>
              Account
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 border  container m-2" style={{backgroundColor:"#deeaee"}}>
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
    </div>
  );
};

export default TenantDashboard;
