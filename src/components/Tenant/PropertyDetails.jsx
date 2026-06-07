import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../../api";
import { toast,ToastContainer } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG",
);

/* ---------------- PAYMENT FORM ---------------- */
function CheckoutForm({ clientSecret, property }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card } },
    );

    if (error) {
      navigate("/payment-cancel");
    } else if (paymentIntent.status === "succeeded") {
      await api.post("/api/finalyze-payment/", {
        paymentIntentId: paymentIntent.id,
        property_id: property.id,
        status: "succeeded",
      });

      navigate("/payment-success");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <h3 className="fw-bold fs-2 text-primary mb-3">Payment Details</h3>

      <div className="mb-3">
        <CardElement />
      </div>

      <button
        className="btn btn-primary w-100 fs-3 py-2"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Complete Payment"}
      </button>
    </form>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function PropertyDetails() {
  const location = useLocation();
  const property = location.state?.property;
  const [clientSecret, setClientSecret] = useState("");
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ---------------- FETCH REVIEWS ---------------- */
  const fetchReviews = async () => {
    try {
      const res = await api.get("/api/post-review/", {
        params: { property_id: property.id },
      });

      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- PAYMENT INTENT ---------------- */
  const handlePaymentIntent = async () => {
    try {
      const res = await api.post("/api/create-payment-intent/", {
        amount: property.rent_amount,
        currency: "usd",
        property_id: property.id,
      });

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/api/post-review/",
        { content, property_id: property.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.error) {
        setError(res.data.error);
        toast.error("You give only reviews to homes you have stayed in.");
      } else {
        setSuccess("Review added successfully");
        toast.success("Review added successfully");
        setContent("");
        fetchReviews();
      }
    } catch (err) {
      setError("Something went wrong.");
      toast.error("Something went wrong");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container py-5">
      <ToastContainer />

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            {/* IMAGES */}
            <Carousel showThumbs showStatus={false} infiniteLoop autoPlay>
              {property.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  className="img-fluid"
                  style={{ height: "420px", objectFit: "cover" }}
                />
              ))}
            </Carousel>

            {/* DETAILS */}
            <div className="p-4">
              <h2 className="fw-bold fs-1 text-primary">{property.title}</h2>

              <div className="d-flex gap-3 fs-3 mb-3">
                <span>💰 {property.rent_amount} KES</span>
                <span>
                  📍 {property.city}, {property.state}
                </span>
                <span>🏠 {property.category.name}</span>
              </div>

              <p className="fs-3 text-muted">{property.description}</p>

              {!property.tenant && !clientSecret && (
                <button
                  onClick={handlePaymentIntent}
                  className="btn btn-primary fs-3 px-4 py-2"
                >
                  Book Now
                </button>
              )}

              {property.tenant && (
                <div className="alert alert-danger fs-3 mt-3">
                  This property is not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-5">
          {/* PAYMENT */}
          {clientSecret && !property.tenant && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} property={property} />
            </Elements>
          )}

          {/* REVIEW FORM */}
          <div className="card shadow-sm border-0 mt-4">
            <div className="card-header bg-primary text-white fs-2">
              Write Review
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmitReview}>
                <textarea
                  className="form-control fs-3 mb-3"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your experience..."
                />

                <button
                  className="btn btn-primary w-100 fs-3"
                  disabled={loading}
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="card shadow-sm border-0 mt-4">
            <div className="card-header bg-dark text-white fs-2">Reviews</div>

            <div className="card-body">
              {reviews.length === 0 ? (
                <p className="fs-3 text-muted">No reviews yet</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between fs-3">
                      <strong>Guest</strong>
                      <small>
                        {new Date(r.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="fs-3 mb-0">{r.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
