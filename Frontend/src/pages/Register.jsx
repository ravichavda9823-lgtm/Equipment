  import { useMutation } from "@tanstack/react-query";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";

  function Register() {
    let [user, setUser] = useState({
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });

    let [errors, setErrors] = useState({
      usernameError: "",
      emailError: "",
      phoneError: "",
      roleError: "",
      passwordError: "",
    });

    function handelInputChange(e) {
      let { name, value } = e.target;

      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    function ValidateForm() {
      let isvalid = true;

      let emailFormat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      let phoneFormat = /^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

      let passwordFormat =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

      if (!user.username) {
        errors.usernameError = "Username is required";
        isvalid = false;
      } else {
        errors.usernameError = "";
      }

      if (!user.email) {
        errors.emailError = "Email is required";
        isvalid = false;
      } else if (!emailFormat.test(user.email)) {
        errors.emailError = "Provide valid email";
        isvalid = false;
      } else {
        errors.emailError = "";
      }

      if (!user.phone) {
        errors.phoneError = "Phone is required";
        isvalid = false;
      } else if (!phoneFormat.test(user.phone)) {
        errors.phoneError = "Provide valid phone number";
        isvalid = false;
      } else {
        errors.phoneError = "";
      }

      if (!user.role) {
        errors.roleError = "Role is required";
        isvalid = false;
      } else {
        errors.roleError = "";
      }

      if (!user.password) {
        errors.passwordError = "Password is required";
        isvalid = false;
      } else if (!passwordFormat.test(user.password)) {
        errors.passwordError =
          "Password must contain uppercase, lowercase, special char & number";
        isvalid = false;
      } else {
        errors.passwordError = "";
      }

      setErrors((prev) => ({ ...prev }));

      return isvalid;
    }

    const registartion = async (user) => {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        user,
      );
      return response.data.data;
    };

    const mutation = useMutation({
      mutationFn: registartion,

      onSuccess: () => {
        toast.success("Registration Successfully...", {
          onClose: () => {
            window.location.href = "/login";
          },
        });
      },
    });

    async function handelSubmit(e) {
      e.preventDefault();

      console.log(user);

      if (!ValidateForm()) return;

      mutation.mutate(user);
    }

    console.log(user);

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
                      <h1 data-aos="fade-up">Signup</h1>
                      <ul
                        className="breadcrumbs-link d-flex justify-content-center"
                        data-aos="fade-up"
                      >
                        <li>
                          <Link to="/" target="_self" title="Home">
                            Home
                          </Link>
                        </li>
                        <li className="active">Signup</li>
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
                    <form  onSubmit={handelSubmit}>
                      <div className="form_group">
                        <label>
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form_control"
                          name="username"
                          onChange={handelInputChange}
                          value={user.username}
                        />
                        <p style={{ color: "red" }}>{errors.usernameError}</p>
                      </div>
                      <div className="form_group">
                        <label>
                          Email address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form_control"
                          name="email"
                          onChange={handelInputChange}
                          value={user.email}
                        />
                        <p style={{ color: "red" }}>{errors.emailError}</p>
                      </div>

                      <div className="form_group">
                        <label>
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          className="form_control"
                          name="phone"
                          onChange={handelInputChange}
                          value={user.phone}
                        />
                        <p style={{ color: "red" }}>{errors.phoneError}</p>
                      </div>

                      <div className="form_group">
                        <label>
                          Role <span className="text-danger">*</span>
                        </label>

                        <select
                          className="form_control"
                          name="role"
                          onChange={handelInputChange}
                          value={user.role}
                        >
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>

                          <option value="user">User</option>
                        </select>

                        <p style={{ color: "red" }}>{errors.roleError}</p>
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
                        <p style={{ color: "red" }}>{errors.passwordError}</p>
                      </div>
                      <div className="form_text">
                        <p>
                          Already have an account?{" "}
                          <Link to="/login">Login here</Link>
                        </p>
                      </div>
                      <div className="form_group">
                        <button type="submit" className="main-btn">
                          Signup
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
          <section className="newsletter-area ">
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

  export default Register;
