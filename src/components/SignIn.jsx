import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance configured with baseURL
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = ({ setIsLoggedIn, setIsTenant }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Send login request to the backend
      const response = await api.post("/api/login/", { username, password });

      // Extract tokens and role from response
      const { access, refresh, role } = response.data;

      const isTenant = role === "tenant";
      setIsTenant(isTenant);

      // Save tokens and role to localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("userRole", role);

      setIsLoggedIn(true);

      if (role === "tenant") {
        navigate("/tenant");
      } else if (role === "landlord") {
        navigate("/landlord");
      } else {
        setError("Invalid role. Please contact support.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-75">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="card-header text-center bg-primary text-white p-4">
          <h3 className="mb-0">
            <i className="bi bi-house-lock me-2"></i>
            Property Login
          </h3>
        </div>

        <div className="card-body p-4 p-lg-5">
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ height: "50vh" }}>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control mt-5"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">
                <i className="bi bi-person me-2"></i>Username
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control mt-5"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">
                <i className="bi bi-key me-2"></i>Password
              </label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input mt-5"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-primary text-decoration-none">
                Forgot password?
              </a>
            </div>

            <button
              className="btn btn-primary w-100 py-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0">
              Don't have an account?{" "}
              <a href="/register" className="text-primary fw-bold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
