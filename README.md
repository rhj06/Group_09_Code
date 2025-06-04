FixFlow – Vehicle Maintenance Tracking System
=============================================

Project Overview:
-----------------
FixFlow is a full-stack web-based database application designed to manage and track vehicle maintenance history for an auto repair shop. 
The system supports complex SQL queries, a user-friendly interface, and robust transaction processing using PostgreSQL.

Developed as part of TCSS 445: Database Systems Design at the University of Washington Tacoma.

Team Members:
-------------
- Ryan Johnson
- Riley Mansfield
- Brandon Morgan
- Kevin Hoang

Development Environment:
------------------------
- Programming Language: JavaScript (Node.js)
- Backend Framework: Express.js
- Frontend: HTML, CSS, Bootstrap (Bootswatch - Yeti)
- Database System: PostgreSQL
- Development Tools: pgAdmin 4, VS Code, code-server, GitHub

Setup Instructions:
-------------------

1. Clone the Repository
2. Install Dependancies:
   - npm install
  
     This installs:
   - express – for handling server routing
   - pg – PostgreSQL client for Node.js
   - dotenv – for environment variable management
   - nodemon – (dev dependency) auto-restarts server during development
     
3. Database Setup:
- Open pgAdmin or use psql.
- Create a new PostgreSQL database named `group09db`.
- Run the provided SQL schema script to create tables and insert sample data.
- Confirm tables include: CUSTOMER, VEHICLE, MECHANIC, PART, MAINTENANCE_RECORD, PART_USED.

4. Configuration:
    Ensure dbConfig.js contains your PostgreSQL connection credentials:
   const { Pool } = require('pg');
   module.exports = new Pool({
     user: 'your_pg_user',
     host: 'localhost',
     database: 'fixflow',
     password: 'your_pg_password',
     port: 5432
   });
   
5. Run the Application
   For development (with auto-restart):
   npm run dev

   Or start manually:
   npm start

   Then, open your browser and navigate to:
   http://localhost:5000
