const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

const itemPerPage = 10;
/**
 * 지점에 맞는 상영관 목록을 가져온다.
 */
router.get("/list/:page", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT * FROM theater
  LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      theaterList: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

router.get("/list/id/:multiplexId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `SELECT * FROM theater
  WHERE multiplex_id=${req.params.multiplexId}`;
  // LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      theaterList: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

module.exports = router;
