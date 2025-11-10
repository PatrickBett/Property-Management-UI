import { Link, Routes, Route } from "react-router-dom";

import Account from "./Account";
import Maintenance from "./Maintenance";
import Payments from "./Payments";
import Properties from "./Properties";
import Home from "./Home";
import { CategoryProvider } from "../Contexts/CategoryContext";

import ProtectedRoute from "../ProtectedRoute";

const LandlordDashboard = () => {
  const isAuthenticated = !!localStorage.getItem("access");
  return (
    <div className="container mx-auto" style={{width:"100%"}}>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/"
            element={
              <CategoryProvider>
                <Home />
              </CategoryProvider>
            }
          />

          <Route path="properties" element={<Properties />} />
          <Route path="maintenance-requests" element={<Maintenance />} />

          <Route path="payments" element={<Payments />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
};

export default LandlordDashboard;
