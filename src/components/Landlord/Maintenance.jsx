import { useEffect, useState } from "react";
import api from "../../api";

function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);

  const fetchMaintenances = async () => {
    try {
      const res = await api.get("/api/maintenances/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setMaintenances(res.data);
      console.log("landlord", res.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  return (
    <div style={{ width: "90%", margin: "20px auto", fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1a839a",
          fontWeight: "600",
        }}
      >
        Maintenance Requests
      </h2>

      {/* Maintenance Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {maintenances.length > 0 ? (
          maintenances.map((maintenance) => (
            <div
              key={maintenance.id}
              style={{
                flex: "1 1 300px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={maintenance.property.url}
                alt={maintenance.property.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ margin: "5px 0", textAlign: "center" }}>
                Request: {maintenance.request}
              </h3>
              <h4 style={{ margin: "5px 0", textAlign: "center" }}>
                Property: {maintenance.property.title}
              </h4>

              {/* Status Button */}
              {maintenance.status === "submitted" ? (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Submitted
                </div>
              ) : maintenance.status === "in_progress" ? (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    backgroundColor: "#1a839a",
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  In-progress...
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Resolved
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100%",
              padding: "30px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3>No Maintenance Request Received!!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
