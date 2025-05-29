// Step 1: Import the PostgreSQL Library
const { Client } = require('pg');
require('dotenv').config();

// Step 2: Create a Database Client
// A single client connection is created using the Client method.
const client = new Client({
  host: process.env.DB_HOST,              // localhost
  user: process.env.DB_USER,              // Database username
  password: process.env.DB_PASSWORD,      // Database password
  database: process.env.DB_NAME,          // Name of the database to connect to
  port: process.env.DB_PORT,              // Port number: 5432
});

// Step 3: Connect to the Database
// Attempt to establish the connection to the PostgreSQL database
client.connect(err => {
  if (err) {
    // If there is an error, log it and stop further attempts
    console.error('Database connection failed:', err.stack);
  } else {
    // If the connection is successful, confirm in the console
    console.log('Connected to the PostgreSQL database.');
  }
});

// Step 4: Export the Connection
// Export the client object so it can be used in other parts of the application
module.exports = client;