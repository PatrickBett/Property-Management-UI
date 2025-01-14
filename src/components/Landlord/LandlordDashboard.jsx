import { Link, Routes, Route } from "react-router-dom";
import Applications from "./Applications";
import Account from "./Account";
import Maintenance from "./Maintenance";
import Payments from "./Payments";
import Properties from "./Properties";
import Home from "./Home";

const LandlordDashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className="bg-dark text-white p-3 d-md-block"
        style={{ minHeight: "100vh", width: "250px" }}
      >
        <h5 className="text-white">Landlord Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="properties">
              My Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="maintenance-requests">
              Maintenance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="applications">
              Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="payments">
              Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="account">
              Account
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
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
