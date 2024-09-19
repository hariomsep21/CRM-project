import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditProfile.module.css";

const EditProfile = ({
  showModal,
  handleCloseModal,
  handleSubmit,
  profile,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    // lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setMobile(profile.mobile || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setProfileUrl(profile.profileUrl || "");
    }
  }, [profile]);

  // Validation logic for all fields
  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      // lastName: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
    };

    const emailRegex = /^[a-z0-9][a-z0-9._%+-]+@(gmail\.com)$/;
    const mobileRegex = /^[6789]\d{9}$/;

    if (firstName.trim() === "") {
      newErrors.firstName = "First Name is required.";
      valid = false;
    }

    // if (lastName.trim() === "") {
    //   newErrors.lastName = "Last Name is required.";
    //   valid = false;
    // }

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid Gmail address.";
      valid = false;
    }

    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
      valid = false;
    }

    if (address.trim() === "") {
      newErrors.address = "Address is required.";
      valid = false;
    }

    if (city.trim() === "") {
      newErrors.city = "City is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      handleSubmit({
        firstName,
        lastName,
        email,
        mobile,
        address,
        city,
        profileUrl,
      });
      handleCloseModal();
    }
  };

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
              <label htmlFor="firstName" className={style.editProfileLabel}>
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${style.editProfileInputField}`}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <small className="text-danger">{errors.firstName}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName" className={style.editProfileLabel}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={`form-control ${style.editProfileInputField}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName}</small>
              )}
            </div>
          </div>

          <div className="form-row d-flex pb-2">
            <div className="form-group col-md-6">
              <label htmlFor="mobile" className={style.editProfileLabel}>
                Mobile No.
              </label>
              <input
                type="tel"
                className={`form-control ${style.editProfileInputField}`}
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {errors.mobile && (
                <small className="text-danger">{errors.mobile}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email" className={style.editProfileLabel}>
                Email
              </label>
              <input
                type="email"
                className={`form-control ${style.editProfileInputField}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className={style.editProfileLabel}>
              Address
            </label>
            <input
              type="text"
              className={`form-control ${style.editProfileAddressField}`}
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <small className="text-danger">{errors.address}</small>
            )}
          </div>
          <div className="form-group pt-2">
            <label htmlFor="city" className={style.editProfileLabel}>
              City
            </label>
            <input
              type="text"
              className={`form-control ${style.editProfileAddressField}`}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && (
              <small className="text-danger">{errors.city}</small>
            )}
          </div>
          <div className="form-group" style={{ display: "none" }}>
            <input
              type="text"
              className={`form-control pt-2 pb-2 ${style.editUrlInputField}`}
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
          onClick={handleCloseModal}
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

export default EditProfile;
