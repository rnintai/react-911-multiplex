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
    (SELECT theater_type FROM theater as T
    WHERE T.theater_id=S.theater_id) as theater_name, 
    movie_schedule_start, movie_schedule_end,
    (SELECT age_limit FROM movie
    WHERE movie.movie_id=S.movie_id) as age_limit
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

// id로 스케줄 조회
router.get("/id/:scheduleId", async function (req, res) {
  let connection = await pool.getConnection();

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
    (SELECT theater_type FROM theater as T
    WHERE T.theater_id=S.theater_id) as theater_name, 
    movie_schedule_start, movie_schedule_end 
    FROM movie_schedule as S
    WHERE movie_schedule_id=${req.params.scheduleId}
    `;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      scheduleInfo: result[0][0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

// 스케줄 생성
router.post("/", async function (req, res) {
  let connection = await pool.getConnection();

  let scheduleId = req.body.scheduleId;
  let multiplex = req.body.multiplex;
  let theater = req.body.theater;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let movieCd = req.body.movieCd;

  const sql =
    "INSERT INTO movie_schedule (movie_schedule_id, multiplex_id, theater_id, movie_schedule_start, movie_schedule_end, movie_id) " +
    "VALUES (?,?,?,?,?,?) " +
    "ON DUPLICATE KEY UPDATE " +
    "movie_schedule_id=VALUES(movie_schedule_id), " +
    "multiplex_id=VALUES(multiplex_id), " +
    "theater_id=VALUES(theater_id), " +
    "movie_schedule_start=VALUES(movie_schedule_start), " +
    "movie_schedule_end=VALUES(movie_schedule_end), " +
    "movie_id=VALUES(movie_id)";

  await connection.beginTransaction();

  try {
    let result = await connection.execute(sql, [
      scheduleId,
      multiplex,
      theater,
      startTime,
      endTime,
      movieCd,
    ]);

    await connection.commit();
    console.log(result);
    res.status(200).json({
      success: true,
      result: result[0],
    });
    connection.release();
  } catch (err) {
    await connection.rollback();
    res.status(400).json({
      success: false,
      err,
    });
    connection.release();
  }
});

// 스케줄 삭제
router.post("/delete/:scheduleId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `
    DELETE FROM movie_schedule
    WHERE movie_schedule_id=${req.params.scheduleId}`;

  await connection.beginTransaction();

  try {
    let result = await connection.execute(sql);
    await connection.commit();
    console.log(result);
    res.status(200).json({
      success: true,
      result: result[0],
    });
    connection.release();
  } catch (err) {
    await connection.rollback();
    res.status(400).json({
      success: false,
      err,
    });
    connection.release();
  }
});

module.exports = router;
