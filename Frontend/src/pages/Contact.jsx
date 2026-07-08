import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleInputChange(e) {
    let { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitComplaints = async (form) => {
    let response = await api.post("/user/inquirary/addinquirary", form);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitComplaints,

    onSuccess: () => {
      toast.success("Complaints Submitted Successfully....", {
        onClose: () => {
          window.location.href = "/";
        },
      });
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    },

    onError: () => {
      toast.error("Invalid Details...", {
        onClose: () => {
          window.location.href = "/contact";
        },
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form);
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
                    <h1 data-aos="fade-up">Contact Us</h1>
                    <ul
                      className="breadcrumbs-link d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <li>
                        <a href="index.html" target="_self" title="Home">
                          Home
                        </a>
                      </li>
                      <li className="active">Contact</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Hero Section ======*/}
        {/*====== Start Contact Section ======*/}
        <section className="contact-area pt-130 pb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="information-list-item">
                  <div className="information-item mb-50" data-aos="fade-up">
                    <div className="icon">
                      <i className="fas fa-home" />
                    </div>
                    <div className="info">
                      <p> House - 44, Road - 03, Sector - 11, Uttara, Dhaka</p>
                    </div>
                  </div>
                  <div className="information-item mb-50" data-aos="fade-up">
                    <div className="icon">
                      <i className="fas fa-phone" />
                    </div>
                    <div className="info">
                      <p>
                        <a href="tel:+12336892">+123 366 892</a>
                      </p>
                      <p>
                        <a href="tel:+12336892">+991 2336 255</a>
                      </p>
                    </div>
                  </div>
                  <div className="information-item mb-50" data-aos="fade-up">
                    <div className="icon">
                      <i className="fas fa-envelope" />
                    </div>
                    <div className="info">
                      <p>
                        <a href="mailto:contact@example.com">
                          contact@example.com
                        </a>
                      </p>
                      <p>
                        <a href="mailto:inquiry@example.com">
                          inquiry@example.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="contact-wrapper mb-50" data-aos="fade-up">
                  <div className="section-title mb-30">
                    <span className="span">Contact us</span>
                    <h2>Need Information Contact Us</h2>
                  </div>
                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form_group">
                            <input
                              type="text"
                              className="form_control"
                              placeholder="Name"
                              name="name"
                              value={form.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form_group">
                            <input
                              type="email"
                              className="form_control"
                              placeholder="Email"
                              name="email"
                              value={form.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form_group">
                            <input
                              type="text"
                              className="form_control"
                              placeholder="subject"
                              name="subject"
                              value={form.subject}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_group">
                            <select className="wide">
                              <option value="support">Customer Support</option>
                              <option value="ticket">Create Ticket</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_group">
                            <textarea
                              name="message"
                              className="form_control"
                              placeholder="Comment"
                              value={form.message}
                              onChange={handleInputChange}
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button className="main-btn"  disabled={mutation.isPending}> {mutation.isPending
                          ? "Submitting..."
                          : " Send Message"}</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Contact Section ======*/}

        {/*====== Start Newsletter ======*/}
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
        {/*====== End Newsletter ======*/}
      </div>
    </>
  );
}

export default Contact;
