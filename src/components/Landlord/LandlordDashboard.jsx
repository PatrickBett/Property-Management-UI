import { Link, Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Payments from "./Payments";
import Properties from "./Properties";
import Home from "./Home";
import { CategoryProvider } from "../Contexts/CategoryContext";
import { GrHostMaintenance } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";

const LandlordDashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="bg-dark text-white p-3 d-md-block"
        style={{ minHeight: "100vh", width: "150px" }}
      >
        <h5 className="text-white">Landlord Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/properties">
              My Properties
            </Link>
          </li>
          <li className="nav-item">
            
            <Link className="nav-link text-white" to="/landlord/maintenance-requests">
            <GrHostMaintenance className="me-2"/>Maintenance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/applications">
              Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/payments">
              Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/account">
              <IoIosSettings className="me-2" />Account
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Routes>
          
          <Route path="/" element={
            <CategoryProvider>
               <Home />
            </CategoryProvider>
           
            } />
         
          
          <Route path="properties" element={<Properties />} />
          <Route path="maintenance-requests" element={<Maintenance />} />
          <Route path="applications" element={<Applications />} />
          <Route path="payments" element={<Payments />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default LandlordDashboard;
