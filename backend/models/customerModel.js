// backend/models/customerModel.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/customers.db");

// Get all customers with pagination
const getCustomers = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  // Get the total number of customers
  db.get("SELECT COUNT(*) AS count FROM customers", (countErr, countRow) => {
    if (countErr) {
      res.status(500).json({ error: countErr.message });
      return;
    }

    const totalCount = countRow.count;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Get the customers for the current page
    db.all(
      "SELECT * FROM customers LIMIT ? OFFSET ?",
      [pageSize, offset],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          customers: rows,
          totalPages: totalPages,
        });
      }
    );
  });
};

// Get a specific customer by ID
const getCustomerById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM customers WHERE id = ? ", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};

// Create a new customer
const createCustomer = (req, res) => {
  const { firstName, lastName, phone, email } = req.body;
  db.run(
    "INSERT INTO customers (firstName, lastName, phone, email) VALUES (?, ?, ?, ?)",
    [firstName, lastName, phone, email],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Update an existing customer
const updateCustomer = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, email } = req.body;
  db.run(
    "UPDATE customers SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE id = ?",
    [firstName, lastName, phone, email, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updatedRows: this.changes });
    }
  );
};

// Delete a customer by ID
const deleteCustomer = (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.run("DELETE FROM customers WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedRows: this.changes });
  });
};

const allCustomers = (req, res) => {
  console.log(22);
  const { addressLine, city, postalCode } = req.query;

  let query = `
    SELECT customers.*, addresses.addressLine, addresses.city, addresses.postalCode
    FROM customers
    LEFT JOIN addresses ON customers.id = addresses.customerId
    WHERE 1=1
  `;

  const params = [];

  if (addressLine) {
    query += " AND addresses.addressLine LIKE ?";
    params.push(`%${addressLine}%`);
  }
  if (city) {
    query += " AND addresses.city LIKE ?";
    params.push(`%${city}%`);
  }
  if (postalCode) {
    query += " AND addresses.postalCode LIKE ?";
    params.push(`%${postalCode}%`);
  }

  console.log("Executing query:", query);
  console.log("With params:", params);

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

const getAddresses = (req, res) => {
  const customerId = req.params.id;
  db.all(
    "SELECT * FROM addresses WHERE customerId = ? ",
    [customerId],
    function (err, rows) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log(rows);
      res.json(rows);
    }
  );
};

// Add a new address
const addAddress = (req, res) => {
  const customerId = req.params.id;
  const { addressLine, city, postalCode } = req.body;
  db.run(
    "INSERT INTO addresses (customerId,addressLine, city,postalCode) VALUES (?,?, ?, ?)",
    [customerId, addressLine, city, postalCode],
    function (err, row) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Update an address
const updateAddress = (req, res) => {
  const id = req.params.id;
  const { addressLine, city, postalCode } = req.body;
  db.run(
    "UPDATE addresses SET addressLine = ?, city = ? , postalCode = ? WHERE id = ?",
    [addressLine, city, postalCode, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updatedRows: this.changes });
    }
  );
};

// Remove an address
const removeAddress = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM addresses WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedRows: this.changes });
  });
};

module.exports = {
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
};
