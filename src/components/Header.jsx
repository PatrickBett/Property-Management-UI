import { useState, useEffect } from 'react';
import './header.css';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GrHostMaintenance } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";


function Header({ isLoggedIn, onLogout, isTenant }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  


  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <h1 className="navbar-logo" style={{ fontSize: '25px' }}>SPB</h1>

        <button className="menu-toggle" style={{ fontSize: '35px' }} onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>


        {isLoggedIn ? (
            isTenant ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bolder text-white" to="/tenant/" style={{ textAlign: "center" }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bolder" to="/tenant/properties" style={{ textAlign: "center" }}>
                    Properties
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bolder" to="/tenant/maintenance-requests" style={{ textAlign: "center" }}>
                    Maintenance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bolder" to="/tenant/mypayments-history" style={{ textAlign: "center" }}>
                    Payments History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bolder" to="/tenant/account" style={{ textAlign: "center" }}>
                    Account
                  </Link>
                </li>
                <button 
                  onClick={onLogout} 
                  className="logout-btn" 
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                </button>
              </>
            ) : (
              <>
                <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/properties">
              My Properties
            </Link>
          </li>
          <li className="nav-item">
            
            <Link className="nav-link text-white" to="/landlord/maintenance-requests">
            <GrHostMaintenance className="me-2"/>Maintenance
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/payments">
              Payments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/landlord/account">
              <IoIosSettings className="me-2" />Account
            </Link>
          </li>
                <button 
                  onClick={onLogout} 
                  className="logout-btn" 
                  title="Logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                </button>
              </>
            )
          ) : (
            <>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
