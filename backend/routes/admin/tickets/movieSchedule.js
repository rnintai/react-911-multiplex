const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

const itemPerPage = 10;

/**
 * 스케줄 목록을 가져온다.
 */
router.get("/:page", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT movie_schedule_id, 
  multiplex_id, 
  (SELECT multiplex_name FROM multiplex as M 
  WHERE M.multiplex_id=S.multiplex_id) as multiplex_name,
  movie_id, 
  (SELECT movie_name FROM movie
  WHERE movie.movie_id=S.movie_id) as movie_name, 
  theater_id,
  (SELECT theater_name FROM theater as T
  WHERE T.theater_id=S.theater_id) as theater_name, 
  movie_schedule_date, movie_schedule_start, movie_schedule_end 
  FROM movie_schedule as S 
  LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      scheduleList: result[0],
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
