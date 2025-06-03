// Step 1: Import the database configuration
const db = require('../dbConfig');

//Query 6 - Your own non-trivial queries using at least two tables.
//Purpose: shows how many unique vehicles each mechanic has serviced.
const getMechanicWorkload = (req, res) => {
    const sql = `
    SELECT m.Mname AS mechanic_name,
           COUNT(DISTINCT mr.Veh_id) AS vehicles_serviced
    FROM   MECHANIC m
    JOIN   MAINTENANCE_RECORD mr ON m.Mechanic_id = mr.Mech_id
    GROUP  BY m.Mname
    ORDER  BY vehicles_serviced DESC;
  `;

    // Step 3: Execute the query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Query 6 error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results.rows);
    });
};
// Step 4: Export the controller
module.exports = {
    getMechanicWorkload
};
