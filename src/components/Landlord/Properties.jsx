import { useState, useEffect } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"
function Properties() {

  const [properties, setProperties] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    fetchProperties()
    
  },[])

  const fetchProperties = async() =>{
    try{
      const res = await api.get("http://127.0.0.1:8000/api/myproperties/")
      setProperties(res.data)
      console.log(res.data)

    }
    catch(error){
      console.log(error)
      navigate("/login")
    }
    
  }

  return (
    <>
    <div className="container border shadow-lg p-4">My Properties</div>
    <div className="container border shadow-lg mt-3">
      {properties.map((property, index)=>(
        <div className="container border mt-2" key={index}>
          <img src={property.url} className="mt-3" style={{width: "100%"}}></img>
          <h3 className="mt-3 text-primary">{property.title}</h3>
          <p>City: {property.city}</p>
          <p>State: {property.state}</p>
          <p>Rent: {property.rent_amount}</p>

          {property.tenant ? (
            <p>Tenant: {property.tenant.username}</p>
          ):(
            <button className="btn btn-primary mb-2">Not Yet Rented</button>
          )}

        </div>
      ))}
    </div>
    </>
  )
}

export default Properties