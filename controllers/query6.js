// Step 1: Import the database configuration
const db = require('../dbConfig');

// Query 6 - Transaction Processing
// Purpose: Add a part to a maintenance record and update part and total cost.
// Demonstrates a successful transaction and handles failure with rollback.

const addPartToMaintenanceRecord = async (req, res) => {
    const { rec_id, part_id, quantity } = req.body;

    const client = await db.connect();

    try {
        // Step 2: Begin transaction
        await client.query('BEGIN');

        // Step 3: Insert the part into PART_USED
        await client.query(
            `INSERT INTO PART_USED (rec_id, part_id, quantity)
             VALUES ($1, $2, $3)`,
            [rec_id, part_id, quantity]
        );

        // Step 4: Retrieve the unit cost from PART
        const result = await client.query(
            `SELECT unit_cost FROM PART WHERE part_id = $1`,
            [part_id]
        );

        if (result.rowCount === 0) {
            throw new Error('Part not found: invalid part_id');
        }

        const addedCost = result.rows[0].unit_cost * quantity;

        // Step 5: Update MAINTENANCE_RECORD with new costs
        await client.query(
            `UPDATE MAINTENANCE_RECORD
             SET part_cost = part_cost + $1,
                 total_cost = labor_cost + part_cost + $1
             WHERE record_id = $2`,
            [addedCost, rec_id]
        );

        // Step 6: Commit transaction
        await client.query('COMMIT');
        res.status(200).json({
            message: `Part ${part_id} (x${quantity}) added to maintenance record ${rec_id}.`,
            status: 'success'
        });

    } catch (error) {
        // Step 7: Rollback if error occurs
        await client.query('ROLLBACK');
        console.error('Query 6 error (transaction failed):', error.message);
        res.status(500).json({ error: 'Transaction failed: ' + error.message });
    } finally {
        client.release();
    }
};

// Step 8: Export the controller
module.exports = {
    addPartToMaintenanceRecord
};
