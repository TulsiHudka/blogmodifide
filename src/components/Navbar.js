import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProfileMenu } from "../context/ProfileMenu";

export default function Navbar() {
  const {checkRole, checkLogin, checkRoledupdate, checkLogindupdate, email} = useContext(ProfileMenu)

  const LogoutHandler = () => {
    checkRoledupdate(false); 
    checkLogindupdate(false)
  }

  console.log(email)
  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top" style={{height: "60px"}}>
        <div>
          <div>
          { checkRole && <button
              className="navbar-toggler ms-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              style={{ marginRight: "1rem" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          }
          <Link className="navbar-brand ms-3" to="/">
            Home
          </Link>
          <Link className="navbar-brand" >
            About
          </Link>
          {
            checkLogin && <span>{email.charAt(0)}</span>
          }
          <button className="btn btn-outline-secondary" style={{position: "absolute", right: "0"}}>
          <Link className="navbar-brand" to="/login" onClick={LogoutHandler} >
            {checkLogin ? 'Logout' : 'Login'}
          </Link></button>

          </div>


          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{width: "200px"}}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Admin Panel
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            {checkRole &&
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addBlog">
                    Add Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    All Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/users"
                  >
                    User List
                  </Link>
                </li>
              </ul>
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}
