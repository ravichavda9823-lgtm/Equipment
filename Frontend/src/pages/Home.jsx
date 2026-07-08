import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CheckRole from "../utills/CheckRole";
import api from "../utills/AxiosConfig";
import { LogoutwithoutNotification } from "../utills/Logout";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  let [user, setUser] = useState({});
  const totalSlides = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  async function FetchUser() {
    if (CheckRole() === "user") {
      try {
        let response = await api.get("/user/profilehome");

        console.log(response);

        setUser(response.data.user);
      } catch (e) {
        console.log(e);
        if (e.response.status == 401 && e.response.status == 403) {
          LogoutwithoutNotification();
        }
      }
    } else {
      LogoutwithoutNotification();
    }
  }
  useEffect(() => {
    FetchUser();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await api.get("/user/category/");
      console.log(response);
      return response.data.data.slice(0, 3);
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
      return response.data.data.slice(0,3);
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

  const fetchFeedback = async () => {
    try {
      const response = await api.get("/user/feedback/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const { data: feedback } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

  return (
    <>
      <div>
        {/*====== Start Hero Section ======*/}
        <section className="hero-area">
          <div className="hero-slider-one">
            <div
              className={`single-hero-slider bg_cover ${
                activeSlide === 0 ? "active" : ""
              }`}
              style={{
                backgroundImage: "url(assets/images/bg/hero-bg-slider-1.jpg)",
              }}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-11">
                    <div className="hero-content text-center">
                      <h1 data-aos="fade-up">
                        Build Your Dream With Our Construction Equipment
                      </h1>
                      <p data-aos="fade-up" data-aos-delay={50}>
                        Aenean ligula porttitor euonsequat vitae eleifend
                        aenliquam lorem ante dapibus in viverra quis feugiat a
                        tellus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`single-hero-slider bg_cover ${
                activeSlide === 1 ? "active" : ""
              }`}
              style={{
                backgroundImage: "url(assets/images/bg/hero-bg-slider-2.jpg)",
              }}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-11">
                    <div className="hero-content text-center">
                      <h1>We Provide Best Construction Equipment For You</h1>
                      <p>
                        Aenean ligula porttitor euonsequat vitae eleifend
                        aenliquam lorem ante dapibus in viverra quis feugiat a
                        tellus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Hero Section ======*/}
        {/*====== Start About Section ======*/}
        <section className="about-area pt-130 pb-80">
          <div className="container">
            <div className="row gx-xl-5">
              <div className="col-lg-7" data-aos="fade-up">
                <div className="about-img-box about-img-box-one mb-50">
                  <div className="about-img about-img-one">
                    <img
                      src="assets/images/about/about-1.jpg"
                      alt="about image"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5" data-aos="fade-up">
                <div className="about-content-box about-content-box-one mb-50">
                  <div className="section-title mb-40">
                    <span className="sub-title">
                      <span className="sub-bg">Who</span> Are We?
                    </span>
                    <h2 className="mb-0">
                      We Have 30+ Years of Industrial Experience
                    </h2>
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took.
                  </p>
                  <p>
                    Letraset sheets containing Lorem Ipsum passages, and more
                    recently with publishing software like PageMaker.
                  </p>
                  <div className="block-quote mt-25">
                    <h5>
                      “ Wmet minim ollit non deserunt ullamco est aliqua dolor
                      do amet sint. Velit officia consequat denivelit mollit.
                      Exercitation veniam consequat sunt nostrud vquis nostrud
                      exercitation “
                    </h5>
                  </div>
                  <Link
                    to="/contact"
                    target="_self"
                    title="What we do"
                    className="main-btn"
                  >
                    What We Do
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End About Section ======*/}
        {/*====== Start Working Process Section ======*/}
        <section className="working-process light-gray pt-130 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7" data-aos="fade-up">
                <div className="section-title text-center mb-55">
                  <span className="sub-title">
                    <span className="sub-bg">Working</span> Process
                  </span>
                  <h2>Get Your Rentals In Easy 4 Steps</h2>
                  <p>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit mollit
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div
                className="col-lg-2 col-md-3 process-column"
                data-aos="fade-up"
              >
                <div className="process-item process-item-one mb-40">
                  <div className="count-box">
                    <div className="icon">
                      <i className="flaticon-search" />
                    </div>
                    <div className="process-count">01</div>
                  </div>
                  <div className="content text-center">
                    <h4>Search Your Equipment</h4>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-2 col-md-3 process-column"
                data-aos="fade-up"
              >
                <div className="process-item process-item-one mb-40">
                  <div className="count-box">
                    <div className="icon">
                      <i className="flaticon-align" />
                    </div>
                    <div className="process-count">02</div>
                  </div>
                  <div className="content text-center">
                    <h4>Compare Your Selection</h4>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-2 col-md-3 process-column"
                data-aos="fade-up"
              >
                <div className="process-item process-item-one mb-40">
                  <div className="count-box">
                    <div className="icon">
                      <i className="flaticon-excavator-2" />
                    </div>
                    <div className="process-count">03</div>
                  </div>
                  <div className="content text-center">
                    <h4>Reserve The Equipment</h4>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-2 col-md-3 process-column"
                data-aos="fade-up"
              >
                <div className="process-item process-item-one mb-40">
                  <div className="count-box">
                    <div className="icon">
                      <i className="flaticon-presentation" />
                    </div>
                    <div className="process-count">04</div>
                  </div>
                  <div className="content text-center">
                    <h4>Get Start Your Project</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Working Process Section ======*/}
        {/*====== Start Features Section ======*/}
        <section className="features-area pt-130 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7" data-aos="fade-up">
                <div className="section-title text-center mb-55">
                  <span className="sub-title">
                    <span className="sub-bg">Awesome</span> Features
                  </span>
                  <h2>Most Featured Equipment</h2>
                  <p>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit mollit
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {isLoading ? (
                <p className="text-center">Loading Category...</p>
              ) : isError ? (
                <p className="text-danger text-center">{error.message}</p>
              ) : (
                category?.map((value) => (
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
                        <p>{value.desc}</p>
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
        {/*====== End Features Section ======*/}
        {/*====== Start Counter Section ======*/}
        <section
          className="counter-area bg-with-overlay bg_cover pt-130 pb-90"
          style={{ backgroundImage: "url(assets/images/bg/counter-bg-1.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-3 col-sm-6 counter-column"
                data-aos="fade-up"
              >
                <div className="counter-item counter-item-one mb-40 text-center">
                  <div className="icon">
                    <i className="flaticon-excavator-1" />
                  </div>
                  <div className="content">
                    <h2>
                      <span className="count">2500</span>+
                    </h2>
                    <h5>Equipment</h5>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 counter-column"
                data-aos="fade-up"
              >
                <div className="counter-item counter-item-one mb-40 text-center">
                  <div className="icon">
                    <i className="flaticon-placeholder" />
                  </div>
                  <div className="content">
                    <h2>
                      <span className="count">175</span>+
                    </h2>
                    <h5>Coverage Area</h5>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 counter-column"
                data-aos="fade-up"
              >
                <div className="counter-item counter-item-one mb-40 text-center">
                  <div className="icon">
                    <i className="flaticon-building" />
                  </div>
                  <div className="content">
                    <h2>
                      <span className="count">596</span>+
                    </h2>
                    <h5>Total Brunch</h5>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 counter-column"
                data-aos="fade-up"
              >
                <div className="counter-item counter-item-one mb-40 text-center">
                  <div className="icon">
                    <i className="flaticon-worker-1" />
                  </div>
                  <div className="content">
                    <h2>
                      <span className="count">1580</span>
                    </h2>
                    <h5>Company Staffs</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Counter Section ======*/}
        {/*====== Start Pricing Section ======*/}
        <section className="pricing-area pt-130 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6" data-aos="fade-up">
                <div className="section-title text-center mb-50">
                  <span className="sub-title">
                    <span className="sub-bg">Awesome</span> Equipment
                  </span>
                  <h2>Featured Rental Equipment</h2>
                  <p>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit mollit
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div
                  className="tab-content"
                  id="myTabContent"
                  data-aos="fade-up"
                >
                  <div className="tab-pane fade show active">
                    <div className="row">
                      {isLoading ? (
                        <h4 className="text-center mt-4">
                          Loading Equipment...
                        </h4>
                      ) : isError ? (
                        <h4 className="text-danger text-center">
                          {error.message}
                        </h4>
                      ) : (
                        equipment?.map((value) => {
                          return (
                            <div
                              className="col-lg-4 col-md-6 col-sm-12"
                              key={value._id}
                            >
                              <div className="pricing-item pricing-item-one mb-40">
                                <div className="pricing-img">
                                  <img src={value.image} alt={value.name} />
                                </div>

                                <div className="pricing-info">
                                  <div className="price-info">
                                    <h5>Price</h5>

                                    <span>Starts From</span>

                                    <div className="price-tag">
                                      <h4>{value.price}</h4>
                                    </div>
                                  </div>

                                  <div className="pricing-body">
                                    <h5 className="title">{value.name}</h5>

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

                                      <li>
                                        Model: {value.specifications.model}
                                      </li>

                                      <li>
                                        Digging Depth:{" "}
                                        {value.specifications.digging_depth}
                                      </li>

                                      <li>
                                        Brand: {value.specifications.brand}
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="pricing-bottom">
                                    <ul className="rating">
                                      <li>
                                        <i className="fas fa-star" />
                                      </li>

                                      <li>
                                        <span>
                                          {value.rating} ({value.total_reviews}{" "}
                                          Rating)
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
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End Pricing Section ======*/}
        {/*====== Start Testimonial Section ======*/}
        <section className="testimonial-area light-bg pt-130 pb-130">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-6" data-aos="fade-up">
                <div className="section-title mb-50">
                  <span className="sub-title">
                    <span className="sub-bg">Client</span> Feedback
                  </span>
                  <h2>What's Our Beautiful Clients Say About Us</h2>
                </div>
              </div>
              <div className="col-lg-6 mb-60" data-aos="fade-up">
                <div className="button float-lg-right">
                  <Link
                    to="/contact"
                    target="_self"
                    title="See all feedback"
                    className="main-btn"
                  >
                    See All Feedback
                  </Link>
                </div>
              </div>
            </div>
            <div className="row testimonial-slider-one">
              {isLoading ? (
                <h4 className="text-center mt-4">Loading Feedback...</h4>
              ) : isError ? (
                <h4 className="text-danger text-center">{error.message}</h4>
              ) : (
                feedback?.map((value) => {
                  return (
                    <div
                      className="col-lg-4"
                      data-aos="fade-up"
                      key={value._id}
                    >
                      <div className="testimonial-item testimonial-item-one">
                        <div
                          className="testimonial-content"
                          style={{ height: "300px", objectFit: "cover" }}
                        >
                          <div className="quote">
                            <i className="flaticon-left-quote" />
                          </div>

                          {/* Message */}
                          <p>{value.message}</p>

                          {/* Rating */}
                          <ul
                            className="rating d-flex"
                            style={{
                              gap: "5px",
                              marginBottom: "15px",
                            }}
                          >
                            {[...Array(value.rating)].map((_, index) => (
                              <li key={index}>
                                <i
                                  className="fas fa-star"
                                  style={{ color: "#ffb400" }}
                                />
                              </li>
                            ))}

                            <li>
                              <span
                                style={{
                                  marginLeft: "8px",
                                  fontWeight: "600",
                                }}
                              >
                                ({value.rating}.0 Rating)
                              </span>
                            </li>
                          </ul>

                          {/* Name */}
                          <h5>{value.name}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
        {/*====== End Testimonial Section ======*/}
        {/*====== Start CTA Section ======*/}
        <section
          className="cta-area bg-with-overlay bg-cover pt-120 pb-130"
          style={{ backgroundImage: "url(assets/images/bg/cta-bg-1.jpg)" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  className="cta-content-box cta-content-box-one content-white text-center"
                  data-aos="fade-up"
                >
                  <h2>We Are Served Since 93 Years To Clients With Trust</h2>
                  <h4>
                    Aenean ligula porttitor euonsequat vitae eleifend aenliquam
                    lorem
                  </h4>
                  <a
                    href="contact.html"
                    target="_self"
                    title="Get a quote"
                    className="main-btn main-btn-primary"
                  >
                    Get A Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*====== End CTA Section ======*/}
        {/*====== Start Blog Section ======*/}
        <section className="blog-area pt-130 pb-130">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-6" data-aos="fade-up">
                <div className="section-title mb-50">
                  <span className="sub-title">
                    <span className="sub-bg">Latest</span> News
                  </span>
                  <h2>Latest News &amp; Updates</h2>
                </div>
              </div>

              {/* <div className="col-lg-6" data-aos="fade-up">
                <div className="d-flex justify-content-end gap-2 mb-60">
                  <button className="blog-prev btn btn-dark">
                    <i className="fas fa-arrow-left"></i>
                  </button>

                  <button className="blog-next btn btn-dark">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div> */}
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".blog-next",
                prevEl: ".blog-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {/* Blog Item 1 */}
              <SwiperSlide>
                <div
                  className="blog-post-item blog-post-item-one"
                  style={{ height: "600px" }}
                >
                  <div className="post-thumbnail">
                    <a href="blog-details.html">
                      <img src="assets/images/blog/blog-1.jpg" alt="Blog" />
                    </a>

                    <a href="blog-details.html" className="cat-btn">
                      Excavator
                    </a>
                  </div>

                  <div className="entry-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Best equipment rental for your next project
                      </a>
                    </h3>

                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <i className="fas fa-user" />
                            Post by <a href="/">Admin</a>
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-calendar-alt" />
                            16 Dec 2021
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p>Maecenas tempus tellus egondimentum rhoncus sem quam.</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Blog Item 2 */}
              <SwiperSlide>
                <div
                  className="blog-post-item blog-post-item-one"
                  style={{ height: "600px" }}
                >
                  <div className="post-thumbnail">
                    <a href="blog-details.html">
                      <img src="assets/images/blog/blog-2.jpg" alt="Blog" />
                    </a>

                    <a href="blog-details.html" className="cat-btn">
                      Worker
                    </a>
                  </div>

                  <div className="entry-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Construction worker all time safe & free
                      </a>
                    </h3>

                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <i className="fas fa-user" />
                            Post by <a href="/">Admin</a>
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-calendar-alt" />
                            16 Dec 2021
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p>Maecenas tempus tellus egondimentum rhoncus sem quam.</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Blog Item 3 */}
              <SwiperSlide>
                <div
                  className="blog-post-item blog-post-item-one"
                  style={{ height: "600px" }}
                >
                  <div className="post-thumbnail">
                    <a href="blog-details.html">
                      <img src="assets/images/blog/blog-3.jpg" alt="Blog" />
                    </a>

                    <a href="blog-details.html" className="cat-btn">
                      Construction
                    </a>
                  </div>

                  <div className="entry-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Simple equipments rental for your big project
                      </a>
                    </h3>

                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <i className="fas fa-user" />
                            Post by <a href="/">Admin</a>
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-calendar-alt" />
                            16 Dec 2021
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p>Maecenas tempus tellus egondimentum rhoncus sem quam.</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Blog Item 4 */}
              <SwiperSlide>
                <div className="blog-post-item blog-post-item-one">
                  <div className="post-thumbnail">
                    <a href="blog-details.html">
                      <img src="assets/images/blog/blog-4.jpg" alt="Blog" />
                    </a>

                    <a href="blog-details.html" className="cat-btn">
                      Worker
                    </a>
                  </div>

                  <div className="entry-content">
                    <h3 className="title">
                      <a href="blog-details.html">
                        Construction worker all time safe & Free
                      </a>
                    </h3>

                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <i className="fas fa-user" />
                            Post by <a href="/">Admin</a>
                          </span>
                        </li>

                        <li>
                          <span>
                            <i className="fas fa-calendar-alt" />
                            16 Dec 2021
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p>Maecenas tempus tellus egondimentum rhoncus sem quam.</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/*====== End Blog Section ======*/}

        {/*====== Start Newsletter Section ======*/}
        <section className="newsletter-area pt-0">
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

export default Home;
