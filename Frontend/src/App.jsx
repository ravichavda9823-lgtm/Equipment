import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from './common/Header'
import Footer from './common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Category from './pages/Category';
import Equipment from './pages/Equipment';
import Profile from './pages/Profile';
import Equipmentdetails from './pages/Equipmentdetails';
import Contact from './pages/Contact';
import EquipmentBookingHistory from './pages/EquipmentBookingHistory';
import Feedback from './pages/Feedback';
import EditProfile from './pages/Editprofile';

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categorybyequipment/:id" element={<Equipment />} />
          <Route path="/equipmentdetails/:id" element={<Equipmentdetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/equipmenthistory" element={<EquipmentBookingHistory/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/editprofile" element={<EditProfile />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
