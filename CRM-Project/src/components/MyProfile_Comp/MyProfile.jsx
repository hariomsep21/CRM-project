import React, { useState, useEffect } from "react";
import style from "./MyProfile.module.css";
import { Modal, Button } from "react-bootstrap";
import {
  MdOutlineModeEdit,
  MdOutlineContentCopy,
  MdOutlineClose,
} from "react-icons/md";
import EditProfile from "./EditProfile";
import EditUrl from "./EditUrl";
import ChangePassword from "./ChangePassword";
import axios from "axios";

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [date, setDate] = useState("2024");
  const [profileUrl, setProfileUrl] = useState("adamclark249a4292");

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    axios
      .get("https://localhost:7062/api/MyProfile/1")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  };
  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (updatedProfile) => {
    // const updatedProfile = {
    //   firstName,
    //   lastName,
    //   date,
    //   email,
    //   mobile,
    //   address,
    //   city,
    // };

    axios
      .post(
        `https://localhost:7062/api/MyProfile/${profile.id}`,
        updatedProfile
      )
      .then((response) => {
        console.log("Profile updated successfully");
        fetchProfile();
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        if (error.response) {
          console.error("Server response:", error.response);
        } else {
          console.error("No server response");
        }
      });
  };

  // const handleSubmit = () => {
  //   axios
  //     .post(`https://localhost:7062/api/MyProfile/${profile.id}`, profile)
  //     .then((response) => {
  //       console.log("Profile updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating profile:", error);
  //       if (error.response) {
  //         console.error("Server response:", error.response);
  //       } else {
  //         console.error("No server response");
  //       }
  //     });
  // };

  const handleCopyUrl = () => {
    // Logic to copy URL to clipboard
    navigator.clipboard.writeText(profileUrl);
    console.log("Copied URL to clipboard:", profileUrl);
  };

  const handleEditUrl = () => {
    setShowUrlModal(true);
  };

  const handleCloseUrlModal = () => {
    setShowUrlModal(false);
  };

  // const handleUrlSubmit = () => {
  //   console.log("Updated URL:", profileUrl);
  //   setShowUrlModal(false);
  // };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  return (
    <>
      <h4 className={`container ps-0 ${style.myprofileHeading}`}>My Profile</h4>
      <div
        className={`container ${style.myprofile_box}`}
        style={{ padding: "0px 35px" }}
      >
        <div className={`row ${style.myprofile_section}`}>
          <div className={`col-md-6`}>
            <div className="card mb-3 border-0 pt-4 pb-4 pe-4">
              <div className="row g-0">
                <div className="col-md-3">
                  <label
                    htmlFor="profileImageInput"
                    className={style.profileImageLabel}
                  >
                    <img
                      src="../public/img/profile_img.png"
                      className={`${style.myprofile_profileimg}`}
                      alt="Profile"
                    />
                    <MdOutlineModeEdit
                      className={`${style.profileimgEditIcon}`}
                    />
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    className="visually-hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log("Selected Image:", file);
                    }}
                  />
                </div>
                <div className="col-md-9">
                  <div
                    className={`card-body ${style.myprofile_person_namedetail}`}
                  >
                    <h5 className="card-title">
                      {profile?.firstName} {profile?.lastName}
                    </h5>
                    <p className="card-text">Member since January {date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={` col-md-6 ${style.myprofileBtndiv}`}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{
                border: "2px solid black",
                color: "black",
                fontWeight: "500",
              }}
              onClick={handleChangePassword}
            >
              Change Password
            </button>
            <button
              type="button"
              className={`btn me-3`}
              style={{ backgroundColor: "#7a65fd", color: "white" }}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <h4 className={`${style.myprofile_detail_title}`}>
          Profile information
        </h4>
        <div className={`row ${style.myprofile_section}`}>
          <div className={`col-md-3`}>
            <h6 className={`${style.profileinfo_detail_title}`}>Email id</h6>
            <p className={`${style.profileinfo_detail}`}>{profile?.email}</p>
          </div>
          <div className={`col-md-3`}>
            <h6 className={`${style.profileinfo_detail_title}`}>Mobile No.</h6>
            <p className={`${style.profileinfo_detail}`}>{profile?.mobile}</p>
          </div>
          <div className={`col-md-3`}>
            <h6 className={`${style.profileinfo_detail_title}`}>Address</h6>
            <p className={`${style.profileinfo_detail}`}>{profile?.address}</p>
          </div>
          <div className={`col-md-3`}>
            <h6 className={`${style.profileinfo_detail_title}`}>City</h6>
            <p className={`${style.profileinfo_detail}`}>{profile?.city}</p>
          </div>
        </div>
        <h4 className={` col col-lg-4 ${style.myprofile_detail_urltitle}`}>
          Profile Url
          <MdOutlineModeEdit onClick={handleEditUrl} />
        </h4>
        <div className={`row`}>
          <div className={`col-lg-4 d-flex justify-content-between p-4 pe-0`}>
            www.domainname.com/{profile?.profileUrl}{" "}
            <MdOutlineContentCopy
              style={{ color: "#7a65fd", cursor: "pointer" }}
              onClick={handleCopyUrl}
            />
          </div>
        </div>
      </div>
      {/* Modal for editing profile information */}
      <EditProfile
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        profile={profile}
        // firstName={firstName}
        // setFirstName={setFirstName}
        // lastName={lastName}
        // setLastName={setLastName}
        // email={email}
        // setEmail={setEmail}
        // mobile={mobile}
        // setMobile={setMobile}
        // address={address}
        // setAddress={setAddress}
        // city={city}
        // setCity={setCity}
      />
      {/* Modal for editing profile URL */}
      <EditUrl
        show={showUrlModal}
        handleClose={handleCloseUrlModal}
        profile={profile}
        handleSubmit={handleSubmit}
      />

      <ChangePassword
        showPassword={showPasswordModal}
        handleClosePasswordModal={handleClosePasswordModal}
      />
    </>
  );
};

export default MyProfile;
