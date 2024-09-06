// src/components/CustomerUpdate.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CustomerUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${id}`).then((res) => {
      setFormData(res.data);
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
    if (!formData.address) {
      errors.address = "Address is required";
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
      await axios.put(`/api/${id}`, formData);
      alert("Customer updated successfully");
      navigate(`/customer/${id}`);
    } catch (error) {
      console.error("Error updating customer", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p>{errors.address}</p>}
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default CustomerUpdate;
