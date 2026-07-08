import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function AddEquipment() {
  // EQUIPMENT STATE
  const [equipment, setEquipment] = useState({
    category_id: "",
    image: "",
    name: "",
    desc: "",
    delivery_charge: "",
    price: "",
    discount: "",
    total_reviews: "",
    rating: "",
    deposit: "",
    rental_price: {
      day_price: "",
      week_price: "",
      month_price: "",
    },
    specifications: {
      maximum_reach: "",
      operating_weight: "",
      model: "",
      digging_depth: "",
      brand: "",
    },
    status: "Active",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (
      [
        "maximum_reach",
        "operating_weight",
        "model",
        "digging_depth",
        "brand",
      ].includes(name)
    ) {
      setEquipment((prev) => ({
        ...prev,

        specifications: {
          ...prev.specifications,
          [name]: value,
        },
      }));
    } else if (["day_price", "week_price", "month_price"].includes(name)) {
      setEquipment((prev) => ({
        ...prev,

        rental_price: {
          ...prev.rental_price,
          [name]: value,
        },
      }));
    } else {
      setEquipment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const fetchCategory = async () => {
    const response = await api.get("/admin/category");
    return response.data.data;
  };

  const { data: category = [] } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  const AddEquipmentData = async (data) => {
    const response = await api.post("/admin/equipment/addequipment", data);

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: AddEquipmentData,

    onSuccess: () => {
      toast.success("Equipment Added Successfully...", {
        onClose: () => {
          window.location.href = "/manageequipment";
        },
      });

      setEquipment({
        category_id: "",
        image: "",
        name: "",
        desc: "",
        delivery_charge: "",
        price: "",
        discount: "",
        total_reviews: "",
        rating: "",
        deposit: "",
        rental_price: {
          day_price: "",
          week_price: "",
          month_price: "",
        },
        specifications: {
          maximum_reach: "",
          operating_weight: "",
          model: "",
          digging_depth: "",
          brand: "",
        },
        status: "Active",
      });
    },

    onError: () => {
      toast.error("Something went wrong...", {
        onClose: () => {
          window.location.href = "/addeuipment";
        },
    });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate(equipment);
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
        <Aside />

        <div className="body-wrapper">
          <Header />

          <div className="container-fluid">
            {/* HEADER */}
            <div
              className="card border-0 shadow-sm rounded-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <div className="card-body p-4 d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="text-white fw-bold">Add Equipment</h2>

                  <p className="text-light mb-0">Create New Equipment</p>
                </div>

                <Link
                  to="/manageequipment"
                  className="btn btn-light rounded-pill px-4"
                >
                  <i className="ti ti-arrow-left me-2"></i>
                  Back
                </Link>
              </div>
            </div>

            {/* FORM */}
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* CATEGORY */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Category</label>

                      <select
                        name="category_id"
                        value={equipment.category_id}
                        onChange={handleInputChange}
                        className="form-select bg-light border-0 py-3"
                      >
                        <option value="">Select Category</option>

                        {category.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* IMAGE */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Image URL</label>

                      <input
                        type="text"
                        name="image"
                        value={equipment.image}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="Enter image url"
                      />
                    </div>

                    {/* NAME */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">
                        Equipment Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={equipment.name}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="Enter equipment name"
                      />
                    </div>

                    {/* DELIVERY CHARGE */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">
                        Delivery Charge
                      </label>

                      <input
                        type="text"
                        name="delivery_charge"
                        value={equipment.delivery_charge}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="$125"
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="col-12">
                      <label className="form-label fw-bold">Description</label>

                      <textarea
                        rows="5"
                        name="desc"
                        value={equipment.desc}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0"
                        placeholder="Enter equipment description"
                      ></textarea>
                    </div>

                    {/* PRICE */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Price</label>

                      <input
                        type="text"
                        name="price"
                        value={equipment.price}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="$159"
                      />
                    </div>

                    {/* DISCOUNT */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Discount</label>

                      <input
                        type="text"
                        name="discount"
                        value={equipment.discount}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="10%off"
                      />
                    </div>

                    {/* RENTAL PRICE */}
                    <div className="col-12">
                      <div
                        className="p-4 rounded-4"
                        style={{
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <h4 className="fw-bold mb-4">Rental Pricing</h4>

                        <div className="row g-4">
                          {/* DAY PRICE */}
                          <div className="col-md-4">
                            <label className="form-label fw-bold">
                              Day Price
                            </label>

                            <input
                              type="text"
                              name="day_price"
                              value={equipment.rental_price.day_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="$240/Day"
                            />
                          </div>

                          {/* WEEK PRICE */}
                          <div className="col-md-4">
                            <label className="form-label fw-bold">
                              Week Price
                            </label>

                            <input
                              type="text"
                              name="week_price"
                              value={equipment.rental_price.week_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="$1600/Week"
                            />
                          </div>

                          {/* MONTH PRICE */}
                          <div className="col-md-4">
                            <label className="form-label fw-bold">
                              Month Price
                            </label>

                            <input
                              type="text"
                              name="month_price"
                              value={equipment.rental_price.month_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="$6000/Month"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TOTAL REVIEWS */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Total Reviews
                      </label>

                      <input
                        type="text"
                        name="total_reviews"
                        value={equipment.total_reviews}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="20"
                      />
                    </div>

                    {/* RATING */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Rating</label>

                      <input
                        type="text"
                        name="rating"
                        value={equipment.rating}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="5.00"
                      />
                    </div>

                    {/* DEPOSIT */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Deposit</label>

                      <input
                        type="text"
                        name="deposit"
                        value={equipment.deposit}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                        placeholder="$30"
                      />
                    </div>

                    {/* SPECIFICATIONS */}
                    <div className="col-12">
                      <div
                        className="p-4 rounded-4"
                        style={{
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <h4 className="fw-bold mb-4">
                          Equipment Specifications
                        </h4>

                        <div className="row g-4">
                          {/* BRAND */}
                          <div className="col-md-6">
                            <label className="form-label fw-bold">Brand</label>

                            <input
                              type="text"
                              name="brand"
                              value={equipment.specifications.brand}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Weekers"
                            />
                          </div>

                          {/* MODEL */}
                          <div className="col-md-6">
                            <label className="form-label fw-bold">Model</label>

                            <input
                              type="text"
                              name="model"
                              value={equipment.specifications.model}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Lot456"
                            />
                          </div>

                          {/* MAXIMUM REACH */}
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Maximum Reach
                            </label>

                            <input
                              type="text"
                              name="maximum_reach"
                              value={equipment.specifications.maximum_reach}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="2 Meter"
                            />
                          </div>

                          {/* DIGGING DEPTH */}
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Digging Depth
                            </label>

                            <input
                              type="text"
                              name="digging_depth"
                              value={equipment.specifications.digging_depth}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="3.5 Meter"
                            />
                          </div>

                          {/* OPERATING WEIGHT */}
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Operating Weight
                            </label>

                            <input
                              type="text"
                              name="operating_weight"
                              value={equipment.specifications.operating_weight}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="0.6 Ton"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PREVIEW */}
                    {/* PREVIEW */}
                    <div className="col-12">
                      <div
                        className="p-4 rounded-4"
                        style={{
                          background: "#F8FAFC",
                          border: "2px dashed #CBD5E1",
                        }}
                      >
                        <h4 className="fw-bold mb-4">Equipment Preview</h4>

                        <div className="row g-4 align-items-center">
                          {/* IMAGE */}
                          <div className="col-lg-4">
                            <img
                              src={
                                equipment.image ||
                                "https://via.placeholder.com/500x350"
                              }
                              alt=""
                              className="img-fluid rounded-4 shadow"
                              style={{
                                width: "100%",
                                height: "320px",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* DETAILS */}
                          <div className="col-lg-8">
                            {/* TITLE */}
                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                              <div>
                                <h2 className="fw-bold mb-2">
                                  {equipment.name || "Excavator Equipment"}
                                </h2>

                                <p className="text-muted mb-3">
                                  {equipment.desc ||
                                    "Equipment description preview"}
                                </p>
                              </div>

                              <span
                                className={`badge px-4 py-2 ${
                                  equipment.status === "Active"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {equipment.status}
                              </span>
                            </div>

                            {/* PRICE SECTION */}
                            <div className="row g-3 mb-4">
                              <div className="col-md-4">
                                <div className="bg-white shadow-sm rounded-4 p-3">
                                  <small className="text-muted">Price</small>

                                  <h5 className="fw-bold text-primary mb-0">
                                    {equipment.price || "$0"}
                                  </h5>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="bg-white shadow-sm rounded-4 p-3">
                                  <small className="text-muted">Deposit</small>

                                  <h5 className="fw-bold text-success mb-0">
                                    {equipment.deposit || "$0"}
                                  </h5>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="bg-white shadow-sm rounded-4 p-3">
                                  <small className="text-muted">Discount</small>

                                  <h5 className="fw-bold text-warning mb-0">
                                    {equipment.discount || "0%"}
                                  </h5>
                                </div>
                              </div>
                            </div>

                            {/* RENTAL PRICE */}
                            <div className="mb-4">
                              <h5 className="fw-bold mb-3">Rental Pricing</h5>

                              <div className="d-flex flex-wrap gap-3">
                                <div className="badge bg-primary px-4 py-3">
                                  Day :{equipment.rental_price?.day_price}
                                </div>

                                <div className="badge bg-success px-4 py-3">
                                  Week :{equipment.rental_price?.week_price}
                                </div>

                                <div className="badge bg-dark px-4 py-3">
                                  Month :{equipment.rental_price?.month_price}
                                </div>
                              </div>
                            </div>

                            {/* SPECIFICATIONS */}
                            <div className="mb-4">
                              <h5 className="fw-bold mb-3">Specifications</h5>

                              <div className="row g-3">
                                <div className="col-md-6">
                                  <div className="bg-white rounded-4 p-3 shadow-sm">
                                    <small className="text-muted">Brand</small>

                                    <h6 className="fw-bold mb-0">
                                      {equipment.specifications?.brand}
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="bg-white rounded-4 p-3 shadow-sm">
                                    <small className="text-muted">Model</small>

                                    <h6 className="fw-bold mb-0">
                                      {equipment.specifications?.model}
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="bg-white rounded-4 p-3 shadow-sm">
                                    <small className="text-muted">
                                      Operating Weight
                                    </small>

                                    <h6 className="fw-bold mb-0">
                                      {
                                        equipment.specifications
                                          ?.operating_weight
                                      }
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="bg-white rounded-4 p-3 shadow-sm">
                                    <small className="text-muted">
                                      Digging Depth
                                    </small>

                                    <h6 className="fw-bold mb-0">
                                      {equipment.specifications?.digging_depth}
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="bg-white rounded-4 p-3 shadow-sm">
                                    <small className="text-muted">
                                      Maximum Reach
                                    </small>

                                    <h6 className="fw-bold mb-0">
                                      {equipment.specifications?.maximum_reach}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* EXTRA DETAILS */}
                            <div className="d-flex flex-wrap gap-3">
                              <div className="badge bg-secondary px-4 py-3">
                                Delivery :{equipment.delivery_charge}
                              </div>

                              <div className="badge bg-info px-4 py-3">
                                Reviews :{equipment.total_reviews}
                              </div>

                              <div className="badge bg-warning text-dark px-4 py-3">
                                Rating :{equipment.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div className="col-12">
                      <div className="d-flex justify-content-end gap-3 mt-3">
                        <Link
                          to="/manageequipment"
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
                              Save Equipment
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

export default AddEquipment;
