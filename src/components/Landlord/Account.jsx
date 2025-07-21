// http://127.0.0.1:8000//api/account/
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
        const response = await api.get("/api/account/")
        setAccount(response.data)
        
  
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
    <div className="container py-4">
  {account && (
    <div className="card shadow border-0">
      <div className="card-header bg-white">
        <h1 className="text-center text-primary my-3">Account Settings</h1>
      </div>
      
      <div className="card-body">
        <div className="row">
          {/* Profile Image Column */}
          <div className="col-md-4 text-center d-flex justify-content-center align-items-start">
            <img 
              src={account.profile?.profile} 
              alt="Profile"
              className="my-4"
              style={{
                borderRadius: "50%",
                width: "180px",
                height: "180px",
                objectFit: "cover",
                border: "4px solid #007bff",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)"
              }}
            />
          </div>
          
          {/* User Details Column */}
          <div className="col-md-8">
            <div className="p-3">
              <div className="row mb-3">
                <div className="col-md-4">
                  <h5 className="text-muted mb-0">Email</h5>
                </div>
                <div className="col-md-8">
                  <p className="fs-5 mb-0">{account.email}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <h5 className="text-muted mb-0">First Name</h5>
                </div>
                <div className="col-md-8">
                  <p className="fs-5 mb-0">{account.first_name}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <h5 className="text-muted mb-0">Last Name</h5>
                </div>
                <div className="col-md-8">
                  <p className="fs-5 mb-0">{account.last_name}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <h5 className="text-muted mb-0">Username</h5>
                </div>
                <div className="col-md-8">
                  <p className="fs-5 mb-0">{account.username}</p>
                </div>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-4">
                  <h5 className="text-muted mb-0">Phone Number</h5>
                </div>
                <div className="col-md-8">
                  <p className="fs-5 mb-0">{account.phone_number}</p>
                </div>
              </div>
              
              <div className="d-flex justify-content-md-start mt-3">
                <button className="btn btn-primary btn-lg">
                  <i className="bi bi-pencil-fill me-2"></i>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  )
}

export default Account