// backend/routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  allCustomers,
  getAddresses,
  addAddress,
  updateAddress,
  removeAddress,
} = require("../models/customerModel");

// Get all customers with pagination
router.get("/api/customers", getCustomers);

// Get a specific customer by ID
router.get("/api/customers/:id", getCustomerById);

// Create a new customer
router.post("/api/customers", createCustomer);

// Update an existing customer
router.put("/api/customers/:id", updateCustomer);

// Delete a customer by ID
router.delete("/api/customers/:id", deleteCustomer);

// Search customers
router.get("/api/customers/find/search", allCustomers);

//get addresses
router.get("/api/customers/:id/addresses", getAddresses);

// Add a new address
router.post("/api/customers/:id/addresses", addAddress);

// Update an address
router.put("/api/customers/addresses/:id", updateAddress);

// Remove an address
router.delete("/api/customers/addresses/:id", removeAddress);

module.exports = router;
