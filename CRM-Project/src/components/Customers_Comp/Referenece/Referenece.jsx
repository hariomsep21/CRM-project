import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./Referenece.module.css";
import { TfiPencil } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineSave } from "react-icons/md";

const Referenece = () => {
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [newReference, setNewReference] = useState("");
  const [refData, setRefData] = useState([
    { id: "1", Referenece_Name: "Hariom" },
    { id: "2", Referenece_Name: "Akash" },
    { id: "3", Referenece_Name: "Rohit" },
    { id: "4", Referenece_Name: "Pavan" },
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  const handleSave = () => {
    if (newReference.trim()) {
      setRefData([
        ...refData,
        { id: Date.now().toString(), Referenece_Name: newReference },
      ]);
      setNewReference("");
      setAddShow(false);
    }
  };

  return (
    <>
      <div variant="primary" onClick={handleShow}>
        <button className={`btn ${style.editBtn}`}>References</button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className={`custom-modal modal-dialog-centered ${style.modal}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>References</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`container ${style.modalBody}`}>
          <section className={style.section1_Body}>
            {refData.map((data) => (
              <div key={data.id} className="row">
                <div className={`col ${style.Referenece_Name}`}>
                  <p>{data.Referenece_Name}</p>
                </div>
                <div className={`col ${style.Referenece_Icon}`}>
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))}

            <div className="row p-0">
              <div
                className={`col pt-2 ${style.Add_Reference}`}
                onClick={handleAddShow}
              >
                <FaPlus className={style.Add_ReferenceIcon} />
                Add Reference
              </div>
            </div>

            {addShow && (
              <div className={`row p-0 ${style.Input_AddReference}`}>
                <div className="col-10 pt-2">
                  <input
                    placeholder="Enter Name"
                    className={`col-12 ${style.Input}`}
                    value={newReference}
                    onChange={(e) => setNewReference(e.target.value)}
                  />
                </div>
                <div
                  className={`col-2 pt-2 ${style.Icon}`}
                  onClick={[handleSave, handleAddClose]}
                >
                  <MdOutlineSave />
                </div>
              </div>
            )}
          </section>
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

export default Referenece;
