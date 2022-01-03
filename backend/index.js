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

    connection = await oracledb.getConnection(dbConfig);;

    // Create a table
    await connection.execute(`begin
                                execute immediate 'drop table nodetab';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);
    await connection.execute("IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'TheSchema' AND  TABLE_NAME = 'TheTable'))");

    await connection.execute(`create table nodetab (id number, data varchar2(20))`);

    // Insert some rows

    const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

    const binds =
      [ [1, "First" ],
        [2, "Second" ],
        [3, "Third" ],
        [4, "Fourth" ],
        [5, "Fifth" ],
        [6, "Sixth" ],
        [7, "Seventh" ] ];

    await connection.executeMany(sql, binds);

    // connection.commit();     // uncomment to make data persistent

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