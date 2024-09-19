import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditUrl.module.css";

const EditUrl = ({ show, handleClose, handleSubmit, profile }) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [error, setError] = useState("");

  // Set the URL field when the modal is shown or when the profile changes
  useEffect(() => {
    if (show && profile) {
      setProfileUrl(profile.profileUrl || "");
      setError(""); // Clear any existing errors when opening the modal
    }
  }, [show, profile]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!profileUrl.trim()) {
      setError("Profile URL cannot be empty.");
      return;
    }
    handleSubmit({ profileUrl });
    handleClose();
  };

  const handleInputChange = (e) => {
    setProfileUrl(e.target.value);
    setError(""); // Clear error message when typing
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={style.editUrlHeading}>
          Edit Profile URL
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={`form-control pt-2 pb-2 ${style.editUrlInputField}`}
              id="profileUrl"
              value={profileUrl}
              onChange={handleInputChange}
            />
            {error && <p className="text-danger">{error}</p>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className={style.editProfileCancelBtn}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className={style.editProfileSaveBtn}
          onClick={onSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUrl;
