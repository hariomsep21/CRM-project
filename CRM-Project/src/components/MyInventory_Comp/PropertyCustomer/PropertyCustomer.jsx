import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./PropertyCustomer.module.css";
import { TfiPencil } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineSave } from "react-icons/md";
import { FaRegUser, FaSearch } from "react-icons/fa";
import axios from "axios";

const PropertyCustomer = ({ id }) => {
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [newReference, setNewReference] = useState("");
  const [refData, setRefData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [saveTrigger, setSaveTrigger] = useState(false);
  useEffect(() => {
    // make the API call when the component mounts
    axios
      .get(
        `https://localhost:7062/api/CRMCustomerInventory/GetInventoryList/${id}`
      )
      .then((response) => {
        setCustomers(response.data);
        console.log("total list" + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (customers.length > 0) {
      // check if customers array is not empty
      console.log(customers); // log the updated customers state
    }
  }, [customers]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  const API_URL = "https://localhost:7062/";

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMCustomer");
      setAllCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = () => {
    if (newReference.trim() && allCustomers.length > 0) {
      const customerId = newReference;
      const customer = allCustomers.find(
        (customer) => customer.id === parseInt(customerId)
      );
      console.log("id:", customer);
      if (customer) {
        console.log("id:", customer.id);
      } else {
        console.log("Customer not found");
      }

      axios
        .post(
          `https://localhost:7062/api/CRMCustomerInventory/AddInventory/${id}`,
          [customerId]
        )
        .then((response) => {
          if (response.data && response.data.addedCustomers) {
            const newCustomer = response.data.addedCustomers[0];
            // Update customers state
            setCustomers((prevCustomers) => [
              ...prevCustomers,
              {
                customerId: customer.id,
                customerName: customer.name,
              },
            ]);
            // Fetch the updated list of all customers
            refreshData();
            setNewReference("");
          } else {
            console.error("Invalid response data");
          }
        })
        .catch((error) => {
          console.error(error.response?.data || error.message || error);
        });
    }
  };

  useEffect(() => {
    if (saveTrigger) {
      console.log("Saving customer...");
    }
  }, [saveTrigger]);

  useEffect(() => {
    console.log("Updated customers:", customers);
  }, [customers]);

  useEffect(() => {
    console.log("Updated allCustomers:", allCustomers);
  }, [allCustomers]);

  const handleDelete = (customerId) => {
    axios
      .delete(
        `https://localhost:7062/api/CRMCustomerInventory/DeleteCustomer/${id}/${customerId}`
      )
      .then((response) => {
        console.log(response);
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
      {/* <div variant="primary" onClick={handleShow}>
        <button className={`btn ${style.editBtn}`}>References</button>
      </div> */}
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
                      !customers.find((c) => c.customerId === customer.id)
                  )
                  .map((customer) => (
                    <option key={customer.customerId} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={`col-2 pt-2 ${style.addCustomerIcon} `}>
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
