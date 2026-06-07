import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Account() {
  const [account, setAccount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAccount = async () => {
      try {
        const response = await api.get("/api/account/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccount(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccount();
  }, [token, navigate]);

  const handleUpdate = async () => {
    try {
      const res = await api.put("api/update-profile/", account);
      setAccount(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating account");
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  return (
    <div
      className="container py-5"
      
    >
      {account && (
        <div className="card shadow-lg border-0">
          {/* HEADER */}
          <div
            className="card-header text-white p-4"
            style={{ backgroundColor: "#1a839a" }}
          >
            <h2 className="m-0 text-center fs-2">
              <i className="bi bi-person-gear me-2"></i>
              Account Settings
            </h2>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              {/* PROFILE */}
              <div className="col-lg-4 bg-light p-5 text-center">
                <img
                  src={
                    account.profile?.profile ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="rounded-circle img-thumbnail shadow"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <h4 className="mt-4 mb-1 fs-3">
                  {account.first_name} {account.last_name}
                </h4>

                <p className="text-muted fs-5">@{account.username}</p>

                {!isEditing && (
                  <button
                    className="btn w-75 mt-3 fs-5"
                    style={{ borderColor: "#1a839a", color: "#1a839a" }}
                    onClick={handleEdit}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Profile
                  </button>
                )}

                {isEditing && (
                  <button
                    className="btn btn-outline-secondary w-75 mt-3 fs-5"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* INFO */}
              <div className="col-lg-8 p-5">
                <h4 className="mb-4 border-bottom pb-2 fs-2">
                  <i className="bi bi-info-circle me-2"></i>
                  Personal Information
                </h4>

                <div className="row g-4">
                  {/* EMAIL */}
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4 d-flex align-items-center">
                        <div
                          className="me-3 text-white p-3 rounded-circle"
                          style={{ backgroundColor: "#1a839a" }}
                        >
                          <i className="bi bi-envelope-fill"></i>
                        </div>

                        <div className="flex-grow-1">
                          <h6 className="fs-5">Email Address</h6>

                          {isEditing ? (
                            <input
                              className="form-control fs-5"
                              value={account.email || ""}
                              onChange={(e) =>
                                setAccount({
                                  ...account,
                                  email: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <p className="fs-4 fw-semibold mb-0">
                              {account.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4 d-flex align-items-center">
                        <div
                          className="me-3 text-white p-3 rounded-circle"
                          style={{ backgroundColor: "#1a839a" }}
                        >
                          <i className="bi bi-telephone-fill"></i>
                        </div>

                        <div className="flex-grow-1">
                          <h6 className="fs-5">Phone Number</h6>

                          {isEditing ? (
                            <input
                              className="form-control fs-5"
                              value={account.phone_number || ""}
                              onChange={(e) =>
                                setAccount({
                                  ...account,
                                  phone_number: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <p className="fs-4 fw-semibold mb-0">
                              {account.phone_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FIRST NAME */}
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4 d-flex align-items-center">
                        <div
                          className="me-3 text-white p-3 rounded-circle"
                          style={{ backgroundColor: "#1a839a" }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>

                        <div className="flex-grow-1">
                          <h6 className="fs-5">First Name</h6>

                          {isEditing ? (
                            <input
                              className="form-control fs-5"
                              value={account.first_name || ""}
                              onChange={(e) =>
                                setAccount({
                                  ...account,
                                  first_name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <p className="fs-4 fw-semibold mb-0">
                              {account.first_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAST NAME */}
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4 d-flex align-items-center">
                        <div
                          className="me-3 text-white p-3 rounded-circle"
                          style={{ backgroundColor: "#1a839a" }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>

                        <div className="flex-grow-1">
                          <h6 className="fs-5">Last Name</h6>

                          {isEditing ? (
                            <input
                              className="form-control fs-5"
                              value={account.last_name || ""}
                              onChange={(e) =>
                                setAccount({
                                  ...account,
                                  last_name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <p className="fs-4 fw-semibold mb-0">
                              {account.last_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                {isEditing && (
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button
                      className="btn btn-secondary fs-5"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn fs-5"
                      style={{ backgroundColor: "#1a839a", color: "white" }}
                      onClick={handleUpdate}
                    >
                      Update Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!account && (
        <div className="card shadow-sm p-5 text-center">
          <div className="spinner-border mb-4" style={{ color: "#1a839a" }} />
          <h3 className="fs-3">Loading your account information...</h3>
        </div>
      )}
    </div>
  );
}

export default Account;
