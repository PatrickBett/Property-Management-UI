import { Routes, Route } from "react-router-dom";

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
    <div
      className="container-fluid"
      style={{
        
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          {/* DASHBOARD HOME */}
          <Route
            path="/"
            element={
              <CategoryProvider>
                <div className="fs-2">
                  <Home />
                </div>
              </CategoryProvider>
            }
          />

          {/* PROPERTIES */}
          <Route
            path="properties"
            element={
              <div className="fs-3">
                <Properties />
              </div>
            }
          />

          {/* MAINTENANCE */}
          <Route
            path="maintenance-requests"
            element={
              <div className="fs-3">
                <Maintenance />
              </div>
            }
          />

          {/* PAYMENTS */}
          <Route
            path="payments"
            element={
              <div className="fs-3">
                <Payments />
              </div>
            }
          />

          {/* ACCOUNT */}
          <Route
            path="account"
            element={
              <div className="fs-2">
                <Account />
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default LandlordDashboard;
