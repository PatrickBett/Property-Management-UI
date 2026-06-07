import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Contact Us</h2>
        <p className="text-muted fs-4 mt-3">
          Have questions or need assistance? Reach out to us through any of the
          following ways:
        </p>
      </div>

      {/* CONTACT INFO CARDS */}
      <div className="row g-4 text-center mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaPhone size={35} color="#1a839a" className="mb-3" />
            <h4 className="fw-bold fs-3">Phone</h4>
            <p className="fs-4 mb-0">+254791474737</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaEnvelope size={35} color="#1a839a" className="mb-3" />
            <h4 className="fw-bold fs-3">Email</h4>
            <p className="fs-4 mb-0">support@spbproperty.com</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaMapMarkerAlt size={35} color="#1a839a" className="mb-3" />
            <h4 className="fw-bold fs-3">Address</h4>
            <p className="fs-4 mb-0">
              123 Property Lane, Suite 400 <br />
              Cityville, CA 12345
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-lg p-4">
            <h3 className="fw-bold text-center mb-4 fs-2">Send Us a Message</h3>

            <div className="mb-3">
              <label className="form-label fs-4">Name</label>
              <input
                type="text"
                className="form-control form-control-lg fs-4"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fs-4">Email</label>
              <input
                type="email"
                className="form-control form-control-lg fs-4"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fs-4">Message</label>
              <textarea
                rows="5"
                className="form-control form-control-lg fs-4"
                placeholder="Type your message here"
              />
            </div>

            <button
              className="btn w-100 py-3 fs-3 fw-bold"
              style={{
                backgroundColor: "#1a839a",
                color: "white",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
