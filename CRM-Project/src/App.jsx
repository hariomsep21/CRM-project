import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyInventory from "./components/MyInventory_Comp/MyInventory_Home";
import MyProfile from "./components/MyProfile_Comp copy/MyProfile";
import Dashboard from "./components/Dashboard_comp/Dashboard";
import Navbar from "./components/Header_comp/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/Login_comp/LoginPage";

function App() {
  return (
    <>
      <LoginPage />

      <div className="main"></div>
    </>
  );
}

export default App;
