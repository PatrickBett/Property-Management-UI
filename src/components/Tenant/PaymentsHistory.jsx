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
        headers: { Authorization: `Bearer ${token}` },
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
      <div
        className="text-center p-5"
        
      >
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            border: "0.4rem solid #f3f3f3",
            borderTop: "0.4rem solid #1a839a",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        />
        <p className="fs-5 mt-4 text-muted">Loading payment history...</p>

        <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="fs-4 p-4 text-center bg-danger text-white rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      
    >
      {/* TITLE */}
      <h2
        className="fs-1 text-center mb-5 fw-bold"
        style={{ color: "#1a839a" }}
      >
        Payment History
      </h2>

      {paymentHistory.length === 0 ? (
        <div className="fs-2 text-center p-4 bg-info text-dark rounded">
          No payment history found
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table fs-5 shadow-sm rounded overflow-hidden">
            <thead className="table-light">
              <tr className="fs-2 fw-bold">
                <th>Property</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paymentHistory
                .filter((payment) => payment.status === "succeeded")
                .map((payment) => (
                  <tr key={payment.id} className="align-middle fs-2">
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={`https://propertyms.pythonanywhere.com/${payment.property.images[0].image}`}
                        alt={payment.property.title}
                        style={{
                          width: "55px",
                          height: "55px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                      <span className="fs-3">{payment.property.title}</span>
                    </td>

                    <td className="fs-3">${payment.amount}</td>

                    <td className="fs-3">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className="fs-3 px-3 py-2 rounded text-white"
                        style={{
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
