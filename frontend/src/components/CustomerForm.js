import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerForm.css";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("/api/customers/", formData);
      const customerId = response.data.id;
      alert("Customer created successfully");
      navigate(`/customer/${customerId}`);
    } catch (error) {
      console.error("Error creating customer", error);
    }
  };

  return (
    <div className="customer-form-container">
      <h1>Create Customer</h1>
      <form onSubmit={onSubmit} className="customer-form">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerForm;
