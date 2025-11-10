import api from "../../api";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../Contexts/HomeContext";

function Home() {
  const { homes } = useContext(HomeContext);
  const role = localStorage.getItem("userRole");

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "0 20px",
      }}
    >
      {/* Role alert */}
      <div
        style={{
          backgroundColor: role ? "#e3f2fd" : "#f8f9fa",
          color: "#0d6efd",
          textAlign: "center",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "30px",
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {role ? (
          <>
            <i className="bi bi-person-check me-2"></i>
            Logged In As <strong>{role}</strong>
          </>
        ) : (
          <>Welcome User</>
        )}
      </div>

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          padding: "15px 0",
          marginBottom: "30px",
          borderBottom: "3px solid #1a839a",
          display: "inline-block",
          color: "#333",
          fontWeight: "700",
        }}
      >
        <i className="bi bi-house-door-fill me-2" style={{ color: "#1a839a" }}></i>
        My Home
      </h2>

      {/* Home Cards */}
      {homes && homes.length > 0 ? (
        homes.map((home, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              marginBottom: "40px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#1a839a",
                color: "white",
                padding: "15px 20px",
              }}
            >
              <h4 style={{ margin: 0 }}>{home.property.title}</h4>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* Tenant section */}
              <div
                style={{
                  flex: "1 1 300px",
                  backgroundColor: "#f8f9fa",
                  padding: "30px",
                  textAlign: "center",
                  borderRight: "1px solid #eee",
                }}
              >
                <img
                  src={home.tenant.profile.profile}
                  alt="Tenant Profile"
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <h5 style={{ marginTop: "20px", marginBottom: "5px" }}>
                  {home.tenant.username}
                </h5>
                <span
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                  }}
                >
                  {home.tenant.role}
                </span>
              </div>

              {/* Property and Landlord details */}
              <div style={{ flex: "2 1 500px", padding: "30px" }}>
                {/* Personal Info */}
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    marginBottom: "25px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1a839a",
                      color: "white",
                      padding: "12px 20px",
                    }}
                  >
                    <h5 style={{ margin: 0 }}>
                      <i className="bi bi-person-badge me-2"></i>Personal
                      Information
                    </h5>
                  </div>
                  <div style={{ padding: "15px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <span>
                        <i className="bi bi-houses me-2"></i>Bedrooms
                      </span>
                      <span
                        style={{
                          backgroundColor: "#1a839a",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "20px",
                        }}
                      >
                        {home.property.category.name}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <i className="bi bi-wallet me-2"></i>Rent
                      </span>
                      <span
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "20px",
                        }}
                      >
                        {home.property.rent_amount} KES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Landlord Info */}
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#333",
                      padding: "12px 20px",
                    }}
                  >
                    <h5 style={{ margin: 0 }}>
                      <i className="bi bi-person-square me-2"></i>Landlord
                      Information
                    </h5>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <div
                        style={{
                          flex: "1 1 120px",
                          textAlign: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <img
                          src={home.property.landlord.profile.profile}
                          alt="Landlord Profile"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #eee",
                          }}
                        />
                      </div>
                      <div style={{ flex: "2 1 200px" }}>
                        <p style={{ marginBottom: "10px" }}>
                          <i
                            className="bi bi-envelope-fill me-2"
                            style={{ color: "#1a839a" }}
                          ></i>
                          {home.property.landlord.email}
                        </p>
                        <p style={{ margin: 0 }}>
                          <i
                            className="bi bi-telephone-fill me-2"
                            style={{ color: "#28a745" }}
                          ></i>
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
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
            padding: "50px 20px",
          }}
        >
          <i
            className="bi bi-house-x"
            style={{ fontSize: "4rem", color: "#aaa" }}
          ></i>
          <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
            No Home Currently
          </h3>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            Looking for a new place?
          </p>
          <Link
            to="/tenant/properties/"
            style={{
              display: "inline-block",
              backgroundColor: "#1a839a",
              color: "white",
              textDecoration: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#167180")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1a839a")
            }
          >
            <i className="bi bi-search me-2"></i>Browse Homes
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
