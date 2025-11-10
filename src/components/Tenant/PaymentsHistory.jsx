import React, { useState, useEffect } from "react";
import api from "../../api";

function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/payment-history/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaymentHistory(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching payment history:", err);
      setError("Failed to load payment history");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontFamily: "Poppins, sans-serif" }}>
        <div
          style={{
            width: "3rem",
            height: "3rem",
            border: "0.4rem solid #f3f3f3",
            borderTop: "0.4rem solid #1a839a",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p style={{ marginTop: "20px", fontSize: "1rem", color: "#555" }}>
          Loading payment history...
        </p>
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px", fontFamily: "Poppins, sans-serif" }}>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "90%", margin: "0 auto", padding: "50px 0", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ marginBottom: "30px", color: "#1a839a", fontWeight: "600", textAlign: "center" }}>
        Payment History
      </h2>

      {paymentHistory.length === 0 ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#d1ecf1",
            color: "#0c5460",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: "600" }}>No payment history found</span>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <thead>
              <tr>
                {["Property", "Amount", "Date", "Status"].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "2px solid #ddd",
                      backgroundColor: "#f8f9fa",
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
              {paymentHistory
                .filter((payment) => payment.status === "succeeded")
                .map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={`https://propertyms.pythonanywhere.com/${payment.property.images[0].image}`}
                        alt={payment.property.title}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                      />
                      <span>{payment.property.title}</span>
                    </td>
                    <td style={{ padding: "12px" }}>${payment.amount}</td>
                    <td style={{ padding: "12px" }}>
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          color: "white",
                          fontWeight: "600",
                          backgroundColor:
                            payment.status === "succeeded"
                              ? "#28a745"
                              : payment.status === "pending"
                              ? "#ffc107"
                              : "#dc3545",
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
