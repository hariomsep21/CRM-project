import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineHomeWork,
  MdOutlineRealEstateAgent,
  MdOutlinePerson,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  const token = sessionStorage.getItem("token");
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://localhost:7062/api/MyProfile/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg border-bottom ${style.Nav_Div}`}>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${style.navbar_main}`}
            id="navbarTogglerDemo02"
          >
            <Link to="/dashboard" onClick={() => handleItemClick("/dashboard")}>
              <img
                src="/img/logo.png"
                alt="logo"
                className={`${style.logo_Img}`}
              />
            </Link>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navbarLink} ${
                    activeItem === "/dashboard" ? style.active : ""
                  }`}
                  to="/dashboard"
                  onClick={() => handleItemClick("/dashboard")}
                >
                  <LuLayoutDashboard className={`${style.navbarIcon}`} />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navbarLink} ${
                    activeItem === "/myinventory" ? style.active : ""
                  }`}
                  to="/myinventory"
                  onClick={() => handleItemClick("/myinventory")}
                >
                  <MdOutlineHomeWork className={`${style.navbarIcon}`} />
                  My Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navbarLink} ${
                    activeItem === "/leads" ? style.active : ""
                  }`}
                  to="/leads"
                  onClick={() => handleItemClick("/leads")}
                >
                  <MdOutlineRealEstateAgent className={`${style.navbarIcon}`} />
                  Leads
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navbarLink} ${
                    activeItem === "/customer" ? style.active : ""
                  }`}
                  to="/customer"
                  onClick={() => handleItemClick("/customer")}
                >
                  <MdOutlinePerson className={`${style.navbarIcon}`} />
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.navbarLink} ${
                    activeItem === "/profile" ? style.active : ""
                  }`}
                  to="/profile"
                  onClick={() => handleItemClick("/profile")}
                >
                  <HiOutlineUsers className={`${style.navbarIcon}`} />
                  My Profile
                </Link>
              </li>
            </ul>
            <div className={`navbar ${style.notificationBox}`}>
              <MdOutlineNotificationsNone
                className={`${style.notificationIcon}`}
              />
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/img/profile_img.png"
                    alt="profile-img"
                    className={`${style.profileImg}`}
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <Link
                      className="dropdown-item"
                      type="button"
                      to="/profile"
                      onClick={() => handleItemClick("/profile")}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
