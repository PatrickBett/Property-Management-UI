import React from 'react';
import './contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div className="contact-container">
      <h2 className="text-center">Contact Us</h2>
      <p className="text-center">
        Have questions or need assistance? Reach out to us through any of the following ways:
      </p>

      <div className="contact-details">
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <h4>Phone</h4>
          <p>+1 (123) 456-7890</p>
        </div>

        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <h4>Email</h4>
          <p>support@spbproperty.com</p>
        </div>

        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <h4>Address</h4>
          <p>123 Property Lane, Suite 400<br />Cityville, CA 12345</p>
        </div>
      </div>

      <form className="contact-form">
        <h3>Send Us a Message</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            rows="5"
            placeholder="Type your message here"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
