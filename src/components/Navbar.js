import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
function Navbar() {
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
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="gallery"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="feedback"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about-us"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="services"
                spy={true}
                smooth={true}
                offset={-200}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
