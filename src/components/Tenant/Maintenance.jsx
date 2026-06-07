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
      (home) => home.property.title === maintainedhome,
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
        margin: "20px auto"
        
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
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 className="fs-2" style={{ margin: 0 }}>
          Property Maintenance
        </h2>

        <button
          onClick={() =>
            (document.getElementById("myModal").style.display = "block")
          }
          className="fs-3"
          style={{
            backgroundColor: "#1a839a",
            border: "1px solid white",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "6px",
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
            padding: "25px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "520px",
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
            <h4 className="fs-3" style={{ margin: 0 }}>
              Add Maintenance
            </h4>
            <button
              onClick={() =>
                (document.getElementById("myModal").style.display = "none")
              }
              style={{
                border: "none",
                background: "transparent",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleMaintainedHome}>
            <div style={{ marginBottom: "15px" }}>
              <label
                className="fs-3"
                style={{ display: "block", marginBottom: "6px" }}
              >
                Property:
              </label>
              <select
                value={maintainedhome}
                onChange={(e) => setMaintainedHome(e.target.value)}
                className="fs-3"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
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
              <label
                className="fs-3"
                style={{ display: "block", marginBottom: "6px" }}
              >
                Request:
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Enter Request Message"
                className="fs-3"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
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
                className="fs-3"
                style={{
                  padding: "8px 15px",
                  borderRadius: "6px",
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
                className="fs-3"
                style={{
                  padding: "8px 15px",
                  borderRadius: "6px",
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
          marginTop: "25px",
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
                flex: "1 1 320px",
                border: "1px solid #1a839a",
                borderRadius: "12px",
                padding: "15px",
                backgroundColor: "#e6f7fb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={maintenance.property.url}
                alt="Property"
                style={{
                  width: "100%",
                  height: "210px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <h3
                className="fs-4"
                style={{ marginTop: "10px", color: "#1a839a" }}
              >
                Request: {maintenance.request}
              </h3>

              <h4 className="fs-3" style={{ color: "#1a839a" }}>
                Property: {maintenance.property.title}
              </h4>

              {maintenance.status === "submitted" ? (
                <div
                  className="fs-3"
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "6px",
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
                  className="fs-5"
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "6px",
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
                  className="fs-5"
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "6px",
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
              padding: "35px",
              textAlign: "center",
              backgroundColor: "#f0f8fa",
              borderRadius: "10px",
            }}
          >
            <h3 className="fs-3" style={{ color: "#1a839a" }}>
              No Maintenance Request made!!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
