
import { Link } from "react-router-dom";
function SignIn() {
  return (
    <div
      className="container border p-4 mt-5"
      style={{ maxWidth: "500px" ,background: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4 text-primary">Login</h3>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
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
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-success w-100"
            type="submit"
            style={{ fontWeight: "bold" }}
          >
            Sign In
          </button>
        </div>

        <p>Dont have an account? <Link to='/register'>Sign up</Link></p>
      </form>
    </div>
  );
}

export default SignIn;

