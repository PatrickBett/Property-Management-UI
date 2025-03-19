import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About SPB Property Management</h1>
          <p className="tagline">Transforming Property Management Through Innovation</p>
          <div className="hero-divider"></div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container">
        <div className="about-intro">
          <p>
            At <span className="brand-highlight">SPB Property Management</span>, we are dedicated to revolutionizing 
            property management by offering innovative solutions that cater to both landlords and tenants, 
            creating seamless experiences and lasting relationships.
          </p>
        </div>

        {/* Mission, Values, and Team Section */}
        <div className="about-content">
          <div className="about-item">
            <div className="icon-container">
              <i className="fas fa-building"></i>
            </div>
            <h2>Our Mission</h2>
            <p>
              To provide a cutting-edge platform where landlords and tenants can seamlessly manage properties, 
              communicate effectively, and ensure hassle-free operations.
            </p>
          </div>

          <div className="about-item">
            <div className="icon-container">
              <i className="fas fa-handshake"></i>
            </div>
            <h2>Our Values</h2>
            <p>
              Transparency, integrity, and innovation form the foundation of our operations, 
              ensuring trust and satisfaction for all users.
            </p>
          </div>

          <div className="about-item">
            <div className="icon-container">
              <i className="fas fa-users"></i>
            </div>
            <h2>Our Team</h2>
            <p>
              A group of passionate professionals in property management, technology, and customer service 
              dedicated to helping landlords and tenants achieve their goals.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="section-heading">
          <h2>Our Services</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="services-content">
          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <div className="service-details">
              <h3>Tenant Screening</h3>
              <p>
                Helping landlords find reliable tenants with thorough screening processes to ensure a great rental experience.
              </p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-wallet"></i>
            </div>
            <div className="service-details">
              <h3>Rent Collection</h3>
              <p>
                Streamlining rent collection with secure online payment methods for both landlords and tenants.
              </p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-tools"></i>
            </div>
            <div className="service-details">
              <h3>Maintenance Requests</h3>
              <p>
                Enabling tenants to submit maintenance requests directly, ensuring quick resolution and property upkeep.
              </p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="service-details">
              <h3>Performance Analytics</h3>
              <p>
                Providing insights into property performance to help landlords make data-driven decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="about-benefits">
          <div className="section-heading">
            <h2>Why Choose SPB?</h2>
            <div className="section-divider"></div>
          </div>
          <div className="benefits-content">
            <div className="benefits-list">
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <p>Simplified property management process</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <p>Enhanced communication between landlords and tenants</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <p>Comprehensive tools for managing multiple properties</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-check-circle"></i>
                <p>24/7 customer support for any queries or issues</p>
              </div>
            </div>
            <div className="cta-container">
              <button className="cta-button">Contact Us Today</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;