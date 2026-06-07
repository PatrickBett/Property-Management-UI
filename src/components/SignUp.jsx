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
      setError("Failed to register. Please try again.");
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ minHeight: "80vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="row overflow-hidden">
        {/* LEFT IMAGE */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage:
              "url('https://monumentale.net/wp-content/uploads/2025/05/valuation-multiples-for-a-property-management-firm-1-scaled-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* RIGHT FORM */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          {/* HEADER */}
          <div className="text-center mb-4">
            <h2 className="fs-1 fw-bold mb-2" style={{ color: "#1a839a" }}>
              <i className="bi bi-person-plus-fill me-2"></i>
              Register Account
            </h2>

            <p className="text-muted fs-3">
              Join us and manage your property easily
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center fs-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {/* FORM */}
          <form className="p-4 rounded-3 shadow-sm bg-white border" onSubmit={handleRegister}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  className="form-control fs-3"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control fs-3"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <input
              className="form-control fs-3 my-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="form-control fs-3 my-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control fs-3 my-3"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              className="form-select fs-3 my-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>

            <input
              type="password"
              className="form-control fs-3 my-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn w-100 fs-3 py-3 mt-3"
              type="submit"
              disabled={isLoading}
              style={{ background: "#1a839a", color: "white" }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center mt-4 fs-3">
              Already have an account?{" "}
              <a href="/login" className="fw-bold text-success">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
