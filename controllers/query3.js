// Step 1: Import required libraries
const db = require('../dbConfig');

/**
 * Controller: getCustomerVehicleData
 * -----------------------------------
 * Renders vehicle information for either:
 *   - All customers (including those without vehicles), or
 *   - A specific customer selected via dropdown (using query parameter `customerId`)
 * 
 * This uses a FULL OUTER JOIN to ensure all customers and vehicles are shown,
 * even if no corresponding record exists in one of the tables.
 * 
 * URL Parameters:
 *   - customerId (optional): if provided, filters the results to this customer only.
 * 
 * Response:
 *   - Sends a complete HTML page containing the result table.
 */
const getCustomerVehicleData = (req, res) => {
    const { customerId } = req.query;

    let query = `
      SELECT c.Customer_name AS customer_name,
             v.Make AS vehicle_make,
             v.Model AS vehicle_model
      FROM CUSTOMER c
      FULL OUTER JOIN VEHICLE v ON c.Customer_id = v.Cust_id
    `;

    const params = [];
    if (customerId) {
        query += ' WHERE c.Customer_id = $1';
        params.push(customerId);
    }

    query += ' ORDER BY customer_name';

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error executing query3:', err);
            return res.status(500).send('An error occurred while retrieving vehicle data.');
        }

        const rows = result.rows;

        // Build and return an HTML page
        let html = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/yeti/bootstrap.min.css">
        <div class="container mt-5">
          <h3>Customer Vehicle Information</h3>
        `;

        if (rows.length === 0) {
            html += `<p>No data found for this customer.</p>`;
        } else {
            html += `
            <table class="table table-bordered mt-4">
              <thead class="table-dark">
                <tr>
                  <th>Customer Name</th>
                  <th>Vehicle Make</th>
                  <th>Vehicle Model</th>
                </tr>
              </thead>
              <tbody>
            `;

            rows.forEach(row => {
                html += `
                <tr>
                  <td>${row.customer_name || '—'}</td>
                  <td>${row.vehicle_make || '—'}</td>
                  <td>${row.vehicle_model || '—'}</td>
                </tr>
              `;
            });

            html += `
              </tbody>
            </table>
          `;
        }

        html += `<a href="/query3.html" class="btn btn-primary mt-3">Back</a></div>`;
        res.send(html);
    });
};

/**
 * Controller: getCustomerList
 * ----------------------------
 * Fetches all customer IDs and names to populate a dropdown on the frontend.
 * 
 * Response:
 *   - Returns a JSON array of objects with `customer_id` and `customer_name`
 */
const getCustomerList = (req, res) => {
    const query = `
      SELECT Customer_id AS customer_id, Customer_name AS customer_name
      FROM CUSTOMER
      ORDER BY Customer_name;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching customer list:', err);
            return res.status(500).json({ error: 'Failed to fetch customers' });
        }
        res.json(result.rows);
    });
};

// Export both controller functions
module.exports = {
    getCustomerVehicleData,
    getCustomerList,
};