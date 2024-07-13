import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import style from "./Customers.module.css";
import { IoFilter } from "react-icons/io5";
import CustomerGrid from "./CustomerGrid";

const Customer = () => {
  const [filter, setFilter] = useState("All");

  const customers = [
    {
      id: 1,
      property: "Buyer/Seller",
      name: "Mr.Gupta",
      status: "Hot",
      address: "123 Street, City",
      need: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more",
      remarks:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more",
    },
    {
      id: 2,
      property: "Rental",
      name: "Mr.Gupta",
      status: "Hot",
      address: "123 Street, City",
      need: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more",
      remarks:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more",
    },
    {
      id: 3,
      property: "Rental",
      name: "Mr.Gupta",
      status: "Hot",
      address: "123 Street, City",
      need: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more",
      remarks:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla veli Read more ",
    },
  ];

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
      <div className={`container mt-4 ${style.mainly} `}>
        <div className={`row ${style.cust_rowOne}`}>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className={style.cust_name}>Customers</div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <button className={`btn ${style.cust_addBtn}`}>
              + Add New Customer
            </button>
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
