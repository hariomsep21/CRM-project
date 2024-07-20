import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditProfile.module.css";
const EditProfile = ({
  showModal,
  handleCloseModal,
  handleSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  mobile,
  setMobile,
  address,
  setAddress,
  city,
  setCity,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header>
        <Modal.Title className={style.editProfileFormTitle}>
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-row d-flex pb-2">
            <div className="form-group col-md-6">
              <label
                htmlFor="firstName"
                className={`${style.editProfileLabel}`}
              >
                First Name
              </label>
              <input
                type="text"
                className={` form-control ${style.editProfileInputField}`}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName" className={`${style.editProfileLabel}`}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={` form-control ${style.editProfileInputField}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row d-flex pb-2">
            <div className="form-group col-md-6">
              <label htmlFor="mobile" className={`${style.editProfileLabel}`}>
                Mobile No.
              </label>
              <input
                type="tel"
                className={` form-control ${style.editProfileInputField}`}
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email" className={`${style.editProfileLabel}`}>
                Email
              </label>
              <input
                type="email"
                className={` form-control ${style.editProfileInputField}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className={`${style.editProfileLabel}`}>
              Address
            </label>
            <input
              type="text"
              className={`form-control ${style.editProfileAddressField}`}
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group pt-2">
            <label htmlFor="city" className={`${style.editProfileLabel}`}>
              City
            </label>
            <input
              type="text"
              className={`form-control ${style.editProfileAddressField}`}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className={style.editProfileCancelBtn}
          onClick={handleCloseModal}
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

export default EditProfile;
