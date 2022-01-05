'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const profileRouter = require('./controllers/profileController.js')
const app = express();

mongoose.connect(
  process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Error connecting to DB', err.message);
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './frontend/build')));
//app.use('/api', profileRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
