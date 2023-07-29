import React from "react";
import { Link } from "react-scroll";
import "./Footer.css";

function Footer() {
  const today = new Date();
  return (
    <>
      <footer className="footer" id="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a
              className="social-icon__link"
              href="https://www.facebook.com/JCstudios28"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="/">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="/">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="/">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="nav-item">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="menu__link"
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
              className="menu__link"
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
              className="menu__link"
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
              className="menu__link"
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
              className="menu__link"
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="menu__link"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <p>
          &copy;{today.getFullYear()} thejcstudios.com | All Rights Reserved
        </p>
      </footer>
    </>
  );
}

export default Footer;
