const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConfig = require('./dbconfig.js');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Baseline server working");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_11' });

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    // Create a table
    // await connection.execute(`begin
    //                             execute immediate 'drop table nodetab';
    //                             exception when others then if sqlcode <> -942 then raise; end if;
    //                           end;`);
    let exists = connection.tableExists('nodetab');

    if (exists) {
      console.log('Table exists');
    } else {
      await connection.execute(`create table nodetab (firstName varchar(20), lastName varchar2(20), school varchar2(20), major varchar(20))`);

      // Insert some rows
  
      const sql = `INSERT INTO nodetab VALUES (:1, :2, :3, :4)`;
  
      const binds =
        [ ["Ryan", "Grayson", "UVA", "Computer Science"],
          ["Anubhav", "Acharya", "UVA", "Computer Engineering"],
          ["Jhon", "Doe", "VT", "Electrical Engineering"],
          ["Jane", "Doe", "VT", "Data Science"] ];
  
      await connection.executeMany(sql, binds);
  
      // connection.commit();     // uncomment to make data persistent
    }

    // Now query the rows back

    const result = await connection.execute(`SELECT * FROM nodetab`);

    console.dir(result.rows, { depth: null });

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

app.get("/api", (req, res) => {
  res.json({ message: "*example JSON data from the backend*", name: "ryan", school: "UVA", major: "CS" });
});