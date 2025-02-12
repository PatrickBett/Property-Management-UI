import { useContext } from "react";
import { PropertyContext } from "../../Context";

function Properties() {
  const { properties } = useContext(PropertyContext);

  return (
    <>
      <div className="container border shadow-lg p-4">My Properties</div>
      <div className="container border shadow-lg mt-3">
        {properties.map((property, index) => (
          <div className="container border mt-2 col-sm-4" key={index}>
            <img src={property.url} className="mt-3" style={{ width: "100%" }} />
            <h3 className="mt-3 text-primary">{property.title}</h3>
            <p>City: {property.city}</p>
            <p>State: {property.state}</p>
            <p>Rent: {property.rent_amount}</p>

            {property.tenant ? (
              <p>Tenant: {property.tenant.username}</p>
            ) : (
              <button className="btn btn-primary mb-2">Not Yet Rented</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Properties;
