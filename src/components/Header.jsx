import { useState, useEffect } from 'react';
import './header.css';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
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


          {
            isLoggedIn ? (
              
              <>
              <button 
  onClick={onLogout} 
  className='bg-danger' 
  style={{ borderRadius: "50%", height: "25px", width: "25px" }} 
  title="Logout"
>
  <FaSignOutAlt style={{ marginRight: "5px" }} />
</button>

            </>

            ):(
              <>
              <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="about" onClick={() => setMenuOpen(false)}>About Us</a></li>
              <li><a href="register" onClick={() => setMenuOpen(false)}>Register</a></li>
              <li><a href="login" onClick={() => setMenuOpen(false)}>Login</a></li>
              <li><a href="contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
              </>

            )
          }
          
        </ul>
      </div>
    </nav>
  );
}

export default Header;
