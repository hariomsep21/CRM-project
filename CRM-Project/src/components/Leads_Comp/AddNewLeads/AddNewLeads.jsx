import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import style from "./AddNewLeads.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AddNewLeads = ({ onNewLeadAdd }) => {
  const [modal, setModal] = useState(false);
  const [leadData, setLeadData] = useState({
    type: "",
    property: "",
    name: "",
    location: "",
    date: formatDate(new Date()),
    askingPrice: "",
    titleCheck: "",
    area: "",
    stage: "",
    remarks: "",
    email: "",
    mobile: "",
    inventoryId: "",
  });
  const [inventoryData, setInventoryData] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerNames, setCustomerNames] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/api/CRMInventory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventoryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventoryData();
  }, [token]);

  const resetForm = () => {
    setLeadData({
      type: "",
      property: "",
      name: "",
      location: "",
      date: formatDate(new Date()),
      askingPrice: "",
      titleCheck: "",
      area: "",
      stage: "",
      remarks: "",
      email: "",
      mobile: "",
      inventoryId: "",
    });
    setCustomerNames([]);
    setSelectedCustomerName("");
    setPropertyOptions([]);
  };

  const toggleModal = () => {
    if (modal) {
      // Reset form data when modal is closing
      resetForm();
    }
    setModal(!modal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "customerName") {
      const selectedCustomer = customerNames.find(
        (customer) => customer.name === value
      );
      if (selectedCustomer) {
        setLeadData({
          ...leadData,
          name: selectedCustomer.name,
          mobile: selectedCustomer.mobile,
          email: selectedCustomer.email,
        });
      }
    } else {
      setLeadData({ ...leadData, [name]: value });
    }
  };

  const handlePropertyChange = (event) => {
    const selectedProperty = event.target.value;
    const selectedInventory = inventoryData.find(
      (inventory) => inventory.address === selectedProperty
    );
    setLeadData({
      ...leadData,
      property: selectedProperty,
      inventoryId: selectedInventory.id,
      location: selectedInventory.location,
      area: selectedInventory.plotSize,
    });
    setCustomerNames([]);

    axios
      .get(
        `https://localhost:7062/api/CRMCustomerInventory/GetInventoryList/${selectedInventory.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const customerIds = response.data.map(
          (customer) => customer.customerId
        );
        if (customerIds.length > 0) {
          customerIds.forEach((id) => {
            axios
              .get(`https://localhost:7062/api/CRMCustomer/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setCustomerNames((prevNames) => [...prevNames, response.data]);
              })
              .catch((error) => {
                console.error(error);
              });
          });
        } else {
          console.error("Customer ID not found");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (customerNames.length > 0) {
          setSelectedCustomerName(customerNames[0]);
        }
      });
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    if (selectedType === "Rent") {
      const rentProperties = inventoryData.filter(
        (inventory) => inventory.propertyStatus === "Rent"
      );
      setPropertyOptions(rentProperties);
    } else if (selectedType === "Sell") {
      const sellProperties = inventoryData.filter(
        (inventory) => inventory.propertyStatus === "Sell"
      );
      setPropertyOptions(sellProperties);
    } else if (selectedType === "Buy") {
      const buyProperties = inventoryData.filter(
        (inventory) => inventory.propertyStatus === "Buy"
      );
      setPropertyOptions(buyProperties);
    } else {
      setPropertyOptions(inventoryData);
    }
    setLeadData({ ...leadData, type: selectedType });
  };

  const validateForm = () => {
    const requiredFields = {
      type: "Property Type",
      property: "Property",
      name: "Name",
      location: "Location",
      askingPrice: "Asking Price",
      titleCheck: "Title Check",
      area: "Area",
      stage: "Stage",
      remarks: "Remarks",
      email: "Email",
      mobile: "Mobile",
    };

    const missingFields = [];

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!leadData[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      toast.error(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formattedDate = formatDate(new Date());
      const leadDataToSend = { ...leadData, date: formattedDate };
      axios
        .post(
          "https://localhost:7062/api/CRMLead/CreateLeads",
          leadDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          onNewLeadAdd(response.data);
          toggleModal();
        })
        .catch((error) => {
          if (error.response) {
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        });
    }
  };

  return (
    <div>
      <button
        className={`btn ${style.addInventory_btn}`}
        variant="primary"
        onClick={toggleModal}
      >
        + Add New Leads
      </button>
      <Modal
        show={modal}
        onHide={toggleModal}
        className="modal-dialog-centered"
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader closeButton>
            <Modal.Title className={style.title}>New Lead</Modal.Title>
          </ModalHeader>
          <ModalBody className={style.modalBody}>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-select"
                  value={leadData.type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Type</option>
                  <option value="Rent">Rent</option>
                  <option value="Sell">Sell</option>
                  <option value="Buy">Buy</option>
                </select>
              </div>
              <div className="form-group col-md-6 ps-3 pt-3 pl-2">
                <label htmlFor="property">Property</label>
                <select
                  id="property"
                  name="property"
                  className="form-select"
                  value={leadData.property}
                  onChange={handlePropertyChange}
                >
                  <option value="">Select Property</option>
                  {propertyOptions.map((inventory) => (
                    <option key={inventory.id} value={inventory.address}>
                      {inventory.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label htmlFor="customerName">Name:</label>
                <select
                  id="customerName"
                  className="form-select"
                  name="customerName"
                  value={leadData.name}
                  onChange={handleInputChange}
                >
                  <option value="">Select Customer</option>
                  {customerNames.map((name, index) => (
                    <option key={index} value={name.name}>
                      {name.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    value={leadData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
            </div>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={leadData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={leadData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />
              </div>
            </div>

            <div className="form-row d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Area:</label>
                <input
                  type="text"
                  name="area"
                  className="form-control"
                  value={leadData.area}
                  onChange={handleInputChange}
                  placeholder="Area"
                />
              </div>
              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Asking Price:</label>
                <input
                  type="number"
                  name="askingPrice"
                  className="form-control"
                  value={leadData.askingPrice}
                  onChange={handleInputChange}
                  placeholder="Asking Price"
                />
              </div>
            </div>
            <div className="form-group d-flex">
              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Title Check:</label>
                <select
                  name="titleCheck"
                  className="form-select"
                  value={leadData.titleCheck}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="clear">Clear</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="form-group col-md-6 ps-3 pt-3">
                <label>Stage:</label>
                <select
                  name="stage"
                  className="form-select"
                  value={leadData.stage}
                  onChange={handleInputChange}
                >
                  <option value="">Select Stage</option>
                  <option value="High Priority">High Priority</option>
                  <option value="Medium priority">Medium priority</option>
                  <option value="Low priority">Low priority</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Remark:</label>
              <textarea
                name="remarks"
                className="form-control"
                value={leadData.remarks}
                onChange={handleInputChange}
                placeholder="Remark"
              />
            </div>
            <div
              className="form-group col-md-6 ps-3 pt-3"
              style={{ display: "none" }}
            >
              <label>Date:</label>
              <input
                type="datetime-local"
                name="date"
                className="form-control"
                value={leadData.date}
                onChange={handleInputChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </ModalFooter>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AddNewLeads;
