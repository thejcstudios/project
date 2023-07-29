import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import "./navbarAdmin.css";

function AdminNav() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/admin");
  };

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
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <div className={click ? "nav__container active" : "nav__container"}>
        <img src="/images/logo1.png" alt="logo" />
        <div className="nav__wrapper">
          <Link className="nav__link" to="/main" onClick={closeMobileMenu}>
            Users
          </Link>
          <br />
          <Link
            className="nav__link"
            to="/videogallery"
            onClick={closeMobileMenu}
          >
            Video Gallery
          </Link>
          <br />
          <Link
            className="nav__link"
            to="/photoadmin"
            onClick={closeMobileMenu}
          >
            Image Galley
          </Link>
          <br />
          <Link className="nav__link" to="/feedback" onClick={closeMobileMenu}>
            Feedback
          </Link>
          <br />
          <Link className="nav__link" to="/Register" onClick={closeMobileMenu}>
            Register User
          </Link>
          <br />
          <Link className="nav__link" to="/admin" onClick={signOut}>
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminNav;
