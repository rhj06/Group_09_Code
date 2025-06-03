
// Step 1: Import the database configuration
const db = require('../dbConfig');
//Query 4 - Use a FULL OUTER JOIN.
//Purpose: returns all customers and all vehicles, including customers without vehicles.
const getCustomerVehicleList = (req, res) => {
    const sql = `
    SELECT
      c.Customer_name AS customer_name,
      v.Make          AS vehicle_make,
      v.Model         AS vehicle_model
    FROM   CUSTOMER c
    FULL  OUTER JOIN VEHICLE v
           ON c.Customer_id = v.Cust_id
    ORDER  BY customer_name;
  `;

    // Step 3: Execute the query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error running Query 5:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results.rows);   // [{customer_name, vehicle_make, vehicle_model}, …]
    });
};
// Step 4: Export the controller
module.exports = { getCustomerVehicleList };
