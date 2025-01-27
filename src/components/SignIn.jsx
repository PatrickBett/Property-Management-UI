import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance configured with baseURL
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      // Send login request to the backend
      const response = await api.post("api/login/", { username, password });
      
       // Extract tokens and role from response
      const { access, refresh, role } = response.data;

    // Save tokens and role to localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("userRole", role);

      console.log(response)


    if (role === "tenant") {
      console.log("Tenant Dashboard")
      navigate("/tenant");
    } else if (role === "landlord") {
      navigate("/landlord");
      console.log("Landlord Dashboard")
    } else {
      setError("Invalid role. Please contact support.");
    }
      // const token = response.data.access
    
      // localStorage.setItem(ACCESS_TOKEN, token);
      // localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // // Assuming the response contains a token and user data
      // const { token, user } = response.data;

      // // Save token and user data to localStorage/sessionStorage
      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the appropriate dashboard based on the role

      
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      className="container border p-4 mt-5"
      style={{ maxWidth: "500px", background: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4 text-primary">Login</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary w-100"
            type="submit"
            style={{ fontWeight: "bold" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
