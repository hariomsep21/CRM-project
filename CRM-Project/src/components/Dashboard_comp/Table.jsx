// Table.js

import React, { useState } from "react";
import { MdOutlineEdit, MdEditNote, MdOutlineArchive } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { Modal, Button, Form } from "react-bootstrap";
import CreateTask from "./CreateTask";
import AddNoteModal from "./AddNoteModal";
import style from "./Table.module.css";
import MyTask from "./MyTask";

const Table = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState([
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
  const [newTask, setNewTask] = useState({
    task: "",
    type: "Buy",
    assignTo: "",
    labels: "Custom",
  });

  const handleEditNotes = (taskId) => {
    setCurrentTaskId(taskId);
    setShowNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setCurrentTaskId(null);
    setNote("");
  };

  const handleSaveNote = (newNote) => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTaskId ? { ...task, note: newNote } : task
    );
    setTasks(updatedTasks);
    handleCloseNoteModal();
  };

  const handleAddTask = () => {
    const newId = tasks.length + 1;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = currentDate.toLocaleString("default", { month: "2-digit" });
    const day = currentDate.toLocaleString("default", { day: "2-digit" });
    const time = currentDate.toLocaleTimeString();
    const formattedDate = `${time} ${month}/${day}/${year}`;
    const updatedTasks = [
      ...tasks,
      {
        id: newId,
        task: newTask.task,
        type: newTask.type,
        date: formattedDate,
        labels: newTask.labels,
      },
    ];
    setTasks(updatedTasks);
    setShowCreateTaskModal(false);
    setNewTask({ task: "", type: "Buy", assignTo: "", labels: "Custom" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <>
      <div className="container p-0">
        <div className="d-flex justify-content-between mb-1 align-items-center ">
          <h3 className={`${style.mytask_title}`}>My Task</h3>
          <div className={`${style.btnGroup}`}>
            <button
              type="button"
              className={`btn btn-outline-secondary ${style.archieveBtn}`}
            >
              <MdOutlineArchive className={`${style.archiveIcon}`} />
              Archive
            </button>
            <CreateTask
              show={showCreateTaskModal}
              setShowCreateTaskModal={setShowCreateTaskModal}
              handleClose={() => setShowCreateTaskModal(false)}
              handleInputChange={handleInputChange}
              handleAddTask={handleAddTask}
              newItem={newTask}
              labelOptions={[
                "Custom",
                "High Priority",
                "Medium Priority",
                "Low Priority",
              ]}
            />
          </div>
        </div>
        <MyTask></MyTask>
        <div className="row mt-4">
          <div className="col-md-1 text-center">
            <input
              className={`form-check-input  ${style.checkbox}`}
              type="checkbox"
              value=""
            />
          </div>
          <div className={`col-md-1 ${style.mytask_table_title}`}>Type</div>
          <div className={`col-md-5 ${style.mytask_table_title}`}>Task</div>
          <div className={`col-md-2 ${style.mytask_table_title_date}`}>
            Date
          </div>
          <div className={`col-md-1 ${style.mytask_table_title}`}>Labels</div>
          <div className={`col-md-2 ${style.mytask_table_title}`}></div>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`row mt-2 align-items-center ${style.row}`}
          >
            <div className="col-md-1 text-center">
              <input
                className={`form-check-input ${style.checkbox}`}
                type="checkbox"
                value=""
              />
            </div>
            <div className="col-md-1">
              <div
                className={`${style.typeBtn}`}
                style={{
                  backgroundColor:
                    task.type === "Sell"
                      ? "blue"
                      : task.type === "Buy"
                      ? "purple"
                      : task.type === "Rental"
                      ? "#ffa62f"
                      : "",
                  color:
                    task.type === "Sell"
                      ? "white"
                      : task.type === "Buy"
                      ? "white"
                      : task.type === "Rental"
                      ? "white"
                      : "",
                }}
              >
                {task.type}
              </div>
            </div>
            <div className={`col-md-5 pe-0 ${style.task_detail}`}>
              {task.task}
            </div>
            <div className={`col-md-2 ${style.task_date}`}>{task.date}</div>
            <div className={`col-md-1 ${style.task_labels}`}>{task.labels}</div>
            <div className="col-md-2 d-flex">
              <button className="btn ms-3">
                <MdOutlineEdit className={`${style.editIcon}`} />
              </button>
              <button className="btn" onClick={() => handleEditNotes(task.id)}>
                <MdEditNote className={`${style.editNoteIcon}`} />
              </button>
              <button className="btn">
                <IoShareSocialOutline className={`${style.shareIcon}`} />
              </button>
            </div>
          </div>
        ))}

        <AddNoteModal
          show={showNoteModal}
          handleClose={handleCloseNoteModal}
          task={tasks.find((task) => task.id === currentTaskId) || {}}
          onSave={handleSaveNote}
        />
      </div>
    </>
  );
};

export default Table;
