import React from "react";

function About() {
  const styles = {
    page: {
      fontFamily: "Inter, sans-serif",
      color: "#1f2937",
      lineHeight: 1.6,
      fontSize: "17px",
    },

    hero: {
      background: "linear-gradient(135deg, #0f172a, #1a839a)",
      color: "white",
      padding: "90px 20px",
      textAlign: "center",
    },

    heroTitle: {
      fontSize: "3.2rem",
      fontWeight: 800,
      marginBottom: "10px",
    },

    tagline: {
      fontSize: "1.4rem",
      fontWeight: 300,
      opacity: 0.9,
    },

    divider: {
      width: "80px",
      height: "4px",
      background: "#ffffff",
      margin: "20px auto 0",
      borderRadius: "5px",
    },

    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "60px 20px",
    },

    intro: {
      fontSize: "1.4rem",
      textAlign: "center",
      marginBottom: "60px",
      color: "#374151",
    },

    highlight: {
      color: "#1a839a",
      fontWeight: 700,
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "25px",
      marginBottom: "60px",
    },

    card: {
      background: "#fff",
      borderRadius: "14px",
      padding: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
      transition: "0.3s",
    },

    icon: {
      fontSize: "2rem",
      marginBottom: "10px",
      color: "#1a839a",
    },

    cardTitle: {
      fontSize: "1.4rem",
      fontWeight: 700,
      marginBottom: "10px",
    },

    sectionTitle: {
      textAlign: "center",
      fontSize: "2.2rem",
      fontWeight: 800,
      marginBottom: "10px",
    },

    sectionDivider: {
      width: "70px",
      height: "4px",
      background: "#1a839a",
      margin: "0 auto 40px",
      borderRadius: "5px",
    },

    serviceGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },

    serviceItem: {
      display: "flex",
      gap: "15px",
      background: "#f9fafb",
      padding: "20px",
      borderRadius: "12px",
    },

    serviceIcon: {
      fontSize: "1.8rem",
      color: "#1a839a",
      marginTop: "3px",
    },

    benefits: {
      marginTop: "60px",
      background: "#f3f4f6",
      padding: "50px 25px",
      borderRadius: "15px",
    },

    benefitItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "15px",
      fontSize: "1.1rem",
    },

    check: {
      color: "#1a839a",
      fontSize: "1.3rem",
    },

    button: {
      marginTop: "30px",
      padding: "14px 28px",
      background: "#1a839a",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>About SPB Property Management</h1>
        <p style={styles.tagline}>
          Transforming Property Management Through Innovation
        </p>
        <div style={styles.divider}></div>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>
        {/* INTRO */}
        <p style={styles.intro}>
          At <span style={styles.highlight}>SPB Property Management</span>, we
          are dedicated to revolutionizing property management through modern
          technology, automation, and seamless tenant-landlord experiences.
        </p>

        {/* CARDS */}
        <div style={styles.grid}>
          {[
            {
              icon: "🏢",
              title: "Our Mission",
              text: "Deliver seamless property management with automation and simplicity.",
            },
            {
              icon: "🤝",
              title: "Our Values",
              text: "Transparency, integrity, and innovation in every interaction.",
            },
            {
              icon: "👥",
              title: "Our Team",
              text: "Experts in real estate, software engineering, and customer service.",
            },
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* SERVICES */}
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.sectionDivider}></div>

        <div style={styles.serviceGrid}>
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
            <div key={i} style={styles.serviceItem}>
              <div style={styles.serviceIcon}>{s.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{s.title}</h3>
                <p style={{ margin: 0, color: "#6b7280" }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BENEFITS */}
        <div style={styles.benefits}>
          <h2 style={styles.sectionTitle}>Why Choose SPB?</h2>
          <div style={styles.sectionDivider}></div>

          {[
            "Simplified property management process",
            "Better landlord-tenant communication",
            "All-in-one management dashboard",
            "24/7 support and monitoring",
          ].map((b, i) => (
            <div key={i} style={styles.benefitItem}>
              <span style={styles.check}>✔</span>
              <span>{b}</span>
            </div>
          ))}

          <button style={styles.button}>Contact Us Today</button>
        </div>
      </div>
    </div>
  );
}

export default About;
