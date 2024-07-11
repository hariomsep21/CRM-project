import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import Customer from "./components/Customers_Comp/Customer";
import PastDetails from "./components/Customers_Comp/PastDetails";

import Navbar from "./components/Header_comp/Navbar";

import Dashboard from "./components/Dashboard_comp/Dashboard";



function App() {
  return (
    <>
      <div className="main">

        <Dashboard />

        {/* <Customer /> */}
        {/* <PastDetails /> */}

      </div>
    </>
  );
}

export default App;
