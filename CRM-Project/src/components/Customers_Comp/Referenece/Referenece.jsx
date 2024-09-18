import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./Referenece.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineSave } from "react-icons/md";

const Referenece = () => {
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [newReference, setNewReference] = useState("");
  const [refData, setRefData] = useState([]);

  // Fetch references data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/references");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRefData(data);
      } catch (error) {
        console.error("Failed to fetch references:", error);
      }
    };

    fetchData();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  const handleSave = async () => {
    if (newReference.trim()) {
      try {
        const response = await fetch("http://localhost:3001/references", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now().toString(),
            Referenece_Name: newReference,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to save new reference");
        }
        const savedReference = await response.json();
        setRefData([...refData, savedReference]);
        setNewReference("");
        setAddShow(false);
      } catch (error) {
        console.error("Failed to save reference:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/references/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete reference");
      }
      // Remove the deleted reference from local state
      setRefData(refData.filter((data) => data.id !== id));
    } catch (error) {
      console.error("Failed to delete reference:", error);
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
                  <RiDeleteBin6Line onClick={() => handleDelete(data.id)} />
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
                  onClick={handleSave}
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
