import "./App.css";

import Customer from "./components/Customers_Comp/Customer";

import Navbar from "./components/Header_comp/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Customer />
      </div>
    </>
  );
}

export default App;
