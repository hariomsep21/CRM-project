import React from "react";
import style from "./ChangePassword.module.css";
import { Modal, Button } from "react-bootstrap";

function ChangePassword({ showPassword, handleClosePasswordModal }) {
  return (
    <>
      <Modal show={showPassword} onHide={handleClosePasswordModal} centered>
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
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className={style.changePasswordCancelBtn}
            onClick={handleClosePasswordModal}
          >
            Cancel
          </Button>
          <Button variant="primary" className={style.changePasswordeSaveBtn}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePassword;
