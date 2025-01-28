import { Link, Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Properties from "./Properties";
import Home from "./Home";
import api from "../../api";
import { useEffect, useState } from "react";
const TenantDashboard = () => {



  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="bg-dark text-white p-3 d-md-block"
        style={{ minHeight: "100vh", width: "250px" }}
      >

        


        <h5 className="text-white">Tenant Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tenant/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tenant/properties">
              Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tenant/maintenance-requests">
              Maintenance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tenant/applications">
              Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/tenant/account">
              Account
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 border container m-2">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="maintenance-requests" element={<Maintenance />} />
          <Route path="applications" element={<Applications />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default TenantDashboard;
