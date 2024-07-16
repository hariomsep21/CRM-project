import style from "./MyProfile.module.css";
import { MdOutlineModeEdit, MdOutlineContentCopy } from "react-icons/md";

const MyProfile = () => {
  return (
    <>
      <h4 className={`container mt-4  ps-2 ${style.myprofileHeading}`}>
        My Profile
      </h4>
      <div className={`container mt-4  ps-3 ${style.myprofile_box}`}>
        <div className={`row ${style.myprofile_sections}`}>
          <div className={`col-md-6`}>
            <div className="card mb-3 border-0 pt-4 pb-4 pe-4">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src="/img/profile_img.png"
                    className={`${style.myprofile_profileimg}`}
                    alt="..."
                  />
                  <MdOutlineModeEdit
                    className={`${style.profileimgEditIcon}`}
                  />
                </div>
                <div className="col-md-9">
                  <div
                    className={`card-body ${style.myprofile_person_namedetail}`}
                  >
                    <h5 className={`card-title ${style.myprofileUserName}`}>
                      Adam Clark
                    </h5>
                    <p className={`card-text ${style.myprofileMemberJoinDa}`}>
                      Member since January 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <></>
          <div className={` col-md-6 ${style.myprofileBtndiv}`}>
            <button
              type="button"
              className={`btn btn-outline-secondary ${style.myprofileChangePass}`}
            >
              Change Password
            </button>
            <button
              type="button"
              className={`btn me-3 ${style.myprofileEditProfileBtn}`}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <h4 className={`${style.myprofile_detail_title}`}>
          Profile information
        </h4>
        <div className={`row ${style.myprofile_sections}`}>
          <div className={`col-md-3`}>
            <h6 className={`${style.profileinfo_detail_title}`}>Email id</h6>
            <p className={`${style.profileinfo_detail}`}>AdamC125@gmail.com</p>
          </div>
          <div className={`col-md-3`}>
            {" "}
            <h6 className={`${style.profileinfo_detail_title}`}>Mobile No.</h6>
            <p className={`${style.profileinfo_detail}`}>012-234-4567</p>
          </div>
          <div className={`col-md-3`}>
            {" "}
            <h6 className={`${style.profileinfo_detail_title}`}>Address</h6>
            <p className={`${style.profileinfo_detail}`}>
              1234 Main Street Anytown, AT 12345 Country
            </p>
          </div>
          <div className={`col-md-3`}>
            {" "}
            <h6 className={`${style.profileinfo_detail_title}`}>City</h6>
            <p className={`${style.profileinfo_detail}`}>Surat</p>
          </div>
        </div>

        <h4 className={` col col-lg-4 ${style.myprofile_detail_urltitle}`}>
          Profile Url
          <MdOutlineModeEdit />
        </h4>

        <div className="row">
          <div
            className={`col-lg-4 d-flex justify-content-between  p-4 ${style.profile_link}`}
          >
            <p>www.domainname.com/adamclark249a4292 </p>
            <MdOutlineContentCopy className={style.myprofileCopyIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
