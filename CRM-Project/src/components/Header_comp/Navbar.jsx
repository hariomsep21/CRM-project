import "bootstrap/dist/css/bootstrap.min.css";
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
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <nav className={`navbar navbar-expand-lg border-bottom ${style.Nav_Div}`}>
      <div className="container-fluid">
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
          <img src="/img/logo.png" alt="logo" className={`${style.logo_Img}`} />
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
                My Team
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
                  src="/img/navbar_profile.png"
                  alt="profile-img"
                  className={`${style.profileImg}`}
                />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button className="dropdown-item" type="button">
                    Action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Another action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Something else here
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
