import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
function PropertyDetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const property = location.state?.property; // Retrieve the passed property data
    console.log(property)


    const handlePayment =()=>{
      navigate("/payment", { state: { rentAmount: property.rent_amount } })
    }



  return (
    <div className="m-3 p-3">

        <div className="col-md-6">
            <img src={property.url} className="" style={{width:"100%",height:"60vh"}}/>
        </div>
        <div className="col-md-6">
            <h1>{property.title}</h1>
            <h4>Rent: {property.rent_amount}</h4>
            <h4>State: {property.state}</h4>
            <h4>City: {property.city}</h4>
            <h4>Bedrooms: {property.category.name}</h4>
            <h4>Description: {property.description}</h4>
            {property.tenant ? 
      <button className="btn btn-danger">Not available</button>
    :
      <button className="btn btn-success" onClick={handlePayment}>Book Now</button>
     }
        </div>
   
    </div>
  )
}

export default PropertyDetails