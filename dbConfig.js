// Step 1: Import the pg library
const { Pool } = require('pg');
require('dotenv').config();

// Step 2: Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST,       // e.g. 'localhost'
  user: process.env.DB_USER,       // e.g. 'postgres'
  password: process.env.DB_PASSWORD, // your postgres password
  database: process.env.DB_NAME,   // e.g. 'group09db'
  port: process.env.DB_PORT || 5432, // default PostgreSQL port
});

// Step 3: Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Database connection failed:', err.stack);
  }
  console.log('Connected to the PostgreSQL database.');
  release(); // release the client back to the pool
});

// Step 4: Export the pool
module.exports = pool;