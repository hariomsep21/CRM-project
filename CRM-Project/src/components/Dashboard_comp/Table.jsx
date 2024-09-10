import React, { useState, useEffect } from "react";
import { MdOutlineArchive, MdOutlineEdit, MdEditNote } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import style from "./Table.module.css";
import MyTask from "./MyTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask/EditTask";
import axios from "axios";
import AddNoteModal from "./AddNoteModal";
import LeadStatus from "./LeadStatus";

const Table = () => {
  const [filter, setFilter] = useState("All");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const handleSubmit = (updatedTask) => {
    console.log("updates", updatedTask);
    const data = {
      id: updatedTask.id,
      task: updatedTask.title,
      type: updatedTask.type,
      assignTo: updatedTask.assignTo,
      labels: updatedTask.labels,
      date: updatedTask.date,
      note: updatedTask.note,
    };
    axios
      .post(`${API_URL}api/CRMDashboard/${currentTaskId}`, data)
      .then(() => {
        refreshTask();
        setShowEditTaskModal(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleEditTask = (taskId) => {
    setCurrentTaskId(taskId);
    setShowEditTaskModal(true);
  };

  const handleCloseEditTaskModal = () => {
    setShowEditTaskModal(false);
  };

  const handleEditNotes = (taskId) => {
    setCurrentTaskId(taskId);
    setShowNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setNote("");
  };
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleSaveNote = async () => {
    try {
      await axios.put(`${API_URL}api/tasks/${currentTaskId}`, { note });
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  const getLeadData = () => {
    const totalLeads = tasks.length;
    const buyLeads = tasks.filter((task) => task.type === "Buy").length;
    const rentalLeads = tasks.filter((task) => task.type === "Rental").length;

    const buyPercentage = Math.round((buyLeads / totalLeads) * 100);
    const rentalPercentage = Math.round((rentalLeads / totalLeads) * 100);

    return {
      buyData: {
        datasets: [
          {
            label: "Buy Leads",
            data: [buyPercentage, 100 - buyPercentage], // updated data
            backgroundColor: ["#850f8d", "#e5e5e5"],
            hoverOffset: 4,
          },
        ],
      },
      rentalData: {
        datasets: [
          {
            label: "Rental Leads",
            data: [rentalPercentage, 100 - rentalPercentage], // updated data
            backgroundColor: ["#ffa62f", "#e5e5e5"],
            hoverOffset: 4,
          },
        ],
      },
    };
  };

  const { buyData, rentalData } = getLeadData();

  return (
    <>
      <LeadStatus buyData={buyData} rentalData={rentalData}></LeadStatus>
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
              onTaskAdded={handleTaskAdded}
            />
          </div>
        </div>
        <MyTask setFilter={setFilter} onSearchChange={handleSearchChange} />
        <div className="row mt-4">
          <div className="col-md-1 text-center">
            <input
              className={`form-check-input ${style.checkbox}`}
              type="checkbox"
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
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`row mt-2 align-items-center ${style.row}`}
          >
            <div className="col-md-1 text-center">
              <input
                className={`form-check-input ${style.checkbox}`}
                type="checkbox"
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
                      : "#ffa62f",
                  color: "white",
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
              <button
                className="btn ms-3"
                onClick={() => handleEditTask(task.id)}
              >
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
        <EditTask
          showModal={showEditTaskModal}
          task={tasks.find((task) => task.id === currentTaskId) || {}}
          handleCloseModal={handleCloseEditTaskModal}
          handleSubmit={handleSubmit}
        />
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
