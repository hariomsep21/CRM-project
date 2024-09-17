import React from "react";
import style from "./MyInventory_Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Leads_Body from "./Leads_Body/Leads_Body";
import Leads_Header from "./Leads_Header/Leads_Header";

const MyLead_Home = () => {
  return (
    <>
      <div className={`container mt-5`}>
        <Leads_Body />
      </div>
    </>
  );
};

export default MyLead_Home;
