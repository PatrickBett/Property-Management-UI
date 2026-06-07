import React from "react";

function About() {
  return (
    <div>
      {/* HERO */}
      <div
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1a839a)",height: "30vh"
        }}
      >
        <h1 className="fs-1 fw-bold pt-5">About SPB Property Management</h1>
        <p className="fs-3 mt-3">
          Transforming Property Management Through Innovation
        </p>
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "white",
            margin: "20px auto 0",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="container py-5">
        {/* INTRO */}
        <p className="text-center fs-3 mb-5">
          At{" "}
          <span className="fw-bold text-primary">SPB Property Management</span>,
          we are dedicated to revolutionizing property management through modern
          technology, automation, and seamless tenant-landlord experiences.
        </p>

        {/* CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm h-100 p-4 text-center">
              <div className="fs-1">🏢</div>
              <h3 className="fs-2 fw-bold mt-3">Our Mission</h3>
              <p className="fs-3">
                Deliver seamless property management with automation and
                simplicity.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100 p-4 text-center">
              <div className="fs-1">🤝</div>
              <h3 className="fs-2 fw-bold mt-3">Our Values</h3>
              <p className="fs-3">
                Transparency, integrity, and innovation in every interaction.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm h-100 p-4 text-center">
              <div className="fs-1">👥</div>
              <h3 className="fs-2 fw-bold mt-3">Our Team</h3>
              <p className="fs-3">
                Experts in real estate, software engineering, and customer
                service.
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <h2 className="text-center fs-1 fw-bold">Our Services</h2>

        <div className="d-flex justify-content-center mb-4">
          <div
            style={{
              width: "70px",
              height: "4px",
              background: "#1a839a",
              borderRadius: "5px",
            }}
          />
        </div>

        <div className="row g-3">
          {[
            {
              icon: "🔍",
              title: "Tenant Screening",
              text: "Find reliable tenants through structured screening systems.",
            },
            {
              icon: "💳",
              title: "Rent Collection",
              text: "Secure and automated rent payment processing.",
            },
            {
              icon: "🛠️",
              title: "Maintenance",
              text: "Fast issue reporting and resolution tracking.",
            },
            {
              icon: "📊",
              title: "Analytics",
              text: "Data-driven insights for property performance.",
            },
          ].map((s, i) => (
            <div key={i} className="col-md-6">
              <div className="d-flex gap-3 p-3 bg-light rounded shadow-sm">
                <div className="fs-1">{s.icon}</div>

                <div>
                  <h4 className="fs-3 fw-bold mb-1">{s.title}</h4>
                  <p className="fs-3 text-muted mb-0">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BENEFITS */}
        <div className="bg-light p-5 rounded mt-5">
          <h2 className="text-center fs-1 fw-bold">Why Choose SPB?</h2>

          <div className="d-flex justify-content-center mb-4">
            <div
              style={{
                width: "70px",
                height: "4px",
                background: "#1a839a",
                borderRadius: "5px",
              }}
            />
          </div>

          <ul className="list-unstyled fs-3">
            <li className="mb-2">✔ Simplified property management process</li>
            <li className="mb-2">✔ Better landlord-tenant communication</li>
            <li className="mb-2">✔ All-in-one management dashboard</li>
            <li className="mb-2">✔ 24/7 support and monitoring</li>
          </ul>

          <div className="text-center mt-4">
            <button
              className="btn px-4 py-3 fs-3 fw-bold text-white"
              style={{ backgroundColor: "#1a839a" }}
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
