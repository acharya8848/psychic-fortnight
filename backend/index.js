const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./frontend/build'));

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "*example JSON data from the backend*", name: "ryan", school: "UVA", major: "CS" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve('./frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
