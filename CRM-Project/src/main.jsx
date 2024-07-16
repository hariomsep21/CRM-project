import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard_comp/Dashboard.jsx";
import MyInventory_Home from "./components/MyInventory_Comp/MyInventory_Home.jsx";
import MyLead_Home from "./components/Leads_Comp/MyInventory_Home.jsx";
import Customer from "./components/Customers_Comp/CustomerHeader_Comp/Customer.jsx";
import MyProfile from "./components/MyProfile_Comp copy/MyProfile.jsx";
import Footer from "./components/Footer_Comp/Footer.jsx";
import LoginPage from "./components/Login_comp/LoginPage.jsx";
import PastDetails from "./components/Customers_Comp/PastDeals_Comp/PastDetails.jsx";
import Customer_Home from "./components/Customers_Comp/Customer_Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <MyProfile /> },
      { path: "/customer", element: <Customer_Home /> },
      { path: "/leads", element: <MyLead_Home /> },
      { path: "/myinventory", element: <MyInventory_Home /> },
      { path: "/pastdetails", element: <PastDetails /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
