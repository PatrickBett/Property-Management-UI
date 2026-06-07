import { useEffect, useState } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProperties } from "../../hooks/useProperty";

function Properties() {
  
  const {properties, isPending, error} = useProperties()
  console.log("This Query Error:", error);
  console.log("Properties sfetched", properties)
  // const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  useEffect(() => {
    if (properties?.length > 0) {
      setFilteredProperties(properties);

      const uniqueCategories = [
        ...new Set(properties.map((p) => p.category.name)),
      ];

      setCategories(uniqueCategories);
    }
  }, [properties]);

  // const fetchProperties = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await api.get("/api/properties/", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access")}`,
  //       },
  //     });

  //     setProperties(res.data);
  //     setFilteredProperties(res.data);

  //     const uniqueCategories = [
  //       ...new Set(res.data.map((p) => p.category.name)),
  //     ];
  //     setCategories(uniqueCategories);
  //   } catch (error) {
  //     navigate("/login");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((p) => p.category.name === category),
      );
    }
  };

  // useEffect(() => {
  //   fetchProperties();
  // }, []);

  if (isPending) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
        <div className="mt-3 fs-3">Loading properties...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        className="text-white text-center py-5 shadow"
        style={{ backgroundColor: "#1a839a" }}
      >
        <h2 className="fw-bold fs-1 mb-2">
          <i className="bi bi-buildings me-2"></i>
          Available Properties
        </h2>
        <p className="fs-3 mb-0">Browse and find your next home</p>
      </div>

      <div className="container py-5">
        {/* FILTERS */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          <button
            className={`btn px-4 py-2 fs-3 ${
              selectedCategory === "All" ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>

          {categories.map((cat, index) => (
            <button
              key={index}
              className={`btn px-4 py-2 fs-3 ${
                selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CARDS */}
        {filteredProperties.length > 0 ? (
          <div className="row g-5">
            {filteredProperties.map((property, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-lg border-0">
                  {/* IMAGE */}
                  {property.images?.length > 0 && (
                    <img
                      src={property.images[0].image}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  )}

                  {/* BODY */}
                  <div className="card-body p-4">
                    <h5 className="fw-bold fs-2 mb-3">{property.title}</h5>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="badge bg-light text-dark fs-3 px-3 py-2">
                        {property.category.name}
                      </span>

                      <span className="badge bg-info fs-3 px-3 py-2">
                        {property.location || "Location"}
                      </span>
                    </div>
                    

                    <p className="fs-3 text-success fw-bold mb-0">
                      {property.rent_amount
                        ? `${property.rent_amount} KES`
                        : "Price on request"}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="card-footer bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                    <Link
                      to="/property/property-details"
                      state={{ property }}
                      className="btn px-4 py-2 fs-3"
                      style={{ backgroundColor: "#1a839a", color: "white" }}
                    >
                      Details
                    </Link>

                    <span
                      className={`badge fs-3 px-3 py-2 ${
                        property.tenant ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {property.tenant ? "Rented" : "Available"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-house-x fs-1 text-muted"></i>
            <h3 className="mt-3 fs-2">No Properties Available</h3>
            <p className="fs-3 text-muted">
              Try refreshing or check back later
            </p>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
