import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ManageBookingHistory() {
  const queryClient = useQueryClient();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/admin/booking/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookinghistory"],
    queryFn: fetchBookingHistory,
  });

  const DeleteBookingHistory = async (id) => {
    try {
      const response = await api.delete(`/admin/booking/delete/${id}`);
      toast.success(" Booking History Deleted Sucessfully...");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        {/* SIDEBAR */}
        <Aside />

        {/* BODY */}
        <div className="body-wrapper">
          {/* HEADER */}
          <Header />

          <div className="container-fluid px-0">
            {/* TOP HEADER */}
            <div
              className="card border-0 shadow-sm mb-4 rounded-0"
              style={{
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">
                      Manage Booking History
                    </h2>

                    <p className="text-light mb-0">
                      Professional Booking History Management Panel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="card border-0 shadow rounded-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth: "2100px",
                    }}
                  >
                    {/* TABLE HEAD */}
                    <thead
                      style={{
                        background: "#111827",
                      }}
                    >
                      <tr>
                        <th className="text-white py-4 px-4">ID</th>

                        <th className="text-white py-4">User</th>

                        <th className="text-white py-4">Equipment</th>

                        <th className="text-white py-4">Start Date</th>

                        <th className="text-white py-4">End Date</th>

                        <th className="text-white py-4">Quantity</th>

                        <th className="text-white py-4">Total Amount</th>

                        <th className="text-white py-4">Status</th>

                        <th className="text-white py-4">Created Date</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="10" className="text-center py-5">
                            Loading Booking History...
                          </td>
                        </tr>
                      ) : isError ? (
                        <tr>
                          <td
                            colSpan="10"
                            className="text-danger text-center py-5"
                          >
                            {error.message}
                          </td>
                        </tr>
                      ) : (
                        booking?.map((value, index) => (
                          <tr key={value._id}>
                            {/* ID */}
                            <td className="px-4 py-4 fw-bold text-primary">
                              {index + 1}
                            </td>

                            {/* USER */}
                            <td className="py-4">
                              <div className="d-flex align-items-center gap-3">
                                {/* AVATAR */}
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "55px",
                                    height: "55px",
                                    background: "rgba(99,102,241,0.1)",
                                    color: "#6366F1",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                  }}
                                >
                                  {value.name?.charAt(0)}
                                </div>

                                {/* USER INFO */}
                                <div>
                                  <h6 className="fw-bold mb-1">{value.name}</h6>

                                  <div className="text-muted small">
                                    {value.phone}
                                  </div>

                                  <div className="text-muted small">
                                    {value.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* EQUIPMENT */}
                            <td className="py-4">
                              <div className="d-flex align-items-center gap-3">
                                {/* IMAGE */}
                                <img
                                  src={value.equipmentImage}
                                  alt=""
                                  className="rounded"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                  }}
                                />

                                {/* EQUIPMENT INFO */}
                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {value.equipmentName}
                                  </h6>

                                  <div className="text-muted small">
                                    {value.equipmentBrand}
                                  </div>

                                  <div
                                    className="fw-bold"
                                    style={{
                                      color: "#16A34A",
                                    }}
                                  >
                                    ₹ {value.equipmentPrice}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* START DATE */}
                            <td className="py-4 text-muted">
                              {new Date(value.startDate).toLocaleDateString()}
                            </td>

                            {/* END DATE */}
                            <td className="py-4 text-muted">
                              {new Date(value.endDate).toLocaleDateString()}
                            </td>

                            {/* QUANTITY */}
                            <td className="py-4 fw-semibold">
                              {value.quantity}
                            </td>

                            {/* TOTAL */}
                            <td className="py-4">
                              <span
                                className="fw-bold"
                                style={{
                                  color: "#16A34A",
                                }}
                              >
                                ₹ {value.totalRupee}
                              </span>
                            </td>

                            {/* STATUS */}
                            <td className="py-4">
                              <span
                                className={`badge rounded-pill px-4 py-2 ${
                                  value.status === "Pending"
                                    ? "bg-warning text-dark"
                                    : value.status === "Approved"
                                      ? "bg-success"
                                      : "bg-danger"
                                }`}
                              >
                                {value.status}
                              </span>
                            </td>

                            {/* CREATED DATE */}
                            <td className="py-4 text-muted">
                              {new Date(value.create_At).toLocaleDateString()}
                            </td>

                            {/* ACTION */}
                            <td className="py-4">
                              <div className="d-flex justify-content-center gap-3">
                                {/* VIEW BUTTON */}
                                <button
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(59,130,246,0.1)",
                                    color: "#2563EB",
                                  }}
                                  onClick={() => setSelectedBooking(value)}
                                >
                                  <i className="ti ti-history fs-5"></i>
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(239,68,68,0.1)",
                                    color: "#DC2626",
                                  }}
                                   onClick={() => DeleteBookingHistory(value._id)}
                                >
                                  <i className="ti ti-trash fs-5"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
      {selectedBooking && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0,0,0,0.7)",
            zIndex: 9999,
            backdropFilter: "blur(6px)",
          }}
        >
          {/* MAIN CONTAINER */}
          <div
            className="bg-white rounded-4 shadow-lg"
            style={{
              height: "95vh",
              width: "95%",
              maxWidth: "1100px",
              overflowY: "auto",
              overflowX: "hidden",
              animation: "fadeIn 0.3s ease",
              scrollbarWidth: "thin",
            }}
          >
            {/* HEADER */}
            <div
              className="d-flex justify-content-between align-items-center p-4 position-sticky top-0"
              style={{
                background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                zIndex: 100,
              }}
            >
              <div>
                <h3 className="text-white fw-bold mb-1">Booking Details</h3>

                <p className="text-light mb-0">
                  Professional Booking Information
                </p>
              </div>

              {/* CLOSE BUTTON */}
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div
              className="p-4"
              style={{
                minHeight: "calc(95vh - 100px)",
              }}
            >
              <div className="row g-4">
                {/* USER INFO */}
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        {/* AVATAR */}
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                          style={{
                            width: "100px",
                            height: "100px",
                            background:
                              "linear-gradient(135deg,#6366F1,#8B5CF6)",
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: "40px",
                          }}
                        >
                          {selectedBooking.name?.charAt(0)}
                        </div>
                      </div>

                      <h4 className="fw-bold text-center mb-1">
                        {selectedBooking.name}
                      </h4>

                      <p className="text-muted text-center mb-4">
                        Booking Customer
                      </p>

                      {/* INFO BOX */}
                      <div className="border rounded-4 p-4">
                        <div className="mb-4">
                          <small className="text-muted">Email Address</small>

                          <div className="fw-semibold">
                            {selectedBooking.email}
                          </div>
                        </div>

                        <div className="mb-4">
                          <small className="text-muted">Phone Number</small>

                          <div className="fw-semibold">
                            {selectedBooking.phone}
                          </div>
                        </div>

                        <div>
                          <small className="text-muted">Booking Status</small>

                          <div className="mt-2">
                            <span
                              className={`badge rounded-pill px-4 py-2 ${
                                selectedBooking.status === "Pending"
                                  ? "bg-warning text-dark"
                                  : selectedBooking.status === "Approved"
                                    ? "bg-success"
                                    : "bg-danger"
                              }`}
                            >
                              {selectedBooking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EQUIPMENT */}
                <div className="col-lg-8">
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* IMAGE */}
                    <img
                      src={selectedBooking.equipmentImage}
                      alt=""
                      className="w-100"
                      style={{
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                        <div>
                          <h2 className="fw-bold mb-2">
                            {selectedBooking.equipmentName}
                          </h2>
                        </div>

                        <div
                          className="fw-bold px-4 py-3 rounded-4"
                          style={{
                            background: "rgba(22,163,74,0.1)",
                            color: "#16A34A",
                            fontSize: "28px",
                          }}
                        >
                          {selectedBooking.equipmentPrice}
                        </div>
                      </div>

                      {/* SUMMARY */}
                      <div className="row g-4">
                        <div className="col-md-3">
                          <div className="border rounded-4 p-4 text-center h-100">
                            <div className="text-muted mb-2">Start Date</div>

                            <h6 className="fw-bold">
                              {new Date(
                                selectedBooking.startDate,
                              ).toLocaleDateString()}
                            </h6>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="border rounded-4 p-4 text-center h-100">
                            <div className="text-muted mb-2">End Date</div>

                            <h6 className="fw-bold">
                              {new Date(
                                selectedBooking.endDate,
                              ).toLocaleDateString()}
                            </h6>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="border rounded-4 p-4 text-center h-100">
                            <div className="text-muted mb-2">Quantity</div>

                            <h6 className="fw-bold">
                              {selectedBooking.quantity}
                            </h6>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="border rounded-4 p-4 text-center h-100">
                            <div className="text-muted mb-2">Total Amount</div>

                            <h6
                              className="fw-bold"
                              style={{
                                color: "#16A34A",
                              }}
                            >
                              ₹ {selectedBooking.totalRupee}
                            </h6>
                          </div>
                        </div>
                      </div>

                      {/* EXTRA INFO */}
                      <div className="card border-0 bg-light rounded-4 mt-4">
                        <div className="card-body p-4">
                          <h5 className="fw-bold mb-4">Booking Information</h5>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <small className="text-muted">Created Date</small>

                              <div className="fw-semibold">
                                {new Date(
                                  selectedBooking.create_At,
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="col-md-6 mb-3">
                              <small className="text-muted">Booking ID</small>

                              <div className="fw-semibold">
                                {selectedBooking._id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* DOWNLOAD BUTTON */}
                      <div className="d-flex justify-content-end mt-4">
                        <button
                          className="btn px-5 py-3 fw-bold rounded-4 shadow-sm"
                          style={{
                            background:
                              "linear-gradient(135deg,#2563EB,#4F46E5)",
                            color: "#fff",
                            border: "none",
                            fontSize: "16px",
                          }}
                        >
                          <i className="ti ti-download me-2"></i>
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageBookingHistory;
