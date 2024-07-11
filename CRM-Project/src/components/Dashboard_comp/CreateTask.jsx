import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import style from "./CreateTask.module.css";
import { MdAdd } from "react-icons/md";

const CreateTask = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("Buyer");
  const [assignTo, setAssignTo] = useState("");
  const [label, setLabel] = useState("High priority");
  const [customLevel, setCustomLevel] = useState("");

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
    } else if (name === "customLevel") {
      setCustomLevel(value);
    } else {
      setTitle(value);
    }
  };

  return (
    <>
      <Button
        variant=""
        onClick={handleShow}
        className={`btn btn-primary ${style.btnTask}`}
      >
        <MdAdd className={`${style.addIcon}`} />
        Create Task
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label className={`${style.heading}`}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write here"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicProperty">
              <Form.Label className={`${style.heading}`}>
                Property Type
              </Form.Label>
              <div className={`${style.propertyTypeCheckbox}`}>
                <Form.Check
                  type="radio"
                  label="Buyer"
                  name="propertyType"
                  id="buyer"
                  value="Buyer"
                  checked={propertyType === "Buyer"}
                  onChange={handleChange}
                  className={`form-check ${style.radio}`}
                />
                <Form.Check
                  type="radio"
                  label="Seller"
                  name="propertyType"
                  id="seller"
                  value="Seller"
                  checked={propertyType === "Seller"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Rental"
                  name="propertyType"
                  id="rental"
                  value="Rental"
                  checked={propertyType === "Rental"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAssignTo">
                  <Form.Label className={`${style.heading}`}>
                    Assign To
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="assignTo"
                    value={assignTo}
                    onChange={handleChange}
                    className="w-100"
                  >
                    <option value="">Select assign</option>
                    <option value="Action">Action</option>
                    <option value="Another action">Another action</option>
                    <option value="Something else">Something else</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicLabel">
                  <Form.Label className={`${style.heading}`}>Label</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="label"
                    value={label}
                    onChange={handleChange}
                    className="w-100"
                  >
                    <option
                      value="High priority"
                      style={{
                        color: label === "High priority" ? "black" : "",
                      }}
                    >
                      High priority
                    </option>
                    <option
                      value="Medium priority"
                      style={{
                        color: label === "Medium priority" ? "black" : "",
                      }}
                    >
                      Medium priority
                    </option>
                    <option
                      value="Low priority"
                      style={{ color: label === "Low priority" ? "black" : "" }}
                    >
                      Low priority
                    </option>
                    <option value="Custom level">
                      {" "}
                      <MdAdd />
                      Add Custom label
                    </option>
                  </Form.Select>
                  {label === "Custom level" && (
                    <Form.Control
                      type="text"
                      placeholder="Enter custom level"
                      name="customLevel"
                      value={customLevel}
                      onChange={handleChange}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            className={`${style.cancelBtn}`}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className={`${style.submitBtn}`}
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTask;
