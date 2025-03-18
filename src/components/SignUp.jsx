import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Signup() {
  const [first_name, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tenant"); // Default role set to 'tenant'
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form refresh
    console.log({ username, email, first_name, last_name, password, role, phone_number });

    try {
      const res = await api.post("/api/api-auth/users/", {
        username,
        email,
        first_name,
        last_name,
        password,
        role,
        phone_number,
      });
      console.log(res)

      // If successful, navigate to login
      navigate("/login");
    } catch (err) {
      setError("Failed to register. Please check your inputs.");
      console.error(err);
    }
  };

  return (
    <div
      className="container border p-4 mt-5"
      style={{ maxWidth: "500px", background: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4 text-primary">Sign Up</h3>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="Enter your first name"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Enter your last name"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

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
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            placeholder="Enter your phone number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="roles" className="form-label">
            Select Role:
          </label>
          <select
            className="form-control"
            id="roles"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
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
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-success w-100"
            type="submit"
            style={{ fontWeight: "bold" }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
