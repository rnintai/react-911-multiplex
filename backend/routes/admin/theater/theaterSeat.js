// /theater/seat/:theaterId
const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

// const itemPerPage = 10;

/**
 * 해당 스케줄의 예약된 좌석 목록을 가져온다.
 */
router.get("/:theaterId", async function (req, res) {
  let connection = await pool.getConnection();

  // let curPage = req.params.page - 1;

  const sql = `SELECT concat(seat_row, seat_col) as seat_name
  FROM seat
  WHERE theater_id="${req.params.theaterId}"
  ORDER BY seat_row ASC, seat_col ASC`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      theaterSeatList: result[0],
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
