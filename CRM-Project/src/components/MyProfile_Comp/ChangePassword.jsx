import React, { useState } from "react";
import style from "./ChangePassword.module.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function ChangePassword({ showPassword, handleClosePasswordModal }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = sessionStorage.getItem("token");

  // Validation function
  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasNumber;
  };

  const validateCurrentPassword = async () => {
    try {
      await axios.post(
        "https://localhost:7062/api/MyProfile/validate-current-password",
        { password: currentPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setError(
        "New password must contain at least one uppercase letter and one number."
      );
      return;
    }

    const isCurrentPasswordValid = await validateCurrentPassword();

    if (!isCurrentPasswordValid) {
      setError("Current password is incorrect.");
      return;
    }

    axios
      .post(
        "https://localhost:7062/api/MyProfile/change-password",
        {
          password: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccess("Password changed successfully.");
        setError("");
        // Clear form fields and close modal
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => handleClosePasswordModal(), 2000);
      })
      .catch((error) => {
        setError("Error changing password. Please try again.");
        setSuccess("");
      });
  };

  const handleCancel = () => {
    // Clear form fields and close modal
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    handleClosePasswordModal();
  };

  return (
    <>
      <Modal show={showPassword} onHide={handleCancel} centered>
        <Modal.Header>
          <Modal.Title className={style.changePasswordFormTitle}>
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group col-md-12 pb-3">
              <label
                htmlFor="inputPassword3"
                className={style.changePasswordLabels}
              >
                Current Password
              </label>
              <input
                type="password"
                className={`form-control ${style.changePasswordInputField}`}
                id="inputPassword3"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-12 pb-3">
              <label
                htmlFor="inputPassword4"
                className={style.changePasswordLabels}
              >
                New Password
              </label>
              <input
                type="password"
                className={`form-control ${style.changePasswordInputField}`}
                id="inputPassword4"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-12 ">
              <label
                htmlFor="inputPassword5"
                className={style.changePasswordLabels}
              >
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${style.changePasswordInputField}`}
                id="inputPassword5"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            className={style.changePasswordCancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className={style.changePasswordeSaveBtn}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePassword;
