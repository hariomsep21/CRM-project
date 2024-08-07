import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import style from "./Customers.module.css";
import { IoFilter } from "react-icons/io5";
import CustomerGrid from "../CustomerGrid_Comp/CustomerGrid";
import AddNewCustomer from "../AddCustomer/AddNewCustomer";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [filter, setFilter] = useState("All");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchData = useCallback(() => {
    fetch("http://localhost:5000/newCustomer")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, reload]);

  const handleNewRecordAdded = () => {
    setReload((prev) => !prev);
  };

  const buyerSellerCount = customers.filter(
    (customer) => customer.property === "Buyer/Seller"
  ).length;
  const rentalCount = customers.filter(
    (customer) => customer.property === "Rental"
  ).length;
  const allCount = customers.length;

  const filteredCustomers =
    filter === "All"
      ? customers
      : customers.filter((customer) => customer.property === filter);

  return (
    <>
      <div className={`container mt-5 ${style.mainly} `}>
        <div className={`row ${style.cust_rowOne}`}>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className={style.cust_name}>Customers</div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <AddNewCustomer
              className={style.cust_addBtn}
              onAddNewCustomer={handleNewRecordAdded}
            />
          </div>
        </div>
        <div className={`row mt-3 ${style.cust_rowTwo}`}>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className={style.filter_text}>
              <button
                className={`btn ${filter === "All" ? style.activeFilter : ""}`}
                onClick={() => setFilter("All")}
              >
                All ({allCount})
              </button>
              <button
                className={`btn ${
                  filter === "Buyer/Seller" ? style.activeFilter : ""
                }`}
                onClick={() => setFilter("Buyer/Seller")}
              >
                Buy/Sell ({buyerSellerCount})
              </button>
              <button
                className={`btn ${
                  filter === "Rental" ? style.activeFilter : ""
                }`}
                onClick={() => setFilter("Rental")}
              >
                Rental ({rentalCount})
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className={style.filter_icon}>
              <IoFilter />
              <h6> Filter</h6>
            </div>
          </div>
        </div>
        <CustomerGrid customers={filteredCustomers} />
      </div>
    </>
  );
};

export default Customer;
