import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Navbar.module.css";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineHomeWork,
  MdOutlineRealEstateAgent,
  MdOutlinePerson,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";

const Navbar = () => {
  return (
    <>
      <nav className={`navbar navbar-expand-lg border-bottom `}>
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
            <img
              src="../public/img/logo.png"
              alt="logo"
              className={`${style.logo_Img}`}
            />
            <ul className="nav  ">
              <li className="nav-item">
                <a
                  className={`nav-link ${style.navbarLink}`}
                  aria-current="page"
                  href="#"
                >
                  <LuLayoutDashboard className={`${style.navbarIcon}`} />
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${style.navbarLink}`} href="#">
                  <MdOutlineHomeWork className={`${style.navbarIcon}`} />
                  My Inventory
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${style.navbarLink}`} href="#">
                  <MdOutlineRealEstateAgent className={`${style.navbarIcon}`} />
                  Leads
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${style.navbarLink}`} href="#">
                  <MdOutlinePerson className={`${style.navbarIcon}`} />
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${style.navbarLink}`} href="#">
                  <HiOutlineUsers className={`${style.navbarIcon}`} />
                  My Team
                </a>
              </li>
            </ul>
            <div className={`navbar ${style.notificationBox}`}>
              <MdOutlineNotificationsNone
                className={`${style.notificationIcon}`}
              />
              <div className="dropdown">
                <button
                  className="btn  dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../public/img/navbar_profile.png"
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
    </>
  );
};

export default Navbar;
