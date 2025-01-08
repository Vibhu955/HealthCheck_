import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Components/style.css';

function Navbar() {
  const onClick = () => {
    localStorage.removeItem("token");
  }
  let loc = useLocation();
  useEffect(() => {
    console.log(loc.pathname);
  }, [loc]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark" >
      <div className="container-fluid" >
        <Link to="/" className="navbar-brand" href="#" >HealthCare</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav-underline mx-5">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item mx-1">
              <Link to="/about" className="nav-link" >About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/mental" className="nav-link" >Mental Check-Up</Link>
            </li>
            <li className="nav-item mx-1">
              <Link to="/physical" className="nav-link">Physical Check-Up</Link>
            </li>
          </ul>
          <ul className="navbar-nav nav-underline end">
            {localStorage.getItem("token") ?
              <li className="nav-item" >
                <Link to="/login" className="nav-link" onClick={onClick}>logout</Link>
              </li> :
              <><li className="nav-item" >
                <Link to="/login" className="nav-link"  >LogIn</Link>
              </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" >SignUp</Link>
                </li> </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;