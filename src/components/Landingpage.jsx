import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=85",
    eyebrow: "Premium Rentals · Nairobi",
    heading: "Find Your Perfect Property",
    sub: "Curated high-end homes and apartments managed by professionals who care about your experience.",
  },
  {
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85",
    eyebrow: "Verified Listings · 50+ Cities",
    heading: "Live in a Space You Love",
    sub: "From modern studios to expansive family homes — browse verified listings with instant booking.",
  },
  {
    bg: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1800&q=85",
    eyebrow: "Trusted Management",
    heading: "Landlords, Simplified",
    sub: "We handle tenants, rent collection, maintenance and compliance — so you focus on what matters.",
  },
];

export default function Landingpage() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const advance = () => {
    setFading(true);
    setTimeout(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
      setFading(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const cur = SLIDES[slide];

  return (
    <div>
      {/* HERO */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          height: "92vh",
          backgroundImage: `url(${cur.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT */}
            <div className="col-md-7">
              <p className="fw-bold fs-2 text-warning">{cur.eyebrow}</p>

              <h1 className="fs-1 fw-bold">{cur.heading}</h1>

              <p className="fs-2 mt-3">{cur.sub}</p>

              <div className="mt-4 d-flex gap-3">
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg px-4 py-3 fs-3"
                >
                  Explore Properties
                </Link>

                <a
                  href="#features"
                  className="btn btn-outline-light btn-lg px-4 py-3 fs-3"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* SEARCH CARD */}
            <div className="col-md-5 mt-4 mt-md-0">
              <div className="card shadow-lg p-4">
                <h4 className="fw-bold fs-2 mb-3">Find a Property</h4>

                <input
                  className="form-control form-control-lg fs-3 mb-3"
                  placeholder="Location"
                />

                <select className="form-select form-select-lg fs-3 mb-3">
                  <option>Any Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Studio</option>
                </select>

                <select className="form-select form-select-lg fs-3 mb-3">
                  <option>Any Budget</option>
                </select>

                <select className="form-select form-select-lg fs-3 mb-4">
                  <option>Bedrooms</option>
                </select>

                <button className="btn btn-primary btn-lg w-100 py-3 fs-3">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold fs-1 mb-5">Why Choose Us</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold fs-2">End-to-End Management</h4>
                <p className="fs-3">
                  We handle everything from listings to rent collection.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold fs-2">Verified Tenants</h4>
                <p className="fs-3">
                  Carefully screened tenants for safety and reliability.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-3">
                <h4 className="fw-bold fs-2">Real-Time Reporting</h4>
                <p className="fs-3">
                  Track payments, occupancy, and property status instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-white text-center" style={{ backgroundColor: "#1a839a" }}>
        <div className="container">
          <h2 className="fs-1 fw-bold">Start Managing Properties Better</h2>

          <p className="fs-2 mt-3">Join SPB Property today</p>

          <Link
            to="/register"
            className="btn btn-light btn-lg px-5 py-3 fs-3 mt-3"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4">
        <small className="fs-3">
          © {new Date().getFullYear()} SPB Property Management
        </small>
      </footer>
    </div>
  );
}
