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

// 지점 추가 및 편집
// POST /admin/theater
router.post("/", async function (req, res) {
  let conn = await pool.getConnection();

  let theaterId = req.body.theaterId;
  let multiplexId = req.body.multiplexId;
  let theaterName = req.body.theaterName;
  let theaterType = req.body.theaterType;
  let ticketPrice = req.body.ticketPrice * 1;

  const sql = `
  INSERT INTO theater 
  (theater_id, multiplex_id, theater_name, theater_type, theater_ticket_price)
  VALUES (?,?,?,?,?)
  ON DUPLICATE KEY UPDATE
  theater_name=VALUES(theater_name), 
  theater_type=VALUES(theater_type), 
  theater_ticket_price=VALUES(theater_ticket_price)`;

  await conn.beginTransaction();

  try {
    let result = await conn.query(sql, [
      theaterId,
      multiplexId,
      theaterName,
      theaterType,
      ticketPrice,
    ]);
    await conn.commit();
    conn.release();
    return res.status(200).json({
      success: true,
      result: result[0],
    });
  } catch (error) {
    await conn.rollback();
    conn.release();
    return res.status(400).json({
      success: false,
      error,
    });
  }
});

// 지점 삭제
router.delete("/:theaterId", async function (req, res) {
  const conn = await pool.getConnection();
  const theaterId = req.params.theaterId;

  try {
    const sql = `DELETE FROM theater
    WHERE theater_id=${theaterId}`;
    const result = await conn.query(sql);

    conn.release();
    return res.status(200).json({
      success: true,
      result: result[0],
    });
  } catch (error) {
    conn.release();
    return res.status(400).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
