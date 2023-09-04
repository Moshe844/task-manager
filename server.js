const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
  name: String,
  description: String,
  status: String,
  creator: String
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Create a new task
app.post('/tasks', async (req, res) => {
    const { name, description, status, creator } = req.body;
    try {
      const task = new Task({ name, description, status, creator });
      await task.save();
      res.status(201).json({ task }); // Include taskId in the response
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/tasks/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const deletedTask = await Task.findOneAndDelete({ name });
        if (deletedTask) {
            res.status(204).send(); // No content (successful deletion)
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/tasks/:name', async (req, res) => {
    const taskName = req.params.name;
    const { status, description } = req.body;
  
    try {
      // Find the task by name and update its status and description
      const updatedTask = await Task.findOneAndUpdate(
        { name: taskName },
        { status, description },
        { new: true } // Return the updated task
      );
  
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

    
// Serve the index.html file
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(indexPath, 'utf8', (err, htmlContent) => {
    if (err) {
      res.status(500).send('Error reading index.html');
    } else {
      res.send(htmlContent);
    }
  });
});

// Serve the task.html file
app.get('/task', async (req, res) => {
    // Serve the task.html file
    const taskPath = path.join(__dirname, 'public', 'task.html');
    fs.readFile(taskPath, 'utf8', (err, htmlContent) => {
      if (err) {
        res.status(500).send('Error reading task.html');
      } else {
        res.send(htmlContent);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});