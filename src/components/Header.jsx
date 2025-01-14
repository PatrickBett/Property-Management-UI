import React, { useState } from 'react';
import './header.css';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">SPB</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="about" onClick={() => setMenuOpen(false)}>About Us</a></li>
          <li><a href="register" onClick={() => setMenuOpen(false)}>Register</a></li>
          <li><a href="login" onClick={() => setMenuOpen(false)}>Login</a></li>
          <li><a href="contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
