import React from "react";
import style from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={`bg-white py-3 container ${style.footer}`}>
      <div>
        <div className="row">
          <hr />
          <div
            className={`col-md-6 text-center text-md-start ${style.Brand_Name}`}
          >
            &copy; Brand Name 2024
          </div>
          <div className={`col-md-6 text-center text-md-end ${style.links}`}>
            <a href="#" className="text-dark me-3">
              FAQs
            </a>
            <a href="#" className="text-dark me-3">
              Privacy policy
            </a>
            <a href="#" className="text-dark">
              Terms & conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
