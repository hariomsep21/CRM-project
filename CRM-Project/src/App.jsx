import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInventory from "./components/MyInventory_Comp/MyInventory_Home";
import MyProfile from "./components/MyProfile_Comp copy/MyProfile";
import Dashboard from "./components/Dashboard_comp/Dashboard";
import Navbar from "./components/Header_comp/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
