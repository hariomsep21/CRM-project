import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-3">
      <div>
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            &copy; Brand Name 2024
          </div>
          <div className="col-md-6 text-center text-md-end">
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
