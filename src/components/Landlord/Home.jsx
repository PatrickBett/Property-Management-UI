import { useContext, useState } from "react";
import { PropertyContext } from "../../Context.jsx";
import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { CategoryContext } from "../Contexts/CategoryContext.jsx";
import { toast } from "react-toastify";
import api from "../../api.js";

function Home() {
  const { categories } = useContext(CategoryContext);
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
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("userRole");

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const categoryId = parseInt(category, 10);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", categoryId);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zip_code", zip_code);
      formData.append("rent_amount", rent_amount);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await api.post("/api/properties/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProperties((prev) => [...prev, res.data]);
      toast.success("Property added successfully");

      setTitle("");
      setCategory("");
      setDescription("");
      setAddress("");
      setCity("");
      setState("");
      setZipcode("");
      setRent("");
      setImages("");
    } catch (err) {
      toast.error("Failed to add property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          padding: "15px 25px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ color: "#1a839a", fontWeight: "700", margin: 0 }}>
          {role ? `Logged In As ${role}` : "Welcome User"}
        </h2>
      </div>

      {/* Top Cards Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {/* User Info */}
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#21a8c6",
            color: "white",
            textAlign: "center",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "default",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
            <FaUser style={{ marginRight: "10px" }} />
            {properties.length > 0 ? properties[0].landlord.email : "User"}
          </h3>
        </div>

        {/* Add Property */}
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#1a839a",
            color: "white",
            textAlign: "center",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
          data-bs-toggle="modal"
          data-bs-target="#myadd-property"
        >
          <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
            <CiCirclePlus style={{ marginRight: "10px", fontSize: "1.5rem" }} />
            Add Property
          </h3>
        </div>

        {/* Property Count */}
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#26bada",
            color: "white",
            textAlign: "center",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", margin: 0 }}>
            <FaHome style={{ marginRight: "10px" }} />
            Number of properties: {properties.length}
          </h3>
        </div>
      </div>

      {/* Tenants Info */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          marginTop: "40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#e9f6f8",
            color: "#1a839a",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0, fontWeight: "700" }}>
            <i className="bi bi-people-fill me-2"></i>
            Tenants Information
          </h2>
        </div>

        <div style={{ padding: "25px" }}>
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
                  marginBottom: "20px",
                  padding: "20px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.01)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      backgroundColor: "#e0f7fa",
                      borderRadius: "50%",
                      padding: "10px",
                      marginRight: "15px",
                    }}
                  >
                    <FaHome style={{ color: "#1a839a", fontSize: "1.5rem" }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        color: "#1a839a",
                        fontWeight: "600",
                        marginBottom: "15px",
                      }}
                    >
                      {property.title}
                    </h4>

                    {property.tenant && property.tenant.email ? (
                      <div
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderLeft: "5px solid #28a745",
                          borderRadius: "10px",
                          padding: "15px",
                        }}
                      >
                        <h5
                          style={{
                            color: "#28a745",
                            fontWeight: "600",
                            marginBottom: "10px",
                          }}
                        >
                          <FaUser style={{ marginRight: "8px" }} />
                          Tenant Details
                        </h5>

                        <p style={{ margin: "5px 0", color: "#333" }}>
                          <MdEmail
                            style={{ marginRight: "10px", color: "#1a839a" }}
                          />
                          {property.tenant.email}
                        </p>
                        <p style={{ margin: "5px 0", color: "#333" }}>
                          <FaPhone
                            style={{ marginRight: "10px", color: "#1a839a" }}
                          />
                          {property.tenant.phone_number}
                        </p>
                        <p style={{ margin: "5px 0", color: "#333" }}>
                          <i
                            className="bi bi-person-badge"
                            style={{
                              marginRight: "10px",
                              color: "#1a839a",
                              fontSize: "1.2rem",
                            }}
                          ></i>
                          {property.tenant.first_name}
                        </p>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#fff3cd",
                          border: "1px solid #ffeeba",
                          borderRadius: "10px",
                          padding: "10px 15px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-exclamation-triangle-fill"
                          style={{
                            color: "#856404",
                            fontSize: "1.5rem",
                            marginRight: "10px",
                          }}
                        ></i>
                        <span>
                          No tenants currently occupying this property
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <i
                className="bi bi-house-slash"
                style={{ fontSize: "3rem", color: "#ccc" }}
              ></i>
              <h3 style={{ color: "#888", marginTop: "15px" }}>
                Your properties have not been rented yet
              </h3>
              <p style={{ color: "#999" }}>
                When your properties are rented, tenant information will appear
                here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <div className="modal" id="myadd-property">
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <div className="modal-title fw-bold">Add Property</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddProperty} encType="multipart/form-data">
                {[
                  { label: "Title", value: title, setter: setTitle },
                  { label: "Address", value: address, setter: setAddress },
                  { label: "City", value: city, setter: setCity },
                  { label: "State", value: state, setter: setState },
                  { label: "Zip-code", value: zip_code, setter: setZipcode },
                  { label: "Rent", value: rent_amount, setter: setRent },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "600" }}>{f.label}:</label>
                    <input
                      type="text"
                      value={f.value}
                      onChange={(e) => f.setter(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        outline: "none",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                ))}

                {/* Category Select */}
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ fontWeight: "600" }}>Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      outline: "none",
                      marginTop: "5px",
                    }}
                  >
                    <option value="">-- Select Category --</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ fontWeight: "600" }}>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter property description"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      outline: "none",
                      marginTop: "5px",
                      minHeight: "80px",
                    }}
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ fontWeight: "600" }}>Upload Images:</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      outline: "none",
                      marginTop: "5px",
                    }}
                  />
                </div>

                {/* Modal Footer */}
                <div
                  className="modal-footer"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "10px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#1a839a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 15px",
                    }}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
