import React from "react";
import "./footer.css";

function Footer() {
  return (
    <body>
      <div className="content"></div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; PatrickBett. All rights reserved.</p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> |
            <a href="/terms-of-service"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </body>
  );
}

export default Footer;
