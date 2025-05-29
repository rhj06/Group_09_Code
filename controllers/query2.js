// Step 1: Import database configuration
const db = require('../dbConfig');

// Step 2: Define controller for Query 2 (Query 2 in SQL doc)
// This function retrieves customers who own more than one distinct vehicle model
const getCustomersWithMultipleModels = (req, res) => {
  const query = `
    SELECT c.Customer_name, COUNT(DISTINCT v.Model) AS distinct_models
    FROM CUSTOMER c
    JOIN VEHICLE v ON c.Customer_id = v.Cust_id
    WHERE c.Customer_id IN (
      SELECT Cust_id
      FROM VEHICLE
      GROUP BY Cust_id
      HAVING COUNT(DISTINCT Model) > 1
    )
    GROUP BY c.Customer_name
  `;

  // Step 3: Execute the Query
  db.query(query, (err, results) => {
    if (err) {
      // Handle Errors
      console.error('Error executing Query 2:', err);
      res.status(500).send('Error retrieving data for Query 2');
    } else {
      res.json(results);
    }
  });
};

// Step 4: Export the controller
module.exports = {
  getCustomersWithMultipleModels,
};