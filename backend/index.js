'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
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
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get("/api", (req, res) => {
  res.json({"firstname": "ryan", "lastname": "grayson", "email": "ryangrayson20@gmail.com"});
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
