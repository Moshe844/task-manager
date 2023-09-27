const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

const allowedUsers = [
    { username: "sfischer", fullName: "Solomon Fischer" },
    { username: "mgrunwald", fullName: "Moshe Grunwald" },
    { username: "mekstein", fullName: "Moshe Ekstein" }
  ];
// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
  name: String,
  description: String,
  status: String,
  username: String,
  fullName: String,
  editor: String,
  editedDate: String,
//   urls: [String]
  
});

const urlSchema = new mongoose.Schema({
    url: String,
});

// Create a model based on the schema
const Url = mongoose.model('Url', urlSchema);


// async function findTasks() {
//     try {
//       const tasks = await Task.find({ username: "sfischer" 
//     });
//       console.log(`Found ${tasks.length} tasks for sfischer`);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   findTasks();



app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Create a new task
app.post('/tasks', async (req, res) => {
    const { name, description, status, username, fullName } = req.body;
    try {
      const task = new Task({ name, description, status, username, fullName , editor:null});
      console.log(task);
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
    const { status, description, editor,editedDate } = req.body;
  
    try {
      // Find the task by name and update its status and description
      const updatedTask = await Task.findOneAndUpdate(
        { name: taskName },
        { status, description, editor, editedDate },
        
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

  app.post('/login', (req, res) => {
    const { username } = req.body;
  
    const matchedUser = allowedUsers.find(user => user.username === username);
  
    if (matchedUser) {
      // Return the username and full name if it's allowed
      res.status(200).json({ username: matchedUser.username, fullName: matchedUser.fullName });
    } else {
      res.status(401).json({ error: 'Invalid username' });
    }
  });

//   const dataFilePath = path.join(__dirname, 'data', 'urls.json');

// // Load existing data or create an empty array
// let urls = [];
// if (fs.existsSync(dataFilePath)) {
//   urls = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
// } else {
//   fs.writeFileSync(dataFilePath, JSON.stringify(urls));
// }

app.post("/urls", async (req, res) => {
  console.log("recieved URLs", req.body);
  const { url } = req.body;
  try {
    if (url && url.trim() !== "") {
      const newUrl = new Url({ url });
      await newUrl.save();
      res.status(201).json({ newUrl });
    }
  } catch (err) {
    res.status(400).send(`Failed saving urls. ${err}`);
  }
});

// Retrieve URLs from the database
app.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find();
    console.log("get", urls);
    res.json(urls.map((url) => url.url));
  } catch (err) {
    res.status(500).send("Error retrieving URLs from the database");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});