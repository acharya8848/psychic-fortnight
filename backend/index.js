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

async function createTable(connection, table){
  await connection.execute(`create table `+table);
}

async function addColumn(connection, table, columns){
  await connection.execute(`INSERT INTO `+table+` ( `+columns+` );`);
}

// These functions are unncessary, only for SQL reference
async function addRowsSingleColumn(connection, table, column, rows){
  await connection.execute(`INSERT INTO `+table+` ( `+column+` ) VALUES ( `+rows+` );`);
}

async function addRowsEntireTable(connection, table, rows){
  await connection.execute(`INSERT INTO `+table+` VALUES ( `+rows+` );`);
}

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    // Create a table
    // await connection.execute(`begin
    //                             execute immediate 'drop table nodetab';
    //                             exception when others then if sqlcode <> -942 then raise; end if;
    //                           end;`);

    // Check if the table exists
    let exists = await connection.tableExists('nodetab');

    if (exists) {// If the table exists, print a line on the console and then move on to query data from the table
      console.log('Table exists');
    } else {// If not, then create a table and put some data in it and then move on to query data from the table
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