import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css"

export default function Navbar() {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"))
  console.log(isLogin);
  const LogoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addBlogHandler = () => {
    navigate("/addBlog")
  }

  return (
    <div>
      <nav
        className={` navbar fixed-top ${classes.navbarColor}`}
        style={{ height: "60px" }}
      >
        <div>
          <div>
            {isLogin?.role === "admin" && (
              <button
                className="navbar-toggler ms-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                style={{ marginRight: "1rem", backgroundColor: "#d1e8e2" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
            <Link className="navbar-brand ms-3" style={{ color: "#d1e8e2" }} to="/">
              Home
            </Link>
            <Link className="navbar-brand" style={{ color: "#d1e8e2" }}>About</Link>
            <button
              className={`btn navbar-brand ${classes.navButton}`}
              style={{ position: "absolute", right: "0" }}
              onClick={LogoutHandler}
            >
              {isLogin ? "Logout" : "Login"}
            </button>

            {isLogin?.role === "admin" && (<button
              className={`btn navbar-brand ${classes.navButton}`}
              style={{ position: "absolute", right: "100px" }}
              onClick={addBlogHandler}
            >
              Add Blog
            </button>)}
          </div>
          <div
            className={`offcanvas offcanvas-start ${classes.offcanvas}`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{ width: "200px" }}
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
            {isLogin?.role === "admin" && (
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/myBlog"
                    >
                      My Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
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
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
