import React from "react";

function Payments() {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        padding: "50px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Page Header */}
      <h2
        style={{
          color: "#1a839a",
          fontWeight: "600",
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        My Payments
      </h2>

      {/* Placeholder Content */}
      <div
        style={{
          padding: "30px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          You have not received any payments yet.
        </p>
      </div>

      {/* Example future table structure */}
      <div style={{ marginTop: "40px", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              {["Property", "Amount", "Date", "Status"].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "12px",
                    borderBottom: "2px solid #ddd",
                    textAlign: "left",
                    backgroundColor: "#e9ecef",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px" }}>Sample Property</td>
              <td style={{ padding: "12px" }}>$0.00</td>
              <td style={{ padding: "12px" }}>--/--/----</td>
              <td style={{ padding: "12px" }}>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
