import React, { useEffect, useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function EditCategory() {
  const navigate = useNavigate();
  let category = useLocation().state;
  let [editcategory, setEditCategory] = useState(category);

  function handleInputChange(e) {
    let { name, value } = e.target;

    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const updateCategory = async (updatedData) => {
    const response = await api.put(
      `/admin/category/update/${editcategory._id}`,
      updatedData,
    );

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateCategory,

    onSuccess: () => {
      toast.success("Category Updated Successfully...", {
        onClose: () => {
          navigate("/managecategory");
        },
      });
    },

    onError: () => {
      toast.error("Something went wrong...");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(editcategory);
  }

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
        <div className="body-wrapper">
          {/* Header */}
          <Header />

          {/* Container */}
          <div className="container-fluid">
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
                    <h2 className="text-white fw-bold mb-1">Edit Category</h2>

                    <p className="text-light mb-0">Update Transport Category</p>
                  </div>

                  <Link
                    to="/managecategory"
                    className="btn btn-light rounded-pill px-4 fw-semibold"
                  >
                    <i className="ti ti-arrow-left me-2"></i>
                    Back
                  </Link>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Category Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">
                        Category Name
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="ti ti-category"></i>
                        </span>

                        <input
                          type="text"
                          name="name"
                          value={editcategory.name}
                          onChange={handleInputChange}
                          className="form-control border-0 bg-light py-3"
                          placeholder="Enter category name"
                        />
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Icon Class</label>

                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="ti ti-icons"></i>
                        </span>

                        <input
                          type="text"
                          name="icon"
                          value={editcategory.icon}
                          onChange={handleInputChange}
                          className="form-control border-0 bg-light py-3"
                          placeholder="Enter icon class"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label className="form-label fw-bold">Description</label>

                      <textarea
                        rows="6"
                        name="desc"
                        value={editcategory.desc}
                        onChange={handleInputChange}
                        className="form-control border-0 bg-light"
                        placeholder="Enter category description"
                      ></textarea>
                    </div>

                
                    {/* Buttons */}
                    <div className="col-12">
                      <div className="d-flex justify-content-end gap-3 mt-3">
                        <Link
                          to="/managecategory"
                          className="btn btn-light rounded-pill px-4 py-2"
                        >
                          <i className="ti ti-arrow-left me-2"></i>
                          Back
                        </Link>

                        <button
                          type="submit"
                          disabled={mutation.isPending}
                          className="btn rounded-pill px-5 py-2 fw-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, #6366F1, #8B5CF6)",
                            color: "#fff",
                            border: "none",
                            minWidth: "180px",
                          }}
                        >
                          {mutation.isPending ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                              ></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="ti ti-edit me-2"></i>
                              Update Category
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCategory;
