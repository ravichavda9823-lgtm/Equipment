import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageCategory from "./pages/ManageCategory";
import ManageEquipment from "./pages/ManageEquipment";
import ManageUser from "./pages/ManageUser";
import ManageFeedback from "./pages/ManageFeedback";
import ManageInquiry from "./pages/MangeInquiry";
import ManageBookingHistory from "./pages/ManageBookingHistory";
import ManageBookingStatus from "./pages/ManageBookingStatus";
import AddCategory from "./pages/Addcategory";
import AddEquipment from "./pages/AddEquipment";
import EditCategory from "./pages/Editcategory";
import EditEquipment from "./pages/Editequipment";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        theme="colored"
        style={{ zIndex: 99999 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/manageequipment" element={<ManageEquipment />} />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/managefeedback" element={<ManageFeedback />} />
          <Route path="/manageinquiry" element={<ManageInquiry />} />
          <Route path="/managebookinghistory" element={<ManageBookingHistory />} />
          <Route path="/managebookingstatus" element={<ManageBookingStatus />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addeuipment" element={<AddEquipment />} />
          <Route path="/editcategory" element={<EditCategory />} />
          <Route path="/editequipment" element={<EditEquipment />} />













        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
