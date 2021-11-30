const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

router.get("/", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const multiplex = req.query.multiplex;
  const movie = req.query.movie;
  try {
    let sql = ``;

    if (multiplex === undefined && movie !== undefined) {
      sql = `SELECT * FROM movie_schedule WHERE movie_id = ${movie}`;
    } else if (multiplex !== undefined && movie === undefined) {
      sql = `SELECT * FROM movie_schedule WHERE multiplex_id = ${multiplex}`;
    } else if (multiplex !== undefined && movie !== undefined) {
      sql = `SELECT * FROM movie_schedule 
      WHERE movie_id = ${movie} AND multiplex_id = ${multiplex}`;
    }

    const result = await connection.query(sql);

    connection.release();

    res.status(200).send(result[0]);
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
