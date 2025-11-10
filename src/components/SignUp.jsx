import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tenant");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("api/api-auth/users/", {
        username,
        email,
        first_name,
        last_name,
        password,
        role,
        phone_number,
      });

      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to register. Please try again.");
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="row shadow-lg border-0 rounded-4 overflow-hidden"
        style={{ maxWidth: "950px", width: "100%" }}
      >
        {/* Left image section */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage:
              "url('https://monumentale.net/wp-content/uploads/2025/05/valuation-multiples-for-a-property-management-firm-1-scaled-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right form section */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{color:"#1a839a"}}>
              <i className="bi bi-person-plus-fill me-2"></i>Register Account
            </h2>
            <p className="text-muted">
              Join us and manage your property easily
            </p>
          </div>

          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="p-4 rounded-3 shadow-sm bg-white"
            style={{
              minHeight: "auto",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border-2"
                    id="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                  <label htmlFor="first_name">
                    <i className="bi bi-person me-2"></i>First Name
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border-2"
                    id="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                  <label htmlFor="last_name">
                    <i className="bi bi-person me-2"></i>Last Name
                  </label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-2"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
              <label htmlFor="username">
                <i className="bi bi-person-badge me-2"></i>Username
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control border-2"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email Address
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control border-2"
                id="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
              <label htmlFor="phone_number">
                <i className="bi bi-telephone me-2"></i>Phone Number
              </label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select border-2"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ borderRadius: "10px" }}
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
              <label htmlFor="role">
                <i className="bi bi-person-workspace me-2"></i>Select Role
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control border-2"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: "10px" }}
              />
              <label htmlFor="password">
                <i className="bi bi-lock me-2"></i>Password
              </label>
            </div>

            <button
              className="btn btn-success w-100 py-3 fw-bold"
              type="submit"
              disabled={isLoading}
              style={{
                borderRadius: "10px",
                fontSize: "1.1rem",
                background: "#1a839a",
                border: "none",
              }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>Create Account
                </>
              )}
            </button>

            <div className="text-center mt-4">
              <p className="mb-0">
                Already have an account?{" "}
                <a href="/login" className="text-success fw-bold">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
