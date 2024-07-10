import "./App.css";
import LoginPage from "./components/Login_comp/LoginPage";
import Navbar from "./components/Header_comp/Navbar";
import Dashboard from "./components/Dashboard_comp/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
