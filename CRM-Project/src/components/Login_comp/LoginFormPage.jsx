import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./LoginFormPage.module.css";
import { toast } from "react-toastify";
import ForgotPassword from "./ForegetPassword"; // Import the ForgotPassword component

const LoginFormPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Add state for modal

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    const data = { email, password };

    fetch("https://localhost:7062/api/MyProfile/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Return the response as text
        } else {
          throw new Error(
            `Error logging in: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((token) => {
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Email and password do not match");
        } else if (error.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          console.error("Error:", error);
          toast.error("Please provide valid Email and Password");
        }
      });
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true); // Show the forgot password modal
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false); // Close the forgot password modal
  };

  return (
    <div className={style.text_add}>
      <div className={style.form_container}>
        <img src="/img/logo.png" alt="logo img" />
        <h5 className={style.loginpageHeading}>Login to your account.</h5>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${style.input_container}`}>
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            <input
              type="text"
              className={`form-control ${style.input_property}`}
              id="username"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`form-group ${style.input_container}`}>
            <FontAwesomeIcon icon={faLock} className={style.icon} />
            <input
              type="password"
              className={`form-control ${style.input_property}`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={style.btn}>
            Login
          </button>
        </form>
        <a
          href="#"
          className={style.forgot_password}
          onClick={handleForgotPasswordClick}
        >
          Forgot password?
        </a>
        <div className={style.signup}>
          <p>Don't have an account?</p>
          <button type="submit" className={`btn btn-primary ${style.btn}`}>
            Sign up
          </button>
        </div>
      </div>

      <ForgotPassword
        showForgotPassword={showForgotPassword}
        handleCloseForgotPasswordModal={handleCloseForgotPasswordModal}
      />
    </div>
  );
};

export default LoginFormPage;
