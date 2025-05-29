require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
    return client.end();
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
  });
