import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./PropertyCustomer.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSave } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

const PropertyCustomer = ({ id }) => {
  const [show, setShow] = useState(false);
  const [newReference, setNewReference] = useState("");
  const [customers, setCustomers] = useState([]); // Customers connected to this inventory
  const [allCustomers, setAllCustomers] = useState([]); // List of all customers (to filter active ones)
  const token = sessionStorage.getItem("token");
  const API_URL = "https://localhost:7062/";

  // Fetch customers connected to this inventory
  useEffect(() => {
    axios
      .get(
        `https://localhost:7062/api/CRMCustomerInventory/GetInventoryList/${id}`
      )
      .then((response) => {
        setCustomers(response.data); // Directly set inventory customers
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Fetch all customers (to select active ones when adding)
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMCustomer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllCustomers(response.data); // Store all customers
    } catch (error) {
      console.error(error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Handle saving new customer reference
  const handleSave = () => {
    if (newReference.trim() && allCustomers.length > 0) {
      const customerId = newReference;
      const customer = allCustomers.find(
        (customer) => customer.id === parseInt(customerId)
      );

      if (customer) {
        axios
          .post(
            `https://localhost:7062/api/CRMCustomerInventory/AddInventory/${id}`,
            [customerId]
          )
          .then((response) => {
            if (response.data && response.data.addedCustomers) {
              const newCustomer = response.data.addedCustomers[0];
              setCustomers((prevCustomers) => [
                ...prevCustomers,
                {
                  customerId: customer.id,
                  customerName: customer.name,
                },
              ]);
              refreshData();
              setNewReference(""); // Clear input after saving
            } else {
              console.error("Invalid response data");
            }
          })
          .catch((error) => {
            console.error(error.response?.data || error.message || error);
          });
      }
    }
  };

  // Handle deleting customer from inventory
  const handleDelete = (customerId) => {
    axios
      .delete(
        `https://localhost:7062/api/CRMCustomerInventory/DeleteCustomer/${id}/${customerId}`
      )
      .then((response) => {
        setCustomers(
          customers.filter((customer) => customer.customerId !== customerId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <FaRegUser onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        className={`custom-modal modal-dialog-centered ${style.modal}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>Customers</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`container ${style.modalBody}`}>
          <div className="row p-0 ps-4">
            <div className={`col pt-2 ${style.Add_Reference}`}>
              <select
                value={newReference}
                onChange={(e) => setNewReference(e.target.value)}
                className={`form-control ${style.Input}`}
              >
                <option value="">Select a customer</option>
                {allCustomers
                  .filter(
                    (customer) =>
                      customer.inventoryStatus === true && // Only active customers
                      !customers.find((c) => c.customerId === customer.id) // Exclude already added customers
                  )
                  .map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={`col-2 pt-2 ${style.addCustomerIcon}`}>
              <MdOutlineSave onClick={handleSave} />
            </div>
          </div>

          <section className={style.section1_Body}>
            {customers.map((customer) => (
              <div key={customer.customerId} className="row">
                <div className={`col ${style.Referenece_Name}`}>
                  <p>{customer.customerName}</p>
                </div>
                <div className={`col ${style.Referenece_Icon}`}>
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(customer.customerId)}
                  />
                </div>
              </div>
            ))}
          </section>
        </Modal.Body>
        <Modal.Footer className={style.modal_footer}>
          <Button
            variant="secondary"
            className={style.close_btn}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyCustomer;
