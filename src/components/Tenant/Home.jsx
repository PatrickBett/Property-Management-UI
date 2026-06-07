import api from "../../api";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../Contexts/HomeContext";

function Home() {
  const { homes } = useContext(HomeContext);
  const role = localStorage.getItem("userRole");

  return (
    <div
      className="container py-5"
      
    >
      {/* ROLE BANNER */}
      <div
        className="text-center p-3 mb-4 rounded shadow-sm"
        style={{
          backgroundColor: role ? "#e3f2fd" : "#f8f9fa",
          color: "#0d6efd",
        }}
      >
        <span className="fs-3">
          {role ? (
            <>
              <i className="bi bi-person-check me-2"></i>
              Logged In As <strong>{role}</strong>
            </>
          ) : (
            "Welcome User"
          )}
        </span>
      </div>

      {/* TITLE */}
      <div className="text-center mb-5">
        <h2
          className="fw-bold fs-1 border-bottom pb-2 d-inline-block"
          style={{ borderColor: "#1a839a" }}
        >
          <i
            className="bi bi-house-door-fill me-2"
            style={{ color: "#1a839a" }}
          ></i>
          My Home
        </h2>
      </div>

      {/* HOMES */}
      {homes && homes.length > 0 ? (
        homes.map((home, index) => (
          <div key={index} className="card shadow-lg mb-5 border-0">
            {/* HEADER */}
            <div
              className="p-3 text-white"
              style={{ backgroundColor: "#1a839a" }}
            >
              <h3 className="fs-2 mb-0">{home.property.title}</h3>
            </div>

            <div className="row g-0">
              {/* TENANT */}
              <div className="col-md-4 text-center p-4 bg-light border-end">
                <img
                  src={home.tenant.profile.profile}
                  alt="Tenant"
                  className="rounded-circle mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />

                <h4 className="fs-3 fw-bold">{home.tenant.username}</h4>

                <span className="badge bg-info fs-5 mt-2">
                  {home.tenant.role}
                </span>
              </div>

              {/* DETAILS */}
              <div className="col-md-8 p-4">
                {/* PROPERTY INFO */}
                <div className="card mb-4 border">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#1a839a" }}
                  >
                    <h5 className="fs-3 mb-0">
                      <i className="bi bi-person-badge me-2"></i>
                      Property Information
                    </h5>
                  </div>

                  <div className="card-body fs-3">
                    <div className="d-flex justify-content-between mb-3">
                      <span>Bedrooms</span>
                      <span className="badge bg-primary fs-5">
                        {home.property.category.name}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Rent</span>
                      <span className="badge bg-success fs-5">
                        {home.property.rent_amount} KES
                      </span>
                    </div>
                  </div>
                </div>

                {/* LANDLORD */}
                <div className="card border">
                  <div className="card-header bg-light">
                    <h5 className="fs-3 mb-0">
                      <i className="bi bi-person-square me-2"></i>
                      Landlord Information
                    </h5>
                  </div>

                  <div className="card-body">
                    <div className="d-flex align-items-center gap-4">
                      <img
                        src={home.property.landlord.profile.profile}
                        alt="Landlord"
                        className="rounded-circle"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="fs-3">
                        <p className="mb-2">
                          <i className="bi bi-envelope-fill me-2 text-primary"></i>
                          {home.property.landlord.email}
                        </p>

                        <p className="mb-0">
                          <i className="bi bi-telephone-fill me-2 text-success"></i>
                          {home.property.landlord.phone_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-5 shadow rounded bg-white">
          <i className="bi bi-house-x fs-1 text-muted"></i>

          <h3 className="fs-2 mt-3">No Home Currently</h3>

          <p className="fs-3 text-muted">Looking for a new place?</p>

          <Link
            to="/tenant/properties/"
            className="btn btn-primary px-4 py-3 fs-3 mt-3"
            style={{ backgroundColor: "#1a839a", border: "none" }}
          >
            <i className="bi bi-search me-2"></i>
            Browse Homes
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
