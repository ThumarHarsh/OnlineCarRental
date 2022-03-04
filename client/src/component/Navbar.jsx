import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo2.jpg";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/userprofile">
              Userprofile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editprofile">
              Edit Profile
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/bookcar">
              BOOKCAR
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/bookcar">
              BOOKCAR
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src={logo}
            width="45"
            height="35"
            class="d-inline-block align-top"
            alt=""
          />
          Rentals
        </a>

        <div
          className="collapse navbar-collapse w-100 order-3 dual-collapse2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item active  ">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
