import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await api.post("/api/login/", { username, password });
      const { access, refresh, role } = response.data;

      const isTenant = role === "tenant";
      setIsTenant(isTenant);

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("userRole", role);

      setIsLoggedIn(true);

      if (role === "tenant") {
        navigate("/tenant");
        toast.success("Logged in successfully as Tenant");
      } else if (role === "landlord") {
        navigate("/landlord");
        toast.success("Logged in successfully as Landlord");
      } else {
        setError("Invalid role. Please contact support.");
        toast.error("Invalid role. Please contact support.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex">
      {/* Left Section (Image / Branding) */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white position-relative p-5"
        style={{
          flex: 1,
          backgroundImage:
            "url('https://i.ibb.co/vxWRKrWq/work-home-with-computer-couch.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
            zIndex: 1,
          }}
        ></div>

        {/* Text content */}
        <div
          className="position-relative text-center"
          style={{ zIndex: 2, maxWidth: "500px" }}
        >
          <h1 className="fw-bold mb-3 display-5">Property Management</h1>
          <p className="fs-5 text-light opacity-75">
            Simplify your rental management with modern tools that make
            operations effortless.
          </p>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div
        className="d-flex justify-content-center align-items-center flex-column p-4 p-lg-5 bg-light"
        style={{ flex: 1 }}
      >
        <div
          className="card border-0 shadow-lg rounded-4"
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "white",
          }}
        >
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <i className="bi bi-house-lock fs-1 text-primary mb-2"></i>
              <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
              <p className="text-muted">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div
                className="alert alert-danger text-center"
                style={{ borderRadius: "10px" }}
              >
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                />
                <label htmlFor="username">
                  <i className="bi bi-person me-2"></i>Username
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control shadow-sm"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                />
                <label htmlFor="password">
                  <i className="bi bi-key me-2"></i>Password
                </label>
              </div>

              <button
                className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                type="submit"
                disabled={isLoading}
                style={{
                  borderRadius: "10px",
                  fontSize: "1.05rem",
                  background:
                    "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)",
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
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <a
                    href="/register"
                    className="text-primary fw-bold text-decoration-none"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
