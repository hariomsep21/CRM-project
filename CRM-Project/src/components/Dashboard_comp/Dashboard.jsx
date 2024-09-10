import style from "./Dashboard.module.css";
import Table from "./Table";

import LeadStatus from "./LeadStatus";

const Dashboard = () => {
  return (
    <>
      <div className={`${style.dashboard} container mt-4`}>
        <h3 className={`${style.dashboardHeading}`}>Dashboard</h3>
        {/* <LeadStatus></LeadStatus> */}
        <Table></Table>
      </div>
    </>
  );
};

export default Dashboard;
