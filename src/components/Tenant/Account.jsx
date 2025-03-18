import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Account() {
  const [account, setAccount] = useState("");
  const token = localStorage.getItem("access")
  const navigate = useNavigate()


  useEffect(() => {
    // Redirect to login if no token is found

    if (!token){
      navigate("/login")
      return
    }


    const fetchAccount = async () => {
      
      try {
        const response = await api.get("/api/account/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        setAccount(response.data);
        
      } catch (error) {
        console.log(error);
      
      }
    };


    fetchAccount();

  }, [token,navigate]);// Dependencies ensure it runs when token or navigate changes



  return (
    <div className="container border p-4">
      {account && (
        <div className="row align-items-center">
          {/* Profile Image Section */}
          <h1 className="text-center border-bottom mb-3">Account Settings</h1>
          <div className="col-md-3 text-center">
            <img
              src={account.profile?.profile || "https://via.placeholder.com/150"}
              alt="Profile"
              className="m-4"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "3px solid grey",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          {/* User Information Section */}
          <div className="col-md-9 mt-2 mb-2 p-3">
            <div className="mb-4">
              <i className="bi bi-envelope-fill me-2 text-primary"></i>
              <strong>Email:</strong> {account.email}
            </div>
            <div className="mb-4">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              <strong>First Name:</strong> {account.first_name}
            </div>
            <div className="mb-4">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              <strong>Last Name:</strong> {account.last_name}
            </div>
            <div className="mb-4">
              <i className="bi bi-person-circle me-2 text-primary"></i>
              <strong>Username:</strong> {account.username}
            </div>
            <div className="mb-4">
              <i className="bi bi-telephone-fill me-2 text-primary"></i>
              <strong>Phone Number:</strong> {account.phone_number}
            </div>

            {/* Update Profile Button */}
            <button className="btn btn-primary">
              <i className="bi bi-pencil-fill me-2"></i> Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
