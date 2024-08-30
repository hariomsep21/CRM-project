import React, { useState, useEffect } from "react";
import { MdOutlineEdit, MdEditNote, MdOutlineArchive } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { Modal, Button, Form } from "react-bootstrap";
import style from "./Table.module.css";
import AddNoteModal from "./AddNoteModal";
import MyTask from "./MyTask";
import CreateTask from "./CreateTask";
import axios from "axios";

const Table = () => {
  const [filter, setFilter] = useState("All");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [labelOptions, setLabelOptions] = useState([
    "All",
    "High Priority",
    "Medium Priority",
    "Low Priority",
  ]);

  const API_URL = "https://localhost:7062/";

  useEffect(() => {
    refreshTask();
  }, []);

  const refreshTask = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMDashboard");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/tasks")
  //     .then((response) => {
  //       setTasks(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const handleEditNotes = (taskId) => {
    setCurrentTaskId(taskId);
    setShowNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setNote("");
  };
  const handleSaveNote = async () => {
    try {
      const response = await axios.put(`${API_URL}api/tasks/${currentTaskId}`, {
        note,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTaskId ? { ...task, note } : task
        )
      );
      handleCloseNoteModal();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSaveNote = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/tasks/${currentTaskId}`,
  //       { note }
  //     );
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === currentTaskId ? response.data : task
  //       )
  //     );
  //     handleCloseNoteModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const filteredTasks =
    tasks.length > 0
      ? tasks
          .filter((task) => filter === "All" || task.type === filter)
          .filter(
            (task) =>
              task.task &&
              task.task.toLowerCase().includes(searchTerm.toLowerCase())
          )
      : [];

  return (
    <div className="container p-0">
      <div className="d-flex justify-content-between mb-1 align-items-center">
        <h3 className={`${style.mytask_title}`}>My Task</h3>
        <div className={`${style.btnGroup}`}>
          <Button
            variant="outline-secondary"
            className={`${style.archieveBtn}`}
          >
            <MdOutlineArchive className={`${style.archiveIcon}`} />
            Archive
          </Button>
          <CreateTask
            show={showCreateTaskModal}
            setShowCreateTaskModal={setShowCreateTaskModal}
            handleClose={() => setShowCreateTaskModal(false)}
            onTaskAdded={handleTaskAdded} // Pass the callback
          />
        </div>
      </div>
      <MyTask setFilter={setFilter} onSearchChange={handleSearchChange} />
      <div className="row mt-4">
        <div className="col-md-1 text-center">
          <input
            className={`form-check-input ${style.checkbox}`}
            type="checkbox"
            value=""
          />
        </div>
        <div className={`col-md-1 ${style.mytask_table_title}`}>Type</div>
        <div className={`col-md-5 ${style.mytask_table_title}`}>Task</div>
        <div className={`col-md-2 ${style.mytask_table_title_date}`}>Date</div>
        <div className={`col-md-1 ${style.mytask_table_title}`}>Labels</div>
        <div className={`col-md-2 ${style.mytask_table_title}`}></div>
      </div>

      {filteredTasks.map((task) => (
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
  );
};

export default Table;
