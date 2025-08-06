const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Employee = require('./models/Employee');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/employeesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('index', { employees });
});

app.get('/new', (req, res) => {
  res.render('new-employee');
});

app.post('/create', async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('edit-emplo', { employee });
});

app.post('/update/:id', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
