import { useEffect, useState } from "react"
import api from "../../api"


function Properties() {

  const [properties, setProperties] = useState([])

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
    }
    
  }

  return (
    <>
    <div className="border p-3 text-center text-primary">Properties</div>

    <div className="container-fluid mt-2 p-3"> 

      {properties.length > 0 ? 
        (properties.map((property,index)=>(
        <div className="container border m-1 p-3 col-md-3" key={index}>
         

          <div className="container-fluid mt-3">
          <img src={property.url} style={{ width: "100%", margin: "0 auto", display: "block", borderRadius: "8px" }} alt="Property" />
          </div>


          <div className="container-fluid border mt-3 p-3">
            <h3>{property.title}</h3>
            <button className="btn btn-secondary m-1">See More</button>
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