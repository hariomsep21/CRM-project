import "./App.css";
import LoginPage from "./components/Login_comp/LoginPage";
import Navbar from "./components/Header_comp/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <LoginPage />
      </div>
    </>
  );
}

export default App;
