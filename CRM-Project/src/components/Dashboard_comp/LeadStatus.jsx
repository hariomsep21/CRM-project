import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./LeadStatus.module.css";
import Dashboard from "./Dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

function DoughnutChart({ data, title }) {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        margin: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h6 className={`${style.graph_title}`}>{title}</h6>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
}
const buyData = {
  labels: ["Buy Leads"],
  datasets: [
    {
      label: "Leads",
      data: [50, 30, 20],
      backgroundColor: ["#ffa62f", "#e5e5e5", "black"],
      hoverOffset: 4,
    },
  ],
};

const rentalData = {
  labels: ["Rental Leads"],
  datasets: [
    {
      label: "Leads",
      data: [60, 40], // Adjust the percentages as needed
      backgroundColor: ["#850f8d", "#e5e5e5"], // Custom colors for rental
      hoverOffset: 4,
    },
  ],
};

function LeadStatus() {
  return (
    <div className={`${style.leadstatus_dashboard}`}>
      <h1 className={`${style.lead_graph_heading}`}>Leads status</h1>
      <div className={`${style.dashboard_graph}`}>
        <DoughnutChart data={buyData} title="Buy Leads" />
        <DoughnutChart data={rentalData} title="Rental Leads" />
      </div>
    </div>
  );
}

export default LeadStatus;
