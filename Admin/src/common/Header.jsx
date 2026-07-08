import React, { useState, useEffect } from "react";
import api from "../utills/AxiosConfig";

function Header() {
  const [admin, setAdmin] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Responsive Sidebar Setup
  useEffect(() => {
    const sidebar = document.querySelector(".left-sidebar");

    if (!sidebar) return;

    if (window.innerWidth < 992) {
      sidebar.style.left = "-270px";
    } else {
      sidebar.style.left = "0px";
    }

    const handleResize = () => {
      if (window.innerWidth < 992) {
        sidebar.style.left = "-270px";
        setSidebarOpen(false);
      } else {
        sidebar.style.left = "0px";
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sidebar Toggle
  const toggleSidebar = () => {
    const sidebar = document.querySelector(".left-sidebar");

    if (!sidebar) return;

    // Mobile Sidebar
    if (window.innerWidth < 992) {
      if (sidebarOpen) {
        sidebar.style.left = "-270px";
      } else {
        sidebar.style.left = "0px";
      }

      setSidebarOpen(!sidebarOpen);
    } else {
      // Desktop Mini Sidebar
      document.body.classList.toggle("mini-sidebar");
    }
  };

  // Fetch Admin
  async function FetchAdmin() {
    try {
      let response = await api.get("/admin/dashborad");
      setAdmin(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    FetchAdmin();
  }, []);

  return (
    <>
      <header className="app-header shadow-sm">

        <nav className="navbar navbar-expand-lg navbar-light">

          {/* Left */}
          <div className="d-flex align-items-center">

            <button
              onClick={toggleSidebar}
              className="border-0 bg-transparent"
              style={{
                fontSize: "32px",
                color: "#64748B",
              }}
            >
              <i className="ti ti-menu-2"></i>
            </button>

          </div>

          {/* Right */}
          <div className="ms-auto">

            <div
              className="d-flex align-items-center gap-2 px-3 py-2"
              style={{
                background: "#EEF2FF",
                borderLeft: "5px solid #6366F1",
                borderRadius: "16px",
              }}
            >

              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "45px",
                  height: "45px",
                  background: "#6366F1",
                  color: "#fff",
                }}
              >
                <i className="ti ti-user-star"></i>
              </div>

              <div
                style={{
                  fontSize: "15px",
                  color: "#374151",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Hello,
                <span
                  style={{
                    fontWeight: "700",
                    color: "#111827",
                    marginLeft: "5px",
                  }}
                >
                  {admin.name}
                </span>

                <span
                  style={{
                    marginLeft: "6px",
                    color: "#6366F1",
                    fontWeight: "700",
                  }}
                >
                  Welcome Back ✨
                </span>
              </div>

            </div>

          </div>

        </nav>

      </header>
    </>
  );
}

export default Header;