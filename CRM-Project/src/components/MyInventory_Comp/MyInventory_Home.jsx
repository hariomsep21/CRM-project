import React from "react";
import style from "./MyInventory_Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Inventory_Header from "./Inventory_Header";
import Inventory_Body from "./Inventory_Body";

const MyInventory_Home = () => {
  return (
    <>
      <div className="container mt-5">
        <Inventory_Body />
      </div>
    </>
  );
};

export default MyInventory_Home;
