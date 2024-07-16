import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./NeedEdit.module.css";
import { TfiPencil } from "react-icons/tfi";

const NeedEdit = ({ initialValue }) => {
  const [show, setShow] = useState(false);
  const [needValue, setNeedValue] = useState(initialValue);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    setNeedValue(e.target.value);
  };

  const handleEdit = () => {
    // Handle edit functionality, e.g., save to backend
    console.log("Edited value:", needValue);
    handleClose();
  };

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
          <Modal.Title className={style.title}>Edit Need</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <textarea
            className={style.Body_element}
            value={needValue}
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
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NeedEdit;
