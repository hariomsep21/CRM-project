import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import style from "./Reference.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { MdOutlineSave } from "react-icons/md";

const Reference = ({ customers }) => {
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [newReference, setNewReference] = useState("");
  const [refData, setRefData] = useState([]);
  const [error, setError] = useState(""); // Added for error display

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!customers || !customers.id) {
      console.error("Customer ID is missing");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7062/api/CRMCustomer/${customers.id}/references`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched references data:", response.data);
        setRefData(response.data); // Assuming response.data is an array of strings
      } catch (error) {
        console.error("Failed to fetch references:", error);
        setError("Failed to fetch references.");
      }
    };

    fetchData();
  }, [customers, token]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  const handleSave = async () => {
    if (newReference.trim()) {
      try {
        console.log("Saving reference:", newReference); // Debug statement
        const response = await axios.post(
          `https://localhost:7062/api/CRMCustomer/${customers.id}/reference`,
          { Refrence: newReference }, // Ensure this key matches the DTO
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Reference saved:", response.data);
        setRefData([...refData, newReference]); // Adjusted for the correct response format
        setNewReference("");
        setAddShow(false);
      } catch (error) {
        console.error("Failed to save reference:", error);
        setError("Failed to save reference.");
      }
    } else {
      setError("Reference name cannot be empty.");
    }
  };

  const handleDelete = async (referenceName) => {
    try {
      console.log("Deleting reference:", referenceName); // Debug statement
      await axios.delete(
        `https://localhost:7062/api/CRMCustomer/${customers.id}/reference/${referenceName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reference deleted:", referenceName); // Debug statement
      setRefData(refData.filter((ref) => ref !== referenceName));
    } catch (error) {
      console.error("Failed to delete reference:", error);
      setError("Failed to delete reference.");
    }
  };

  return (
    <>
      <div onClick={handleShow}>
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
          <div className="row p-0">
            <div
              className={`col pt-2 ${style.Add_Reference}`}
              onClick={handleAddShow}
              style={{ cursor: "pointer" }} // Added cursor style
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
                style={{ cursor: "pointer" }} // Added cursor style
              >
                <MdOutlineSave />
              </div>
            </div>
          )}
          <section className={style.section1_Body}>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Display errors */}
            {refData.length > 0 ? (
              refData.map((reference, index) => (
                <div key={index} className="row">
                  <div className={`col ${style.Reference_Name}`}>
                    <p>{reference}</p>
                  </div>
                  <div className={`col ${style.Reference_Icon}`}>
                    <RiDeleteBin6Line
                      onClick={() => handleDelete(reference)}
                      style={{ cursor: "pointer" }} // Added cursor style
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No references available.</p>
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

export default Reference;
