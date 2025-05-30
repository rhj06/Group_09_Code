// Step 1: Import required libraries
// Import the database configurations to interact with the PostgreSQL databse.
const db = require('../dbConfig');

// Step 2: Construct SQL Query (Query 1 in SQL doc)
// This controller retrieves a history of maintenance services showing:
// - Customer name
// - Vehicle make
// - Maintenance type
// - Date of service (most recent first)
const getMaintenanceHistory = (req, res) => {
  const query = `
    SELECT c.Customer_name AS customer_name, 
           v.Make AS vehicle_make, 
           mr.Maintenance_type, 
           mr.Date
    FROM MAINTENANCE_RECORD mr
    JOIN VEHICLE v ON mr.Veh_id = v.Vehicle_id
    JOIN CUSTOMER c ON v.Cust_id = c.Customer_id
    ORDER BY mr.Date DESC
  `;

  // Step 3: Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving maintenance records:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results.rows);
  });
};

// Step 4: Export controller method
module.exports = {
  getMaintenanceHistory,
};