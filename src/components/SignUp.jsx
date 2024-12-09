import React from "react";

function Signup() {
  return (
    <div
      className="container border p-4 mt-5"
      style={{ maxWidth: "500px", background: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4 text-primary">Sign Up</h3>
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
          <label htmlFor="phone_number" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="roles" className="form-label">
            Select Role:
          </label>
          <select className="form-control" id="roles">
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
