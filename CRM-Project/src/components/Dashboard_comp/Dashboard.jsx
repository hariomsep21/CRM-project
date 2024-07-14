import style from "./Dashboard.module.css";
import MyTask from "./MyTask";

import LeadStatus from "./LeadStatus";

const Dashboard = () => {
  return (
    <>
      <div className={`${style.dashboard} container mt-4`}>
        <h3 className={`${style.dashboardHeading}`}>Dashboard</h3>
        <LeadStatus></LeadStatus>
        <MyTask></MyTask>
      </div>
    </>
  );
};

export default Dashboard;
