import { useContext, useState } from "react";
import { PropertyContext } from "../../Context.jsx"; // Adjust path if necessary
import { FaUser, FaHome, FaPhone } from "react-icons/fa"; // Import icons
import { CiCirclePlus } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { CategoryContext } from "../Contexts/CategoryContext.jsx";

import api from "../../api.js";


function Home() {
  const { categories } = useContext(CategoryContext);
  const { properties } = useContext(PropertyContext);

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip_code, setZipcode] = useState("")
  const [rent_amount, setRent] = useState("")
  const [url, setUrl] = useState("")
 

  const token = localStorage.getItem("access")
  const role = localStorage.getItem("userRole")
  

  //  function to triger add property
  const handleAddProperty =async(e)=>{
    e.preventDefault()
     // Convert category to an integer
    const categoryId = parseInt(category, 10);
    

    try{
      const res = await api.post("https://spbproperty.pythonanywhere.com/api/properties/",{
        title,
        category: categoryId,
        description,
        address,
        city,
        state,
        zip_code,
        rent_amount,
        url
      },
      {headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
        "Content-Type": "application/json",
      }})

      alert("property added successfull ")

      // Reset form fields
    setTitle("");
    setCategory("");
    setDescription("");
    setAddress("");
    setCity("");
    setState("");
    setZipcode("");
    setRent("");
    setUrl("");

    // Dismiss modal
    document.getElementById("close-modal-btn").click();
  


    }catch(err){
      console.log(err)
    }


  }
 

  return (
    <>

            <div className="mt-5" style={{fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>
            {role ? `Logged In As ${role}` : "Welcome User"}
            </div>
    
      {/* User Info Card */}
      <div className="row mt-5 p-1">

      
      <div className=" text-center p-3 col-sm-4 border bg-primary rounded">
        <h3 className="font-bold text-lg">
          <FaUser className="text-blue-500 mr-3 text-xl" /> {/* User Icon */}
          {properties.length > 0 ? properties[0].landlord.email : "User"}
        </h3>
        
      </div>

      <div className="  p-3 text-center col-sm-4 border rounded bg-success" data-bs-toggle ="modal" data-bs-target="#myadd-property" >
        <h3 className="font-bold text-lg flex items-center">
          <CiCirclePlus className="text-green-500 mr-3 text-xl me-3" /> 
          Add property
        </h3>
      </div>


      {/* Modal property */}
<div className="modal" id='myadd-property'>
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <div className="modal-title">Add Property</div>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body">

        <form onSubmit={handleAddProperty}>
          <div className="mb-3 mt-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" className="form-control" placeholder="Enter Property Title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
          <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-select" id='category' value={category} onChange={(e)=>setCategory(e.target.value)}>
              {categories?.map((category)=>(
                <option key={category.id} value={category.id}>{category.name}</option>
               

              ))}

            </select>
          </div>



          <div className="mb-3 mt-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea type="text" className="form-control" placeholder="Enter Property Description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea >
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input type="text" className="form-control" placeholder="Enter Property Address" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="city" className="form-label">City:</label>
            <input type="text" className="form-control" placeholder="Enter Property city" id="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="state" className="form-label">State:</label>
            <input type="text" className="form-control" placeholder="Enter Property state" id="state" value={state} onChange={(e)=>setState(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="zipcode" className="form-label">Zip-code:</label>
            <input type="text" className="form-control" placeholder="Enter Property zipcode" id="zip_code" value={zip_code} onChange={(e)=>setZipcode(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="rent" className="form-label">Rent:</label>
            <input type="number" className="form-control" placeholder="Enter Property rent amount" id="rent_amount" value={rent_amount} onChange={(e)=>setRent(e.target.value)}></input>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="url" className="form-label">Url:</label>
            <input type="text" className="form-control" placeholder="Enter Property image url" id="url" value={url} onChange={(e)=>setUrl(e.target.value)}></input>
          </div>

          <div className="modal-footer">
            <button className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button type='submit' className="btn btn-success"> Save</button>
          </div>
        </form>

      </div>

      
    </div>
  </div>


</div>
{/* End Modal property */}

      {/* Properties Count Card */}
      <div className="p-3 text-center col-sm-4 border rounded bg-warning">
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
