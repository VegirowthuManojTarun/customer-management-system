const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./db/customers.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create customers table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            phone TEXT,
            email TEXT
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER,
            addressLine TEXT,
            city TEXT,
            postalCode TEXT,
            FOREIGN KEY (customerId) REFERENCES customers(id)
        )
    `);
});

module.exports = db;
