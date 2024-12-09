import { useState } from "react";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Payments from "./Payments";
import Properties from "./Properties";
import Home from "./Home";

import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`bg-dark text-white p-3 ${isOpen ? "d-block" : "d-none"} d-md-block`}
        style={{ minHeight: "100vh", width: isOpen ? "250px" : "0" }}
      >
        <h5 className="text-white">Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="properties">My Properties</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link text-white" to="maintenance-requests">Maintenance</Link>  
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="applications">Applications</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link text-white" to="payments">Payments</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link text-white" to="account">Account</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light">
          {/* Sidebar Toggle Button for Smaller Screens */}
          <button
            className="btn btn-outline-dark d-md-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="navbar-brand mb-0 h1"> Dashboard</span>
        </nav>
        <div className="container p-4">
          <h1>Main Content</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="applications" element={<Applications />} />
            <Route path="maintenance-requests" element={<Maintenance />} />
            <Route path="payments" element={<Payments />} />
            <Route path="account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
