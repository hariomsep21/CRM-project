import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./PastDetails.module.css";
import { RiMapPinLine } from "react-icons/ri";

const PastDetails = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Dummy data for deals
  const deals = [
    {
      id: 1,
      imageSrc: "https://picsum.photos/150/102",
      propertyType: "Buy",
      details: "Sector 128, Noida, Delhi",
      price: "$200/month",
      address: "Border st. nicholasville, ky",
    },
    {
      id: 2,
      imageSrc: "https://picsum.photos/150/103",
      propertyType: "Buy",
      details: "Sector 56, Gurgaon, Haryana",
      price: "$250/month",
      address: "Maple Ave. Orlando, FL",
    },
    {
      id: 3,
      imageSrc: "https://picsum.photos/150/104",
      propertyType: "Rental",
      details: "Sector 22, Noida, UP",
      price: "$150/month",
      address: "Palm Beach, Miami, FL",
    },
    // Add more deals as needed
  ];

  return (
    <>
      <div>
        <button className="btn" variant="primary" onClick={handleShow}>
          View Past Deals
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className={`custom-modal modal-dialog-centered ${style.modal}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>Past Deals</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          {deals.map((deal) => (
            <div key={deal.id} className={`row ${style.mainRow}`}>
              <div className={`col-5 col-lg-5 col-md-5 m-2 ${style.image}`}>
                <img src={deal.imageSrc} alt="Deal" />
              </div>
              <div className="col-7 col-lg-7 col-md-7 ml-2">
                <div className="row">
                  <div
                    className={`col-12 ${
                      deal.propertyType === "Rental"
                        ? style.propertyText_rental
                        : style.propertyText
                    }`}
                  >
                    {deal.propertyType}
                  </div>
                  <div className={`col-12 ${style.deatilsText}`}>
                    {deal.details}
                  </div>
                  <div className={`col-12 d-flex ${style.priceText}`}>
                    {deal.propertyType === "Rental" ? "Rent" : "Sell Price"}:{" "}
                    <p>{deal.price}</p>
                  </div>
                  <div className={`col-12 d-flex ${style.addressText}`}>
                    <RiMapPinLine />
                    <h6 className="ml-1">{deal.address}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className={style.modal_footer}>
          <Button
            variant="secondary"
            className={style.close_btn}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PastDetails;
