import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


// Load Stripe with your Publishable Key
const stripePromise = loadStripe("pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG");

const CheckoutForm = () => {
 
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Fetch the PaymentIntent client_secret from the backend
  const createPaymentIntent = async (amount) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-payment-intent/",
        { amount: amount * 100 }, // Ensure amount is converted to cents
        {
          headers: {
            "Content-Type": "application/json", // Tell the server it's JSON
          },
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error.response?.data || error.message);
    }
  };
  
  

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setPaymentStatus("Payment failed: " + error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus("Payment successful!");
    }
  };

  return (
    <div>
      <button onClick={() => createPaymentIntent(100)}>Pay $100</button>
      {/* Replace with dynamic amount */}
      {clientSecret && (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || !clientSecret}>
            Pay
          </button>
        </form>
      )}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

// Wrap CheckoutForm in Stripe Elements
const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
