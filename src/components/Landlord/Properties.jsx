import { useContext } from "react";
import { PropertyContext } from "../../Context";

function Properties() {
  const { properties } = useContext(PropertyContext);
  console.log("landlord properties", properties);

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="container mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h1 className="text-primary mb-0 fw-bold">My Properties</h1>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container">
        {properties.length > 0 ? (
          <div className="row g-4">
            {properties.map((property, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  {property.images && property.images.length > 0 && (
                    <div key={property.images[0].id}>
                      <img
                        src={property.images[0].image}
                        alt="Property"
                        className="card-img-top object-fit-cover"
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <h3 className="card-title text-primary fw-bold">
                      {property.title}
                    </h3>
                    <div className="mb-3">
                      <p className="card-text mb-1 fs-5">
                        <span className="fw-medium">Location:</span>{" "}
                        {property.city}, {property.state}
                      </p>
                      <p className="card-text mb-0 fs-5">
                        <span className="fw-medium">Monthly Rent:</span> $
                        {property.rent_amount}
                      </p>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    {property.tenant ? (
                      <div className="d-flex align-items-center">
                        <div className="badge bg-success me- fs-5">Rented</div>
                        <span className="fs-5">
                          Tenant: {property.tenant.username}
                        </span>
                      </div>
                    ) : (
                      <button className="btn btn-primary w-100">
                        Not Yet Rented
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card shadow-sm p-5 text-center">
            <h3 className="text-muted mb-0">
              You don't have any properties yet
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
