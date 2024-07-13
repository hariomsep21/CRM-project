import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CustomerGrid.module.css";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { TfiPencil } from "react-icons/tfi";

const CustomerGrid = ({ customers }) => {
  return (
    <>
      {customers.map((customer) => (
        <div key={customer.id} className={`row mt-5 ${style.cust_rowThree}`}>
          <div className="section_1 col-sm-12 col-md-4 col-lg-4">
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
                <p>{customer.status}</p>
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
                <FaPhoneAlt />
              </div>
              <div className="col-2">
                <RiMessage2Fill />
              </div>
              <div className="col-2">
                <IoMdMail />
              </div>
              <div className="col-2">
                <IoLogoWhatsapp />
              </div>
              <div className="col-2">
                <HiDownload />
              </div>
            </div>
          </div>

          <div className=" section_2 col-sm-12 col-md-4 col-lg-4 mt-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="row d-flex">
                  <div className={`col-8 ${style.remark_head}`}>Need</div>
                  <div className={`col-4 ${style.remark_icon}`}>
                    <div>
                      <TfiPencil />
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
                      <TfiPencil />
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
                    <button className="btn">View Past Deals</button>
                  </div>
                  <div className="col-3">
                    <button className="btn">References</button>
                  </div>
                  <div className="col-3">
                    <button className="btn">Edit Customer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomerGrid;
