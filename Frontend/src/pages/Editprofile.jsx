import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function EditProfile() {
  let profile = useLocation().state;
  let [profiledata, setProfiledata] = useState(profile);

  function handelInputChange(e) {
    let { name, value } = e.target;

    setProfiledata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const editprofile = async (profiledata) => {
    const response = await api.put(
      `/user/update/${profiledata._id}`,
      profiledata,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: editprofile,

    onSuccess: () => {
      toast.success("Profile Updated Successfully...", {
        onClose: () => {
          window.location.href = "/profile";
        },
      });
    },

    onError: () => {
      toast.error("Update Failed...");
    },
  });

  function handelSubmit(e) {
    e.preventDefault();
    mutation.mutate(profiledata);
  }


  return (
    <>
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
                  <h1>Edit Profile</h1>

                  <ul className="breadcrumbs-link d-flex justify-content-center">
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li className="active">Edit Profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== Start Edit Profile Section ======*/}
      <div className="user-area-section pt-120 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="user-form">
                <form onSubmit={handelSubmit}>
                  {/* Username */}
                  <div className="form_group">
                    <label>
                      Username <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className="form_control"
                      name="username"
                      value={profiledata.username}
                      onChange={handelInputChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="form_group">
                    <label>
                      Email Address <span className="text-danger">*</span>
                    </label>

                    <input
                      type="email"
                      className="form_control"
                      name="email"
                      value={profiledata.email}
                      onChange={handelInputChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form_group">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className="form_control"
                      name="phone"
                      value={profiledata.phone}
                      onChange={handelInputChange}
                    />
                  </div>

                  {/* Button */}
                  <div className="form_group">
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="main-btn"
                    >
                      {mutation.isPending ? "Updating..." : "UPDATE PROFILE"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End Edit Profile Section ======*/}

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
    </>
  );
}

export default EditProfile;
