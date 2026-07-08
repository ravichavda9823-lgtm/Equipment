import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
    status: "Active",
    createdAt: new Date(),
    booking_id: "",
  });
  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/user/booking/");
      return response.data.data;
    } catch (error) {
      console.log("Booking fetch error", error);
    }
  };

  const {
    data: bookinghistory,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookinghistory"],
    queryFn: fetchBookingHistory,
  });

  function handelInputChange(e) {
    let { name, value } = e.target;

    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitFeedback = async (data) => {
    let response = await api.post("/user/feedback/addfeedback", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitFeedback,

    onSuccess: () => {
      toast.success("Feedback Submitted Successfully....", {
        onClose: () => {
          window.location.href = "/";
        },
      });
      setFeedback({
        name: "",
        email: "",
        message: "",
        rating: "",
      });
    },

    onError: () => {
      toast.error("Something went wrong...", {
        onClose: () => {
          window.location.href = "/feedback";
        },
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(feedback);
  }

  console.log(feedback);
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
                    <h1 data-aos="fade-up">Feedback</h1>

                    <ul
                      className="breadcrumbs-link d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <li>
                        <Link to="/" target="_self" title="Home">
                          Home
                        </Link>
                      </li>

                      <li className="active">Feedback</li>
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
                  <form onSubmit={handleSubmit}>
                    {/* Booking Dropdown */}

                    <div className="form_group">
                      <label>
                        Select Booking
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        className="form_control"
                        name="booking_id"
                        value={feedback.booking_id}
                        onChange={handelInputChange}
                     
                      >
                        <option value="">Select Booking</option>

                        {bookinghistory?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item._id}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Name */}

                    <div className="form_group">
                      <label>
                        Name
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="text"
                        className="form_control"
                        name="name"
                        onChange={handelInputChange}
                        value={feedback.name}
                      />
                    </div>

                    {/* Email */}

                    <div className="form_group">
                      <label>
                        Email Address
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        type="email"
                        className="form_control"
                        name="email"
                        onChange={handelInputChange}
                        value={feedback.email}
                      />
                    </div>

                    {/* Rating */}

                    <div className="form_group">
                      <label>
                        Rating
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        className="form_control"
                        name="rating"
                        value={feedback.rating}
                        onChange={handelInputChange}
                      >
                        <option value="">Select Rating</option>

                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Good</option>
                        <option value="3">⭐⭐⭐ Average</option>
                        <option value="2">⭐⭐ Poor</option>
                        <option value="1">⭐ Bad</option>
                      </select>
                    </div>

                    {/* Message */}

                    <div className="form_group">
                      <label>
                        Message
                        <span className="text-danger">*</span>
                      </label>

                      <textarea
                        className="form_control"
                        name="message"
                        rows="5"
                        onChange={handelInputChange}
                        value={feedback.message}
                      ></textarea>
                    </div>

                    {/* Bottom Section */}

                    <div className="form_group form_checkbox d-flex justify-content-between align-items-center"></div>

                    {/* Submit Button */}

                    <div className="form_group">
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="main-btn"
                      >
                        {mutation.isPending
                          ? "Submitting..."
                          : "SUBMIT FEEDBACK"}
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
                      <h2>Share Your Experience With Us</h2>
                    </div>

                    <form className="newsletter-form">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Write your valuable feedback"
                          required
                        />

                        <button className="newsletter-btn">Send Now</button>
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

export default Feedback;
