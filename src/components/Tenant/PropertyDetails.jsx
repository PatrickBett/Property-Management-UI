import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../api";

// Initialize Stripe outside the component
const stripePromise = loadStripe("pk_test_51OeBjFF11zjK1PObRcOLVS4OiagIrRa6TnECSaI7lrMkV59jyBDEkyLpNaz63nHJKcL7JLNmhUXTYN5oNm0cAqxX00i3WBd2FG");

function CheckoutForm({ clientSecret, property }) {

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
    
      console.log("Payment successful property ID!", property);


      try{
        const paymentshistory = await api.post("https://spbproperty.pythonanywhere.com/api/finalyze-payment/",
          {paymentIntentId: paymentIntent.id,
            status: 'succeeded',
            property_id: property.id,
          }
        )
        console.log("Payment Confirmed Successful Response", paymentshistory)

      }
      catch(error){
        console.log(error)

      }

      

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
  const navigate = useNavigate();
  

  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([])
  
  

  // Function to post the review
  const handleSubmit =async (e)=>{
    e.preventDefault()
    setLoading(true)

    try{
      const token = localStorage.getItem("token");
      
  
      const res = await api.post("https://spbproperty.pythonanywhere.com/api/post-review/",{
        "content":content,
        "property_id" : property.id

      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass auth token if required
          "Content-Type": "application/json",
        },
      }
    )
    

    if (res.data.error){
      setError(res.data.error)
      setContent("")
    }
    else{
      setSuccess("Review added successfully")
      setContent("")
    }
 
    }
    catch(e){
      if (e.response && e.response.data) {
        setError(e.response.data.error || "Something went wrong.");
      } else {
        setError("Network error. Please try again.");
      }
      console.error(e);
      
    }
    finally{
      setLoading(false)
      
    }
    
  }



  // function to fetch reviews


  useEffect(
    ()=>{
      fetchReviews()
    },[]
  )

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/post-review/`, {
        params: { property_id: property.id },
      });
      
      setReviews(res.data);
      console.log(res.data)
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
      setPaymentData(response.data)
      console.log("Response data intent",response.data)

      
      
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
                <CheckoutForm clientSecret={clientSecret} property={property} />
              </Elements>
            )}
          </>
        )}

<div className="card p-3 mt-4">
            <h5 className="card-title">Write a Review</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    
                    <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Share your experience..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>

        {/* Listng Reviews section */}

        <div className="card p-3 mt-3 border">
  <h5 className="card-title bg-success p-4">Reviews</h5>

  {reviews.length > 0 ? (
    <ol className="list-group list-group-flush">
      {reviews.map((review) => (
        <li key={review.id} className="list-group-item bg-light border mt-2">
          <p className="review-content " style={{fontSize: "14px",
  color: "black",
  marginTop: "5px"}}>{review.content}</p>
        </li>
      ))}
    </ol>
  ) : (
    <p className="text-muted">No reviews yet. Be the first to leave a review!</p>
  )}
</div>


      </div>

      


    </div>
  );
}

export default PropertyDetails;
