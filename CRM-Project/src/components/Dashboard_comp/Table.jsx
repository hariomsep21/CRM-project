import React from "react";
import style from "./Table.module.css";
import { MdOutlineEdit, MdShare, MdEditNote } from "react-icons/md";

function Table() {
  const tasks = [
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
  ];

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-1">
          <input
            className={`form-check-input ${style.checkbox}`}
            type="checkbox"
            value=""
          />
        </div>
        <div className={`col-md-1 ${style.mytask_table_title}`}>Type</div>
        <div className={`col-md-6 ${style.mytask_table_title}`}>Task</div>
        <div className={`col-md-1 ${style.mytask_table_title}`}>Date</div>
        <div className={`col-md-1 ${style.mytask_table_title}`}>Labels</div>
        <div className={`col-md-2 ${style.mytask_table_title}`}></div>
      </div>

      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`row mt-2 align-items-center ${style.row}`}
        >
          <div className="col-md-1">
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
                    ? "White"
                    : "",
                textAlign: "center",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {task.type}
            </div>
          </div>
          <div className={`col-md-6 ${style.task_detail}`}>{task.task}</div>
          <div className={`col-md-1 ${style.task_date}`}>{task.date}</div>
          <div className={`col-md-1 ${style.task_labels}`}>{task.labels}</div>
          <div className="col-md-2 d-flex">
            <button className="btn  me-2">
              <MdOutlineEdit className={`${style.editIcon}`} />
            </button>
            <button className="btn  me-2">
              <MdEditNote className={`${style.editNoteIcon}`} />
            </button>
            <button className="btn ">
              <MdShare className={`${style.shareIcon}`} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
