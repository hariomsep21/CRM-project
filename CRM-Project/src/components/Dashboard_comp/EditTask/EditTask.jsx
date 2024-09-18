import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import style from "./EditTask.module.css";

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

const EditTask = ({ showModal, task, handleCloseModal, handleSubmit }) => {
  const [customLabelInput, setCustomLabelInput] = useState(false);

  const [taskTitle, setTaskTitle] = useState(task ? task.property : "");
  const [assignTo, setAssignTo] = useState(task ? task.name : "");
  const [selectedType, setSelectedType] = useState(task ? task.type : "Buy");
  const [customLabel, setCustomLabel] = useState(task ? task.stage : "");
  const [newLabel, setNewLabel] = useState(task ? task.stage : "");
  const [note, setNote] = useState(task ? task.note : "");

  useEffect(() => {
    console.log("Task prop:", task);
    if (task) {
      setTaskTitle(task.property || "");
      setAssignTo(task.name || "");
      setSelectedType(task.type || "");
      setCustomLabel(task.stage || "");
      setNewLabel(task.stage || "");
      setNote(task.note || "");
    }
  }, [task]);

  const onSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    handleSubmit({
      id: task.id,
      property: taskTitle,
      assignTo: name,
      type: selectedType,
      stage: newLabel,
      date: formatDate(currentDate),
      note: note,
    });
    handleCloseModal();
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleLabelChange = (event) => {
    const value = event.target.value;
    setNewLabel(value);
    setCustomLabelInput(value === "Custom");
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className={style.createTaskHeading}>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className={`${style.heading}`}>Property</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write here"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className={style.createTaskInputField}
              readOnly
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
                label="Rent"
                name="type"
                id="Rent"
                value="Rent"
                checked={selectedType === "Rent"}
                onChange={handleTypeChange}
                className={style.radio}
              />
            </div>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label className={`${style.heading}`}>AssignTo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write here"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className={style.createTaskInputField}
                  readOnly
                />
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
                  <option value="Medium priority">Medium priority</option>
                  <option value="Low priority">Low priority</option>
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
          <Button
            variant="primary"
            type="submit"
            className={`${style.createTaskBtn}`}
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
