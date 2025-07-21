import { useEffect, useState } from "react";
import api from "../../api";

function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);

  const fetchMaintenances = async () => {
    try {
      const res = await api.get("/api/maintenances/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`, // Include auth token if required
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
    <>
      <div className="container">
        <h2 className="text-center">Maintenance Requests</h2>
      </div>
      {maintenances.length > 0 ? (
        maintenances.map((maintenance) => (
          <div key={maintenance.id} className="border mt-3 p-3 col-sm-4">
            <img
              src={maintenance.property.url}
              style={{ width: "100%", height: "200px" }}
            />
            <h2>Request: {maintenance.request}</h2>
            <h3>Property: {maintenance.property.title}</h3>
            {maintenance.status == "submitted" ? (
              <button className="btn btn-warning">Submitted</button>
            ) : maintenance.status == "in_progress" ? (
              <button className="btn btn-primary">In-progress...</button>
            ) : (
              <button className="btn btn-success">Resolved</button>
            )}
          </div>
        ))
      ) : (
        <div className="border p-3 m-3">
          <h3 className="p-3 m-3">No Maintenance Request Received!!</h3>
        </div>
      )}
    </>
  );
}

export default Maintenance;
