// http://127.0.0.1:8000/api/account/
import { useState, useEffect } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"
function Account() {
  const [account, setAccount] = useState("")
  const navigate = useNavigate()

  useEffect(
   ()=>{
    const fetchAccount= async()=>{
      try{
        const response = await api.get("http://127.0.0.1:8000/api/account/")
        setAccount(response.data)
        console.log(response.data)
  
      }
      catch(error){
        console.log(error)
        navigate("/login")
        
      }
    }
    fetchAccount()
   } 
   ,[navigate])





  return (
    <div className="container border" >
      {account &&(
        <>
        <h1 className="text-center border-bottom mb-3">Account Settings</h1>
         <div className="col-md-3" >
         <img 
  src={account.profile?.profile} 
  alt="Profile"
  className="m-4"
  style={{
    borderRadius: "50%",  // Makes it circular
    width: "150px",        // Set width
    height: "150px", 
          // Set height
    objectFit: "cover",    // Ensures the image covers the area without distortion
    border: "3px solid #007bff", // Optional border with primary color
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" // Soft shadow effect
  }}
/>

           
          </div>

          <div className="col-md-9 mt-2 mb-2 p-5">
            <h4>Email: </h4>{account.email}
            <h4>First Name: </h4>{account.first_name}
            <h4>Last Name: </h4>{account.last_name}
            <h4>Username: </h4>{account.username}
            <h4>Phone Number: </h4>{account.phone_number}<br/>
            <button className="btn btn-primary"><i className="bi bi-pencil-fill me-2"></i>Update Profile</button>

          </div>
        </>
         
        )
      }

    </div>
  )
}

export default Account