import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineArchive, MdAdd } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import style from "./MyTask.module.css";
import Table from "./Table";
import CreateTask from "./CreateTask";

const MyTask = () => {
  return (
    <>
      <div className="d-flex justify-content-between mb-1 align-items-center">
        <h3 className={`${style.mytask_title}`}>My Task</h3>
        <div className={`${style.btnGroup}`}>
          <button
            type="button"
            className={`btn btn-outline-secondary ${style.archieveBtn}`}
          >
            <MdOutlineArchive className={`${style.archiveIcon}`} />
            Archive
          </button>
          <CreateTask />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="mb-3 me-4">
            <label
              htmlFor="labelDropdown"
              className={`form-label ${style.label}`}
            >
              By Type
            </label>
            <select
              className={`form-select ${style.dropdown}`}
              id="labelDropdown"
            >
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="labelDropdown2"
              className={`form-label ${style.label}`}
            >
              By Type
            </label>
            <select
              className={`form-select ${style.dropdown}`}
              id="labelDropdown2"
            >
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>
        <div className={`input-group  ${style.inputBox}`}>
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
      <Table />
    </>
  );
};

export default MyTask;
