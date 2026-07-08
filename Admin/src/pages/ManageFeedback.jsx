import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ManageFeedback() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [reply, setReply] = useState("");

  const fetchFeedback = async () => {
    try {
      const response = await api.get("/admin/feedback/");

      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: feedback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

  const OpenReplyModal = (item) => {
    setSelectedItem(item);

    setReply(item.reply || "");

    setShowModal(true);
  };

  const handleSendReply = async () => {
    try {
      const response = await api.put(
        `/admin/feedback/reply/${selectedItem._id}`,
        {
          reply,
        },
      );

      if (response.data.status) {
        toast.success(response.data.message);

        queryClient.invalidateQueries({
          queryKey: ["feedback"],
        });

        setShowModal(false);

        setReply("");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };


    const DeleteFeedback = async (id) => {
    try {
      const response = await api.delete(`/admin/feedback/delete/${id}`);
      toast.success("Feedback Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
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
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">Manage Feedback</h2>

                    <p className="text-light mb-0">
                      Professional Feedback Management Panel
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

                        <th className="text-white py-4">Email</th>

                        <th className="text-white py-4">Rating</th>

                        <th className="text-white py-4">Message</th>

                        <th className="text-white py-4">Reply</th>

                        <th className="text-white py-4">Status</th>

                        <th className="text-white py-4">Date</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="9" className="text-center py-5">
                            Loading Feedback...
                          </td>
                        </tr>
                      ) : isError ? (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-danger text-center py-5"
                          >
                            {error.message}
                          </td>
                        </tr>
                      ) : (
                        feedback?.map((value, index) => (
                          <tr key={value._id}>
                            {/* ID */}
                            <td className="px-4 py-4 fw-bold text-primary">
                              {index + 1}
                            </td>

                            {/* USER */}
                            <td className="py-4">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    background: "rgba(236,72,153,0.1)",
                                    color: "#EC4899",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                  }}
                                >
                                  {value.name?.charAt(0)}
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">{value.name}</h6>

                                  <span className="text-muted small">
                                    User ID : #{value.user_id}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* EMAIL */}
                            <td className="py-4 text-muted">{value.email}</td>

                            {/* RATING */}
                            <td className="py-4">
                              <div className="d-flex align-items-center gap-1">
                                <i className="ti ti-star-filled text-warning"></i>

                                <span className="fw-bold">{value.rating}</span>
                              </div>
                            </td>

                            {/* MESSAGE */}
                            <td className="py-4">
                              <p
                                className="mb-0 text-muted"
                                style={{
                                  maxWidth: "350px",
                                }}
                              >
                                {value.message}
                              </p>
                            </td>

                            {/* REPLY */}
                            <td className="py-4">
                              <div
                                style={{
                                  maxWidth: "220px",
                                }}
                              >
                                {value.reply ? (
                                  <div
                                    className="bg-light p-3 rounded-4 shadow-sm"
                                    style={{
                                      whiteSpace: "pre-wrap",
                                      wordBreak: "break-word",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {value.reply}
                                  </div>
                                ) : (
                                  <span className="badge bg-warning text-dark px-3 py-2">
                                    Not Replied
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* STATUS */}
                            <td className="py-4">
                              <span
                                className={`badge rounded-pill px-4 py-2 ${
                                  value.status === "Active"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {value.status}
                              </span>
                            </td>

                            {/* DATE */}
                            <td className="py-4 text-muted">
                              {new Date(value.createdAt).toLocaleDateString()}
                            </td>

                            {/* ACTION */}
                            <td className="py-4">
                              <div className="d-flex justify-content-center gap-3">
                                {/* REPLY */}
                                <button
                                  onClick={() => OpenReplyModal(value)}
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(59,130,246,0.1)",
                                    color: "#2563EB",
                                  }}
                                >
                                  <i className="ti ti-message-reply fs-5"></i>
                                </button>

                                {/* DELETE */}
                                <button
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(239,68,68,0.1)",
                                    color: "#DC2626",
                                  }}
                                   onClick={() => DeleteFeedback(value._id)}
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

      {/* REPLY MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div
              className="modal-content border-0 overflow-hidden"
              style={{
                borderRadius: "24px",
              }}
            >
              {/* HEADER */}
              <div
                className="modal-header border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                <div>
                  <h4 className="text-white fw-bold mb-1">Reply to User</h4>

                  <p className="text-light mb-0">
                    Send professional feedback response
                  </p>
                </div>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-4">
                {/* USER CARD */}
                <div
                  className="p-4 rounded-4 mb-4"
                  style={{
                    background: "#F8FAFC",
                  }}
                >
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "rgba(99,102,241,0.1)",
                        color: "#6366F1",
                        fontWeight: "700",
                        fontSize: "22px",
                      }}
                    >
                      {selectedItem?.name?.charAt(0)}
                    </div>

                    <div>
                      <h5 className="fw-bold mb-1">{selectedItem?.name}</h5>

                      <p className="text-muted mb-0">{selectedItem?.email}</p>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div
                    className="p-3 rounded-4"
                    style={{
                      background: "#fff",
                    }}
                  >
                    <small className="text-muted d-block mb-2">
                      User Message
                    </small>

                    <p className="mb-0">{selectedItem?.message}</p>
                  </div>
                </div>

                {/* REPLY BOX */}
                <div>
                  <label className="form-label fw-bold mb-3">Your Reply</label>

                  <textarea
                    rows="6"
                    className="form-control border-0 bg-light"
                    placeholder="Write your professional reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    style={{
                      borderRadius: "16px",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 p-4">
                <button
                  className="btn btn-light rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn rounded-pill px-5"
                  onClick={handleSendReply}
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  <i className="ti ti-send me-2"></i>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageFeedback;
