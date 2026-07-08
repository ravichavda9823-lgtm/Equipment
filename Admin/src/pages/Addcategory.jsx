import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    icon: "",
    desc: "",
    status: "Active",
  });

  function handleInputChange(e) {
    let { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const AddCategory = async (data) => {
    let response = await api.post("/admin/category/addcategory", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: AddCategory,

    onSuccess: () => {
      toast.success("Category Submitted Successfully....", {
        onClose: () => {
          window.location.href = "/managecategory";
        },
      });
      setCategory({
        name: "",
        icon: "",
        desc: "",
      });
    },

    onError: () => {
      toast.error("Something went wrong...", {
        onClose: () => {
          window.location.href = "/addcategory";
        },
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(category);
  }

  console.log(category);

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
                    <h2 className="text-white fw-bold mb-1">Add Category</h2>

                    <p className="text-light mb-0">
                      Create New Transport Category
                    </p>
                  </div>

                  <button className="btn btn-light rounded-pill px-4 fw-semibold">
                    <i className="ti ti-arrow-left me-2"></i>
                    Back
                  </button>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="card border-0 shadow rounded-4 overflow-hidden">
              <div className="card-body p-5">
                <form action="" onSubmit={handleSubmit}>
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
                          value={category.name}
                          onChange={handleInputChange}
                          className="form-control border-0 bg-light py-3"
                          placeholder="Enter category name"
                          defaultValue=""
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
                          value={category.icon}
                          onChange={handleInputChange}
                          className="form-control border-0 bg-light py-3"
                          placeholder="Enter icon class"
                          defaultValue=""
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label className="form-label fw-bold">Description</label>

                      <textarea
                        rows="6"
                        name="desc"
                        value={category.desc}
                        onChange={handleInputChange}
                        className="form-control border-0 bg-light"
                        placeholder="Enter category description"
                        defaultValue=""
                      ></textarea>
                    </div>

                    {/* Preview Card */}
                    <div className="col-12">
                      <div
                        className="p-4 rounded-4 mt-2"
                        style={{
                          background: "#F8FAFC",
                          border: "2px dashed #CBD5E1",
                        }}
                      >
                        <h5 className="fw-bold mb-4">Category Preview</h5>

                        <div className="d-flex align-items-center gap-4 flex-wrap">
                          {/* Icon */}
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle shadow"
                            style={{
                              width: "90px",
                              height: "90px",
                              background:
                                "linear-gradient(135deg, #6366F1, #8B5CF6)",
                              color: "#fff",
                              fontSize: "40px",
                            }}
                          >
                            <i className={category.icon}></i>
                          </div>

                          {/* Text */}
                          <div>
                            <h3 className="fw-bold mb-2">{category.name}</h3>

                            <p
                              className="text-muted mb-0"
                              style={{
                                maxWidth: "500px",
                              }}
                            >
                              {category.desc}
                            </p>
                          </div>
                        </div>
                      </div>
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
                              Adding...
                            </>
                          ) : (
                            <>
                              <i className="ti ti-device-floppy me-2"></i>
                              Save Category
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

export default AddCategory;
