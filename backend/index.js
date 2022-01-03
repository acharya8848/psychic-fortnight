'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

let libPath;
if (process.platform === 'win32') {           // Windows
  libPath = 'C:\\oracle\\instantclient_21_3';
} else if (process.platform === 'darwin') {   // macOS
  libPath = process.env.HOME + '/Downloads/instantclient_19_8';
}
if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}

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
    let exists = await connection.execute(`select table_name from user_tables where table_name = 'nodetab'`);

    if (exists.rows.length != 0) {// If the table exists, print a line on the console and then move on to query data from the table
      console.log('Table exists');
    } else {// If not, then create a table and put some data in it and then move on to query data from the table
      await connection.execute(`create table nodetab (firstName varchar(20), lastName varchar2(20), school varchar2(20), major varchar(30))`);

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

    return result.rows;

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

let data = run();
/* This is what the string in 'data' will look like:
[
  [ 'Ryan', 'Grayson', 'UVA', 'Computer Science' ],
  [ 'Anubhav', 'Acharya', 'UVA', 'Computer Engineering' ],
  [ 'Jhon', 'Doe', 'VT', 'Electrical Engineering' ],
  [ 'Jane', 'Doe', 'VT', 'Data Science' ]
]
I don't know how to put this into the table in HTML, help!
*/
app.get("/api", (req, res) => {
  res.json({"table": data});
});