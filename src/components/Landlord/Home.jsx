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
    <div className="container-fluid py-4">
      {/* HEADER */}
      <div className="p-4 mb-4 bg-light rounded shadow-sm">
        <h2 className="fs-2 text-primary fw-bold m-0">
          {role ? `Logged In As ${role}` : "Welcome User"}
        </h2>
      </div>

      {/* TOP STATS */}
      <div className="row g-3 mb-5 text-center">
        <div className="col-md-4">
          <div className="p-4 bg-info text-white rounded shadow-sm">
            <h3 className="fs-3 m-0">
              <FaUser className="me-2" />
              {properties.length > 0 ? properties[0].landlord.email : "User"}
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 text-white rounded shadow-sm"
            style={{ backgroundColor: "#1a839a", cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#myadd-property"
          >
            <h3 className="fs-3 m-0">
              <CiCirclePlus className="me-2 fs-2" />
              Add Property
            </h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-primary text-white rounded shadow-sm">
            <h3 className="fs-3 m-0">
              <FaHome className="me-2" />
              Properties: {properties.length}
            </h3>
          </div>
        </div>
      </div>

      {/* TENANTS SECTION */}
      <div className="bg-white rounded shadow-sm">
        <div className="p-4 text-center bg-light border-bottom">
          <h2 className="fs-2 text-primary m-0">Tenants Information</h2>
        </div>

        <div className="p-4">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <div key={index} className="mb-4 p-4 border rounded shadow-sm">
                <h3 className="fs-2 text-primary mb-3">{property.title}</h3>

                {property.tenant && property.tenant.email ? (
                  <div className="p-3 bg-light rounded border-start border-success border-4">
                    <h4 className="fs-3 text-success">
                      <FaUser className="me-2" />
                      Tenant Details
                    </h4>

                    <p className="fs-3 mb-2">
                      <MdEmail className="me-2 text-primary" />
                      {property.tenant.email}
                    </p>

                    <p className="fs-3 mb-2">
                      <FaPhone className="me-2 text-primary" />
                      {property.tenant.phone_number}
                    </p>

                    <p className="fs-3 mb-0">{property.tenant.first_name}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-warning-subtle rounded fs-3">
                    No tenants currently occupying this property
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-house-slash fs-1 text-muted"></i>
              <p className="fs-2 text-muted mt-3">
                No properties available yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL (logic unchanged) */}
      <div className="modal" id="myadd-property">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-2">Add Property</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddProperty}>
                {[
                  { label: "Title", value: title, setter: setTitle },
                  { label: "Address", value: address, setter: setAddress },
                  { label: "City", value: city, setter: setCity },
                  { label: "State", value: state, setter: setState },
                  { label: "Zip-code", value: zip_code, setter: setZipcode },
                  { label: "Rent", value: rent_amount, setter: setRent },
                ].map((f, i) => (
                  <div key={i} className="mb-3">
                    <label className="fs-3 fw-semibold">{f.label}</label>
                    <input
                      className="form-control fs-3"
                      value={f.value}
                      onChange={(e) => f.setter(e.target.value)}
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label className="fs-3 fw-semibold">Category</label>
                  <select
                    className="form-select fs-3"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="fs-3 fw-semibold">Description</label>
                  <textarea
                    className="form-control fs-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="fs-3 fw-semibold">Images</label>
                  <input
                    type="file"
                    multiple
                    className="form-control fs-3"
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-danger fs-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary fs-3">
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
