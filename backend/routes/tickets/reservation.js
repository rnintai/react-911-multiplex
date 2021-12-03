const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

router.post("/", async function (req, res) {
  let movieReservationId = req.body.movieReservationId;
  let memberId = req.body.memberId;
  let movieReservationDate = req.body.movieReservationDate;
  let movieScheduleStart = req.body.movieScheduleStart;
  let seatName = req.body.seatName;
  let multiplexId = req.body.multiplexId;
  let theaterId = req.body.theaterId;
  let movieId = req.body.movieId;
  let totalPrice = req.body.totalPrice;
  let movieScheduleId = req.body.movieScheduleId;

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
    "INSERT INTO reserved_seat (movie_schedule_id, seat_id) VALUES (?, ?)";

  await conn.beginTransaction();

  var seatArray = seatName.split(",");

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
      await conn.query(seat_sql, [movieScheduleId, seatArray[i]]);
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

module.exports = router;