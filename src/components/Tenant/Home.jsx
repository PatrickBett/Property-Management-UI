
import api from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {

  
const [homes ,setHome] = useState([])
const navigate = useNavigate()
const [username, setUsername] = useState("")
const token = localStorage.getItem("access")
const role = localStorage.getItem("userRole")
  
    useEffect(()=>{
      getHome()
    },[])

  
  
    const getHome =async() =>{
      
      try{
        const response = await api.get('https://spbproperty.pythonanywhere.com/api/myhome',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setHome(response.data)
        setUsername(response.data[0].tenant.username)
        
  
      }
      catch(error){
        
        console.log(error)
        // navigate("/login")
      }
  
    }

 
  return (
    <>



    <div className="container mt-3" style={{ fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>

    {role ? `Logged In As ${role}` : "Welcome User"}


      <h2 className="text-center py-3"><i className="bi bi-house-door-fill me-2 "></i>My Home</h2>


      {homes && homes.length>0 ? 

              (homes.map((home,index)=>(
                <div className="container p-4 mb-4 rounded " key={index}>
               
               
                {/* Tenant's detail */}
                <div className="container tenant border p-4 mx-1 my-1 shadow-lg " style={{backgroundColor:"#b1cbbb"}}>
                
        
                <div className="tenant-profile col-sm-4 " >
                <img src={home.tenant.profile.profile} style={{
            width: "200px", 
            height: "200px", 
            borderRadius: "50%", 
            objectFit: "cover", 
            
            
            
            
          }}></img>
        
                </div>
        
        
                <div className="tenant-info col-sm-8 mt-2" >
                <h3 style={{borderBottom: "1px solid #e3e0e0", textAlign: "center",backgroundColor:"orangered"}} className="py-2 text-light">
                   Personal Information
                </h3>
  <h5 className="text-primary mt-3 p-2 " style={{ borderBottom: "1px solid #e3e0e0" }}>
    {home.property.title}
  </h5>
  <p style={{ borderBottom: "1px solid #e3e0e0" }} className="p-2">
    <strong><i className="bi bi-person-circle me-2"></i>Tenant:</strong> {home.tenant.username} ({home.tenant.role})
  </p>
  <p style={{ borderBottom: "1px solid #e3e0e0" }} className="p-2">
    <strong><i className="bi bi-houses me-2"></i>No of bedrooms:</strong> {home.property.category.name}
  </p>
  <p style={{ borderBottom: "1px solid #e3e0e0" }} className="p-2">
    <strong><i className="bi bi-wallet me-2"></i>Rent:</strong> {home.property.rent_amount} KES
  </p>
  
</div>

        
                </div>
        
        {/* Landlord's detail */}
                <div className="container border p-4 mx-1 mt-4 mb-1 shadow-lg" >
        
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
        
        <div className="landlord-info col-sm-8 mt-2 shadow-lg" >
               <h3 style={{borderBottom: "1px solid #e3e0e0", textAlign: "center",backgroundColor:"orangered"}} className="py-2 text-light">
                   Landlords Information
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
        <h3 className="font-bold antialiased text-4xl text-green8 mb-4 p-3">No Home Currently. Searching for a home? <Link to='/tenant/properties/'>Homes</Link></h3>
      </div>


        
      

            }

    </div>
    </>
  )
}

export default Home












