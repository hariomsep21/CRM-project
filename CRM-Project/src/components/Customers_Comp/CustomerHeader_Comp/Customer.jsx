import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import style from "./Customers.module.css";
import { IoFilter } from "react-icons/io5";
// import CustomerGrid from "../CustomerGrid_Comp/CustomerGrid";
import AddNewCustomer from "../AddCustomer/AddNewCustomer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CustomerGrid = lazy(() => import("../CustomerGrid_Comp/CustomerGrid"));

const Customer = () => {
  const [filter, setFilter] = useState("All");
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = sessionStorage.getItem("token");
  const API_URL = "https://localhost:7062/";

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMCustomer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (customer) => {
    axios
      .put(`https://localhost:7062/api/CRMCustomer/${customer.id}`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        refreshData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   refreshData();
  // }, [refreshData, reload]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData, reload]);

  // const fetchData = useCallback(() => {
  //   fetch("http://localhost:5000/newCustomer")
  //     .then((res) => res.json())
  //     .then((data) => setCustomers(data));
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData, reload]);

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

  const filteredCustomers = customers
    .filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((customer) => filter === "All" || customer.property === filter);

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
              refreshData={refreshData}
            />
          </div>
        </div>
        {/* Add search input field */}
        <div className={`row mt-3 ${style.serach_input_main}`}>
          <div className={`col-sm-12 col-md-6 col-lg-6 ${style.serach_input}`}>
            <input
              type="text"
              className="form-control"
              placeholder="Search customer by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        <Suspense fallback={<div>Loading...</div>}>
          <CustomerGrid
            customers={filteredCustomers}
            onEditCustomer={handleSubmit}
            refreshData={refreshData}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Customer;
