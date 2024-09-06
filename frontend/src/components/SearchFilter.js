import React, { useState } from "react";
import axios from "axios";
import "./SearchFilter.css";

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    addressLine: "",
  });
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/customers/find/search", {
        params: searchParams,
      });
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
        setError(null); // Clear any previous errors
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers");
    }
  };

  return (
    <div className="search-filter">
      <h1>Search Customers</h1>
      <div className="form-group">
        <label>First Name</label>
        <input
          name="firstName"
          value={searchParams.firstName}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          name="lastName"
          value={searchParams.lastName}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          name="city"
          value={searchParams.city}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input
          name="postalCode"
          value={searchParams.postalCode}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Address Line</label> {/* New input field */}
        <input
          name="addressLine"
          value={searchParams.addressLine}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}

      <ul className="customer-list">
        {Array.isArray(customers) && customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName} - {customer.city}
            </li>
          ))
        ) : (
          <p>No customers found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
