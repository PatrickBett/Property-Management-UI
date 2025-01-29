import { useEffect, useState } from "react"
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
      const res = await api.get("http://127.0.0.1:8000/api/properties/")
      setProperties(res.data)
      console.log(res.data)

    }
    catch(error){
      console.log(error)
      navigate('/login')
    }
    
  }

  return (
    <>
    <div className="border p-3 text-center text-primary">Properties</div>

    <div className="container mt-2 p-3"> 

      {properties.length > 0 ? 
        (properties.map((property,index)=>(
        <div className="container border col-lg-4 mt-2" key={index}>
         

          <div className="container-fluid mt-3 position-relative">
          <img src={property.url} style={{ width: "100%", margin: "0 auto", display: "block", borderRadius: "8px" }} alt="Property" />
          </div>


          <div 
  className="container-fluid mt-3 p-3 d-flex justify-content-between "
>
  <div className="property-title">
    <h5>{property.title}</h5>
    <button className="btn btn-secondary m-1">See More</button>
  </div>

  <div className="property-category-name">
  <p><i className="bi bi-house-door-fill me-2 "></i>{property.category.name}</p>

    {/* determine whether available or rented? */}
    <div 
      className="position-absolute top-0 end-0 m-3"
      style={{ zIndex: 2 }} // Ensures button stays above the image
    >
    {property.tenant ? 
      <button className="btn-danger">Rented</button>
    :
      <button className="btn-success">Available</button>
     }
     </div>
  </div>
</div>

          
          </div>
        )))
      : 
      <div>No Property available currently</div>}
      


    </div>

    </>
  )
}

export default Properties