import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../api";

// Initialize Stripe outside the component
const stripePromise = loadStripe("pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG");

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log("first",clientSecret)
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

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      navigate("/payment-cancel");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!", paymentIntent);
      navigate("/payment-success");
    } else {
      console.error("Unexpected payment status:", paymentIntent.status);
      navigate("/payment-cancel");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border mt-5 p-3 bg-light">
      <h2 className="p-3">Payment By Card</h2>
      <CardElement className="border p-3 mt-3" />
      <button type="submit" className="btn btn-primary mt-3 p-3" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

function PropertyDetails() {
  const location = useLocation();
  const [paymentdata, setPaymentData] = useState('')
  const property = location.state?.property;
  const [clientSecret, setClientSecret] = useState("");

  const handlePaymentIntent = async () => {
    try {
      const response = await api.post("http://127.0.0.1:8000/api/create-payment-intent/", {
        amount: property.rent_amount,
        currency: "usd",
        property_id: property.id,
      });

      setClientSecret(response.data.clientSecret);
      setPaymentData(response.data)
      
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  return (
    <div className="m-3 p-3">
      <div className="col-md-6">
        <img src={property.url} style={{ width: "100%", height: "60vh" }} alt="Property" />
      </div>
      <div className="col-md-6">
        <h1>{property.title}</h1>
        <h4>Rent: {property.rent_amount}</h4>
        <h4>State: {property.state}</h4>
        <h4>City: {property.city}</h4>
        <h4>Bedrooms: {property.category.name}</h4>
        <h4>Description: {property.description}</h4>

        {property.tenant ? (
          <button className="btn btn-danger">Not available</button>
        ) : (
          <>
            <button className="btn btn-success" onClick={handlePaymentIntent}>
              Book Now
            </button>

            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
