// Step 1: Import the database configuration
const db = require('../dbConfig');

// Query 6 - Transaction Processing
// Purpose: Add a part to a maintenance record and update part and total cost.
// Demonstrates a successful transaction and handles failure with rollback.

const addPartToMaintenanceRecord = async (req, res) => {
    const { rec_id, part_id, quantity } = req.body;

    if (!rec_id || !part_id || !quantity) {
        return res.status(400).json({ error: 'Missing required input fields.' });
    }

    try {
        // Step 2: Begin transaction
        await db.query('BEGIN');

        // Step 3: Insert the part into part_used
        await db.query(
            `INSERT INTO part_used (record_id, part_id, quantity)
             VALUES ($1, $2, $3)`,
            [rec_id, part_id, quantity]
        );

        // Step 4: Get unit cost of the part
        const result = await db.query(
            `SELECT unit_cost, part_type FROM part WHERE part_id = $1`,
            [part_id]
        );

        if (result.rowCount === 0) {
            throw new Error('Part not found: invalid part_id');
        }

        const addedCost = parseFloat(result.rows[0].unit_cost) * quantity;
        const partType = result.rows[0].part_type;

        // Step 5: Get current labor and part cost
        const recordResult = await db.query(
            `SELECT labor_cost, part_cost FROM maintenance_record WHERE record_id = $1`,
            [rec_id]
        );

        if (recordResult.rowCount === 0) {
            throw new Error('Maintenance record not found: invalid rec_id');
        }

        const currentPartCost = parseFloat(recordResult.rows[0].part_cost);
        const newPartCost = currentPartCost + addedCost;


        // Step 6: Update maintenance_record with new costs
        await db.query(
            `UPDATE maintenance_record
             SET part_cost = $1
             WHERE record_id = $2`,
            [newPartCost, rec_id]
        );


        // Step 7: Commit transaction
        await db.query('COMMIT');
        res.status(200).json({
            message: `${partType} (x${quantity}) added to maintenance record ${rec_id}.`,
            status: 'success'
        });

    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Query 6 error (transaction failed):', error.message);
        res.status(500).json({ error: 'Transaction failed: ' + error.message });
    }
};

// Step 8: Export the function
module.exports = {
    addPartToMaintenanceRecord
};
