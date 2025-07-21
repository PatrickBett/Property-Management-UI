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
      console.log("Payment History", response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching payment history:", err);
      setError("Failed to load payment history");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading payment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary fw-bold">Payment History</h2>

      {paymentHistory.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No payment history found
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-light">
              <tr>
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
                  <tr key={payment.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={payment.property.url}
                          alt={payment.property.title}
                          className="rounded me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{payment.property.title}</span>
                      </div>
                    </td>
                    <td>${payment.amount}</td>
                    <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          payment.status === "succeeded"
                            ? "bg-success"
                            : payment.status === "pending"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
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
