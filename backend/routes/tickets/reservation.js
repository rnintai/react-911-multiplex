const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

// POST /tickets/reservation
// 예매 완료
router.post("/", async function (req, res) {
  let movieReservationId = req.body.movieReservationId;
  let memberId = req.body.memberId;
  let movieReservationDate = new Date();
  let movieScheduleStart = req.body.movieScheduleStart;
  let seatName = req.body.seatName;
  let multiplexId = req.body.multiplexId;
  let theaterId = req.body.theaterId;
  let movieId = req.body.movieId;
  let totalPrice = req.body.totalPrice;
  let movieScheduleId = req.body.movieScheduleId;

  // console.log(req.body);
  console.log(
    movieReservationId,
    memberId,
    movieReservationDate,
    movieScheduleStart,
    seatName,
    multiplexId,
    theaterId,
    movieId,
    totalPrice,
    movieScheduleId
  );
  let conn = await pool.getConnection();

  const reservation_sql =
    "INSERT INTO movie_reservation (movie_reservation_id, member_id, movie_reservation_date, movie_schedule_start, seat_name, multiplex_id, theater_id, movie_id, total_price, movie_schedule_id) VALUES (?,?,?,?,?,?,?,?,?,?)";

  const seat_sql =
    "INSERT INTO reserved_seat (movie_schedule_id, seat_row, seat_col) VALUES (?, ?, ?)";

  await conn.beginTransaction();

  var seatArray = seatName.split(",");
  console.log(seatArray);

  try {
    let response = await conn.query(reservation_sql, [
      movieReservationId,
      memberId,
      movieReservationDate,
      movieScheduleStart,
      seatName,
      multiplexId,
      theaterId,
      movieId,
      totalPrice,
      movieScheduleId,
    ]);

    for (let i = 0; i < seatArray.length; i++) {
      const seatRow = seatArray[i].slice(0, 1);
      const seatCol = seatArray[i].slice(1, 3);
      console.log(seatRow, seatCol);
      await conn.query(seat_sql, [movieScheduleId, seatRow, seatCol]);
    }

    await conn.commit();
    console.log(response[0]);
    conn.release();
    res.status(200).json({
      success: true,
      result: response[0],
    });
  } catch (err) {
    console.log(err);
    await conn.rollback();
    conn.release();
    res.status(400).json({
      success: false,
      err,
    });
  }
});

// GET /tickets/reservation/date/:date
// 해당 날짜의 예매수
router.get("/date/:date", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `
  SELECT count(movie_reservation_id) as reservation_count 
  FROM movie_reservation 
  WHERE movie_reservation_date LIKE "${req.params.date}%"`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      count: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

// GET /tickets/reservation/info/:reservationId
// 해당 id를 갖는 예매 조회
router.get("/info/:reservationId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `
  SELECT *
  FROM movie_reservation 
  WHERE movie_reservation_id="${req.params.reservationId}"`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      reservationInfo: result[0][0],
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
