import React from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const fetchCategory = async () => {
    try {
      const response = await api.get("/admin/category/");
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

  const DeleteCategory = async (id) => {
    try {
      const response = await api.delete(`/admin/category/delete/${id}`);
      toast.success("Category Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
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
        {/* Sidebar */}
        <Aside />

        {/* Main Wrapper */}
        <div
          className="body-wrapper"
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          {/* Header */}
          <Header />

          <div
            className="container-fluid"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            {/* Page Header */}
            <div
              className="card border-0 shadow-sm rounded-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">Manage Category</h2>

                    <p className="text-light mb-0">
                      Professional Category Management Panel
                    </p>
                  </div>

                  <button className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
                    <Link
                      to="/addcategory"
                      className="text-decoration-none text-dark"
                    >
                      <i className="ti ti-plus me-2"></i>
                      Add Category
                    </Link>
                  </button>
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

                        <th className="text-white py-4">Category</th>

                        <th className="text-white py-4">Description</th>

                        <th className="text-white py-4">Status</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {isLoading ? (
                        <p className="text-center">Loading Category...</p>
                      ) : isError ? (
                        <p className="text-danger text-center">
                          {error.message}
                        </p>
                      ) : (
                        category.map((value, index) => (
                          <tr
                            key={value.id}
                            style={{
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {/* ID */}
                            <td className="px-4 py-3">
                              <div
                                className="fw-bold"
                                style={{
                                  color: "#6366F1",
                                }}
                              >
                                {index + 1}
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: "55px",
                                    height: "55px",
                                    background: "rgba(99,102,241,0.1)",
                                    color: "#6366F1",
                                    fontSize: "24px",
                                  }}
                                >
                                  <i className={value.icon}></i>
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">{value.name}</h6>

                                  <span className="text-muted small">
                                    Category ID : #{value._id}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Description */}
                            <td className="py-3">
                              <p
                                className="mb-0 text-muted"
                                style={{
                                  maxWidth: "300px",
                                }}
                              >
                                {value.desc}
                              </p>
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
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(59,130,246,0.1)",
                                    color: "#2563EB",
                                  }}
                                  onClick={() =>
                                    navigate("/editcategory", {
                                      state: value,
                                    })
                                  }
                                >
                                  <i className="ti ti-edit fs-5"></i>
                                </button>

                                <button
                                  className="btn border-0 rounded-circle shadow-sm"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    background: "rgba(239,68,68,0.1)",
                                    color: "#DC2626",
                                  }}
                                  onClick={() => DeleteCategory(value._id)}
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

export default ManageCategory;
