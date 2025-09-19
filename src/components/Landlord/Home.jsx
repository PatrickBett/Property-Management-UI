import { useContext, useState } from "react";
import { PropertyContext } from "../../Context.jsx"; // Adjust path if necessary
import { FaUser, FaHome, FaPhone } from "react-icons/fa"; // Import icons
import { CiCirclePlus } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { CategoryContext } from "../Contexts/CategoryContext.jsx";
import { toast } from "react-toastify";
import api from "../../api.js";

function Home() {
  const { categories } = useContext(CategoryContext);
  console.log("This are categories", categories);

  const { properties, setProperties } = useContext(PropertyContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZipcode] = useState("");
  const [rent_amount, setRent] = useState("");

  const [images, setImages] = useState([]);

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("userRole");
  const [isLoading, setIsLoading] = useState(false);

  //  function to triger add property
  const handleAddProperty = async (e) => {
    e.preventDefault();
    // Convert category to an integer
    const categoryId = parseInt(category, 10);

    console.log(
      title,
      category,

      description,
      address,
      city,
      state,
      zip_code,
      rent_amount,

      images
    );
    setIsLoading(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", categoryId);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zip_code", zip_code);
      formData.append("rent_amount", rent_amount);

      // Append images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]); // Ensure the key name matches what Django expects
      }

      const res = await api.post("/api/properties/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
          "Content-Type": "multipart/form-data",
        },
      });
      // Add new property to existing properties
      setProperties((prev) => [...prev, res.data]);

      toast.success("Property added successfull ");

      // Reset form fields
      setTitle("");
      setCategory("");
      setDescription("");
      setAddress("");
      setCity("");
      setState("");
      setZipcode("");
      setRent("");

      setImages("");

      // Dismiss modal
    } catch (err) {
      console.log(err);
      toast.error("Failed to add property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-light rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-primary fw-bold mb-0">
          {role ? `Logged In As ${role}` : "Welcome User"}
        </h2>
      </div>

      {/* User Info Card */}
      <div className="row mt-5 p-1">
        <div
          className=" text-center p-3 col-sm-4 border bg-primary"
          style={{ borderRadius: 20 }}
        >
          <h3 className="font-bold text-lg">
            <FaUser className="text-blue-500 mr-3 text-xl" /> {/* User Icon */}
            {properties.length > 0 ? properties[0].landlord.email : "User"}
          </h3>
        </div>

        <div
          className="  p-3 text-center col-sm-4 border bg-success"
          style={{ borderRadius: 20 }}
          data-bs-toggle="modal"
          data-bs-target="#myadd-property"
        >
          <h3 className="font-bold text-lg flex items-center">
            <CiCirclePlus className="text-green-500 mr-3 text-xl me-3" />
            Add property
          </h3>
        </div>

        {/* Modal property */}
        <div className="modal" id="myadd-property">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Add Property</div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form
                  onSubmit={handleAddProperty}
                  encType="multipart/form-data"
                >
                  <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property Title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="category" className="form-label">
                      Category:
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">-- Select Category --</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">
                      Description:
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Property Description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="address" className="form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property Address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="city" className="form-label">
                      City:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="state" className="form-label">
                      State:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property state"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="zipcode" className="form-label">
                      Zip-code:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Property zipcode"
                      id="zip_code"
                      value={zip_code}
                      onChange={(e) => setZipcode(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="rent" className="form-label">
                      Rent:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Property rent amount"
                      id="rent_amount"
                      value={rent_amount}
                      onChange={(e) => setRent(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="images" className="form-label">
                      Upload Images:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      multiple
                      onChange={(e) => setImages(e.target.files)}
                    />
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-danger" data-bs-dismiss="modal">
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-success">
                      {" "}
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* End Modal property */}

        {/* Properties Count Card */}
        <div
          className="p-3 text-center col-sm-4 border  bg-warning"
          style={{ borderRadius: 20 }}
        >
          <h3 className="font-bold text-lg flex items-center">
            <FaHome className="text-green-500 mr-3 text-xl " />{" "}
            {/* Home Icon */}
            Number of properties:{" "}
            <span className="ml-1">{properties.length}</span>
          </h3>
        </div>
      </div>

      <div className="card border-0 rounded-lg shadow-lg bg-white mt-5">
        <div className="card-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-top">
          <h2 className="text-center mb-0 fw-bold text-dark">
            <i className="bi bi-people-fill me-2"></i>
            Tenants Information
          </h2>
        </div>

        <div className="card-body p-4">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <div
                key={index}
                className="card mb-3 border-0 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="card-body">
                  <div className="d-flex align-items-start">
                    <div className="property-icon rounded-circle bg-indigo-100 p-3 me-3">
                      <FaHome className="text-indigo-600 fs-4" />
                    </div>

                    <div className="flex-grow-1">
                      <h4 className="fw-bold text-indigo-800 mb-3">
                        {property.title}
                      </h4>

                      {property.tenant && property.tenant.email ? (
                        <div className="bg-light rounded-lg p-3 border-start border-4 border-success">
                          <div className="d-flex align-items-center mb-2">
                            <div className="tenant-icon rounded-circle bg-success-soft p-2 me-2">
                              <FaUser className="text-success fs-5" />
                            </div>
                            <h5 className="mb-0 text-success fw-bold fs-3">
                              Tenant Details
                            </h5>
                          </div>

                          <div className="ms-4 mt-3">
                            <div className="d-flex align-items-center mb-2">
                              <MdEmail className="text-gray-600 me-3 fs-4" />
                              <span className="text-dark fs-5">
                                {property.tenant.email}
                              </span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                              <FaPhone className="text-gray-600 me-3 fs-4" />
                              <span className="text-dark fs-5">
                                {property.tenant.phone_number}
                              </span>
                            </div>

                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-badge me-3 text-gray-600 fs-4"></i>
                              <span className="text-dark fw-medium fs-5">
                                {property.tenant.first_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="alert alert-warning d-flex align-items-center">
                          <i className="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
                          <span>
                            No tenants currently occupying this property
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <div className="empty-state-icon mb-3">
                <i className="bi bi-house-slash text-gray-400 fs-1"></i>
              </div>
              <h3 className="text-gray-500 fw-normal">
                Your properties have not been rented yet
              </h3>
              <p className="text-muted mt-2">
                When your properties are rented, tenant information will appear
                here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
