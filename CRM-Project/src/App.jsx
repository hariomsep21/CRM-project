import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Header_comp/Navbar";
import Footer from "./components/Footer_Comp/Footer.jsx";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
