import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./PastDetails.module.css";
import { RiMapPinLine } from "react-icons/ri";
import axios from "axios";

const PastDetails = ({ customers }) => {
  const [show, setShow] = useState(false);
  const [inventory, setInventory] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7062/api/CRMCustomerInventory/GetCustomerList/${customers.id}`
      )
      .then((response) => {
        console.log("Customer ID:", customers.id);
        console.log("Customer Inventory:", response.data);
        const customerId = response.data[0].id;
        axios
          .get(`https://localhost:7062/api/CRMInventory`)
          .then((inventoryResponse) => {
            const allInventory = inventoryResponse.data;
            console.log("All Inventory:", allInventory);
            console.log(
              "Customer Inventory IDs:",
              response.data.map((item) => item.inventoryId)
            );
            const filteredInventory = allInventory.filter((item) => {
              return response.data.some(
                (customerItem) => customerItem.inventoryId === item.id
              );
            });

            const formattedInventory = filteredInventory.map((item) => ({
              id: item.id,
              propertyType: item.propertyStatus,
              details: item.address,
              price: item.rent,
              address: item.location,
            }));
            console.log("Formatted Inventory:", formattedInventory);
            setInventory(formattedInventory);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [customers.id]);

  return (
    <>
      <div>
        <button
          className={`btn ${style.editBtn}`}
          variant="primary"
          onClick={handleShow}
        >
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
          {inventory.map((item) => (
            <div key={item.id} className={`row ${style.mainRow}`}>
              <div className={`col-5 col-lg-5 col-md-5 m-2 ${style.image}`}>
                <img
                  src={`https://picsum.photos/150/${Math.floor(
                    Math.random() * 100
                  )}`}
                  alt="property"
                />
              </div>
              <div className="col-7 col-lg-7 col-md-7 ml-2">
                <div className="row">
                  <div
                    className={`col-12 ${
                      item.propertyType === "Rent"
                        ? style.propertyText_rental
                        : style.propertyText
                    }`}
                  >
                    {item.propertyType}
                  </div>
                  <div className={`col-12 ${style.deatilsText}`}>
                    {item.details}
                  </div>
                  <div className={`col-12 d-flex ${style.priceText}`}>
                    {item.propertyType === "Rental" ? "Rent" : "Sell Price"}:{" "}
                    <p>{item.price}</p>
                  </div>
                  <div className={`col-12 d-flex ${style.addressText}`}>
                    <RiMapPinLine />
                    <h6 className="ml-1">{item.address}</h6>
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
