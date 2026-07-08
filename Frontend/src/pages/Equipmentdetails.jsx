import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { LogoutwithoutNotification } from "../utills/Logout";
import CheckRole from "../utills/CheckRole";
import { toast } from "react-toastify";

function Equipmentdetails() {
  const [quantity, setQuantity] = useState(1);
  const [userProfile, setUserProfile] = useState({});

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    create_At: new Date(),
  });

  const { id } = useParams();

  let navigate = useNavigate();

  const FetchUserProfile = async () => {
    if (CheckRole() === "user") {
      try {
        const response = await api.get("/user/profile");
        console.log(response);

        setUserProfile(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          LogoutwithoutNotification();
        }
      }
    } else {
      LogoutwithoutNotification();
    }
  };

  useEffect(() => {
    FetchUserProfile();
  }, []);

  const fetchEquipmentDetails = async () => {
    const response = await api.get(`/user/equipment/${id}`);

    console.log("API RESPONSE :", response.data);

    return response.data.data;
  };

  const { data: equipmentdetails, isLoading } = useQuery({
    queryKey: ["equipmentdetails", id],
    queryFn: fetchEquipmentDetails,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h3>Loading...</h3>
      </div>
    );
  }
  const basePrice = parseFloat(
    equipmentdetails?.price?.toString().replace("$", ""),
  );

  const deposit = parseFloat(
    equipmentdetails?.deposit?.toString().replace("$", ""),
  );

  const discount = parseFloat(
    equipmentdetails?.discount?.toString().replace("$", ""),
  );

  const dollarRate = 80;

  const totalDollar = basePrice * quantity + deposit - discount;

  const totalRupee = totalDollar * dollarRate;

  const handlePayment = async () => {
    if (!bookingData.startDate) {
      toast.error("Please select Start Date");
      return;
    }

    if (!bookingData.endDate) {
      toast.error("Please select End Date");
      return;
    }
    if (new Date(bookingData.endDate) < new Date(bookingData.startDate)) {
      toast.error("End Date cannot be before Start Date");
      return;
    }
    try {
      const response = await api.post("/user/payment/createorder", {
        totalAmount: totalRupee,
      });

      console.log(response.data);

      const { amount, order_id, currency } = response.data.data;

      const options = {
        key: "rzp_test_VQhEfe2NCXbbwI",
        amount,
        currency,
        order_id,
        name: "Equipment Booking",
        description: `Total Amount ₹${totalRupee}`,

        handler: async function (response) {
          try {
            const Response = await api.post("/user/booking/equipmentbooking", {
              equipmentId: id,
              totalRupee,
              quantity,
              startDate: bookingData.startDate,
              endDate: bookingData.endDate,
            });

            console.log(Response.data);

            toast.success("Equipment Booking Successfully...", {
              onClose: () => navigate("/equipmenthistory"),
            });
          } catch (error) {
            console.log("Booking Error => ", error);
            toast.error("Booking Failed");
          }
        },

        prefill: {
          name: userProfile.name,
          email: userProfile.email,
          contact: userProfile.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  const nextDay = bookingData.startDate
    ? new Date(
        new Date(bookingData.startDate).setDate(
          new Date(bookingData.startDate).getDate() + 1,
        ),
      )
        .toISOString()
        .split("T")[0]
    : "";

  return (
    <>
      <div>
        {/* HERO */}
        <section className="hero-area">
          <div
            className="breadcrumbs-area bg_cover"
            style={{
              backgroundImage: "url('/assets/images/bg/breadcrumbs-bg-1.jpg')",
            }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="page-title text-center">
                    <h1>Equipment Details</h1>

                    <ul className="breadcrumbs-link d-flex justify-content-center">
                      <li>
                        <Link to="/">Home</Link>
                      </li>

                      <li className="active">Details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="equipment-details-section pt-130">
          <div className="container">
            <div className="row">
              {/* LEFT */}
              <div className="col-lg-8">
                <div className="equipment-gallery-box d-flex mb-40">
                  {/* MAIN IMAGE */}
                  <div className="equipment-slider-warp">
                    <div className="equipment-gallery-slider">
                      <div
                        className="single-gallery-itam"
                        data-thumb={equipmentdetails?.image}
                      >
                        <a href={equipmentdetails?.image} className="img-popup">
                          <img
                            src={equipmentdetails?.image}
                            alt={equipmentdetails?.name}
                            style={{
                              height: "390px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* SIDE IMAGES */}
                  <div className="equipment-gallery-arrow">
                    {[1, 2, 3].map((item) => (
                      <img
                        key={item}
                        src={equipmentdetails?.image}
                        alt=""
                        style={{
                          width: "180px",
                          height: "120px",
                          objectFit: "cover",
                          marginBottom: "15px",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="description-wrapper">
                  <h3 className="title">
                    {equipmentdetails?.name || "Equipment Name"}
                  </h3>

                  {/* BROCHURE */}
                  <a href="#" className="voucher-btn">
                    <i className="fas fa-file-pdf" />
                    View Brochure
                  </a>

                  {/* DESCRIPTION BOX */}
                  <div className="content-box">
                    <h4 className="title">Description</h4>

                    <p>{equipmentdetails?.desc || "No description found"}</p>

                    <div className="row">
                      <div className="col-lg-6">
                        <ul className="list">
                          <li>Best construction equipment</li>
                          <li>At affordable price</li>
                          <li>Contrary to popular belief</li>
                        </ul>
                      </div>

                      <div className="col-lg-6">
                        <ul className="list">
                          <li>Quality check</li>
                          <li>Technical support</li>
                          <li>Right Time Service</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS TABLE */}
                  <div className="content-box">
                    <h4 className="title">Details</h4>

                    <div className="content-table table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Model</td>

                            <td className="text-right">
                              {equipmentdetails?.specifications?.model || "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <td>Brand</td>

                            <td className="text-right">
                              {equipmentdetails?.specifications?.brand || "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <td>Maximum Reach</td>

                            <td className="text-right">
                              {equipmentdetails?.specifications
                                ?.maximum_reach || "N/A"}
                            </td>
                          </tr>

                          <tr>
                            <td>Price</td>

                            <td className="text-right">
                              ₹ {equipmentdetails?.price || 0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4">
                <div className="equipement-sidebar-info">
                  <form>
                    <div className="booking-form">
                      {/* PRICE */}
                      <div className="price-info">
                        <h5>Price</h5>

                        <span>Starts From</span>

                        <div className="price-tag">
                          <h4>₹ {equipmentdetails?.price}</h4>
                        </div>
                      </div>

                      {/* BODY */}
                      <div className="pricing-body">
                        {/* PRICE OPTIONS */}
                        <div className="price-option">
                          <span className="span-btn day">₹130/Day</span>

                          <span className="span-btn active-btn week">
                            ₹350/Week
                          </span>

                          <span className="span-btn month">₹875/Month</span>
                        </div>

                        {/* START DATE */}
                        <div className="form_group">
                          <label>Start Date</label>

                          <input
                            type="date"
                            className="form_control"
                            name="startDate"
                            min={new Date().toISOString().split("T")[0]}
                            value={bookingData.startDate}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                startDate: e.target.value,
                                endDate:
                                  bookingData.endDate < e.target.value
                                    ? ""
                                    : bookingData.endDate,
                              })
                            }
                          />
                        </div>

                        <div className="form_group">
                          <label>End Date</label>

                          <input
                            type="date"
                            className="form_control"
                            name="endDate"
                            value={bookingData.endDate}
                            min={bookingData.startDate} // Start Date se pehle select nahi hoga
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* DELIVERY */}
                        <div className="form_group">
                          <div className="reserved-filter d-flex justify-content-between">
                            <div className="single-method d-flex">
                              <input type="radio" id="cat1" name="radio" />

                              <label htmlFor="cat1">
                                <span>Self-Pickup</span>
                              </label>
                            </div>

                            <div className="single-method d-flex">
                              <input
                                type="radio"
                                id="cat2"
                                name="radio"
                                defaultChecked
                              />

                              <label htmlFor="cat2">
                                <span>Owner Delivery</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* LOCATION */}
                        <div className="form_group">
                          <select className="wide form_control">
                            <option>Where : Captown City , New York</option>
                          </select>
                        </div>

                        {/* EXTRA OPTIONS */}
                        <div className="extra-option pt-35">
                          <h4>Extra options</h4>

                          <div className="price-option-table mb-20">
                            <ul>
                              <li className="single-price-option">
                                <div className="single-method">
                                  <label>
                                    <h6 style={{ fontSize: "20px" }}>Price</h6>

                                    <span className="price">
                                      {equipmentdetails?.price}
                                    </span>
                                  </label>
                                </div>
                              </li>

                              <li className="single-price-option">
                                <div className="single-method">
                                  <label htmlFor="cat3">
                                    Deposit
                                    <span className="price">
                                      {equipmentdetails?.deposit}
                                    </span>
                                  </label>
                                </div>
                              </li>

                              <li className="single-price-option">
                                <div className="single-method">
                                  <label htmlFor="cat4">
                                    Discount
                                    <span className="price">
                                      ₹ {equipmentdetails?.discount}
                                    </span>
                                  </label>
                                </div>
                              </li>

                              <li className="single-price-option">
                                <div
                                  className="d-flex justify-content-between align-items-center"
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "16px",
                                    }}
                                  >
                                    Quantity
                                  </span>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      border: "1px solid #ccc",
                                    }}
                                  >
                                    {/* DECREMENT */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setQuantity(
                                          quantity > 1 ? quantity - 1 : 1,
                                        )
                                      }
                                      style={{
                                        border: "none",
                                        background: "#f5f5f5",
                                        width: "35px",
                                        height: "35px",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      -
                                    </button>

                                    {/* QUANTITY */}
                                    <span
                                      style={{
                                        width: "40px",
                                        textAlign: "center",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {quantity}
                                    </span>

                                    {/* INCREMENT */}
                                    <button
                                      type="button"
                                      onClick={() => setQuantity(quantity + 1)}
                                      style={{
                                        border: "none",
                                        background: "#f5f5f5",
                                        width: "35px",
                                        height: "35px",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </li>

                              <li className="single-price-option mt-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "16px",
                                      color: "black",
                                    }}
                                  >
                                    Total
                                  </span>
                                  <span
                                    className="total"
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {totalDollar.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    })}
                                  </span>

                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "700",
                                      color: "#ff6600",
                                    }}
                                  >
                                    ₹ {totalRupee.toFixed(2)}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* BUTTON */}
                        <div className="button text-center">
                          <button
                            className="main-btn"
                            type="button"
                            onClick={handlePayment}
                           
                          >
                            Booking Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* END RIGHT */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Equipmentdetails;
