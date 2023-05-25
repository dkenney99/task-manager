const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database for simplicity (replace with a database in production)
let tasks = [];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, deadline } = req.body;
  const newTask = {
    id: uuidv4(),
    title,
    description,
    deadline,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task by ID
app.delete('/api/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  tasks = tasks.filter((task) => task.id !== taskId);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
