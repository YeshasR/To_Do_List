const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./connection');

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint for adding a new task
app.post('/task', (req, res) => {
    const { newTask } = req.body;
    const sql = 'INSERT INTO tasks (description) VALUES (?)';
    pool.query(sql, [newTask], (err, result) => {
        if (err) {
            console.error('Error inserting task:', err.message);
            res.status(500).json({ error: 'Failed to add the task.' });
        } else {
            res.status(201).json({ message: 'Task added successfully!' });
        }
    });
});

// Endpoint for deleting a task
app.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    pool.query(sql, [taskId], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err.message);
            res.status(500).json({ error: 'Failed to delete the task.' });
        } else {
            res.status(200).json({ message: 'Task deleted successfully!' });
        }
    });
});

// Endpoint for retrieving all tasks
app.get('/task', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            res.status(500).json({ error: 'Failed to fetch tasks.' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
