import { useContext, useState } from "react";
import { PropertyContext } from "../../Context";

function Properties() {
  const { properties } = useContext(PropertyContext);
  const [filter, setFilter] = useState("all"); // "all", "rented", "notRented"

  const filteredProperties =
    filter === "rented"
      ? properties.filter((p) => p.tenant)
      : filter === "notRented"
      ? properties.filter((p) => !p.tenant)
      : properties;

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      {/* Page Header */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ color: "#1a839a", margin: 0 }}>My Properties</h1>
      </div>

      {/* Filter Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "25px",
          borderBottom: "2px solid #e0e0e0", // bottom line for navbar
          paddingBottom: "10px",
        }}
      >
        {["all", "rented", "notRented"].map((type) => (
          <div
            key={type}
            onClick={() => setFilter(type)}
            style={{
              cursor: "pointer",
              fontWeight: "600",
              paddingBottom: "5px",
              color:
                (type === "all" && filter === "all") ||
                (type === "rented" && filter === "rented") ||
                (type === "notRented" && filter === "notRented")
                  ? "#1a839a"
                  : "#555",
              borderBottom:
                (type === "all" && filter === "all") ||
                (type === "rented" && filter === "rented") ||
                (type === "notRented" && filter === "notRented")
                  ? "3px solid #1a839a" // active indicator
                  : "3px solid transparent",
              transition: "0.3s",
            }}
          >
            {type === "all"
              ? "All"
              : type === "rented"
              ? "Rented"
              : "Not Rented"}
          </div>
        ))}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
          }}
        >
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0, 0, 0, 0.05)";
              }}
            >
              {property.images && property.images.length > 0 && (
                <img
                  src={property.images[0].image}
                  alt="Property"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: "15px" }}>
                <h3 style={{ color: "#1a839a", fontSize: "1.25rem" }}>
                  {property.title}
                </h3>
                <p style={{ margin: "5px 0" }}>
                  <strong>Location:</strong> {property.city}, {property.state}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Type:</strong> {property.category.name}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Monthly Rent:</strong> ${property.rent_amount}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 15px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                {property.tenant ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    >
                      Rented
                    </div>
                    <span>Tenant: {property.tenant.username}</span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#1a839a",
                      fontWeight: "500",
                      padding: "10px 0",
                      borderRadius: "8px",
                      border: "1px solid #1a839a",
                    }}
                  >
                    Not Yet Rented
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#888" }}>No properties found</h3>
        </div>
      )}
    </div>
  );
}

export default Properties;
