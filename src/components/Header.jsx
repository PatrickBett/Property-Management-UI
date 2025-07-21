import { useState } from "react";
import "./header.css";
import {
  FaSignOutAlt,
  FaHome,
  FaBuilding,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, isTenant }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">SPB</span>
          <span className="logo-tagline">Property Management</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="menu-icon">{isMenuOpen ? "✖" : "☰"}</span>
        </button>

        <div className={`nav-menu-container ${isMenuOpen ? "open" : ""}`}>
          <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            {isLoggedIn ? (
              isTenant ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant/"
                      onClick={closeMenu}
                    >
                      <FaHome className="nav-icon" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant/properties"
                      onClick={closeMenu}
                    >
                      <FaBuilding className="nav-icon" />
                      <span>Properties</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant/maintenance-requests"
                      onClick={closeMenu}
                    >
                      <GrHostMaintenance className="nav-icon" />
                      <span>Maintenance</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant/mypayments-history"
                      onClick={closeMenu}
                    >
                      <MdPayment className="nav-icon" />
                      <span>Payments</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant/account"
                      onClick={closeMenu}
                    >
                      <FaUser className="nav-icon" />
                      <span>Account</span>
                    </Link>
                  </li>
                  <li className="nav-item logout-item">
                    <button
                      onClick={() => {
                        onLogout();
                        closeMenu();
                      }}
                      className="logout-btn"
                      aria-label="Logout"
                    >
                      <FaSignOutAlt className="nav-icon" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/landlord/"
                      onClick={closeMenu}
                    >
                      <FaHome className="nav-icon" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/landlord/properties"
                      onClick={closeMenu}
                    >
                      <FaBuilding className="nav-icon" />
                      <span>Properties</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/landlord/maintenance-requests"
                      onClick={closeMenu}
                    >
                      <GrHostMaintenance className="nav-icon" />
                      <span>Maintenance</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/landlord/payments"
                      onClick={closeMenu}
                    >
                      <MdPayment className="nav-icon" />
                      <span>Payments</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/landlord/account"
                      onClick={closeMenu}
                    >
                      <IoIosSettings className="nav-icon" />
                      <span>Account</span>
                    </Link>
                  </li>
                  <li className="nav-item logout-item">
                    <button
                      onClick={() => {
                        onLogout();
                        closeMenu();
                      }}
                      className="logout-btn"
                      aria-label="Logout"
                    >
                      <FaSignOutAlt className="nav-icon" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeMenu}>
                    <FaHome className="nav-icon" />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeMenu}>
                    <span>About Us</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={closeMenu}>
                    <span>Register</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeMenu}>
                    <span>Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeMenu}>
                    <span>Contact</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
