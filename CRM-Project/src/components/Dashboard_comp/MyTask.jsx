import "bootstrap/dist/css/bootstrap.min.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import style from "./MyTask.module.css";

const MyTask = () => {
  return (
    <>
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
              <option value="urgent">Buy</option>
              <option value="important">Sell</option>
              <option value="normal">Rental</option>
              <option value="normal">Req. Urgent Attention</option>
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
              <option value="urgent">This Week</option>
              <option value="important">This Month</option>
              <option value="normal">This Year</option>
              <option value="normal">Req. Urgent Attention</option>
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
    </>
  );
};

export default MyTask;
