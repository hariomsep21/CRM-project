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

const CreateTask = ({
  show,
  setShowCreateTaskModal,
  handleClose,
  handleInputChange,
  handleAddTask,
  newItem,
  labelOptions,
}) => {
  const [selectedType, setSelectedType] = useState(newItem.type);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    handleInputChange(event);
  };
  return (
    <>
      <Button
        variant="primary"
        className={` ${style.btnTask}`}
        onClick={() => setShowCreateTaskModal(true)}
      >
        <MdAdd className={`${style.addIcon}`} />
        Create Task
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title className={style.createTaskHeading}>
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label className={`${style.heading}`}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write here"
                name="task"
                value={newItem.task}
                onChange={handleInputChange}
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
                    name="assignTo"
                    value={newItem.assignTo}
                    onChange={handleInputChange}
                    className={`w-100 ${style.createTaskInputField}`}
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
                  <Form.Control
                    as="select"
                    name="labels"
                    value={newItem.labels}
                    onChange={handleInputChange}
                    className={`${style.createTaskInputField}`}
                  >
                    {labelOptions.map((label, index) => (
                      <option key={index} value={label}>
                        {label}
                      </option>
                    ))}
                  </Form.Control>
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
            onClick={handleAddTask}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTask;
