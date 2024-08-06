import React from "react";
import { MdOutlineArchive } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import style from "./MyTask.module.css";

const MyTask = ({ setFilter, onSearchChange }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="mb-3 me-4">
            <label
              htmlFor="typeDropdown"
              className={`form-label ${style.label}`}
            >
              By Type
            </label>
            <select
              className={`form-select ${style.dropdown}`}
              id="typeDropdown"
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Rental">Rental</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="timeDropdown"
              className={`form-label ${style.label}`}
            >
              By Time
            </label>
            <select
              className={`form-select ${style.dropdown}`}
              id="timeDropdown"
            >
              <option value="all">All</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="urgent">Req. Urgent Attention</option>
            </select>
          </div>
        </div>
        <div className={`input-group ${style.inputBox}`}>
          <input
            type="text"
            className={`form-control ${style.search}`}
            placeholder="Search Inventory"
            aria-label="Search Inventory"
            onChange={onSearchChange}
          />
          <button
            className={`btn btn-outline-secondary ${style.magnifyingIcon}`}
            type="button"
          >
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyTask;
