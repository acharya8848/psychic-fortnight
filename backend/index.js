const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//// Have Node serve the files for our built React app (for heroku deploy)
app.use(express.static(path.resolve('../frontend/build')));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Baseline server working");
});

app.get("/api", (req, res) => {
  res.json({ message: "*example JSON data from the backend*", name: "ryan", school: "UVA", major: "CS" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
