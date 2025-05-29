// Step 1: Import Required Libraries
const express = require('express');
const app = express();

// Step 2: Import Query Controllers
const query1Controller = require('./controllers/query1');
const query2Controller = require('./controllers/query2');
// Add more controllers as needed...

// Step 3: Middleware Setup
app.use(express.json()); // Parse JSON requests
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Step 4: Define Routes
// Adjust based on your actual controller methods
app.get('/query1', query1Controller.getQuery1Results);
app.get('/query2', query2Controller.getQuery2Results);
// Add more routes as needed...

// Step 5: Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});