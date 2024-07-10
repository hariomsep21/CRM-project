import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import style from "./CreateTask.module.css";

const CreateTask = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("Buyer");
  const [assignTo, setAssignTo] = useState("");
  const [label, setLabel] = useState("High priority");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "propertyType") {
      setPropertyType(value);
    } else if (name === "assignTo") {
      setAssignTo(value);
    } else if (name === "label") {
      setLabel(value);
    } else {
      setTitle(value);
    }
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        Create Task
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write here"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicProperty">
              <Form.Label>Property Type</Form.Label>
              <div className="d-flex ">
                <Form.Check
                  type="radio"
                  label="Buyer"
                  name="propertyType"
                  id="buyer"
                  value="Buyer"
                  checked={propertyType === "Buyer"}
                  onChange={handleChange}
                  inline // Add inline attribute for checkbox layout
                />
                <Form.Check
                  type="radio"
                  label="Seller"
                  name="propertyType"
                  id="seller"
                  value="Seller"
                  checked={propertyType === "Seller"}
                  onChange={handleChange}
                  inline // Add inline attribute for checkbox layout
                />
                <Form.Check
                  type="radio"
                  label="Rental"
                  name="propertyType"
                  id="rental"
                  value="Rental"
                  checked={propertyType === "Rental"}
                  onChange={handleChange}
                  inline // Add inline attribute for checkbox layout
                />
              </div>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAssignTo">
                  <Form.Label>Assign To</Form.Label>
                  <DropdownButton
                    variant=""
                    title="Select assign"
                    className={`${style.dropdownBtn}`}
                    block
                  >
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={() => setAssignTo("Action")}
                    >
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={() => setAssignTo("Another action")}
                    >
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={() => setAssignTo("Something else")}
                    >
                      Something else
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicLabel">
                  <Form.Label>Label</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="label"
                    value={label}
                    onChange={handleChange}
                  >
                    <option value="High priority">High priority</option>
                    <option value="Medium priority">Medium priority</option>
                    <option value="Low priority">Low priority</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTask;
