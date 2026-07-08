import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ManageBookingStatus() {
  const queryClient = useQueryClient();

  const fetchBookingStatus = async () => {
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
    queryKey: ["bookingstatus"],
    queryFn: fetchBookingStatus,
    onSuccess: (data) => {
      setStatusData(data);
    },
  });

  const handleStatusChange = (bookings, id, field, value) => {
    return booking.map((b) => (b.id === id ? { ...b, [field]: value } : b));
  };

  const updateStatus = async (id, status) => {
    try {
      let response = await api.put(`/admin/booking/status/${id}`, {
        status: status,
      });
      toast.success("Status updated successfully...", {
        onClose: () => {
          window.location.href = "/managebookinghistory";
        },
      });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status...");
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
                background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">
                      Manage Booking Status
                    </h2>

                    <p className="text-light mb-0">
                      Professional Booking Status Management Panel
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
                      minWidth: "1700px",
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

                        <th className="text-white py-4">Total Amount</th>

                        <th className="text-white py-4">Booking Status</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            Loading Booking Status...
                          </td>
                        </tr>
                      ) : isError ? (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-danger text-center py-5"
                          >
                            {error.message}
                          </td>
                        </tr>
                      ) : (
                        booking.map((value, index) => (
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

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {value.equipmentName}
                                  </h6>

                                  <div className="text-muted small">
                                    {value.equipmentBrand}
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

                            {/* STATUS DROPDOWN */}
                            {/* STATUS */}
                            <td className="py-4">
                              <div className="position-relative">
                                <select
                                  className="form-select border-0 shadow-sm fw-bold"
                                  style={{
                                    minWidth: "190px",
                                    borderRadius: "16px",
                                    cursor: "pointer",
                                    padding: "14px 45px 14px 18px",
                                    appearance: "none",
                                    background:
                                      value.status === "Pending"
                                        ? "linear-gradient(135deg,#FEF3C7,#FCD34D)"
                                        : value.status === "Approved"
                                          ? "linear-gradient(135deg,#DCFCE7,#22C55E)"
                                          : "linear-gradient(135deg,#FEE2E2,#EF4444)",
                                    color:
                                      value.status === "Pending"
                                        ? "#92400E"
                                        : value.status === "Approved"
                                          ? "#166534"
                                          : "#991B1B",
                                    fontSize: "15px",
                                    transition: "0.3s",
                                  }}
                                  value={value.status}
                                  onChange={(e) =>
                                    updateStatus(value._id, e.target.value)
                                  }
                                >
                                  <option value="Pending">🟡 Pending</option>

                                  <option value="Approved">🟢 Approved</option>

                                  <option value="Cancelled">
                                    🔴 Cancelled
                                  </option>
                                </select>

                                {/* CUSTOM ICON */}
                                <div
                                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                  style={{
                                    pointerEvents: "none",
                                  }}
                                >
                                  <i
                                    className="ti ti-chevron-down"
                                    style={{
                                      fontSize: "18px",
                                      color:
                                        value.status === "Pending"
                                          ? "#92400E"
                                          : value.status === "Approved"
                                            ? "#166534"
                                            : "#991B1B",
                                    }}
                                  ></i>
                                </div>
                              </div>
                            </td>

                            {/* ACTION */}
                            <td className="py-4">
                              <div className="d-flex justify-content-center">
                                {/* DELETE BUTTON */}
                                <button
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    background: "rgba(239,68,68,0.12)",
                                    color: "#DC2626",
                                  }}
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
    </>
  );
}

export default ManageBookingStatus;
