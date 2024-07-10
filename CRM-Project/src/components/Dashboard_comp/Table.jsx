import React, { useState } from "react";
import { Table, Button, Form, Row, Col, Modal } from "react-bootstrap";
import style from "./Table.module.css";
import { MdOutlineEdit, MdShare, MdEditNote } from "react-icons/md";

function CrudTable() {
  const [showNoteForm, setShowNoteForm] = useState(false);

  const [note, setNote] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      type: "Buy",
      task: "Agreement Sign - Mr. Chopra And Aggarwal - ATS - Sector 93, Noida",
      date: "10:01:32 am 14/12/23",
      labels: "Custom",
    },
    {
      id: 2,
      type: "Sell",
      task: "Second Meeting Between Mr. Srivastav And Singh - Sector 104, Noida",
      date: "11:11:55 am 17/5/24",
      labels: "Custom",
    },
    {
      id: 3,
      type: "Rental",
      task: "Follow Up Call To Mr. Gupta For Second Installment Against Property In Sector 93, Noida",
      date: "12:45:44 am 5/7/24",
      labels: "Custom",
    },
    {
      id: 4,
      type: "Sell",
      task: "Second Meeting Between Mr. Srivastav And Singh - Sector 104, Noida",
      date: "11:11:55 am 17/5/24",
      labels: "Custom",
    },
  ]);

  const [newItem, setNewItem] = useState({
    type: "",
    task: "",
    date: "",
    labels: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    const newId = items.length + 1;
    const newEntry = { ...newItem, id: newId };
    setItems([...items, newEntry]);
    setNewItem({ type: "", task: "", date: "", labels: "" });
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setNewItem({ ...itemToEdit });
    setIsEditing(true);
    setEditingItemId(itemId);
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map((item) =>
      item.id === editingItemId ? newItem : item
    );
    setItems(updatedItems);
    setIsEditing(false);
    setNewItem({ type: "", task: "", date: "", labels: "" });
  };

  const handleShareItem = (itemId) => {
    console.log(`Share item ${itemId}`);
  };

  const handleEditNotes = (itemId) => {
    setEditingItemId(itemId); // Update editingItemId
    setShowNoteForm(true);
  };

  const handleCloseNoteForm = () => {
    setShowNoteForm(false);
    setEditingItemId(null); // Reset editingItemId
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    // Add your logic to save the note here
    console.log(`Save note for item ${editingItemId}: ${note}`);
    handleCloseNoteForm();
  };

  return (
    <div className="">
      <Table striped hover>
        <thead>
          <tr>
            <th>
              {" "}
              <input
                className={`form-check-input ${style.checkbox}`}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </th>
            <th className={`${style.tableHeading}`}>Type</th>
            <th className={`${style.tableHeading}`}>Task</th>
            <th className={`${style.tableHeading}`}>Date</th>
            <th className={`${style.tableHeading}`}>Labels</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  className={`form-check-input ${style.checkbox}`}
                  type="checkbox"
                  value=""
                  id={`checkbox-${item.id}`}
                />
              </td>
              <td>
                <div
                  className={`${style.typeBtn}`}
                  style={{
                    backgroundColor:
                      item.type === "Sell"
                        ? "blue"
                        : item.type === "Buy"
                        ? "purple"
                        : item.type === "Rental"
                        ? "#ffa62f"
                        : "",
                    color:
                      item.type === "Sell"
                        ? "white"
                        : item.type === "Buy"
                        ? "white"
                        : item.type === "Rental"
                        ? "White"
                        : "",
                  }}
                >
                  {item.type}
                </div>
              </td>
              <td className={`${style.task}`}>{item.task}</td>
              <td className={`${style.datedata}`}>{item.date}</td>
              <td>{item.labels}</td>
              <td>
                <Button variant="" onClick={() => handleEditItem(item.id)}>
                  <MdOutlineEdit className={`${style.editIcon}`} />
                </Button>
                <Button variant="" onClick={() => handleEditNotes(item.id)}>
                  <MdEditNote className={`${style.editNoteIcon}`} />
                </Button>
                <Button variant="" onClick={() => handleShareItem(item.id)}>
                  <MdShare className={`${style.shareIcon}`} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className={`${style.addItem}`}>Add New Item</h2>
      <Form className={`${style.addItem}`}>
        <Row>
          <Col>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                name="type"
                value={newItem.type}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                name="task"
                value={newItem.task}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date"
                name="date"
                value={newItem.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLabels">
              <Form.Label>Labels</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Labels"
                name="labels"
                value={newItem.labels}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        {isEditing ? (
          <Button variant="success" onClick={handleSaveEdit}>
            Save Edit
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        )}
      </Form>
      {/* Note Form */}
      <Modal
        show={showNoteForm}
        onHide={handleCloseNoteForm}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNote">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={handleNoteChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveNote}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCloseNoteForm}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrudTable;
