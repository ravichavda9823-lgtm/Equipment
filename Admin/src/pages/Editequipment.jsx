import React, { useState } from "react";
import Aside from "../common/Aside";
import Header from "../common/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function EditEquipment() {
  const navigate = useNavigate();
  const equipmentData = useLocation().state;
  const [equipment, setEquipment] = useState(equipmentData);

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


  const updateEquipment = async (updatedData) => {
    const response = await api.put(
      `/admin/equipment/update/${equipment._id}`,
      updatedData,
    );

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateEquipment,

    onSuccess: () => {
      toast.success("Equipment Updated Successfully...", {
        onClose: () => {
          navigate("/manageequipment");
        },
      });
    },

    onError: () => {
      toast.error("Something went wrong...");
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
                  <h2 className="text-white fw-bold">Edit Equipment</h2>

                  <p className="text-light mb-0">Update Equipment Details</p>
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
                      ></textarea>
                    </div>

                    {/* PRICE */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Price</label>

                      <input
                        type="text"
                        name="price"
                        value={equipment.price}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
                      />
                    </div>

                    {/* DISCOUNT */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Discount</label>

                      <input
                        type="text"
                        name="discount"
                        value={equipment.discount}
                        onChange={handleInputChange}
                        className="form-control bg-light border-0 py-3"
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
                          <div className="col-md-4">
                            <input
                              type="text"
                              name="day_price"
                              value={equipment.rental_price?.day_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Day Price"
                            />
                          </div>

                          <div className="col-md-4">
                            <input
                              type="text"
                              name="week_price"
                              value={equipment.rental_price?.week_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Week Price"
                            />
                          </div>

                          <div className="col-md-4">
                            <input
                              type="text"
                              name="month_price"
                              value={equipment.rental_price?.month_price}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Month Price"
                            />
                          </div>
                        </div>
                      </div>
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
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="brand"
                              value={equipment.specifications?.brand}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Brand"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="model"
                              value={equipment.specifications?.model}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Model"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="maximum_reach"
                              value={equipment.specifications?.maximum_reach}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Maximum Reach"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="digging_depth"
                              value={equipment.specifications?.digging_depth}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Digging Depth"
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              type="text"
                              name="operating_weight"
                              value={equipment.specifications?.operating_weight}
                              onChange={handleInputChange}
                              className="form-control bg-light border-0 py-3"
                              placeholder="Operating Weight"
                            />
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
                          }}
                        >
                          {mutation.isPending ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="ti ti-edit me-2"></i>
                              Update Equipment
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

export default EditEquipment;
