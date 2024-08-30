import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./MyInventory_Create.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const MyInventory_Create = ({ onNewRecordAdded }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "",
    propertyStatus: "",
    address: "",
    location: "",
    floor: "",
    bed: "",
    rent: "",
    plotSize: "",
    parkFacing: "",
    lift: "",
    stiltParking: "",
    staffRoom: "",
    remarks: "",
  });

  const fieldNames = {
    propertyType: "Property Type",
    propertyStatus: "Property Status",
    address: "Address",
    location: "Location",
    floor: "Floor",
    bed: "Bed",
    rent: "Rent",
    plotSize: "Plot Size",
    parkFacing: "Park Facing",
    lift: "Lift",
    stiltParking: "Stilt Parking",
    staffRoom: "Staff Room",
    remarks: "Remarks",
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map((key) => fieldNames[key]);
      toast.error(
        `The following fields are required: ${emptyFieldNames.join(", ")}`
      );
      return;
    }

    const transformedData = {
      ...formData,
      parkFacing: formData.parkFacing === "Yes", // Convert to boolean
      lift: formData.lift === "Yes", // Convert to boolean
      stiltParking: formData.stiltParking === "Yes", // Convert to boolean
      staffRoom: formData.staffRoom === "Yes", // Convert to boolean
    };

    try {
      const response = await axios.post(
        "https://localhost:7062/api/CRMInventory",
        transformedData
      );
      toast.success("Records added successfully");
      onNewRecordAdded(response.data);
      handleClose();
    } catch (error) {
      console.error(error.response.data.errors);
      toast.error("Failed to add records");
    }
  };

  //   try {
  //     const response = await fetch("http://localhost:5000/myInventory", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       toast.success("Records added successfully");
  //       onNewRecordAdded(); // Notify parent component
  //       handleClose();
  //     } else {
  //       toast.error("Failed to add records");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <>
      <button
        className={`btn ${style.addInventory_btn}`}
        variant="primary"
        onClick={handleShow}
      >
        + Add New Inventory
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        className={`custom-modal modal-dialog-centered ${style.modal}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>New Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="form-control"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Farm</option>
                </select>
              </div>

              <div className="form-group col-md-6 ps-3 pt-3 pl-2">
                <label htmlFor="propertyStatus">Property Status</label>
                <select
                  id="propertyStatus"
                  name="propertyStatus"
                  className="form-control"
                  value={formData.propertyStatus}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Rent</option>
                  <option>Sell</option>
                </select>
              </div>
            </div>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="1234 Main St"
                />
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="floor">Floor</label>
                <input
                  type="text"
                  name="floor"
                  className="form-control"
                  id="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Enter floor number"
                />
              </div>
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="bed">Bed</label>
                <input
                  type="text"
                  name="bed"
                  className="form-control"
                  id="bed"
                  value={formData.bed}
                  onChange={handleChange}
                  placeholder="Enter number of beds"
                />
              </div>
            </div>

            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="rent">Rent</label>
                <input
                  type="text"
                  name="rent"
                  className="form-control"
                  id="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="Enter rent amount"
                />
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="plotSize">Plot Size (SQ YDS)</label>
                <input
                  type="text"
                  name="plotSize"
                  className="form-control"
                  id="plotSize"
                  value={formData.plotSize}
                  onChange={handleChange}
                  placeholder="Enter plot size in square yards"
                />
              </div>
            </div>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="parkFacing">Park Facing</label>
                <select
                  id="parkFacing"
                  name="parkFacing"
                  className="form-control"
                  value={formData.parkFacing}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="lift">Lift</label>
                <select
                  id="lift"
                  name="lift"
                  className="form-control"
                  value={formData.lift}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="stiltParking">Stilt Parking</label>
                <select
                  id="stiltParking"
                  name="stiltParking"
                  className="form-control"
                  value={formData.stiltParking}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="staffRoom">Staff Room</label>
                <select
                  id="staffRoom"
                  name="staffRoom"
                  className="form-control"
                  value={formData.staffRoom}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                className="form-control"
                name="remarks"
                id="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter remarks"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success mt-4">
              Add Inventory
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyInventory_Create;
