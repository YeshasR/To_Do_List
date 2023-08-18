const mysql = require('mysql2');
const express = require('express');
const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasks',
});

// Middleware to parse request bodies as JSON
app.use(express.json());

// Check if the MySQL connection is successful
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to MySQL database!');
    // Release the connection to the pool
    connection.release();
  }
});

module.exports = pool;
