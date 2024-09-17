import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import style from "./ForgotPassword.module.css"; // Assuming you want to use CSS modules
import { toast } from "react-toastify";

function ForgotPassword({
  showForgotPassword,
  handleCloseForgotPasswordModal,
}) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://localhost:7062/api/MyProfile/forgot-password",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccess("A reset link has been sent to your email.");
        setError("");
        // Clear email input
        setEmail("");
        // Optionally close the modal after success
        setTimeout(() => handleCloseForgotPasswordModal(), 2000);
      })
      .catch((error) => {
        setError("Error sending reset link. Please try again.");
        setSuccess("");
      });
  };

  return (
    <>
      <Modal
        show={showForgotPassword}
        onHide={handleCloseForgotPasswordModal}
        centered
      >
        <Modal.Header>
          <Modal.Title className={style.forgotPasswordFormTitle}>
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-12 pb-3">
              <label htmlFor="inputEmail" className={style.forgotPasswordLabel}>
                Enter your Email
              </label>
              <input
                type="email"
                className={`form-control ${style.forgotPasswordInputField}`}
                id="inputEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
            {success && <div className="text-success mt-2">{success}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={handleCloseForgotPasswordModal}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ForgotPassword;
