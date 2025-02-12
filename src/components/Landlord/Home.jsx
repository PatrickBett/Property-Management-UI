import { useContext } from "react";
import { PropertyContext } from "../../Context.jsx"; // Adjust path if necessary
import { FaUser, FaHome, FaPhone } from "react-icons/fa"; // Import icons
import { CiCirclePlus } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
function Home() {
  const { properties } = useContext(PropertyContext);

  //  function to triger add property
  const handleAddProperty =()=>{}

  return (
    <>
    
      {/* User Info Card */}
      <div className="row border m-1 p-1 bg-secondary">
      <div className=" text-center p-3 col-sm-4 border bg-primary">
        <h3 className="font-bold text-lg">
          <FaUser className="text-blue-500 mr-3 text-xl" /> {/* User Icon */}
          {properties.length > 0 ? properties[0].landlord.email : "User"}
        </h3>
        
      </div>

      <div className="  p-3 text-center shadow-md col-sm-4 border bg-success" onClick={handleAddProperty}>
        <h3 className="font-bold text-lg flex items-center">
          <CiCirclePlus className="text-green-500 mr-3 text-xl me-3" /> 
          Add property
        </h3>
      </div>

      {/* Properties Count Card */}
      <div className="p-3 text-center shadow-md col-sm-4 border bg-warning">
        <h3 className="font-bold text-lg flex items-center">
          <FaHome className="text-green-500 mr-3 text-xl " /> {/* Home Icon */}
          Number of properties: <span className="ml-1">{properties.length}</span>
        </h3>
      </div>
      </div>
    


      <div className="border p-3 mt-5 rounded-lg shadow-lg">
  <h2 className="text-center text-success">Tenants Information</h2>

  {properties.length > 0 ? (
    properties.map((property, index) => (
      <div key={index} className="p-3 border my-2">
        {property.tenant && property.tenant.email ? (
          <h3 className="p-2"><FaHome className="text-green-500 mr-3 text-xl me-2 " />
            <strong className="text-info">{property.title}</strong> 
            <span className="font-semibold">
              {/* tenant information */}
              <div className="mt-2">
              <FaUser className="text-blue-500 mr-3 text-xl" /> Tenant:
              
              <p> <MdEmail className="me-2"/>{property.tenant.email}</p>
              <p> <FaPhone className="me-2"/>{property.tenant.phone_number}</p>
              <p>{property.tenant.first_name}</p>
              </div>
            </span>
          </h3>
        ) : (
          <h3 className="p-2"><FaHome className="text-green-500 mr-3 text-xl me-2  " /><strong className="text-info">{property.title}</strong>: No tenants currently. </h3>
        )}
      </div>
    ))
  ) : (
    <h3 className="p-3 text-gray-500">Your properties have not been rented</h3>
  )}
</div>





 
      </>
  );
}

export default Home;
