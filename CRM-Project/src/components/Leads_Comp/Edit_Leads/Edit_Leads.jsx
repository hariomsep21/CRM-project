import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { BiSolidPencil } from "react-icons/bi";
import style from "./Edit_Leads.module.css";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(2); // Last two digits of the year
  const hours = String(date.getHours() % 12 || 12).padStart(2, "0"); // 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am"; // AM/PM

  return ` ${hours}:${minutes}:${seconds} ${ampm} ${day}/${month}/${year}`;
};

const Edit_Leads = ({ data, onEditComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadId, setLeadId] = useState(null);
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    setLeadId(data);
  }, [data]);

  // Fetch lead details by ID
  const fetchLeadData = (id) => {
    if (id) {
      axios
        .get(`https://localhost:7062/api/CRMLead/${id}`)
        .then((response) => {
          setLeadData(response.data);
          setIsOpen(true);
        })
        .catch((error) => {
          console.error("Error fetching lead data:", error);
        });
    } else {
      console.error("Invalid lead ID:", id); // Debug: Log if ID is null or invalid
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleEdit = () => {
    if (leadData) {
      const updatedLeadData = {
        ...leadData,
        date: formatDate(new Date()),
      };
      axios
        .put(
          `https://localhost:7062/api/CRMLead/${leadData.id}`,
          updatedLeadData
        )
        .then((response) => {
          setIsOpen(false);
          onEditComplete();
        })
        .catch((error) => {
          console.error("Error updating lead:", error);
        });
    }
  };

  return (
    <>
      {/* Pencil Icon to trigger modal for each lead */}
      <BiSolidPencil
        className={style.actionIcon}
        onClick={() => fetchLeadData(leadId)}
      />
      {/* Modal */}
      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader closeButton>
          <Modal.Title className={style.title}>Edit Lead</Modal.Title>
        </ModalHeader>
        <ModalBody className={style.modalBody}>
          {leadData ? (
            <form>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={leadData.name || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Mobile:</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    value={leadData.mobile || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={leadData.email || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Type:</label>
                  <input
                    type="text"
                    name="type"
                    className="form-control"
                    value={leadData.type || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Property:</label>
                  <input
                    type="text"
                    name="property"
                    className="form-control"
                    value={leadData.property || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={leadData.location || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Asking Price:</label>
                  <input
                    type="text"
                    name="askingPrice"
                    className="form-control"
                    value={leadData.askingPrice || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Stage:</label>
                  <select
                    name="stage"
                    className="form-select"
                    value={leadData.stage}
                    onChange={handleChange}
                  >
                    <option
                      value="High Priority"
                      selected={leadData.stage === "High Priority"}
                    >
                      High Priority
                    </option>
                    <option
                      value="Medium priority"
                      selected={leadData.stage === "Medium priority"}
                    >
                      Medium priority
                    </option>
                    <option
                      value="Low priority"
                      selected={leadData.stage === "Low priority"}
                    >
                      Low priority
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-row d-flex">
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Title Check:</label>
                  <select
                    name="titleCheck"
                    className="form-select"
                    value={leadData.titleCheck}
                    onChange={handleChange}
                  >
                    <option
                      value="clear"
                      selected={leadData.titleCheck === "clear"}
                    >
                      Clear
                    </option>
                    <option
                      value="pending"
                      selected={leadData.titleCheck === "pending"}
                    >
                      Pending
                    </option>
                  </select>
                </div>
                <div className="form-group col-md-6 ps-3 pt-3">
                  <label>Area:</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={leadData.area || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row">
                <label>Remarks:</label>
                <textarea
                  name="remarks"
                  className="form-control"
                  value={leadData.remarks || ""}
                  onChange={handleChange}
                />

                <div
                  className="form-group col-md-6 ps-3 pt-3"
                  style={{ display: "none" }}
                >
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formatDate(new Date())}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Save Changes
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Edit_Leads;
