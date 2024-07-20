import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditUrl.module.css";

const EditUrl = ({
  show,
  handleClose,
  profileUrl,
  setProfileUrl,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile URL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="profileUrl">Profile URL</label>
            <input
              type="text"
              className="form-control"
              id="profileUrl"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
            />
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
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUrl;
