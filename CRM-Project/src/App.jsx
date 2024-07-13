import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import Customer from "./components/Customers_Comp/Customer";
import PastDetails from "./components/Customers_Comp/PastDetails";

import Navbar from "./components/Header_comp/Navbar";
import MyInventory_Home from "./components/MyInventory_Comp/MyInventory_Home";
import MyLead_Home from "./components/Leads_Comp/MyInventory_Home";

function App() {
  return (
    <>
      <div className="main">
        {/* <MyInventory_Home />
        <MyLead_Home /> */}
        {/* <Customer /> */}
        {/* <PastDetails /> */}
        <Customer />
      </div>
    </>
  );
}

export default App;
