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

// Initialize Stripe outside the component
const stripePromise = loadStripe(
  "pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG"
);

function CheckoutForm({ clientSecret, property }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement is not found.");
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error.message);
      navigate("/payment-cancel");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful property ID!", property);

      try {
        const paymentshistory = await api.post("/api/finalyze-payment/", {
          paymentIntentId: paymentIntent.id,
          status: "succeeded",
          property_id: property.id,
        });
        console.log("Payment Confirmed Successful Response", paymentshistory);
      } catch (error) {
        console.log(error);
      }

      navigate("/payment-success");
    } else {
      console.error("Unexpected payment status:", paymentIntent.status);
      navigate("/payment-cancel");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded shadow-sm mt-5 p-4 bg-light"
    >
      <h3 className="mb-4 text-primary fw-bold">Payment Details</h3>
      <div className="mb-4">
        <CardElement
          className="border rounded p-3"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary py-2 px-4 fw-bold"
        disabled={!stripe || loading}
        style={{ minWidth: "150px" }}
      >
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </span>
        ) : (
          "Complete Payment"
        )}
      </button>
    </form>
  );
}

function PropertyDetails() {
  const location = useLocation();
  const [paymentdata, setPaymentData] = useState("");
  const property = location.state?.property;
  const property_images = property.images;
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Function to post the review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/api/post-review/",
        {
          content: content,
          property_id: property.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.error) {
        setError(res.data.error);
        setContent("");
      } else {
        setSuccess("Review added successfully");
        setContent("");
        // Refresh reviews after adding a new one
        fetchReviews();
      }
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.error || "Something went wrong.");
      } else {
        setError("Network error. Please try again.");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/post-review/`, {
        params: { property_id: property.id },
      });

      setReviews(res.data);
    } catch (err) {
      setError("Failed to load reviews.");
      console.error(err);
    }
  };

  const handlePaymentIntent = async () => {
    try {
      const response = await api.post("/api/create-payment-intent/", {
        amount: property.rent_amount,
        currency: "usd",
        property_id: property.id,
      });

      setClientSecret(response.data.clientSecret);
      console.log("response.data.clientSecret", response.data.clientSecret);
      setPaymentData(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm overflow-hidden h-100">
            {/* <img 
              src={property.url} 
              className="card-img-top object-fit-cover" 
              alt={property.title}
              style={{ height: "400px" }} 
            /> */}

            {/* Image Carousel */}
            <div className="max-w-2xl mx-auto mt-4">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
              >
                {property.images.map((img) => (
                  <div key={img.id}>
                    <img src={img.image} alt="Property" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="card-body bg-light p-4">
              <h2 className="card-title text-primary mb-3">{property.title}</h2>
              <div className="property-details mb-4">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-currency-dollar me-2 text-success fs-5"></i>
                      <div>
                        <small className="text-muted d-block">Price</small>
                        <span className="fw-bold">
                          Kshs{property.rent_amount}/month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt me-2 text-danger fs-5"></i>
                      <div>
                        <small className="text-muted d-block">Location</small>
                        <span className="fw-bold">
                          {property.city}, {property.state}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-house-door me-2 text-primary fs-5"></i>
                      <div>
                        <small className="text-muted d-block">
                          Property Type
                        </small>
                        <span className="fw-bold">
                          {property.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Description</h5>
                <p className="text-muted">{property.description}</p>
              </div>

              {property.tenant ? (
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>This property is currently not available for rent.</div>
                </div>
              ) : (
                <div className="text-center">
                  {!clientSecret ? (
                    <button
                      className="btn btn-success btn-lg px-4 py-2"
                      onClick={handlePaymentIntent}
                    >
                      <i className="bi bi-check-circle me-2"></i> Book Now
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          {clientSecret && !property.tenant && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} property={property} />
            </Elements>
          )}

          <div className="card shadow-sm rounded mb-4">
            <div className="card-header bg-white py-3">
              <h4 className="m-0 fw-bold text-primary">Write a Review</h4>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Share your experience with this property..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="card shadow-sm rounded">
            <div className="card-header bg-success text-white py-3">
              <h4 className="m-0">Property Reviews</h4>
            </div>
            <div className="card-body p-3">
              {reviews.length > 0 ? (
                <div className="list-group">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="list-group-item list-group-item-action p-3 mb-2 bg-light rounded"
                    >
                      <div className="d-flex w-100 justify-content-between mb-1">
                        <h6 className="mb-1 text-primary">Guest Review</h6>
                        <small className="text-muted">
                          {new Date(
                            review.created_at || Date.now()
                          ).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-1">{review.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-chat-square-text text-muted fs-1 d-block mb-3"></i>
                  <p className="text-muted mb-0">
                    No reviews yet. Be the first to leave a review!
                  </p>
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
