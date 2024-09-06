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
  const nameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const needRef = useRef();
  const remarksRef = useRef();
  const navigate = useNavigate();

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
    };

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
        dataObj
      );
      onAddNewCustomer(response.data);
      refreshData();
      handleClose();
      navigate("/Customer");
    } catch (error) {
      toast.error(error.message);
      toast.error();
      console.error(error);
    }
    console.log("Done");
  };

  const handlePropertyTypeChange = (event) => {
    setProperty(event.target.value);
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
              />
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
