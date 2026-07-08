import React from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ManageUser() {
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/user");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const BlockUser = async (id) => {
    try {
      const response = await api.put(`/auth/block/${id}`);

      if (response.data.status) {
        toast.success(response.data.message);

        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
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
        {/* Sidebar */}
        <Aside />

        {/* Body */}
        <div className="body-wrapper">
          {/* Header */}
          <Header />

          <div className="container-fluid">
            {/* Top Header */}
            <div
              className="card border-0 shadow-sm rounded-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">Manage Users</h2>

                    <p className="text-light mb-0">
                      Professional User Management Panel
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Table Card */}
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth: "1100px",
                    }}
                  >
                    {/* Table Head */}
                    <thead
                      style={{
                        background: "#111827",
                      }}
                    >
                      <tr>
                        <th className="text-white py-4 px-4">ID</th>

                        <th className="text-white py-4">Username</th>

                        <th className="text-white py-4">Email</th>

                        <th className="text-white py-4">Phone</th>

                        <th className="text-white py-4">Role</th>

                        <th className="text-white py-4">Status</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="7" className="text-center py-5">
                            Loading Users...
                          </td>
                        </tr>
                      ) : isError ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-danger text-center py-5"
                          >
                            {error.message}
                          </td>
                        </tr>
                      ) : (
                        users?.map((value, index) => (
                          <tr
                            key={value._id}
                            style={{
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {/* ID */}
                            <td className="px-4 py-3 fw-bold text-primary">
                              {index + 1}
                            </td>

                            {/* Username */}
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-3">
                                {/* Avatar */}
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    background: "rgba(99,102,241,0.1)",
                                    color: "#6366F1",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                  }}
                                >
                                  {value.username?.charAt(0)}
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {value.username}
                                  </h6>

                                  <span className="text-muted small">
                                    User ID : #{value._id}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Email */}
                            <td className="py-3 text-muted">{value.email}</td>

                            {/* Phone */}
                            <td className="py-3">{value.phone}</td>

                            {/* Role */}
                            <td className="py-3">
                              <span
                                className={`badge rounded-pill px-3 py-2 ${
                                  value.role === "Admin"
                                    ? "bg-primary"
                                    : "bg-secondary"
                                }`}
                              >
                                {value.role}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3">
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

                            {/* Action */}
                            <td className="py-3">
                              <div className="d-flex justify-content-center gap-3">
                                <button
                                  onClick={() => BlockUser(value._id)}
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",

                                    background:
                                      value.status === "Blocked"
                                        ? "rgba(34,197,94,0.1)"
                                        : "rgba(239,68,68,0.1)",

                                    color:
                                      value.status === "Blocked"
                                        ? "#16A34A"
                                        : "#DC2626",
                                  }}
                                >
                                  {value.status === "Blocked" ? (
                                    <i
                                      className="ti ti-lock-open fs-5"
                                      title="Unblock User"
                                    ></i>
                                  ) : (
                                    <i
                                      className="ti ti-lock fs-5"
                                      title="Block User"
                                    ></i>
                                  )}
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

export default ManageUser;
