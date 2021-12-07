// /admin/theater

const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

const itemPerPage = 10;
/**
 * 지점에 맞는 상영관 목록을 가져온다.
 * /admin/theater/list/:page
 */
router.get("/list/:page", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT *,
  (SELECT count(seat_col) FROM seat as S 
  WHERE S.theater_id=T.theater_id) as total_seat
  FROM theater T
  LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  try {
    const result = await connection.query(sql);
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

/**
 * 지점의 상영관 목록 반환
 * /admin/theater/list/id/:multiplexId
 */
router.get("/list/id/:multiplexId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `SELECT * FROM theater
  WHERE multiplex_id=${req.params.multiplexId}`;
  // LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  try {
    const result = await connection.query(sql);
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
