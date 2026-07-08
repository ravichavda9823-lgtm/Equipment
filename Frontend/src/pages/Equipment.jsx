import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

function Equipment() {
  const { id } = useParams();

  const fetchCategory = async () => {
    try {
      const response = await api.get("/user/category/");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  const fetchEquipment = async () => {
    try {
      const response = await api.get("/user/equipment/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: equipment,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["equipment"],
    queryFn: fetchEquipment,
  });

  const fetchEquipmentByCategory = async (id) => {
    const response = await api.get(`/user/equipment/category/${id}`);
    return response.data.data;
  };

  const { data: categoryequipment } = useQuery({
    queryKey: ["categoryequipment", id],
    queryFn: () => fetchEquipmentByCategory(id),
    enabled: !!id,
  });
  return (
    <>
      <div>
        {/*====== Start Hero Area ======*/}
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
                    <h1 data-aos="fade-up">Equipment</h1>
                    <ul
                      className="breadcrumbs-link d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <li>
                        <Link to="/" target="_self" title="Home">
                          Home
                        </Link>
                      </li>
                      <li className="active">Equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Hero Area ======*/}
        {/*====== Start Equipments section ======*/}
        <section className="pricing-area pricing-list-section pt-30">
          <div className="container">
            <div className="equipments-search-filter mb-60" data-aos="fade-up">
           
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="sidebar-widget-area">
                  <div
                    className="widget location-widget mb-40"
                    data-aos="fade-up"
                  >
                    <h4 className="widget-title">Location</h4>
                    <ul className="list">
                      <li>1508 University Blvd E Havttsville</li>
                      <li>203 Route de Laubanère LOUER</li>
                      <li>8775 Cloudleap Ct ColumbiaMD</li>
                      <li>8530 Washington Blvd Jessup</li>
                      <li>6363 Ten Oaks Rd,103Clarksville</li>
                    </ul>
                   
                  </div>

                  <div
                    className="widget categories-widget-two"
                    data-aos="fade-up"
                  >
                    <h4 className="widget-title">Category Links</h4>

                    <Link to="/equipment" target="_self" title="Tag">
                      All Types
                    </Link>

                    {category?.map((value) => (
                      <Link
                        to={`/categorybyequipment/${value._id}`}
                        target="_self"
                        title="Tag"
                        key={value._id}
                      >
                        {value.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="equipments-list-wrapper">
                  <div
                    className="equipments-show-search"
                    data-aos="fade-up"
                  ></div>
                  {isLoading ? (
                    <p className="text-center">Loading Equipment...</p>
                  ) : isError ? (
                    <p className="text-danger text-center">{error.message}</p>
                  ) : (
                    (id ? categoryequipment : equipment)?.map((value) => (
                      <div
                        className="pricing-item pricing-item-three mb-60"
                        data-aos="fade-up"
                        key={value._id}
                      >
                        <div className="pricing-img">
                          <a
                            href="equipments-details.html"
                            target="_self"
                            title="Equipment"
                          >
                            <img src={value.image} alt={value.name} />
                          </a>

                          <span className="discount">{value.discount}</span>
                        </div>

                        <div className="pricing-info">
                          <div className="price-info">
                            <h5>Price</h5>

                            <span>Starts Form</span>

                            <div className="price-tag">
                              <h4>{value.price}</h4>
                            </div>
                          </div>

                          <div className="pricing-body">
                            <h3 className="title">
                              <a
                                href="equipments-details.html"
                                target="_self"
                                title="Equipment"
                              >
                                {value.name}
                              </a>
                            </h3>

                            <div className="price-option">
                              <span className="span-btn day">
                                {value.rental_price.day_price}
                              </span>

                              <span className="span-btn active-btn week">
                                {value.rental_price.week_price}
                              </span>

                              <span className="span-btn month">
                                {value.rental_price.month_price}
                              </span>
                            </div>

                            <span className="delivary">
                              Two-Way Delivery: {value.delivery_charge}
                            </span>

                            <ul className="info-list">
                              <li>
                                Maximum Reach:{" "}
                                {value.specifications.maximum_reach}
                              </li>

                              <li>
                                Operating Weight:{" "}
                                {value.specifications.operating_weight}
                              </li>

                              <li>Model: {value.specifications.model}</li>

                              <li>
                                Digging Depth:{" "}
                                {value.specifications.digging_depth}
                              </li>

                              <li>Brand: {value.specifications.brand}</li>
                            </ul>
                          </div>

                          <div className="pricing-bottom d-flex align-items-center justify-content-between">
                            <ul className="rating">
                              <li>
                                <i className="fas fa-star" />
                              </li>

                              <li>
                                <i className="fas fa-star" />
                              </li>

                              <li>
                                <i className="fas fa-star" />
                              </li>

                              <li>
                                <i className="fas fa-star" />
                              </li>

                              <li>
                                <i className="fas fa-star" />
                              </li>

                              <li>
                                <span>
                                  {value.rating} ({value.total_reviews} Rating)
                                </span>
                              </li>
                            </ul>

                            <Link
                              to={`/equipmentdetails/${value._id}`}
                              target="_self"
                              title="Reserve"
                              className="main-btn"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Equipments section ======*/}

        {/*====== Start Newsletter Section ======*/}
        <section className="newsletter-area pt-130">
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

export default Equipment;
