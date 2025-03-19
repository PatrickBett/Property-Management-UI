import api from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [homes, setHome] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("userRole");
  
  useEffect(() => {
    getHome();
  }, []);
  
  const getHome = async() => {
    try {
      const response = await api.get('https://spbproperty.pythonanywhere.com/api/myhome', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHome(response.data);
      if (response.data.length > 0) {
        setUsername(response.data[0].tenant.username);
      }
    } catch(error) {
      console.log(error);
      // navigate("/login")
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>
      {role ? (
        <div className="alert alert-info mb-4 text-center">
          <i className="bi bi-person-check me-2"></i>Logged In As <strong>{role}</strong>
        </div>
      ) : (
        <div className="alert alert-secondary mb-4 text-center">Welcome User</div>
      )}

      <h2 className="text-center py-3 mb-4">
        <i className="bi bi-house-door-fill me-2"></i>
        <span className="border-bottom border-primary pb-2">My Home</span>
      </h2>

      {homes && homes.length > 0 ? (
        homes.map((home, index) => (
          <div className="card shadow-lg mb-5" key={index}>
            <div className="card-header bg-primary text-white">
              <h4 className="m-0">{home.property.title}</h4>
            </div>
            
            {/* Tenant's details */}
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-md-4 p-4 text-center bg-light">
                  <img 
                    src={home.tenant.profile.profile} 
                    alt="Tenant Profile"
                    className="img-fluid rounded-circle shadow" 
                    style={{
                      width: "200px", 
                      height: "200px", 
                      objectFit: "cover",
                      border: "3px solid #fff"
                    }}
                  />
                  <h5 className="mt-3">{home.tenant.username}</h5>
                  <span className="badge bg-info">{home.tenant.role}</span>
                </div>
                
                <div className="col-md-8 p-4">
                  <div className="card mb-4">
                    <div className="card-header bg-success text-white">
                      <h5 className="m-0">
                        <i className="bi bi-person-badge me-2"></i>
                        Personal Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span><i className="bi bi-houses me-2"></i>Bedrooms</span>
                          <span className="badge bg-primary rounded-pill">{home.property.category.name}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span><i className="bi bi-wallet me-2"></i>Rent</span>
                          <span className="badge bg-success rounded-pill">{home.property.rent_amount} KES</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Landlord's details */}
                  <div className="card">
                    <div className="card-header bg-warning text-dark">
                      <h5 className="m-0">
                        <i className="bi bi-person-square me-2"></i>
                        Landlord Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 text-center mb-3">
                          <img 
                            src={home.property.landlord.profile.profile} 
                            alt="Landlord Profile" 
                            className="img-fluid rounded-circle shadow" 
                            style={{
                              width: "100px", 
                              height: "100px", 
                              objectFit: "cover",
                              border: "2px solid #eee" 
                            }} 
                          />
                        </div>
                        <div className="col-md-8">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <i className="bi bi-envelope-fill me-2 text-primary"></i>
                              {home.property.landlord.email}
                            </li>
                            <li className="list-group-item">
                              <i className="bi bi-telephone-fill me-2 text-success"></i>
                              {home.property.landlord.phone_number}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card shadow-lg">
          <div className="card-body p-5 text-center">
            <i className="bi bi-house-x text-muted" style={{ fontSize: "4rem" }}></i>
            <h3 className="mt-4 mb-3">No Home Currently</h3>
            <p className="lead mb-4">Looking for a new place?</p>
            <Link to='/tenant/properties/' className="btn btn-primary btn-lg">
              <i className="bi bi-search me-2"></i>Browse Homes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;