import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import style from "./CreateTask.module.css";

// Utility function to format date as dd/MM/yy hh:mm:ss a
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

const CreateTask = ({
  show,
  setShowCreateTaskModal,
  handleClose,
  onTaskAdded, // Callback prop to notify parent
}) => {
  const [selectedType, setSelectedType] = useState("Buy");
  const [customLabelInput, setCustomLabelInput] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [assignTo, setAssignTo] = useState("");

  // Handle property type change
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Handle label selection
  const handleLabelChange = (event) => {
    const value = event.target.value;
    setNewLabel(value);
    setCustomLabelInput(value === "Custom");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get current date and format it
    const formattedDate = formatDate(new Date());

    // Prepare new task data
    const newTask = {
      task: taskTitle,
      type: selectedType,
      assignTo: assignTo,
      labels: customLabelInput ? customLabel : newLabel,
      date: formattedDate,
    };

    try {
      const response = await axios.post(
        "https://localhost:7062/api/CRMDashboard",
        newTask
      );
      onTaskAdded(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className={`${style.btnTask}`}
        onClick={() => setShowCreateTaskModal(true)}
      >
        <MdAdd className={`${style.addIcon}`} />
        Create Task
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className={style.createTaskHeading}>
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label className={`${style.heading}`}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write here"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className={style.createTaskInputField}
              />
            </Form.Group>
            <Form.Group controlId="formBasicProperty" className="pt-3 pb-3">
              <Form.Label className={`${style.heading}`}>
                Property Type
              </Form.Label>
              <div className={`${style.propertyTypeCheckbox}`}>
                <Form.Check
                  type="radio"
                  label="Buy"
                  name="type"
                  id="Buy"
                  value="Buy"
                  checked={selectedType === "Buy"}
                  onChange={handleTypeChange}
                  className={`form-check ${style.radio}`}
                />
                <Form.Check
                  type="radio"
                  label="Sell"
                  name="type"
                  id="Sell"
                  value="Sell"
                  checked={selectedType === "Sell"}
                  onChange={handleTypeChange}
                  className={style.radio}
                />
                <Form.Check
                  type="radio"
                  label="Rental"
                  name="type"
                  id="Rental"
                  value="Rental"
                  checked={selectedType === "Rental"}
                  onChange={handleTypeChange}
                  className={style.radio}
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
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    className={`w-100 ${style.createTaskInputField}`}
                  >
                    <option value="">Select assign</option>
                    <option value="Action">Action</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicLabels">
                  <Form.Label className={`${style.heading}`}>Labels</Form.Label>
                  <Form.Select
                    value={newLabel}
                    onChange={handleLabelChange}
                    className={style.createTaskInputField}
                  >
                    <option value="">Select a label</option>
                    <option value="High Priority">High priority</option>
                    <option value="Medium">Medium priority</option>
                    <option value="Less">Low priority</option>
                    <option value="Custom" className={style.customLabel}>
                      + Add Custom Label
                    </option>
                  </Form.Select>
                  {customLabelInput && (
                    <Form.Control
                      type="text"
                      placeholder="Enter custom label"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      className={style.createTaskInputField}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateTask;
