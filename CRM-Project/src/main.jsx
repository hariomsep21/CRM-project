import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard_comp/Dashboard.jsx";
import MyInventory_Home from "./components/MyInventory_Comp/MyInventory_Home.jsx";
import MyLead_Home from "./components/Leads_Comp/MyInventory_Home.jsx";
import Customer from "./components/Customers_Comp/Customer.jsx";
import MyProfile from "./components/MyProfile_Comp copy/MyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <MyProfile /> },
      { path: "/customer", element: <Customer /> },
      { path: "/leads", element: <MyLead_Home /> },
      { path: "/myinventory", element: <MyInventory_Home /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
