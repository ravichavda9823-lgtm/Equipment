import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <footer
        className="footer-area footer-area-one bg_cover"
        style={{ backgroundImage: "url(assets/images/bg/footer-bg-1.jpg)" }}
      >
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6" data-aos="fade-up">
                <div className="widget about-widget mb-40">
                  <a href="index.html" className="brand-logo">
                    <img
                      src="assets/images/footer-logo.png"
                      alt="Footer Logo"
                    />
                  </a>
                  <p>
                    Maecenas tempus, tellus eget condiment rhoncus, sem quam
                    semper libero sita
                  </p>
                  <div className="social-box">
                    <h5>Follow Us</h5>
                    <ul className="social-link">
                      <li>
                        <a href="https://www.facebook.com/" target="_blank">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com/" target="_blank">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a href="https://pinterest.com/" target="_blank">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="widget footer-widget-nav mb-40">
                  <h4 className="widget-title">Useful Link</h4>
                  <ul className="widget-nav">
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/category">Category</Link>
                    </li>
                    <li>
                      <Link to="/equipment">Equipment</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={150}
              >
                <div className="widget contact-info-widget mb-40">
                  <h4 className="widget-title">Contact Information</h4>
                  <ul className="contact-info-list">
                    <li>
                      <div className="icon">
                        <i className="fas fa-paper-plane" />
                      </div>
                      <div className="info">
                        <p>
                          <Link to="mailto:demotext456@gmail.com">
                            demotext456@gmail.com
                          </Link>
                        </p>
                        <p>
                          <Link to="mailto:exapleemail@gmail.com">
                            exapleemail@gmail.com
                          </Link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-phone" />
                      </div>
                      <div className="info">
                        <p>
                          <Link to="tel:123456789">+701 - 1111 - 2222 - 3333</Link>
                        </p>
                        <p>
                          <Link to="tel:123456789">+802 - 2222 - 3333 - 4444</Link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div className="info">
                        <p>2759 Renwick Drive Pennsylvania</p>
                        <p>450 Young Road New York</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-text text-center">
                  <p>
                    Copyright © 2022 <a href="index.html">Renowk</a>, All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
