import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Header_comp/Navbar";
import Footer from "./components/Footer_Comp/Footer.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <ToastContainer />

      <Outlet />

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
//demo
