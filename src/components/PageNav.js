import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function PageNav() {
  const [click, setClick] = useState(false);
  const [, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar1">
        <div className="navbar-container">
          <div className="logo__container">
            <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
              JC-STUDIOS&nbsp;
              <img src="/images/logo1.png" alt="Intro" className="nav__logo" />
            </Link>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/video-gallery"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Video Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/photo-gallery"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Image Gallery
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default PageNav;
