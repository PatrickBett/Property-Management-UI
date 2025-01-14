import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about">
      {/* Header Section */}
      <div className="about-header about-item">
        <h1 style={{ fontSize: '25px' }}>About Us</h1>
        <p style={{ fontSize: '15px' }}>
          At <span>SPB Property Management</span>, we are dedicated to revolutionizing property management by offering innovative solutions that cater to both landlords and tenants.
        </p>
      </div>

      {/* Mission, Values, and Team Section */}
      <div className="about-content">
        <div className="about-item">
          <i className="fas fa-building"></i>
          <h2>Our Mission</h2>
          <p style={{ fontSize: '15px' }}>
            To provide a cutting-edge platform where landlords and tenants can seamlessly manage properties, communicate effectively, and ensure hassle-free operations.
          </p>
        </div>

        <div className="about-item">
          <i className="fas fa-handshake"></i>
          <h2>Our Values</h2>
          <p style={{ fontSize: '15px' }}>
            Transparency, integrity, and innovation form the foundation of our operations, ensuring trust and satisfaction for all users.
          </p>
        </div>

        <div className="about-item">
          <i className="fas fa-users"></i>
          <h2>Our Team</h2>
          <p style={{ fontSize: '15px' }}>
            A group of passionate professionals in property management, technology, and customer service dedicated to helping landlords and tenants achieve their goals.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="about-services about-item">
        <h2>Our Services</h2>
        <div className="services-content">
          <div className="service-item about-item">
            <i className="fas fa-user-check"></i>
            <h3>Tenant Screening</h3>
            <p style={{ fontSize: '15px' }}>
              Helping landlords find reliable tenants with thorough screening processes to ensure a great rental experience.
            </p>
          </div>

          <div className="service-item about-item">
            <i className="fas fa-wallet"></i>
            <h3>Rent Collection</h3>
            <p style={{ fontSize: '15px' }}>
              Streamlining rent collection with secure online payment methods for both landlords and tenants.
            </p>
          </div>

          <div className="service-item about-item">
            <i className="fas fa-tools"></i>
            <h3>Maintenance Requests</h3>
            <p style={{ fontSize: '15px' }}>
              Enabling tenants to submit maintenance requests directly, ensuring quick resolution and property upkeep.
            </p>
          </div>

          <div className="service-item about-item">
            <i className="fas fa-chart-line"></i>
            <h3>Performance Analytics</h3>
            <p style={{ fontSize: '15px' }}>
              Providing insights into property performance to help landlords make data-driven decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="about-benefits about-item">
        <h2>Why SPB Property Management?</h2>
        <ul>
          <li>
            <i className="fas fa-check-circle" style={{ fontSize: '15px' }}></i> Simplified property management process.
          </li>
          <li>
            <i className="fas fa-check-circle" style={{ fontSize: '15px' }}></i> Enhanced communication between landlords and tenants.
          </li>
          <li>
            <i className="fas fa-check-circle" style={{ fontSize: '15px' }}></i> Comprehensive tools for managing multiple properties
          </li>
          <li>
            <i className="fas fa-check-circle" style={{ fontSize: '15px' }}></i> 24/7 customer support for any queries or issues.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
