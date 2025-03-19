import './landing.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
function Landingpage() {
  return (
    <>
    <div className="landing">
      <main className='landing-content py-5'>
        <h1>SPB Property Management</h1>
        <h2>Your trusted partner in property rental and management.</h2>
      </main> 
    </div>


    <section className="landing-info border container px-5 py-5">
        <h2 style={{ fontSize: '30px' }}>Why Choose SPB Property Management?</h2>
        <div className="info-item">
          <h3 style={{ fontSize: '20px' }}>📋 Comprehensive Management Services</h3>
          <p style={{ fontSize: '15px' }}>
            We handle everything from property listings, tenant screening, rent collection, and maintenance requests.
          </p>
        </div>
        <div className="info-item">
          <h3 style={{ fontSize: '20px' }}>🌟 Trusted by Landlords and Tenants</h3>
          <p style={{ fontSize: '15px' }}>
            Thousands of landlords and tenants trust us to provide reliable, hassle-free property management solutions.
          </p>
        </div>
        <div className="info-item">
          <h3 style={{ fontSize: '20px' }}>🚀 Simplified Communication</h3>
          <p style={{ fontSize: '15px' }}>
            Seamless communication between landlords and tenants through our state-of-the-art platform.
          </p>
        </div>
      </section>

      <section className="cta-section" >
        <h2 style={{ fontSize: '30px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '15px' }}>
          Experience hassle-free property management today. Sign up to explore our features and join a community of satisfied users.
        </p>
        <Link to="/register"> <button className="cta-button" >Get Started</button></Link>
        
      </section>
    </>
  );
}

export default Landingpage;
