import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import cookie from "js-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  let [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  function handelInputChange(e) {
    let { name, value } = e.target;

    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async (admin) => {
    let response = await axios.post(
      "http://localhost:8000/api/auth/signin",
      admin,
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.token) {
        cookie.set("token", response.token);
        cookie.set("role", response.role);

        setAdmin({
          email: "",
          password: "",
        });

        toast.success("Login Successfully..", {
          onClose: () => {
            window.location.href = "/";
          },
        });
      }
    },
    onError: () => {
      toast.error("Invalid Details...", {
        onClose: () => {
          window.location.href = "/login";
        },
      });
    },
  });

  async function handelSubmit(e) {
    e.preventDefault();

    mutation.mutate(admin);
  }

  console.log(admin);

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
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width={180}
                        alt
                      />
                    </a>
                    <p className="text-center">Your Social Campaigns</p>
                    <form onSubmit={handelSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Username
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={handelInputChange}
                          value={admin.email}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>

                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handelInputChange}
                          value={admin.password}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            defaultValue
                            id="flexCheckChecked"
                            defaultChecked
                          />
                          <label
                            className="form-check-label text-dark"
                            htmlFor="flexCheckChecked"
                          >
                            Remeber this Device
                          </label>
                        </div>
                        <a className="text-primary fw-bold" href="#">
                          Forgot Password ?
                        </a>
                      </div>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="btn btn-primary w-100 py-8 fs-4 rounded-2 border-0"
                      >
                        {mutation.isPending ? "Logging in..." : "LOG IN"}
                      </button>
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
