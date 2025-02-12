import { useState, useEffect } from 'react';
import './header.css';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()


  //check if the user is logged in

  useEffect(
    ()=>{loginstatus()}
    ,[]

  )

  const loginstatus =()=>{
    const token = localStorage.getItem('access')
    token? setIsLoggedIn(true) : setIsLoggedIn(false)
    
  }

  //FUNCTION TO LOGOUT USER
  const handleLogout =() =>{
    
    try{
      
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/login')
      
    }
    catch(error){
      alert(error)
      setIsLoggedIn(false)
    }
    finally{
      navigate('/login')
      setIsLoggedIn(false)
    }
  }

  


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
              <button onClick={handleLogout}>
  
    <FaSignOutAlt style={{ marginRight: "5px" }} /> Logout

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
