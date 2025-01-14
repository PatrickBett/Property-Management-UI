import './landing.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
function Landingpage() {
  return (
    <>
    <div className="landing">
      <main className='landing-content'>
        <h1>SPB Property Management</h1>
        <h1>Your trusted partner in property rental and management.</h1>
      </main>

      

     
    </div>
    <section className="landing-info">
        <h2>Why Choose SPB Property Management?</h2>
        <div className="info-item">
          <h3>📋 Comprehensive Management Services</h3>
          <p>
            We handle everything from property listings, tenant screening, rent collection, and maintenance requests.
          </p>
        </div>
        <div className="info-item">
          <h3>🌟 Trusted by Landlords and Tenants</h3>
          <p>
            Thousands of landlords and tenants trust us to provide reliable, hassle-free property management solutions.
          </p>
        </div>
        <div className="info-item">
          <h3>🚀 Simplified Communication</h3>
          <p>
            Seamless communication between landlords and tenants through our state-of-the-art platform.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Experience hassle-free property management today. Sign up to explore our features and join a community of satisfied users.
        </p>
        <Link to="/register"> <button className="cta-button" >Get Started</button></Link>
        
      </section>
    </>
  );
}

export default Landingpage;
