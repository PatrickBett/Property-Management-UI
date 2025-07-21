import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Account() {
  const [account, setAccount] = useState("");
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate("/login");
      return;
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
  }, [token, navigate]); // Dependencies ensure it runs when token or navigate changes

  return (
    <div className="container py-5">
      {account && (
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white p-4">
            <h2 className="m-0 text-center">
              <i className="bi bi-person-gear me-2"></i>
              Account Settings
            </h2>
          </div>
          
          <div className="card-body p-0">
            <div className="row g-0">
              {/* Profile Image Section */}
              <div className="col-lg-4 bg-light p-4 text-center d-flex flex-column align-items-center justify-content-center">
                <div className="position-relative mb-4">
                  <img
                    src={account.profile?.profile || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle img-thumbnail shadow"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      border: "4px solid #fff",
                    }}
                  />
                  <button className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-2">
                    <i className="bi bi-camera-fill"></i>
                  </button>
                </div>
                
                <h4 className="mt-3 mb-1">{account.first_name} {account.last_name}</h4>
                <p className="text-muted mb-3">@{account.username}</p>
                
                <button className="btn btn-outline-primary w-75 mt-2">
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit Profile
                </button>
              </div>

              {/* User Information Section */}
              <div className="col-lg-8 p-4">
                <h4 className="mb-4 pb-2 border-bottom">
                  <i className="bi bi-info-circle me-2"></i>
                  Personal Information
                </h4>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                            <i className="bi bi-envelope-fill text-primary"></i>
                          </div>
                          <div>
                            <h6 className="text-muted mb-1">Email Address</h6>
                            <p className="mb-0 fw-bold">{account.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                            <i className="bi bi-telephone-fill text-primary"></i>
                          </div>
                          <div>
                            <h6 className="text-muted mb-1">Phone Number</h6>
                            <p className="mb-0 fw-bold">{account.phone_number}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                            <i className="bi bi-person-fill text-primary"></i>
                          </div>
                          <div>
                            <h6 className="text-muted mb-1">First Name</h6>
                            <p className="mb-0 fw-bold">{account.first_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                            <i className="bi bi-person-fill text-primary"></i>
                          </div>
                          <div>
                            <h6 className="text-muted mb-1">Last Name</h6>
                            <p className="mb-0 fw-bold">{account.last_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn btn-primary px-4 py-2">
                    <i className="bi bi-save me-2"></i>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!account && (
        <div className="card shadow-sm p-5 text-center">
          <div className="py-5">
            <div className="spinner-border text-primary mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading your account information...</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;