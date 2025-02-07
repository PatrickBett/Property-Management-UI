import { useLocation } from "react-router-dom"
function PropertyDetails() {

    const location = useLocation()
    const property = location.state?.property; // Retrieve the passed property data
    console.log(property)
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
      <button className="btn btn-success">Book Now</button>
     }
        </div>

     
        
        
       
    </div>
  )
}

export default PropertyDetails