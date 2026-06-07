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
    <div
      className=" d-flex"
      style={{ minHeight: "89vh", backgroundColor: "#f8f9fa" }}
    >
      {/* LEFT SIDE */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white position-relative p-5"
        style={{
          flex: 1,
          backgroundImage:
            "url('https://monumentale.net/wp-content/uploads/2025/05/valuation-multiples-for-a-property-management-firm-1-scaled-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.6)",
          }}
        />

        <div
          className="position-relative text-center"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="fs-1 fw-bold mb-3">Property Management</h1>

          <p className="fs-3 text-light">
            Simplify your rental management with modern tools that make
            operations effortless.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex justify-content-center align-items-center flex-column p-4 p-lg-5 bg-light flex-fill">
        <div
          className="card border-0 shadow-lg rounded-4 w-100"
          style={{ maxWidth: "420px" }}
        >
          <div className="card-body p-5">
            {/* HEADER */}
            <div className="text-center mb-4">
              <i
                className="bi bi-house-lock fs-1 mb-2"
                style={{ color: "#1a839a" }}
              ></i>

              <h2 className="fs-2 fw-bold mb-2" style={{ color: "#1a839a" }}>
                Welcome Back
              </h2>

              <p className="text-muted fs-3">
                Sign in to access your dashboard
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="alert alert-danger text-center fs-3 rounded-3">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin}>
              {/* ERROR */}
              {error && (
                <div className="alert alert-danger text-center fs-3 rounded-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {/* USERNAME */}
              <input
                type="text"
                className="form-control form-control-lg fs-3 mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {/* PASSWORD */}
              <input
                type="password"
                className="form-control form-control-lg fs-3 mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* BUTTON */}
              <button
                className="btn w-100 py-3 fs-3 fw-bold"
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: "#1a839a", color: "white" }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>

              {/* SIGNUP LINK */}
              <div className="text-center mt-4">
                <p className="fs-3 text-muted mb-0">
                  Don’t have an account?{" "}
                  <a
                    href="/register"
                    className="fw-bold text-decoration-none"
                    style={{ color: "#1a839a" }}
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
