import { useEffect, useState, useContext } from "react";
import api from "../../api";
import { HomeContext } from "../Contexts/HomeContext";

function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);
  const [maintainedhome, setMaintainedHome] = useState("");
  const { homes } = useContext(HomeContext);
  const [request, setRequest] = useState("");

  const handleMaintainedHome = async (e) => {
    e.preventDefault();
    const selectedHome = homes.find(
      (home) => home.property.title === maintainedhome
    );

    try {
      if (!selectedHome) {
        throw new Error("Selected property not found");
      }
      await api.post("/api/maintenances/", {
        property: selectedHome.property.id,
        request: request,
      });
      setMaintainedHome("");
      setRequest("");
      fetchMaintenances();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const res = await api.get("/api/maintenances/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setMaintenances(res.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1a839a",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ margin: 0 }}>Property Maintenance</h2>
        <button
          onClick={() =>
            (document.getElementById("myModal").style.display = "block")
          }
          style={{
            backgroundColor: "#1a839a",
            border: "1px solid white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <i className="bi bi-plus-circle-fill"></i> Maintenance
        </button>
      </div>

      {/* Modal */}
      <div
        id="myModal"
        style={{
          display: "none",
          position: "fixed",
          zIndex: 1000,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            margin: "10% auto",
            padding: "20px",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ margin: 0 }}>Add Maintenance</h4>
            <button
              onClick={() =>
                (document.getElementById("myModal").style.display = "none")
              }
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleMaintainedHome}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Property:
              </label>
              <select
                value={maintainedhome}
                onChange={(e) => setMaintainedHome(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #1a839a",
                }}
              >
                <option value="">Select a Property</option>
                {homes?.map((home) => (
                  <option key={home.property.id}>{home.property.title}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Request:
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Enter Request Message"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #1a839a",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  (document.getElementById("myModal").style.display = "none")
                }
                style={{
                  padding: "8px 15px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: "8px 15px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#1a839a",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {maintenances.length > 0 ? (
          maintenances.map((maintenance, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 300px",
                border: "1px solid #1a839a",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#e6f7fb",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={maintenance.property.url}
                alt="Property"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ marginTop: "10px", color: "#1a839a" }}>
                Request: {maintenance.request}
              </h3>
              <h4 style={{ color: "#1a839a" }}>
                Property: {maintenance.property.title}
              </h4>

              {maintenance.status === "submitted" ? (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Submitted
                </div>
              ) : maintenance.status === "in_progress" ? (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#1a839a",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  In-progress...
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
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
              textAlign: "center",
              backgroundColor: "#f0f8fa",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#1a839a" }}>No Maintenance Request made!!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
