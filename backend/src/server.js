require('dotenv').config();                 // 1. load .env into process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();                       // 2. create the app

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:4200' })); // 3. allow the frontend
app.use(express.json());                     // 4. parse JSON request bodies into req.body

app.use('/api/auth', require('./routes/auth.routes'));   // 5. mount auth routes at /auth/*
app.use('/api/users', require('./routes/task.routes'));  // 6. mount task routes at /tasks/*

// 7. central error handler: anything that calls next(err) ends up here
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// 8. connect to Mongo, THEN start listening
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 3000, () => console.log('Express API on 3000')))
  .catch((e) => { console.error('Mongo connect failed:', e.message); process.exit(1); });
