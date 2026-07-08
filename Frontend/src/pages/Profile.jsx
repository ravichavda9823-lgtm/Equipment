import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUserShield,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CheckRole from "../utills/CheckRole";
import api from "../utills/AxiosConfig";
import { LogoutwithoutNotification } from "../utills/Logout";

function Profile() {
  let [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const role = CheckRole();

  async function FetchProfile() {
    if (CheckRole() === "user") {
      try {
        let response = await api.get("/user/profile");
        console.log(response);
        setProfile(response.data.users);
      } catch (e) {
        if (e.response.status == 401 && e.response.status == 403) {
          LogoutwithoutNotification();
        }
      }
    }
  }   

  useEffect(() => {
    FetchProfile();
  }, []);

  console.log(profile);

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("role");

    window.location.href = "/login";
  };

  return (
    <>
      {/*========== Hero Section ==========*/}
      <section className="hero-area">
        <div
          className="breadcrumbs-area bg_cover"
          style={{
            backgroundImage: "url(assets/images/bg/breadcrumbs-bg-1.jpg)",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="page-title text-center">
                  <h1 data-aos="fade-up">My Profile</h1>
                  <ul
                    className="breadcrumbs-link d-flex justify-content-center"
                    data-aos="fade-up"
                  >
                    <li>
                      <Link to="/" target="_self" title="Home">
                        Home
                      </Link>
                    </li>
                    <li className="active">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*========== Profile Section ==========*/}
      <section
        style={{
          padding: "120px 0",
          background: "#f8f9fa",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "25px",
                  padding: "50px",
                  boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
                }}
              >
                {/* Heading */}
                <div className="text-center mb-5">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      background:
                        "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
                      borderRadius: "50%",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize:"60px",
                      color:"black"
                    }}
                  >
                    {profile.username?.charAt(0)}
                  </div>

                  <h2
                    style={{
                      marginTop: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {profile.username}
                  </h2>
                </div>

                {/* User Info */}

                {/* Email */}
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "15px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <FaEnvelope
                    style={{
                      color: "#4facfe",
                      fontSize: "22px",
                    }}
                  />

                  <div>
                    <p
                      style={{
                        marginBottom: "5px",
                        color: "#888",
                      }}
                    >
                      Email Address
                    </p>

                    <h5>{profile.email}</h5>
                  </div>
                </div>

                {/* Phone */}
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "15px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <FaPhoneAlt
                    style={{
                      color: "#00c853",
                      fontSize: "22px",
                    }}
                  />

                  <div>
                    <p
                      style={{
                        marginBottom: "5px",
                        color: "#888",
                      }}
                    >
                      Phone Number
                    </p>

                    <h5>{profile.phone}</h5>
                  </div>
                </div>

                {/* Role */}
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "15px",
                    marginBottom: "30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <FaUserShield
                    style={{
                      color: "#ff9800",
                      fontSize: "22px",
                    }}
                  />

                  <div>
                    <p
                      style={{
                        marginBottom: "5px",
                        color: "#888",
                      }}
                    >
                      Role
                    </p>

                    <h5>{profile.role}</h5>
                  </div>
                </div>

                {/* Buttons */}
                <div className="text-center">
                  <button
                    onClick={() => navigate("/editprofile", { state: profile })}
                    className="main-btn"
                    style={{
                      marginRight: "15px",
                      borderRadius: "10px",
                      padding: "12px 30px",
                    }}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="main-btn"
                    onClick={handleLogout}
                    style={{
                      background: "#ff4d4d",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 30px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== Start Newsletter Section ======*/}
      <section className="newsletter-area">
        <div className="container">
          <div className="newsletter-wrapper-one">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="newsletter-content-box">
                  <div className="section-title text-center mb-30">
                    <h2>Subscribe Our Newsletter</h2>
                  </div>
                  <form className="newsletter-form">
                    <div className="form_group">
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Enter your email"
                        name="email"
                        required
                      />
                      <button className="newsletter-btn">Subscribe Now</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Newsletter Section ======*/}
    </>
  );
}

export default Profile;
