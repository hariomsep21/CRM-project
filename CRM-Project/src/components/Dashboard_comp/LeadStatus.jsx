import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

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
        width: "300px",
        height: "300px",
        margin: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2>{title}</h2>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
}

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

const buyData = {
  labels: ["Buy Leads"],
  datasets: [
    {
      label: "Leads",
      data: [50, 50], // Adjust the percentage as needed
      backgroundColor: ["#ffa62f", "#e5e5e5"], // Color for buy
      hoverOffset: 4,
    },
  ],
};

function LeadStatus() {
  return (
    <>
      <h1
        style={{
          fontSize: "23px",
          fontWeight: "700",
          paddingBottom: "15px",
          marginLeft: "20px",
        }}
      >
        Leads status
      </h1>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px",
        }}
      >
        <DoughnutChart data={rentalData} title="Rental Leads" />
        <DoughnutChart data={buyData} title="Buy Leads" />
      </div>
    </>
  );
}

export default LeadStatus;
