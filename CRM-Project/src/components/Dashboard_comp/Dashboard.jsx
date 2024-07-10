import style from "./Dashboard.module.css";
import MyTask from "./MyTask";
import Footer from "./Footer";
import LeadStatus from "./LeadStatus";

const Dashboard = () => {
  return (
    <>
      <div className={`${style.dashboard}`}>
        <h1 className={`${style.dashboardHeading}`}>Dashboard</h1>
        <LeadStatus></LeadStatus>
        <MyTask></MyTask>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Dashboard;
