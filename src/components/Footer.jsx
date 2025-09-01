import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; PatrickBett. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
