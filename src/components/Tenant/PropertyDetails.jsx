import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../../api";

// Stripe initialization
const stripePromise = loadStripe("pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG");

function CheckoutForm({ clientSecret, property }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } });

    if (error) {
      console.error(error.message);
      navigate("/payment-cancel");
    } else if (paymentIntent.status === "succeeded") {
      try {
        await api.post("/api/finalyze-payment/", {
          paymentIntentId: paymentIntent.id,
          status: "succeeded",
          property_id: property.id,
        });
      } catch (err) {
        console.error(err);
      }
      navigate("/payment-success");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ color: "#1a839a", marginBottom: "15px" }}>Payment Details</h3>
      <div style={{ marginBottom: "15px" }}>
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            backgroundColor: "#1a839a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      </div>
    </form>
  );
}

function PropertyDetails() {
  const location = useLocation();
  const property = location.state?.property;
  const [clientSecret, setClientSecret] = useState("");
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePaymentIntent = async () => {
    try {
      const response = await api.post("/api/create-payment-intent/", {
        amount: property.rent_amount,
        currency: "usd",
        property_id: property.id,
      });
      setClientSecret(response.data.clientSecret);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get("/api/post-review/", { params: { property_id: property.id } });
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/post-review/",
        { content, property_id: property.id },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      if (res.data.error) setError(res.data.error);
      else {
        setSuccess("Review added successfully");
        setContent("");
        fetchReviews();
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{ width: "95%", maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* Carousel & Details */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <div style={{ height: "400px", overflowY: "auto" }}>
              <Carousel
                showArrows
                showThumbs
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={1000}
                stopOnHover
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      onClick={onClickHandler}
                      title={label}
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ‹
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      onClick={onClickHandler}
                      title={label}
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ›
                    </button>
                  )
                }
              >
                {property.images.map((img) => (
                  <div key={img.id}>
                    <img
                      src={img.image}
                      alt="Property"
                      style={{ width: "100%", maxWidth: "100%", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div style={{ padding: "20px" }}>
              <h2 style={{ color: "#1a839a", marginBottom: "10px" }}>{property.title}</h2>
              <p style={{ margin: "5px 0" }}><strong>Price:</strong> Kshs{property.rent_amount}/month</p>
              <p style={{ margin: "5px 0" }}><strong>Location:</strong> {property.city}, {property.state}</p>
              <p style={{ margin: "5px 0" }}><strong>Type:</strong> {property.category.name}</p>
              <div style={{ marginTop: "15px" }}>
                <h5 style={{ borderBottom: "2px solid #1a839a", paddingBottom: "5px", marginBottom: "10px" }}>Description</h5>
                <p style={{ color: "#6c757d" }}>{property.description}</p>
              </div>
              {!property.tenant && !clientSecret && (
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  <button
                    onClick={handlePaymentIntent}
                    style={{
                      backgroundColor: "#1a839a",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              )}
              {property.tenant && (
                <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#dc3545", color: "white", borderRadius: "8px", textAlign: "center" }}>
                  This property is currently not available for rent.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment & Reviews */}
        <div style={{ flex: "1 1 350px", minWidth: "300px" }}>
          {clientSecret && !property.tenant && <Elements stripe={stripePromise} options={{ clientSecret }}><CheckoutForm clientSecret={clientSecret} property={property} /></Elements>}

          {/* Write Review */}
          <div style={{ marginTop: "20px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <div style={{ backgroundColor: "#1a839a", color: "white", padding: "15px" }}>
              <h4 style={{ margin: 0 }}>Write a Review</h4>
            </div>
            <div style={{ padding: "15px" }}>
              {error && <div style={{ marginBottom: "10px", color: "#dc3545" }}>{error}</div>}
              {success && <div style={{ marginBottom: "10px", color: "#28a745" }}>{success}</div>}
              <form onSubmit={handleSubmitReview} style={{ textAlign: "center" }}>
                <textarea
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "vertical", marginBottom: "10px" }}
                  rows={4}
                  placeholder="Share your experience..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#1a839a",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Property Reviews */}
          <div style={{ marginTop: "20px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}>
            <div style={{ backgroundColor: "#1a839a", color: "white", padding: "15px" }}>
              <h4 style={{ margin: 0 }}>Property Reviews</h4>
            </div>
            <div style={{ padding: "15px" }}>
              {reviews.length === 0 ? (
                <p style={{ color: "#6c757d", textAlign: "center", padding: "20px 0" }}>No reviews yet. Be the first to leave a review!</p>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <div key={review.id} style={{ marginBottom: "10px", padding: "10px", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ color: "#1a839a", fontWeight: "600" }}>Guest Review</span>
                        <small style={{ color: "#6c757d" }}>{new Date(review.created_at || Date.now()).toLocaleDateString()}</small>
                      </div>
                      <p style={{ margin: 0 }}>{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
