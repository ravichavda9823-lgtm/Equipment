import React from "react";
import { Link } from "react-router-dom";
import CheckToken from "../utills/CheckToken";
import CheckRole from "../utills/CheckRole";
import Logout from "../utills/Logout";
import { useState } from "react";
import { useEffect } from "react";

function Aside() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect (() => {
    setToken(CheckToken());
    setRole(CheckRole());
  }, []);

  return (
    <>
      <aside className="left-sidebar">
        {/* Sidebar scroll*/}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="./index.html" className="text-nowrap logo-img">
              <img src="../assets/images/logos/dark-logo.svg" width={180} alt />
            </a>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8" />
            </div>
          </div>
          {/* Sidebar navigation*/}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              <li className="nav-small-cap mt-0">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu"> COMPONENTS</span>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/managecategory"
                  aria-expanded="false"
                >
                  <i className="ti ti-category" />
                  <span className="hide-menu">Manage Category</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/manageequipment"
                  aria-expanded="false"
                >
                  <i className="ti ti-tool" />
                  <span className="hide-menu">Manage Equipment</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/manageuser"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-users"></i>
                  </span>

                  <span className="hide-menu">Manage User</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/managefeedback"
                  aria-expanded="false"
                >
                  <i className="ti ti-message-circle" />
                  <span className="hide-menu">Manage Feedback</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/manageinquiry"
                  aria-expanded="false"
                >
                  <i className="ti ti-help-circle" />
                  <span className="hide-menu">Manage Inquiry</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/managebookingstatus"
                  aria-expanded="false"
                >
                  <i className="ti ti-calendar-check" />
                  <span className="hide-menu">Booking Status</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  className="sidebar-link d-flex align-items-center gap-2"
                  to="/managebookinghistory"
                  aria-expanded="false"
                >
                  <i className="ti ti-history" />
                  <span className="hide-menu">Booking History</span>
                </Link>
              </li>

              <li class="nav-small-cap mt-2">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">EXTRA</span>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="./icon-tabler.html"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-mood-happy"></i>
                  </span>
                  <span class="hide-menu">Icons</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="./sample-page.html"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-aperture"></i>
                  </span>
                  <span class="hide-menu">Sample Page</span>
                </a>
              </li>

              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="./ui-card.html"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-cards"></i>
                  </span>
                  <span class="hide-menu">Card</span>
                </a>
              </li>

              {token ? (
                <>
                  <li className="sidebar-item mt-3">
                    <Link
                      className="sidebar-link d-flex align-items-center justify-content-center gap-2 rounded-pill py-2"
                      onClick={Logout}
                      aria-expanded="false"
                      style={{
                        background: "linear-gradient(135deg, #EF4444, #DC2626)",
                        color: "#fff",
                        fontWeight: "600",
                        boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
                        transition: "0.3s",
                      }}
                    >
                      <i className="ti ti-logout fs-5"></i>

                      <span className="hide-menu">Logout</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="sidebar-item mt-3">
                    <Link
                      className="sidebar-link d-flex align-items-center justify-content-center gap-2 rounded-pill py-2"
                      to="/login"
                      aria-expanded="false"
                      style={{
                        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                        color: "#fff",
                        fontWeight: "600",
                        boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                        transition: "0.3s",
                      }}
                    >
                      <i className="ti ti-login fs-5"></i>
                      <span className="hide-menu">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
    </>
  );
}

export default Aside;
