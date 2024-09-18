import React from "react";
import style from "./Leads_Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import AddNewLeads from "../AddNewLeads/AddNewLeads";

const Leads_Header = ({
  onTypeChange,
  onSearchChange,
  onLocationChange,
  onAreaChange,
  onStageChange,
  onNewLeadAdd,
  generatePDF,
}) => {
  return (
    <>
      <section className="section_1 mt-3">
        <div className="row">
          <div className={`col-md-7 col-lg-7 ${style.inventory_heading}`}>
            Leads{" "}
          </div>
          <div className="col-md-5 col-lg-5">
            <div className={`row ${style.three_btn}`}>
              <div className={`col-4 ${style.Div_advicebtn}`}>
                <button className={`btn ${style.advice_btn}`}>
                  Generate Advice
                </button>
              </div>
              <div className={`col-4 ${style.Div_brochurebtn}`}>
                <button
                  className={`btn ${style.brochure_btn}`}
                  onClick={generatePDF}
                >
                  Generate Brochure
                </button>
              </div>

              <div className={`col-4 ${style.Div_addInventorybtn}`}>
                <AddNewLeads onNewLeadAdd={onNewLeadAdd} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_2 mt-4">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="row">
              <div className={`col-md-12 col-lg-12 ${style.group_text}`}>
                <div className="row">
                  <div className="col">
                    <label htmlFor="bytype">By Type</label>
                    <select
                      className={style.dropdown_Type}
                      id="bytype"
                      onChange={onTypeChange}
                    >
                      <option value="All">All</option>
                      <option value="Sell">Sell</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="bydate">By Date</label>
                    <select className={style.dropdown_Date} id="bydate">
                      <option value="">All Dates</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <div className={`col ${style.SearchLocation_input}`}>
                    <label htmlFor="bylocation">By Location</label>
                    <div className={style.searchLocationContainer}>
                      <input
                        type="text"
                        placeholder="Search location"
                        id="bylocation"
                        onChange={onLocationChange}
                      />
                      <FaSearch className={style.searchLocationIcon} />
                    </div>
                  </div>
                  <div className={`col ${style.SearchArea_input}`}>
                    <label htmlFor="byarea">By Area</label>
                    <div className={style.searchAreaContainer}>
                      <input
                        type="text"
                        placeholder="Write here"
                        id="byarea"
                        onChange={onAreaChange}
                      />
                    </div>
                  </div>
                  <div className={`col ${style.SearchStage_input}`}>
                    <label htmlFor="bystage">By Stage</label>
                    <div className={style.searchStageContainer}>
                      <input
                        type="text"
                        placeholder="Write here"
                        id="bystage"
                        onChange={onStageChange}
                      />
                    </div>
                  </div>
                  <div className={`col ${style.SearchInventory_input}`}>
                    <div className={style.searchInventoryContainer}>
                      <input
                        type="text"
                        placeholder="Search Leads"
                        id="byinventory"
                        onChange={onSearchChange}
                      />
                      <FaSearch className={style.searchInventoryIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leads_Header;
