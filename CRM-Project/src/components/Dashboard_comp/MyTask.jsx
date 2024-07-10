import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineArchive, MdAdd } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import style from "./MyTask.module.css";
import CrudTable from "./Table";
import CreateTask from "./CreateTask";

const MyTask = () => {
  return (
    <>
      <div className="d-flex justify-content-between mb-5">
        <h1>My Task</h1>
        <div className={`${style.btnGroup}`}>
          <button
            type="button"
            className={`btn btn-outline-secondary ${style.archieveBtn}`}
          >
            <MdOutlineArchive className={`${style.archiveIcon}`} />
            Archieve
          </button>
          <button type="button" className={`btn btn-primary ${style.btnTask}`}>
            <MdAdd className={`${style.archiveIcon}`} />
            <CreateTask></CreateTask>
          </button>
        </div>
      </div>
      <div className={`d-flex justify-content-between`}>
        <div className={`d-flex `}>
          <div className="mb-3 me-4">
            <label
              htmlFor="labelDropdown"
              className={`form-label ${style.label}`}
            >
              By Type
            </label>
            <div className="dropdown">
              <button
                className={`btn dropdown-toggle ${style.dropdown}`}
                type="button"
                id="labelDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                All
              </button>
              <ul className="dropdown-menu" aria-labelledby="labelDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Urgent
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Important
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Normal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="labelDropdown"
              className={`form-label ${style.label}`}
            >
              By Type
            </label>
            <div className="dropdown">
              <button
                className={`btn dropdown-toggle ${style.dropdown}`}
                type="button"
                id="labelDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                All
              </button>
              <ul className="dropdown-menu" aria-labelledby="labelDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Urgent
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Important
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Normal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`input-group mb-3 ${style.inputBox}`}>
          <input
            type="text"
            className={`form-control ${style.search}`}
            placeholder="Search Inventory"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className={`btn btn-outline-secondary ${style.magnifyingIcon}`}
            type="button"
            id="button-addon2"
          >
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>
      <CrudTable />
    </>
  );
};
export default MyTask;
