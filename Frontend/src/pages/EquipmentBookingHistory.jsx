import React from "react";
import { Link } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

function EquipmentBookingHistory() {
  const bookingHistory = [
    {
      _id: 1,
      equipmentName: "Professional Camera",
      equipmentImage:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      quantity: 2,
      totalRupee: 5000,
      startDate: "2026-05-10",
      endDate: "2026-05-15",
      status: "Pending",
    },
  ];

  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/user/booking/");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
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

 const downloadBookingPDF = (booking) => {
  if (!booking) {
    toast.success("Booking data not found!");
    return;
  }

  const doc = new jsPDF();

  // Header
  doc.setFillColor(33, 150, 243);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("EQUIPMENT BOOKING TICKET", 105, 22, {
    align: "center",
  });

  // Body
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(220);
  doc.roundedRect(10, 45, 190, 120, 4, 4, "FD");

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");
  doc.text("Booking ID :", 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking._id), 70, 60);

  doc.setFont("helvetica", "bold");
  doc.text("Equipment :", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.text(booking.equipmentName || "-", 70, 75);

  doc.setFont("helvetica", "bold");
  doc.text("Quantity :", 20, 90);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.quantity), 70, 90);

  doc.setFont("helvetica", "bold");
  doc.text("Amount :", 20, 105);
  doc.setFont("helvetica", "normal");
  doc.text("Rs. " + booking.totalRupee, 70, 105);

  doc.setFont("helvetica", "bold");
  doc.text("Start Date :", 20, 120);
  doc.setFont("helvetica", "normal");
  doc.text(
    new Date(booking.startDate).toLocaleDateString("en-GB"),
    70,
    120
  );

  doc.setFont("helvetica", "bold");
  doc.text("End Date :", 20, 135);
  doc.setFont("helvetica", "normal");
  doc.text(
    new Date(booking.endDate).toLocaleDateString("en-GB"),
    70,
    135
  );

  // Status
  let bgColor = [255, 193, 7];

  if (booking.status === "Approved") {
    bgColor = [40, 167, 69];
  } else if (booking.status === "Rejected") {
    bgColor = [220, 53, 69];
  }

  doc.setFillColor(...bgColor);
  doc.roundedRect(135, 55, 45, 15, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(booking.status || "Pending", 157, 65, {
    align: "center",
  });

  // Footer
  doc.setTextColor(100);
  doc.setFontSize(10);

  doc.text("This ticket is generated electronically.", 105, 180, {
    align: "center",
  });

  doc.text(
    "Generated On : " + new Date().toLocaleDateString("en-GB"),
    105,
    187,
    {
      align: "center",
    }
  );

  doc.save(`Booking-Ticket-${booking._id}.pdf`);
};
  return (
    <>
      <div>
        {/* Hero Area */}
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
                    <h1>Booking History</h1>

                    <ul className="breadcrumbs-link d-flex justify-content-center">
                      <li>
                        <Link to="/">Home</Link>
                      </li>

                      <li className="active">History</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking History */}
        <section className="pt-120 pb-90">
          <div className="container">
            <div className="row">
              {bookinghistory?.map((value) => (
                <div className="col-lg-12 mb-40" key={value._id}>
                  <div className="booking-card-new">
                    {/* Image */}
                    <div className="booking-left">
                      <img
                        src={value.equipmentImage}
                        alt={value.equipmentName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="booking-right">
                      {/* Top */}
                      <div className="booking-top">
                        <div>
                          <span className="booking-id">
                            Booking ID : #{value._id}
                          </span>

                          <h3>{value.equipmentName}</h3>
                        </div>

                        <div
                          className={`status-box ${
                            value.status === "Approved"
                              ? "approved-status"
                              : value.status === "Rejected"
                                ? "rejected-status"
                                : "pending-status"
                          }`}
                        >
                          {value.status}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="booking-details">
                        <div className="detail-box">
                          <span>Total Amount</span>

                          <strong>₹{value.totalRupee}</strong>
                        </div>

                        <div className="detail-box">
                          <span>Quantity</span>

                          <strong>{value.quantity}</strong>
                        </div>

                        <div className="detail-box">
                          <span>Start Date</span>

                          <strong>
                            {new Date(value.startDate).toLocaleDateString()}
                          </strong>
                        </div>

                        <div className="detail-box">
                          <span>End Date</span>

                          <strong>
                            {new Date(value.endDate).toLocaleDateString()}
                          </strong>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="booking-buttons">
                        <button
                          className="back-history-btn"
                          onClick={() => window.history.back()}
                        >
                          Back
                        </button>
                        <button
                          className="download-history-btn"
                          onClick={() => downloadBookingPDF(value)}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default EquipmentBookingHistory;
