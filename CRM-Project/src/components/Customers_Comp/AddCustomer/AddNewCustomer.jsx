import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import style from "./AddNewCustomer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddNewCustomer({ onAddNewCustomer, refreshData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [property, setProperty] = useState("Buyer/Seller");
  const [inventoryStatus, setInventoryStatus] = useState(false);

  const nameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const needRef = useRef();
  const remarksRef = useRef();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const handleForm = async (event) => {
    event.preventDefault();
    let dataObj = {
      name: nameRef.current.value,
      mobile: mobileRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      need: needRef.current.value,
      remarks: remarksRef.current.value,
      property: property,
      status: "hot",
      inventoryStatus: inventoryStatus,
    };
    let errors = [];

    // Check for empty fields
    if (!dataObj.name) {
      errors.push("Name");
    }
    if (!dataObj.email) {
      errors.push("Email");
    }
    if (!dataObj.mobile) {
      errors.push("Mobile");
    }
    if (!dataObj.address) {
      errors.push("Address");
    }
    if (!dataObj.need) {
      errors.push("Need");
    }
    if (!dataObj.remarks) {
      errors.push("Remark");
    }

    if (errors.length > 0) {
      let errorMessage = "Please fill in the following fields: ";
      errorMessage += errors.join(", ");
      toast.error(errorMessage);
      return;
    }

    // Email validation
    const emailRegex = /^[a-z0-9][a-z0-9._%+-]+@(gmail\.com)$/;
    if (!emailRegex.test(dataObj.email)) {
      toast.error(
        "Invalid email address. Please enter a valid email address.The email contain gmail.com in end only"
      );
      return;
    }

    // Mobile number validation
    const mobileRegex = /^[6789]\d{9}$/;
    if (!mobileRegex.test(dataObj.mobile)) {
      toast.error(
        "Invalid mobile number. Please enter a 10-digit mobile number."
      );
      return;
    }

    // Need and Remark length validation
    if (dataObj.need && dataObj.need.length > 150) {
      toast.error("Need should not exceed 150 characters");
      return;
    }
    if (dataObj.remarks && dataObj.remarks.length > 60) {
      toast.error("Remark should not exceed 60 characters");
      return;
    }

    //   fetch("http://localhost:5000/newCustomer", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(dataObj),
    //   })
    //     .then((res) => {
    //       toast.success("Done");
    //       onAddNewCustomer();
    //       handleClose();
    //       navigate("/Customer");
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     });
    //   console.log("Done");
    // };

    try {
      const response = await axios.post(
        "https://localhost:7062/api/CRMCustomer",
        dataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onAddNewCustomer(response.data);
      refreshData();
      handleClose();
      navigate("/Customer");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || error.response.data || error.message;
        if (errorMessage === "Email already exists.") {
          toast.error(
            "Email address already exists. Please enter a unique email address."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(
          "The Email address is already exist or mobile number is same .Please provide the new one"
        );
      }
      console.error(error);
    }
    console.log("Done");
  };

  const handlePropertyTypeChange = (event) => {
    setProperty(event.target.value);
  };

  const handleInventoryStatusChange = (event) => {
    setInventoryStatus(event.target.value === "true");
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className={style.cust_addbtn}
      >
        + Add New Customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleForm}>
            <Form.Group controlId="formBasicProperty">
              <Form.Label className={style.addNewCustomerLabel}>
                Property Type
              </Form.Label>
              <div className={style.addCustomerPropertyType}>
                <Form.Check
                  type="radio"
                  label="Buyer/Seller"
                  name="propertyType"
                  id="propertyType1"
                  checked={property === "Buyer/Seller"}
                  className={style.addNewCustomerPropertyTypeOption}
                  value="Buyer/Seller"
                  onChange={handlePropertyTypeChange}
                />
                <Form.Check
                  type="radio"
                  label="Tenant"
                  name="propertyType"
                  id="propertyType2"
                  className={style.addNewCustomerPropertyTypeOption}
                  value="Tenant"
                  onChange={handlePropertyTypeChange}
                />
                <Form.Check
                  type="radio"
                  label="Rental"
                  name="propertyType"
                  id="propertyType3"
                  className={style.addNewCustomerPropertyTypeOption}
                  value="Rental"
                  onChange={handlePropertyTypeChange}
                />
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label className={style.addNewCustomerLabel}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Write here"
                    className={style.addCustomerInputField}
                    ref={nameRef}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className={style.addNewCustomerLabel}>
                    Email ID
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Write here"
                    className={style.addCustomerInputField}
                    ref={emailRef}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPhone">
                  <Form.Label className={style.addNewCustomerLabel}>
                    Phone No.
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Write here"
                    className={style.addCustomerInputField}
                    ref={mobileRef}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicAddress">
              <Form.Label className={style.addNewCustomerLabel}>
                Properties Address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Write here"
                className={style.addCustomerInputField}
                ref={addressRef}
              />
            </Form.Group>
            <Form.Group controlId="formBasicNeed">
              <Form.Label className={style.addNewCustomerLabel}>
                Need
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write here"
                className={style.addCustomerInputField}
                ref={needRef}
                maxLength={150}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRemark">
              <Form.Label className={style.addNewCustomerLabel}>
                Remark
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write here"
                className={style.addCustomerInputField}
                ref={remarksRef}
                maxLength={60}
              />
            </Form.Group>
            <Form.Group controlId="formBasicProperty">
              <Form.Label className={style.addNewCustomerLabel}>
                Inventory Status
              </Form.Label>
              <div className={style.addCustomerPropertyType}>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="inventoryStatus"
                  id="inventoryStatus1"
                  checked={inventoryStatus == true}
                  className={style.addNewCustomerPropertyTypeOption}
                  value="trye"
                  onChange={handleInventoryStatusChange}
                />
                <Form.Check
                  type="radio"
                  label="Not Active"
                  name="inventoryStatus"
                  id="inventoryStatus2"
                  checked={inventoryStatus === false}
                  className={style.addNewCustomerPropertyTypeOption}
                  value="false"
                  onChange={handleInventoryStatusChange}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            onClick={handleClose}
            className={style.addNewCustomerCancelBtn}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleForm}
            className={style.addNewCustomerAddBtn}
          >
            Add Customer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewCustomer;
