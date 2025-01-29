
import api from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {

  
const [home ,setHome] = useState([])
const navigate = useNavigate()
const [username, setUsername] = useState("")
  
    useEffect(()=>{
      getHome()
    },[])
  
    const getHome =async() =>{
  
      try{
        const response = await api.get('http://127.0.0.1:8000/api/myhome')
        setHome(response.data)
        setUsername(response.data[0].tenant.username)
        console.log(response.data)
  
      }
      catch(error){
        console.log(error)
        navigate("/login")
      }
  
    }
  return (
    <>
    <div className="container border bg-secondary">
      
      <button className="btn-success my-2 p-5 cols-sm-4 mx-5">
      {/* {username ? `Welcome, ${username}!` : "Welcome!"} */}
      {username}
      </button>
      <button className="btn-warning my-2 p-5 cols-sm-4 mx-5">
        Notifications
      </button>
      <button className="btn-primary my-2 p-5 cols-sm-4 mx-5">
        Notifications
      </button>
      <button className="btn-danger my-2 p-5 cols-sm-4 mx-5">
        Notifications
      </button>
    </div>


    <div className="container border mt-3 rounded shadow-lg">
      <h2 className="text-center py-3">My Home</h2>

      { home.map((home,index)=>(
        <div className="container p-4 mb-4 rounded " key={index}>
       
       
        {/* Tenant's detail */}
        <div className="container-tenant border p-4 mx-1 my-1 shadow-lg">
        <img src={home.tenant.profile.profile} style={{
    width: "100px", 
    height: "100px", 
    borderRadius: "50%", 
    objectFit: "cover", 
    border: "2px solid #ddd", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  }}></img>
        
        <h5 className="text-primary mt-3">{home.property.title}</h5>
        <p>
          <strong>Tenant:</strong> {home.tenant.username} ({home.tenant.role})
        </p>
        <p>
          <strong>No of bedrooms:</strong> {home.property.category.name}
        </p>
        <p>
          <strong>Rent:</strong> {home.property.rent_amount} KES
        </p>

        <button className="btn btn-primary">Update Profile</button>

        </div>

{/* Landlord's detail */}
        <div className="container-landlord border p-4 mx-1 mt-4 mb-1 shadow-lg">
        <img 
  src={home.property.landlord.profile.profile} 
  alt="Landlord Profile" 
  style={{
    width: "100px", 
    height: "100px", 
    borderRadius: "50%", 
    objectFit: "cover", 
    border: "2px solid #ddd", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  }} 
/>

        <p className="mt-3">
          <strong>Landlord`s Email:</strong> {home.property.landlord.email}
        </p>
        <p>
          <strong>Landlord`s Phone:</strong> {home.property.landlord.phone_number}
        </p>
        </div>



      </div>
      
      )) }

    </div>
    </>
  )
}

export default Home