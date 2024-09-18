import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CustomerGrid.module.css";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { TfiPencil } from "react-icons/tfi";
import { FaFire } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PastDetails from "../PastDeals_Comp/PastDetails";
import NeedEdit from "../Need_Com/NeedEdit";
import RemarkEdit from "../Remark_Com/RemarkEdit";
import Referenece from "../Referenece/Referenece";
import EditCustomer from "../EditCustomer/EditCustomer";
import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const downloadCustomerInfoAsPDF = (customer) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Customer Information", 10, 10);

  doc.setFontSize(12);
  doc.text(`Name: ${customer.name}`, 10, 30);
  doc.text(`Status: ${customer.status}`, 10, 40);
  doc.text(`Address: ${customer.address}`, 10, 50);
  doc.text(`Phone: ${customer.mobile}`, 10, 60);
  doc.text(`Email: ${customer.email}`, 10, 70);
  doc.text(`Need: ${customer.need}`, 10, 80);
  doc.text(`Remarks: ${customer.remarks}`, 10, 90);

  // Save the PDF
  doc.save(`${customer.name}_info.pdf`);
};

const CustomerGrid = ({ customers, onEditCustomer, refreshData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  // Sort customers by name in alphabetical order
  const sortedCustomers = customers.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {currentCustomers.map((customer) => (
        <div key={customer.id} className={`row mt-4 ${style.cust_rowThree}`}>
          <div className={`col-sm-12 col-md-4 col-lg-4 ${style.section_1}`}>
            <div className="col">
              <button
                className={`btn ${
                  customer.property === "Buyer/Seller"
                    ? style.property_btn_buyer
                    : style.property_btn_rental
                }`}
              >
                {customer.property}
              </button>
            </div>
            <div className="col">
              <div className={style.cust_name}>
                {customer.name}
                <p>
                  <FaFire />
                  {customer.status}
                </p>
              </div>
            </div>
            <div className="col">
              <div className={style.cust_address}>
                <CiLocationOn />
                <h6>{customer.address}</h6>
              </div>
            </div>
            <div className={`col mt-2 ${style.cust_icons} `}>
              <div className="col-2">
                <FaPhoneAlt
                  onClick={() => {
                    const currentCustomerPhone = customer.mobile;
                    navigator.clipboard.writeText(currentCustomerPhone);
                    alert(`Copied phone number: ${currentCustomerPhone}`);
                  }}
                />
              </div>
              <div className="col-2">
                <RiMessage2Fill
                  onClick={() => {
                    const currentCustomerPhone = customer.mobile;
                    const telUrl = `tel:${currentCustomerPhone}`;
                    window.open(telUrl, "_self");
                  }}
                />
              </div>
              <div className="col-2">
                <IoMdMail
                  onClick={() => {
                    const currentCustomerEmail = customer.email;
                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${currentCustomerEmail}`;
                    window.open(gmailUrl, "_blank");
                  }}
                />
              </div>
              <div className="col-2">
                <IoLogoWhatsapp
                  className={style.whatsapp_icons}
                  onClick={() => {
                    const currentCustomerPhone = customer.mobile;
                    const whatsappUrl = `https://wa.me/${currentCustomerPhone}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                />
              </div>
              <div className="col-2">
                <HiDownload
                  onClick={() => downloadCustomerInfoAsPDF(customer)}
                />
              </div>
            </div>
          </div>

          <div className=" section_2 col-sm-12 col-md-4 col-lg-4 mt-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="row d-flex">
                  <div className={`col-8 ${style.need_head}`}>Need</div>
                  <div className={`col-4 ${style.need_icon}`}>
                    <div>
                      <NeedEdit
                        customers={customer}
                        refreshData={refreshData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-12  mt-1 ${style.remark_heading}`}>
                <p>{customer.need}</p>
              </div>
            </div>
          </div>
          <div className=" section_3 col-sm-12 col-md-4 col-lg-4 mt-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="row d-flex">
                  <div className={`col-8 ${style.remark_head}`}>Remarks</div>
                  <div className={`col-4 ${style.remark_icon}`}>
                    <div>
                      <RemarkEdit
                        customers={customer}
                        refreshData={refreshData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-lg-12  mt-1 ${style.remark_heading}`}>
                <p> {customer.remarks}</p>
              </div>
              <div className="col-sm">
                <div className={`row d-flex ${style.remark_btn}`}>
                  <div className="col-3">
                    <EditCustomer
                      customers={customer}
                      onEditCustomer={onEditCustomer}
                    ></EditCustomer>
                  </div>

                  <div className="col-3">
                    <Referenece />
                  </div>
                  <div className="col-3">
                    <PastDetails customers={customer} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div
        className={`d-flex justify-content-center align-items-baseline mt-4`}
      >
        {/* <select
          value={customersPerPage}
          onChange={(e) => setCustomersPerPage(parseInt(e.target.value, 10))}
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="pagination mt-4 d-flex justify-content-end "
        />
      </div>
    </>
  );
};

export default CustomerGrid;
