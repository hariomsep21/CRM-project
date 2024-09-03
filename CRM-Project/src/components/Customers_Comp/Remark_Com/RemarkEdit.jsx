import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./RemarkEdit.module.css";
import { TfiPencil } from "react-icons/tfi";
import axios from "axios";

const RemarkEdit = ({ customers, onEditCustomer }) => {
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
    onEditCustomer({ id: customers.id, name: customers.name, remarks: remark });
    handleClose();
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
