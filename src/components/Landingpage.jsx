import "./landing.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Footer from "./Footer";

const SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=85",
    eyebrow: "Premium Rentals · Nairobi",
    heading: (
      <>
        Find Your
        <br />
        <em>Perfect Property</em>
      </>
    ),
    sub: "Curated high-end homes and apartments managed by professionals who care about your experience.",
  },
  {
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85",
    eyebrow: "Verified Listings · 50+ Cities",
    heading: (
      <>
        Live in a Space
        <br />
        You <em>Love</em>
      </>
    ),
    sub: "From modern studios to expansive family homes — browse verified listings with instant booking.",
  },
  {
    bg: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1800&q=85",
    eyebrow: "Trusted Management",
    heading: (
      <>
        Landlords,
        <br />
        <em>Simplified</em>
      </>
    ),
    sub: "We handle tenants, rent collection, maintenance and compliance — so you focus on what matters.",
  },
];

const WHY_CARDS = [
  {
    num: "01",
    title: "End-to-End Management",
    body: "Listings, tenant vetting, rent collection, and maintenance — all handled under one roof.",
  },
  {
    num: "02",
    title: "Verified Tenants",
    body: "Every applicant goes through a thorough background and financial screening process.",
  },
  {
    num: "03",
    title: "Real-Time Reporting",
    body: "Live dashboards give you full visibility into payments, occupancy, and property status.",
  },
  {
    num: "04",
    title: "24 / 7 Support",
    body: "Our team is always available to resolve issues for both landlords and tenants.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Register",
    body: "Create your account in under two minutes.",
  },
  {
    n: "2",
    title: "List or Search",
    body: "Add your property or browse available homes.",
  },
  {
    n: "3",
    title: "We Manage",
    body: "Our team handles tenants and operations.",
  },
  {
    n: "4",
    title: "You Earn",
    body: "Receive rent and reports on time, always.",
  },
];

export default function Landingpage() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const timerRef = useRef(null);

  const goTo = (n) => {
    setFading(true);
    setTimeout(() => {
      setSlide(n);
      setFading(false);
    }, 350);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(), 5000);
  };

  const advance = () => {
    setFading(true);
    setTimeout(() => {
      setSlide((s) => {
        const next = (s + 1) % SLIDES.length;
        return next;
      });
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".spb-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const cur = SLIDES[slide];

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`spb-nav${navScrolled ? " scrolled" : ""}`}>
        <a href="/" className="spb-logo">
          <span className="spb-logo-mark">SPB</span>
          <span className="spb-logo-dot" />
          <span className="spb-logo-sub">Property</span>
        </a>
        <ul className="spb-nav-links">
          <li>
            <a href="#why">Services</a>
          </li>
          <li>
            <a href="#process">How It Works</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to="/login" className="spb-nav-cta">
              Sign In
            </Link>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="spb-hero">
        <div className="spb-hero-bg">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`spb-hero-slide${i === slide ? " active" : ""}`}
              style={{ backgroundImage: `url(${s.bg})` }}
            />
          ))}
        </div>

        <div className="spb-hero-line" />

        <div className="spb-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`spb-dot${i === slide ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="spb-hero-body">
          <div className="spb-hero-left">
            <div className="spb-eyebrow">
              <span className="spb-eyebrow-line" />
              <span
                className="spb-eyebrow-text"
                style={{ opacity: fading ? 0 : 1, transition: "opacity 0.35s" }}
              >
                {cur.eyebrow}
              </span>
            </div>

            <h1 className="spb-hero-h1" style={{ opacity: fading ? 0 : 1 }}>
              {cur.heading}
            </h1>

            <p className="spb-hero-p" style={{ opacity: fading ? 0 : 1 }}>
              {cur.sub}
            </p>

            <div className="spb-hero-actions">
              <Link to="/register" className="spb-btn spb-btn-primary">
                Explore Properties →
              </Link>
              <a href="#why" className="spb-btn spb-btn-outline">
                Learn More
              </a>
            </div>
          </div>

          {/* Search card */}
          <div className="spb-hero-card">
            <div className="spb-hero-card-title">Find a Property</div>

            <div className="spb-search-group">
              <label className="spb-search-label">Location</label>
              <input
                className="spb-search-input"
                type="text"
                placeholder="Nairobi, Westlands…"
              />
            </div>

            <div className="spb-search-row">
              <div className="spb-search-group" style={{ marginBottom: 0 }}>
                <label className="spb-search-label">Type</label>
                <select className="spb-search-select">
                  <option>Any Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Studio</option>
                </select>
              </div>
              <div className="spb-search-group" style={{ marginBottom: 0 }}>
                <label className="spb-search-label">Budget</label>
                <select className="spb-search-select">
                  <option>Any Price</option>
                  <option>Under KES 30k</option>
                  <option>KES 30k – 80k</option>
                  <option>KES 80k+</option>
                </select>
              </div>
            </div>

            <div className="spb-search-group">
              <label className="spb-search-label">Bedrooms</label>
              <select className="spb-search-select">
                <option>Any</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3+ Bedrooms</option>
              </select>
            </div>

            <button className="spb-search-submit">Search Properties</button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="spb-trust spb-reveal">
        <div className="spb-trust-inner">
          {[
            { val: "1,000", suf: "+", label: "Properties" },
            { val: "98", suf: "%", label: "Satisfaction Rate" },
            { val: "24", suf: "/7", label: "Support" },
            { val: "50", suf: "+", label: "Cities" },
          ].map((s) => (
            <div className="spb-trust-item" key={s.label}>
              <div className="spb-trust-num">
                {s.val}
                <b>{s.suf}</b>
              </div>
              <div className="spb-trust-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY ── */}
      <section id="why" className="spb-section spb-why">
        <div className="spb-why-inner">
          <div className="spb-why-left spb-reveal">
            <div className="spb-section-tag">Our Advantage</div>
            <h2 className="spb-section-h2">
              Property management
              <br />
              <strong>done right</strong>
            </h2>
            <p>
              SPB brings together professional expertise and modern technology
              to give landlords and tenants a seamless, transparent experience
              from day one.
            </p>
            <Link
              to="/register"
              className="spb-btn spb-btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              Get Started →
            </Link>
          </div>

          <div className="spb-why-cards spb-reveal spb-reveal-delay-1">
            {WHY_CARDS.map((c) => (
              <div className="spb-why-card" key={c.num}>
                <div className="spb-why-card-num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="spb-why-card-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="spb-section spb-process">
        <div className="spb-process-inner">
          <div className="spb-process-header spb-reveal">
            <div>
              <div className="spb-section-tag">How It Works</div>
              <h2 className="spb-section-h2">
                Four steps to
                <br />
                <strong>your new home</strong>
              </h2>
            </div>
            <p>
              Whether you're a landlord looking to list or a tenant searching
              for a perfect home, our process is designed to be fast,
              transparent, and stress-free.
            </p>
          </div>

          <div className="spb-steps spb-reveal spb-reveal-delay-1">
            {STEPS.map((s) => (
              <div className="spb-step" key={s.n}>
                <div className="spb-step-circle">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="spb-cta spb-reveal">
        <div className="spb-cta-left">
          <div
            className="spb-section-tag"
            style={{ color: "var(--gold)", marginBottom: 0 }}
          >
            Ready to Begin
          </div>
          <h2>
            Start your journey
            <br />
            <strong>with SPB today</strong>
          </h2>
          <p>
            Join thousands of landlords and tenants who trust SPB for seamless,
            professional property management across Kenya.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <Link to="/register" className="spb-btn spb-btn-primary">
              Explore Properties
            </Link>
            <Link to="/login" className="spb-btn spb-btn-outline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="spb-cta-right spb-reveal spb-reveal-delay-1">
          <div className="spb-form-title">Request a Callback</div>

          <div className="spb-field-row">
            <div className="spb-field">
              <label>First Name</label>
              <input type="text" placeholder="John" />
            </div>
            <div className="spb-field">
              <label>Last Name</label>
              <input type="text" placeholder="Kamau" />
            </div>
          </div>

          <div className="spb-field">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" />
          </div>

          <div className="spb-field">
            <label>Phone Number</label>
            <input type="tel" placeholder="+254 700 000 000" />
          </div>

          <div className="spb-field">
            <label>I am a</label>
            <input type="text" placeholder="Landlord / Tenant" />
          </div>

          <button className="spb-form-submit">Submit Request →</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="spb-footer">
        <div className="spb-footer-top">
          <div className="spb-footer-brand">
            <a href="/" className="spb-logo">
              <span className="spb-logo-mark">SPB</span>
              <span className="spb-logo-dot" />
              <span className="spb-logo-sub">Property</span>
            </a>
            <p>
              Your trusted partner in property rental and management across
              Kenya. Professional, transparent, and always available.
            </p>
          </div>

          {[
            {
              title: "Services",
              links: [
                "Property Listings",
                "Tenant Screening",
                "Rent Collection",
                "Maintenance",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Our Team", "Careers", "Press"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
            },
          ].map((col) => (
            <div className="spb-footer-col" key={col.title}>
              <h6>{col.title}</h6>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="spb-footer-bottom">
          <p>
            © {new Date().getFullYear()} SPB Property Management. All rights
            reserved.
          </p>
          <p>Nairobi, Kenya</p>
        </div>
      </footer>
    </>
  );
}
