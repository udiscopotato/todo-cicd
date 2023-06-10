const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const taskIndex = req.body.taskIndex;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  res.render('edit', { taskId: taskId, task: tasks[taskId] });
});

app.post('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body.task;
  tasks[taskId] = updatedTask;
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
