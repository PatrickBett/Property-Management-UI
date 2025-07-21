import { useEffect, useState } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Properties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // function to fetch properties
  const fetchProperties = async () => {
    try {
      const res = await api.get("/api/properties/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setProperties(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <div className="bg-primary text-white py-4 mb-4 shadow-sm">
        <div className="container">
          <h2 className="text-center m-0">
            <i className="bi bi-buildings me-2"></i>
            Available Properties
          </h2>
        </div>
      </div>

      <div className="container py-4">
        {properties.length > 0 ? (
          <div className="row g-4">
            {properties.map((property, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  <div className="position-relative">
                    {property.images && property.images.length > 0 && (
                      <div key={property.images[0].id}>
                        <img
                          src={property.images[0].image}
                          alt="Property"
                          className="card-img-top object-fit-cover"
                        />
                      </div>
                    )}

                    <div className="position-absolute top-0 end-0 m-3">
                      {property.tenant ? (
                        <span className="badge bg-danger px-3 py-2 rounded-pill">
                          <i className="bi bi-x-circle me-1"></i>Rented
                        </span>
                      ) : (
                        <span className="badge bg-success px-3 py-2 rounded-pill">
                          <i className="bi bi-check-circle me-1"></i>Available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title mb-3">{property.title}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-light text-dark p-2">
                        <i className="bi bi-house-door-fill me-1 text-primary"></i>
                        {property.category.name}
                      </span>
                      <span className="badge bg-info text-white p-2">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {property.location || "Location"}
                      </span>
                    </div>
                  </div>

                  <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                    <Link
                      to="/property/property-details"
                      state={{ property }}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-info-circle me-1"></i>
                      See Details
                    </Link>
                    <div className="text-end">
                      <p className="text-success mb-0 fw-bold">
                        {property.rent_amount
                          ? `${property.rent_amount} KES`
                          : "Price on request"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center p-5 shadow-sm">
            <div className="py-5">
              <i
                className="bi bi-house-slash text-muted"
                style={{ fontSize: "4rem" }}
              ></i>
              <h3 className="mt-4 mb-3">No Properties Available</h3>
              <p className="text-muted mb-4">
                Check back later for new listings
              </p>
              <button
                onClick={() => fetchProperties()}
                className="btn btn-outline-primary"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Properties;
