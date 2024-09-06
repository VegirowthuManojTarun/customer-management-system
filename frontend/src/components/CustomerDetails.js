import React, { useState, useEffect } from "react";
import AddressManagement from "./AddressMangement";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CustomerDetails.css";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`/api/customers/${id}`).then((res) => {
      setCustomer(res.data);
      setFormData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phone: res.data.phone,
        email: res.data.email,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.firstName.match(/^[A-Za-z\s]+$/)) {
      errors.firstName = "First Name should contain only letters";
    }
    if (!formData.lastName.match(/^[A-Za-z\s]+$/)) {
      errors.lastName = "Last Name should contain only letters";
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`/api/customers/${id}`, formData);
      alert("Customer updated successfully");
      setCustomer(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating customer", error);
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="customer-details-container">
      <h1>Customer Section</h1>
      <h4>{editMode ? "Edit Customer" : "Customer Details"}</h4>
      {editMode ? (
        <form onSubmit={handleUpdate} className="customer-details-form">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="customer-details-info">
          <p>First Name: {customer.firstName}</p>
          <p>Last Name: {customer.lastName}</p>
          <p>Phone: {customer.phone}</p>
          <p>Email: {customer.email}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      <div className="address-management-section">
        <h1>Address Section</h1>
        <AddressManagement />
      </div>
    </div>
  );
};

export default CustomerDetails;
