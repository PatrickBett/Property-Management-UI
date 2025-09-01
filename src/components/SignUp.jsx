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
    console.log({
      username,
      email,
      first_name,
      last_name,
      password,
      role,
      phone_number,
    });

    try {
      const res = await api.post("api/api-auth/users/", {
        username,
        email,
        first_name,
        last_name,
        password,
        role,
        phone_number,
      });
      console.log(res);

      // If successful, navigate to login
      navigate("/login");
    } catch (err) {
      setError("Failed to register.", err);
      console.error(err);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <div className="card-header text-center bg-success text-white p-4">
          <h3 className="mb-0">
            <i className="bi bi-person-plus-fill me-2"></i>
            Create Your Account
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

          <form onSubmit={handleRegister}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
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
                    className="form-control"
                    id="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(e) => setLastname(e.target.value)}
                    required
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
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">
                <i className="bi bi-person-badge me-2"></i>Username
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email Address
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="phone_number">
                <i className="bi bi-telephone me-2"></i>Phone Number
              </label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="roles"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
              <label htmlFor="roles">
                <i className="bi bi-person-workspace me-2"></i>Select Role
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">
                <i className="bi bi-lock me-2"></i>Password
              </label>
            </div>

            <div className="d-grid">
              <button className="btn btn-success py-3" type="submit">
                <i className="bi bi-check-circle me-2"></i>
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0">
              Already have an account?{" "}
              <a href="/login" className="text-success fw-bold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
