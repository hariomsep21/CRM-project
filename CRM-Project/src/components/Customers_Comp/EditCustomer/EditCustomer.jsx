import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import style from "./EditCustomer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditCustomer({ customers, onEditCustomer }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [need, setNeed] = useState("");
  const [remark, setRemark] = useState("");
  const [property, setProperty] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (customers) {
      setName(customers.name || "");
      setEmail(customers.email || "");
      setMobile(customers.mobile || "");
      setAddress(customers.address || "");
      setNeed(customers.need || "");
      setRemark(customers.remarks || "");
      setProperty(customers.property || "");
      setStatus(customers.status || "");
    }
  }, [customers]);
  const onSubmit = (event) => {
    event.preventDefault();
    onEditCustomer({
      id: customers.id,
      name,
      email,
      mobile,
      address,
      need,
      remarks: remark,
      property,
      status,
    });
    handleClose();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [property, setProperty] = useState("Buyer / Seller");
  // const nameRef = useRef();
  // const mobileRef = useRef();
  // const emailRef = useRef();
  // const addressRef = useRef();
  // const needRef = useRef();
  // const remarksRef = useRef();
  // const navigate = useNavigate();

  // const handleForm = async () => {
  //   let dataObj = {
  //     name: nameRef.current.value,
  //     mobile: mobileRef.current.value,
  //     email: emailRef.current.value,
  //     address: addressRef.current.value,
  //     need: needRef.current.value,
  //     remarks: remarksRef.current.value,
  //     property: property,
  //     status: "hot",
  //   };

  //   try {
  //     const response = await axios.post(
  //       `https://localhost:7062/api/CRMCustomer/4`,
  //       dataObj
  //     );
  //     onAddNewCustomer(response.data);
  //     handleClose();
  //     navigate("/Customer");
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.error(error);
  //   }
  //   console.log("Done");
  // };

  const handlePropertyTypeChange = (event) => {
    setProperty(event.target.value);
  };

  return (
    <>
      <Button variant="" onClick={handleShow} className={`btn`}>
        Edit Customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  checked={property === "Tenant"}
                  className={style.addNewCustomerPropertyTypeOption}
                  value="Tenant"
                  onChange={handlePropertyTypeChange}
                />
                <Form.Check
                  type="radio"
                  label="Rental"
                  name="propertyType"
                  id="propertyType3"
                  checked={property === "Rental"}
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
                    // ref={nameRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // ref={emailRef}
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
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    // ref={mobileRef}
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
                // ref={addressRef}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                // ref={needRef}
                value={need}
                onChange={(e) => setNeed(e.target.value)}
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
                // ref={remarksRef}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
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
            onClick={onSubmit}
            className={style.addNewCustomerAddBtn}
          >
            Save Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCustomer;
