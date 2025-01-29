
import api from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {

  
const [homes ,setHome] = useState([])
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
        // navigate("/login")
      }
  
    }
  return (
    <>
    <div className="container border bg-secondary">
      
      {/* <button className="btn-success my-2 p-5 cols-sm-4 mx-5">
      
      {username}
      </button> */}
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
      <h2 className="text-center py-3"><i className="bi bi-house-door-fill me-2 "></i>My Home</h2>


      {homes && homes.length>0 ? 

              (homes.map((home,index)=>(
                <div className="container p-4 mb-4 rounded " key={index}>
               
               
                {/* Tenant's detail */}
                <div className="container tenant border p-4 mx-1 my-1 shadow-lg ">
                
        
                <div className="tenant-profile col-sm-4 ">
                <img src={home.tenant.profile.profile} style={{
            width: "200px", 
            height: "200px", 
            borderRadius: "50%", 
            objectFit: "cover", 
            
            
            
          }}></img>
        
                </div>
        
        
              <div className="tenant-info border col-sm-8 mt-2 shadow-lg ">
                <h5 className="text-primary mt-3 p-2" style={{borderBottom: "1px solid #e3e0e0"}}>{home.property.title}</h5>
                <p style={{borderBottom: "1px solid #e3e0e0"}} className="p-2">
                  <strong><i className="bi bi-person-circle me-2"></i>Tenant:</strong> {home.tenant.username} ({home.tenant.role})
                </p>
                <p style={{borderBottom: "1px solid #e3e0e0"}} className="p-2">
                  <strong><i className="bi bi-houses me-2"></i>No of bedrooms:</strong> {home.property.category.name}
                </p>
                <p style={{borderBottom: "1px solid #e3e0e0"}} className="p-2">
                  <strong><i className="bi bi-wallet me-2"></i>Rent:</strong> {home.property.rent_amount} KES
                </p>
        
                <button className="btn btn-primary mb-2"><i className="bi bi-pencil-fill me-2"></i>Update Profile</button>
                </div>
                
        
        
        
        
                
        
                </div>
        
        {/* Landlord's detail */}
                <div className="container border p-4 mx-1 mt-4 mb-1 shadow-lg">
        
                <div className="landlord-profile col-sm-4">
        
        
                <img 
          src={home.property.landlord.profile.profile} 
          alt="Landlord Profile" 
          style={{
            width: "200px", 
            height: "200px", 
            borderRadius: "50%", 
            objectFit: "cover", 
            border: "2px solid #ddd", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
          }} 
        />
        
        </div>
        
        <div className="landlord-info col-sm-8 border mt-2 shadow-lg">
               <h3 style={{borderBottom: "1px solid #e3e0e0", textAlign: "center"}} className="py-2">
                   {home.property.landlord.first_name} {home.property.landlord.last_name}
                </h3>
        
                <p className="mt-3" style={{borderBottom: "1px solid #e3e0e0"}}>
                  <strong><i className="bi bi-envelope-fill me-2"></i>Landlord`s Email:</strong> {home.property.landlord.email}
                </p>
                <p style={{borderBottom: "1px solid #e3e0e0"}}>
                  <strong><i className="bi bi-telephone-fill me-2"></i>Landlord`s Phone:</strong> {home.property.landlord.phone_number}
                </p>
        
                
        
         </div>       
                </div>
        
        
        
              </div>
              
              )) )
      :

      <div className="container border my-3 p-2">
        <h3 className="p-3">No Home Currently. Searching for a home? <Link to='/tenant/properties/'>Homes</Link></h3>
      </div>


        
      

            }

    </div>
    </>
  )
}

export default Home












