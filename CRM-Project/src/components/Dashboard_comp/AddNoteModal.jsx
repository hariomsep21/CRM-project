import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { formatDistanceToNow, parse } from "date-fns";
import style from "./AddNoteModal.module.css";

const AddNoteModal = ({ show, handleClose, task, onSave }) => {
  const [note, setNote] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (task.date) {
      const parsedDate = parse(task.date, "hh:mm:ss a dd/MM/yy", new Date());
      if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        const formatted = formatDistanceToNow(parsedDate, { addSuffix: true });
        setFormattedDate(formatted);
      } else {
        setFormattedDate(task.date);
      }
    }
  }, [task.date]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    onSave(note);
    setNote("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title className={style.addNoteHeading}>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span
              className={`${style.typeBtn}`}
              style={{
                backgroundColor:
                  task.type === "Sell"
                    ? "blue"
                    : task.type === "Buy"
                    ? "purple"
                    : task.type === "Rent"
                    ? "#ffa62f"
                    : "",
                color:
                  task.type === "Sell"
                    ? "white"
                    : task.type === "Buy"
                    ? "white"
                    : task.type === "Rent"
                    ? "white"
                    : "",
              }}
            >
              {task.type}
            </span>
            <span className={style.dateText}>Created {formattedDate}</span>
            <div className={style.subheadingTask}>{task.task}</div>
          </div>

          <Form>
            <Form.Group controlId="formNote">
              <Form.Control
                as="textarea"
                rows={4}
                value={note}
                onChange={handleNoteChange}
                style={{ marginTop: 20 }}
                placeholder="Write here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            onClick={handleClose}
            className={style.addnoteCancelBtn}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveNote}
            className={style.addnoteSubmitBtn}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNoteModal;
