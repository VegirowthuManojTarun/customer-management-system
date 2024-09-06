// src/components/AddressForm.js
import React from "react";
import "./AddressForm.css";

const AddressForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  cancelEdit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-group">
        <label>Address Line</label>
        <input
          type="text"
          name="addressLine"
          value={formData.addressLine}
          onChange={handleChange}
          className={errors.addressLine ? "input-error" : ""}
        />
        {errors.addressLine && (
          <p className="error-text">{errors.addressLine}</p>
        )}
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? "input-error" : ""}
        />
        {errors.city && <p className="error-text">{errors.city}</p>}
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className={errors.postalCode ? "input-error" : ""}
        />
        {errors.postalCode && <p className="error-text">{errors.postalCode}</p>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          Save
        </button>
        {cancelEdit && (
          <button type="button" onClick={cancelEdit} className="cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
