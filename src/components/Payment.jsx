import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe("pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate()

    const rentAmount = location.state?.rentAmount || 0;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet. Please try again.");
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        setLoading(true);

        if (error) {
            setError(error.message);
            setLoading(false); // Stop loading on error
        } else {
            console.log("Payment successful", paymentMethod);
            
            navigate('/payment-success')
            // Send paymentMethod.id to backend for further processing
            setLoading(false); // Stop loading after success
        }
    };

    

    return (
        <form 
            onSubmit={handleSubmit} 
            className="container border rounded p-3 bg-dark text-white mt-5" 
            style={{ maxWidth: "500px", height: "50vh" }}
        >
            <h1 className="text-center py-5">Payment Page</h1>
            <div className="mb-3 p-3 bg-secondary rounded">

                <CardElement className="form-control p-3 bg-light rounded" />
            </div>

            <button 
                type="submit" 
                disabled={!stripe || loading} 
                className="btn btn-primary w-100"
            >
                {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    `Pay Now $${rentAmount}`
                )}
            </button>

            {error && <div className="mt-3 alert alert-danger">{error}</div>}
        </form>
    );
};

const App = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default App;
