import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "./components/Header";
import Landingpage from "./components/Landingpage";
import SignIn from "./components/SignIn";
import Signup from "./components/SignUp";
import TenantDashboard from "./components/Tenant/TenantDashboard";
import LandlordDashboard from "./components/Landlord/LandlordDashboard";
import PropertyDetails from "./components/Tenant/PropertyDetails";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Payment from "./components/Payment";
import PaymentCancel from "./components/PaymentCancel";
import PaymentSuccess from "./components/PaymentSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTenant, setIsTenant] = useState(false);
  const navigate = useNavigate();

  // ✅ RELOAD LOGIN STATE WHEN PAGE REFRESHES
  useEffect(() => {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setIsTenant(role === "tenant"); // or adjust based on how you store it
    }
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    try {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/login");
      toast.info("Logged out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        isTenant={isTenant}
      />

      <Routes>
        <Route
          path="/"
          element={<Landingpage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={
            <SignIn setIsLoggedIn={setIsLoggedIn} setIsTenant={setIsTenant} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/tenant/*" element={<TenantDashboard />} />
          <Route path="/landlord/*" element={<LandlordDashboard />} />
          <Route
            path="/property/property-details"
            element={<PropertyDetails />}
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Route>

        {/* <Route path="/tenant/*" element={<TenantDashboard />} />
        <Route path="/landlord/*" element={<LandlordDashboard />} /> */}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* <Footer /> */}
    </>
  );
}

export default App;
