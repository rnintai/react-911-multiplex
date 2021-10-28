require("dotenv").config();

const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "multiplex",
});

const promiseConn = conn.promise();

module.exports = promiseConn;
