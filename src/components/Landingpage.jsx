import "./landing.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Landingpage() {
  // Adding animation effects when page loads
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="landing">
        <main className="landing-content">
          <div className="container">
            <h1 className="display-3 fw-bold text-shadow ">
              SPB Property Management
            </h1>
            <h2 className="mt-4 fs-1 fw-light">
              Your trusted partner in property rental and management.
            </h2>
            <Link
              to="/register"
              className="btn btn-primary btn-lg mt-5 hero-btn px-5 py-3"
            >
              Explore Properties
            </Link>
          </div>
        </main>

        <div className="landing-features">
          <div className="container py-4">
            <div className="row g-4 justify-content-center text-center">
              <div className="col-md-4 ">
                <div className="feature-card">
                  <div className="feature-icon">🏠</div>
                  <h3 className="fs-1">Premium Properties</h3>
                  <p className="fs-4">
                    Curated selection of high-quality rentals
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card bg-secondary ">
                  <div className="feature-icon">⚡</div>
                  <h3 className="fs-1">Fast Bookings</h3>
                  <p className="text-white fs-4">
                    Secure your dream property in minutes
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">🛡️</div>
                  <h3 className="fs-1">Secure Payments</h3>
                  <p className="fs-4">Safe and transparent payment system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="landing-info animate-on-scroll">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="section-title">
                Why Choose SPB Property Management?
              </h2>
              <div className="title-underline"></div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">📋</div>
                <h3>Comprehensive Management</h3>
                <p className="fs-4">
                  We handle everything from property listings, tenant screening,
                  rent collection, and maintenance requests.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">🌟</div>
                <h3>Trusted by Thousands</h3>
                <p className="fs-4">
                  Thousands of landlords and tenants trust us to provide
                  reliable, hassle-free property management solutions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">🚀</div>
                <h3>Simplified Communication</h3>
                <p className="fs-4">
                  Seamless communication between landlords and tenants through
                  our state-of-the-art platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section animate-on-scroll">
        <div className="container py-5">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label fs-4">Properties Managed</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label fs-4">Customer Satisfaction</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label fs-4">Support Available</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label fs-4">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section animate-on-scroll">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="section-title">What Our Clients Say</h2>
              <div className="title-underline"></div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="fs-4">
                    "SPB Property Management has made renting out my properties
                    completely hassle-free. Their team is professional and
                    responsive."
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-name">Sarah Johnson</div>
                  <div className="testimonial-role">Property Owner</div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="fs-4">
                    "Finding my dream apartment was so easy with SPB. The
                    application process was smooth, and their support team is
                    always helpful."
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-name">Michael Chen</div>
                  <div className="testimonial-role">Tenant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section animate-on-scroll">
        <div className="container py-5 text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="cta-text mb-4 fs-4">
            Experience hassle-free property management today. Sign up to explore
            our features and join a community of satisfied users.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landingpage;
