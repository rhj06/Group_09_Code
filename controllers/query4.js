// Step 1: Import the database configuration
const db = require('../dbConfig');

// Step 2: Define controller for Query 4 (Set Operation - UNION)
// This function retrieves names and phone numbers from both customers and mechanics with IDs 1 through 5
const getNamesAndPhones = (req, res) => {
    const query = `
    SELECT Customer_name AS name, Phone
    FROM CUSTOMER
    WHERE Customer_id <= 5
    UNION
    SELECT Mname AS name, Mphone AS phone
    FROM MECHANIC
    WHERE Mechanic_id <= 5;
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

// Step 4: Export the controller
module.exports = {
    getNamesAndPhones,
};