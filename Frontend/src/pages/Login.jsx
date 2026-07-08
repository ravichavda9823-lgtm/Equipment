import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handelInputChange(e) {
    let { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async (user) => {
    let response = await axios.post(
      "http://localhost:8000/api/auth/signin",
      user,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.token) {
        cookie.set("token", response.token);
        cookie.set("role", response.role);

        setUser({
          email: "",
          password: "",
        });

        toast.success("Login Successfully..", {
          onClose: () => {
            window.location.href = "/";
          },
        });
      }
    },
    onError: () => {
      toast.error("Invalid Details...", {
        onClose: () => {
          window.location.href = "/login";
        },
      });
    },
  });

  async function handelSubmit(e) {
    e.preventDefault();

    mutation.mutate(user);
  }

  return (
    <>
      <div>
        {/*====== Start Hero Section ======*/}
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
                    <h1 data-aos="fade-up">Login</h1>
                    <ul
                      className="breadcrumbs-link d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <li>
                        <Link to="/" target="_self" title="Home">
                          Home
                        </Link>
                      </li>
                      <li className="active">Login</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Hero Section ======*/}
        {/*====== Start user-area-section ======*/}
        <div className="user-area-section pt-120 pb-130" data-aos="fade-up">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="user-form">
                  <form onSubmit={handelSubmit}>
                    <div className="form_group">
                      <label>
                        Username or email address{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form_control"
                        name="email"
                        onChange={handelInputChange}
                        value={user.email}
                      />
                    </div>
                    <div className="form_group">
                      <label>
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form_control"
                        name="password"
                        onChange={handelInputChange}
                        value={user.password}
                      />
                    </div>
                    <div className="form_group form_checkbox d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to="/register">Register here</Link>
                      </p>

                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <div className="form_group">
                      <button type="submit"  disabled={mutation.isPending} className="main-btn" >
                        {mutation.isPending ? "Logining in..." : " LOG IN"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End user-area-section ======*/}
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
                        <button className="newsletter-btn">
                          Subscribe Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Newsletter Section ======*/}
      </div>
    </>
  );
}

export default Login;
