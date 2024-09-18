import React, { useState, useEffect } from "react";
import { MdOutlineArchive, MdOutlineEdit, MdEditNote } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const API_URL = "https://localhost:7062/";

  useEffect(() => {
    refreshTask();
  }, []);

  const token = sessionStorage.getItem("token");
  const refreshTask = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMLead", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredData = response.data.map((task) => ({
        id: task.id,
        type: task.type,
        property: task.property,
        date: task.date,
        stage: task.stage,
        name: task.name,
      }));
      console.log("Filtered data:", filteredData);
      setTasks(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (updatedTask) => {
    console.log("updates", updatedTask);
    const data = {
      id: updatedTask.id,
      property: updatedTask.property,
      type: updatedTask.type,
      assignTo: updatedTask.assignTo,
      stage: updatedTask.stage,
      date: updatedTask.date,
      note: updatedTask.note,
      name: updatedTask.name,
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
              task.property &&
              task.property.toLowerCase().includes(searchTerm.toLowerCase())
          )
      : [];

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getLeadData = () => {
    const totalLeads = tasks.length;
    const buyLeads = tasks.filter((task) => task.type === "Sell").length;
    const rentalLeads = tasks.filter((task) => task.type === "Rent").length;

    const buyPercentage = Math.round((buyLeads / totalLeads) * 100);
    const rentalPercentage = Math.round((rentalLeads / totalLeads) * 100);

    return {
      buyData: {
        datasets: [
          {
            label: "Sell Leads",
            data: [buyPercentage, 100 - buyPercentage],
            backgroundColor: ["#216fed", "#e5e5e5"],
            hoverOffset: 4,
          },
        ],
      },
      rentalData: {
        datasets: [
          {
            label: "Rental Leads",
            data: [rentalPercentage, 100 - rentalPercentage],
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
        {currentTasks.map((task) => (
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
              {task.property}
            </div>
            <div className={`col-md-2 ${style.task_date}`}>{task.date}</div>
            <div className={`col-md-1 ${style.task_labels}`}>{task.stage}</div>
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
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <FaChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
