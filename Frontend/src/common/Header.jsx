import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../utills/Logout";
import CheckToken from "../utills/CheckToken";
import CheckRole from "../utills/CheckRole";

function Header() {
  const [bookingMenu, setBookingMenu] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setToken(CheckToken());
    setRole(CheckRole());
  }, []);

  const closeMenu = () => {
    const navMenu = document.querySelector(".nav-menu");
    navMenu?.classList.remove("menu-on");
    navMenu?.classList.remove("active");

    document.body.classList.remove("menu-on");
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <header className="header-area-one">
        <div className="header-navigation">
          <div className="container-fluid pl-0 pr-0">
            <div className="primary-menu d-flex align-items-center justify-content-between">
              <div className="site-branding">
                <a
                  href="index.html"
                  className="brand-logo"
                  target="_self"
                  title="Brand Logo"
                >
                  <img src="assets/images/logo-1.png" alt="Brand Logo" />
                </a>
              </div>
              <div className="nav-menu">
                <div className="navbar-close">
                  <i className="fal fa-times" />
                </div>
                <nav className="main-menu">
                  <ul>
                    <li className="menu-item">
                      <Link to="/" className="active" onClick={closeMenu}>
                        Home
                      </Link>
                    </li>

                    <li className="menu-item">
                      <Link
                        to="/category"
                        className="active"
                        onClick={closeMenu}
                      >
                        Category
                      </Link>
                    </li>
                    <li className="menu-item menu-item-has-children">
                      <li>
                        <Link to="/equipment" onClick={closeMenu}>
                          Equipment
                        </Link>
                      </li>
                    </li>

                    {token ? (
                      <>
                        <li className="menu-item menu-item-has-children">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setBookingMenu(!bookingMenu);
                            }}
                          >
                            Booking
                          </a>

                          <ul
                            className="sub-menu"
                            style={{
                              display: bookingMenu ? "block" : "none",
                            }}
                          >
                            <li>
                              <Link to="/equipmenthistory" onClick={closeMenu}>
                                Booking History
                              </Link>
                            </li>

                            <li>
                              <Link to="/feedback" onClick={closeMenu}>
                                Feedback
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <li className="menu-item menu-item-has-children">
                      <a href="#">Blog</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="blogs.html">Our Blog</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li> */}
                    <li className="menu-item">
                      <Link to="/contact" onClick={closeMenu}>
                        Contact
                      </Link>
                    </li>

                    {token ? (
                      <>
                        <li className="menu-item">
                          <Link to="/profile" onClick={closeMenu}>
                            Profile
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="#" onClick={Logout, closeMenu} >
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="menu-item">
                          <Link to="/login" onClick={closeMenu}>
                            Login
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link to="/register" onClick={closeMenu}>
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              <div className="navbar-toggler">
                <span />
                <span />
                <span />
              </div>
              <div className="header-right-nav">
                <div className="social-box">
                  <ul className="social-link">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://linkedin.com/" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                    <li>
                      <a href="https://pinterest.com/" target="_blank">
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
