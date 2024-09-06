import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./RemarkEdit.module.css";
import { TfiPencil } from "react-icons/tfi";
import axios from "axios";

const RemarkEdit = ({ customers, refreshData }) => {
  const [show, setShow] = useState(false);
  const [remark, setremark] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (customers) {
      setremark(customers.remarks || "");
    }
  }, [customers]);

  const handleInputChange = (e) => {
    setremark(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleEditRemarks(customers.id, remark);
    handleClose();
  };
  const handleEditRemarks = (id, remark) => {
    console.log("ID and Need value being sent:", id, remark);

    axios
      .patch(
        `https://localhost:7062/api/CRMCustomer/Remarks/${id}`,
        remark, // Send `need` directly as a string
        {
          headers: {
            "Content-Type": "application/json", // Ensure the Content-Type header is set
          },
        }
      )
      .then((response) => {
        refreshData();
        console.log("Customer updated successfully:", response);
        // refreshData(); // Assuming you have a method to refresh data
      })
      .catch((error) => {
        // Improved error handling
        if (error.response) {
          console.error("Error response:", error.response);
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);

          // Display validation errors if available
          if (error.response.data.errors) {
            console.error("Validation errors:", error.response.data.errors);
          }
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  // const handleEdit = () => {
  //   // Handle edit functionality, e.g., save to backend
  //   console.log("Edited value:", needValue);
  //   handleClose();
  // };

  return (
    <>
      <div variant="primary" onClick={handleShow}>
        <TfiPencil />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className={`custom-modal modal-dialog-centered ${style.modal}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>Edit Remark</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <textarea
            className={style.Body_element}
            value={remark}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer className={style.modal_footer}>
          <Button
            variant="secondary"
            className={style.close_btn}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            className={style.Edit_btn}
            onClick={onSubmit}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemarkEdit;
