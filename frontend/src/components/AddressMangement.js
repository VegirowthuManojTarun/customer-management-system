import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddressForm from "./AddressForm";
import "./AddressManagement.css";

const AddressManagement = () => {
  const { id } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [addressMode, setAddressMode] = useState(false); // For adding new address
  const [formData, setFormData] = useState({
    addressLine: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [editingAddressId, setEditingAddressId] = useState(null); // Track the ID of the address being edited

  useEffect(() => {
    axios.get(`/api/customers/${id}/addresses`).then((res) => {
      const response = res.data.map((address) => ({
        ...address,
        editMode: false,
      }));
      setAddresses(response);
    });
  }, [id]);

  const validate = () => {
    const validationErrors = {};
    if (!formData.addressLine) {
      validationErrors.addressLine = "Address line should not be empty";
    }
    if (!formData.city) {
      validationErrors.city = "City should not be empty";
    }
    if (!formData.postalCode) {
      validationErrors.postalCode = "Postal code should not be empty";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingAddressId) {
      try {
        await axios.put(`/api/customers/addresses/${formData.id}`, formData);
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.id === formData.id
              ? { ...formData, editMode: false }
              : address
          )
        );
        setEditingAddressId(null);
      } catch (error) {
        console.error("Error updating address", error);
      }
    } else {
      try {
        const res = await axios.post(
          `/api/customers/${id}/addresses`,
          formData
        );
        setAddresses((prevAddresses) => [
          ...prevAddresses,
          { ...formData, id: res.data.id },
        ]);
        setAddressMode(false);
      } catch (error) {
        console.error("Error adding address", error);
      }
    }

    setFormData({
      addressLine: "",
      city: "",
      postalCode: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enableAddAddress = () => {
    setAddressMode(true);
    setEditingAddressId(null); // Clear the editing state
    setFormData({
      addressLine: "",
      city: "",
      postalCode: "",
    });
  };

  const setEditMode = (address) => {
    setFormData(address);
    setEditingAddressId(address.id); // Set the ID of the address being edited
  };

  const cancelEdit = () => {
    setEditingAddressId(null); // Reset editing state
    setFormData({
      addressLine: "",
      city: "",
      postalCode: "",
    });
  };

  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(`/api/customers/addresses/${addressId}`);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  if (!addresses) return <p>Loading...</p>;

  return (
    <div className="address-management-container">
      <h1>Manage Addresses</h1>
      <button onClick={enableAddAddress} className="add-address-button">
        Add Address
      </button>
      {addressMode && (
        <AddressForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelEdit={cancelEdit}
        />
      )}

      <ul className="address-list">
        {addresses.map((address) => (
          <li key={address.id} className="address-item">
            {editingAddressId === address.id ? (
              <AddressForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                cancelEdit={cancelEdit}
              />
            ) : (
              <div className="address-details">
                <p>Address Line: {address.addressLine}</p>
                <p>City: {address.city}</p>
                <p>Postal Code: {address.postalCode}</p>
                <button
                  onClick={() => setEditMode(address)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressManagement;
