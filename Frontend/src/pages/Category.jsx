import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utills/AxiosConfig";

function Category() {
  const fetchCategory = async () => {
    try {
      const response = await api.get("/user/category/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
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
                    <h1 data-aos="fade-up">Categories</h1>
                    <ul
                      className="breadcrumbs-link d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <li>
                        <Link to="/" target="_self" title="Home">
                          Home
                        </Link>
                      </li>
                      <li className="active">Categories</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Hero Section ======*/}
        {/*====== Start Categories Section ======*/}
        <section className="categories-area pt-130">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <p className="text-center">Loading Category...</p>
              ) : isError ? (
                <p className="text-danger text-center">{error.message}</p>
              ) : (
                category.map((value) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-12"
                    data-aos="fade-up"
                  >
                    <div className="categories-item categories-item-one text-center mb-60">
                      <div className="icon">
                        <i className={value.icon} />
                      </div>
                      <div className="content">
                        <h5>{value.name}</h5>
                        <p>
                          {value.desc}
                        </p>
                        <Link
                          to="/equipment"
                          target="_self"
                          title="Link"
                          className="main-btn main-btn-primary"
                        >
                          View Equipments
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        {/*====== End Categories Section ======*/}

        {/*====== Start Newsletter Section ======*/}
        <section className="newsletter-area pt-30">
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

export default Category;
