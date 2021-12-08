const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

const itemPerPage = 10;

/**
 * 지점 목록을 가져온다.
 */
router.get("/list/:page", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT * FROM multiplex
    LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  try {
    const result = await connection.query(sql);
    connection.release();
    res.json({
      success: true,
      multiplexList: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

// 지점 id로 상세정보 조회
// /admin/multiplex/detail/:multiplexId

router.get("/detail/:multiplexId", async function (req, res) {
  let connection = await pool.getConnection();
  let fromDate = req.query.from;
  let toDate = req.query.to;

  const sql = `SELECT *,
  (SELECT multiplex_name FROM multiplex AS MUL
    WHERE MUL.multiplex_id=TH.multiplex_id) as multiplex_name,
  (SELECT SUM(total_price) FROM movie_reservation as MR
  WHERE DATE(MR.movie_reservation_date) BETWEEN
  "${fromDate}" AND "${toDate}" AND
  MR.theater_id=TH.theater_id) as total_price
  FROM theater as TH
  WHERE multiplex_id='${req.params.multiplexId}'`;

  try {
    const result = await connection.query(sql);
    connection.release();
    res.json({
      success: true,
      multiplexDetail: result[0],
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
