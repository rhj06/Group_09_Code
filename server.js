// Step 1: Import Required Libraries
const express = require('express');
const app = express();

// Step 2: Import Query Controllers
const query1Controller = require('./controllers/query1');
const query2Controller = require('./controllers/query2');
const query3Controller = require('./controllers/query3');
const query4Controller = require('./controllers/query4');
const query5Controller = require('./controllers/query5');
const query6Controller = require('./controllers/query6');



// Step 3: Middleware Setup
// Use express.json() to parse incoming JSON requests.
// Use express.static() to serve static files from the 'public' directory.
app.use(express.json());
app.use(express.static('public'));

// Step 4: Define Routes
// Setup a GET route for '/query1' that invokes the getMaintenanceHistory method
// from the query1 controller.
app.get('/query1', query1Controller.getMaintenanceHistory);
// Setup a GET route for '/query2' that invokes the getCustomersWithMultipleModels method
// from the query2 controller.
app.get('/query2', query2Controller.getCustomersWithMultipleModels);
// Setup a GET route for '/query3' that invokes the getCustomerVehicleInfo method
// from the query3 controller.
app.get('/query3', query3Controller.getCustomerVehicleData);
app.get('/query3/customers', query3Controller.getCustomerList);
// Setup a GET route for '/query4' that invokes the namesAndPhones method
// from the query4 controller.
app.get('/query4', query4Controller.getNamesAndPhones);
// Setup a GET route for '/query5' that invokes the getMechanicWorkload method
app.get('/query5', query5Controller.getMechanicWorkload);
// Setup a POST route for '/query6'
app.post('/query6', query6Controller.addPartToMaintenanceRecord);

// Step 5: Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});