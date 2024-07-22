import React from "react";
import style from "./Inventory_Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import MyInventory_Create from "./MyInventory_Create/MyInventory_Create";

const Inventory_Header = () => {
  return (
    <>
      <section className="section_2 mt-4">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="row">
              <div className={`col-md-12 col-lg-12 ${style.group_text}`}>
                <div className="row">
                  <div className="col">
                    <label htmlFor="bytype">By Type</label>
                    <select className={style.dropdown_Type} id="bytype">
                      <option value="volvo">All</option>
                      <option value="saab">Sell</option>
                      <option value="opel">Rent</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="bydate">By Date</label>
                    <select
                      className={style.dropdown_Date}
                      id="bydate"
                      disabled
                    >
                      <option value="volvo">All</option>
                      <option value="saab">Sell</option>
                      <option value="opel">Rent</option>
                    </select>
                  </div>
                  <div className={`col ${style.SearchLocation_input}`}>
                    <label htmlFor="bylocation">By Location</label>
                    <div className={style.searchLocationContainer}>
                      <input
                        type="text"
                        placeholder="Search location"
                        id="bylocation"
                      />
                      <FaSearch className={style.searchLocationIcon} />
                    </div>
                  </div>
                  <div className={`col ${style.SearchArea_input}`}>
                    <label htmlFor="byarea">By Area</label>
                    <div className={style.searchAreaContainer}>
                      <input type="text" placeholder="Write here" id="byarea" />
                    </div>
                  </div>
                  <div className={`col ${style.SearchStage_input}`}>
                    <label htmlFor="bystage">By Stage</label>
                    <div className={style.searchStageContainer}>
                      <input
                        type="text"
                        placeholder="Write here"
                        id="bystage"
                      />
                    </div>
                  </div>
                  <div className={`col ${style.SearchInventory_input}`}>
                    <div className={style.searchInventoryContainer}>
                      <input
                        type="text"
                        placeholder="Search Inventory"
                        id="byinventory"
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

export default Inventory_Header;
