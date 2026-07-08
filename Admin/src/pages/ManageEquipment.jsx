import React from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import api from "../utills/AxiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageEquipment() {
  const queryClient = useQueryClient();
    const navigate = useNavigate();



  const fetchEquipment = async () => {
    try {
      const response = await api.get("/admin/equipment/");
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

   const DeleteEquipment = async (id) => {
    try {
      const response = await api.delete(`/admin/equipment/delete/${id}`);
      toast.success("Equipment Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["equipment"] });
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
        <Aside />

        <div className="body-wrapper">
          <Header />

          <div className="container-fluid">
            {/* Header */}
            <div
              className="card border-0 shadow-sm rounded-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-bold mb-1">
                      Manage Equipment
                    </h2>

                    <p className="text-light mb-0">
                      Professional Equipment Management Panel
                    </p>
                  </div>

                 <button className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
                    <Link
                      to="/addeuipment"
                      className="text-decoration-none text-dark"
                    >
                      <i className="ti ti-plus me-2"></i>
                      Add Equipment
                    </Link>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table align-middle mb-0"
                    style={{ minWidth: "1800px" }}
                  >
                    <thead
                      style={{
                        background: "#111827",
                      }}
                    >
                      <tr>
                        <th className="text-white py-4 px-4">ID</th>

                        <th className="text-white py-4">Equipment</th>

                        <th className="text-white py-4">Description</th>

                        <th className="text-white py-4">Specifications</th>

                        <th className="text-white py-4">Price</th>

                        <th className="text-white py-4">Deposit</th>

                        <th className="text-white py-4">Rating</th>

                        <th className="text-white py-4">Status</th>

                        <th className="text-white py-4 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="9" className="text-center py-5">
                            Loading Equipment...
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
                        equipment?.map((value, index) => (
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

                            {/* Equipment */}
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={value.image}
                                  alt={value.name}
                                  className="rounded-3"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                />

                                <div>
                                  <h6 className="fw-bold mb-1">{value.name}</h6>

                                  <span className="text-muted small">
                                    ID : #{value._id}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Description */}
                            <td className="py-3">
                              <p
                                className="mb-0 text-muted"
                                style={{
                                  maxWidth: "250px",
                                }}
                              >
                                {value.desc}
                              </p>
                            </td>

                            {/* Specifications */}
                            <td className="py-3">
                              <div className="small text-muted">
                                <div>
                                  <b>Brand :</b> {value.specifications?.brand}
                                </div>

                                <div>
                                  <b>Model :</b> {value.specifications?.model}
                                </div>

                                <div>
                                  <b>Weight :</b>{" "}
                                  {value.specifications?.operating_weight}
                                </div>

                                <div>
                                  <b>Reach :</b>{" "}
                                  {value.specifications?.maximum_reach}
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-3">
                              <div className="fw-bold text-success">
                                {value.price}
                              </div>

                              <span className="badge bg-danger">
                                {value.discount}
                              </span>
                            </td>

                            {/* Deposit */}
                            <td className="py-3 fw-semibold">
                              {value.deposit}
                            </td>

                            {/* Rating */}
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-1">
                                <i className="ti ti-star-filled text-warning"></i>

                                <span className="fw-semibold">
                                  {value.rating}
                                </span>

                                <span className="text-muted small">
                                  ({value.total_reviews})
                                </span>
                              </div>
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
                                      navigate("/editequipment", {
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
                                   onClick={() => DeleteEquipment(value._id)}
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

export default ManageEquipment;
