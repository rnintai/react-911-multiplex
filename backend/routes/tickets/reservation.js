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

// DELETE /tickets/reservation/:reservationId
router.delete("/:reservationId", async function (req, res) {
  let reservationId = req.params.reservationId;
  let seats = [];
  let scheduleId = "";
  let selectConnection = await pool.getConnection();
  try {
    // seat 배열 받아오기
    const selectSql = `SELECT seat_name, movie_schedule_id from movie_reservation 
    WHERE movie_reservation_id="${reservationId}"`;
    const selectRes = await selectConnection.query(selectSql);
    seats = selectRes[0][0].seat_name.split(",");
    scheduleId = selectRes[0][0].movie_schedule_id;
    selectConnection.release();
    let deleteConnection = await pool.getConnection();
    // 예매 내역에서 삭제
    try {
      await deleteConnection.beginTransaction();

      const deleteSql = `DELETE FROM movie_reservation 
      WHERE movie_reservation_id=${reservationId}`;

      await deleteConnection.query(deleteSql);

      await deleteConnection.commit();

      deleteConnection.release();
      let seatConnection = await pool.getConnection();
      // 좌석 삭제
      try {
        await seatConnection.beginTransaction();

        let seatSql = `DELETE FROM reserved_seat
        WHERE movie_schedule_id="${scheduleId}"
        AND (`;
        for (let i = 0; i < seats.length - 1; i++) {
          seatSql += `(seat_row="${seats[i].substring(0, 1)}" 
          AND seat_col="${seats[i].substring(1, 3)}") OR `;
        }
        seatSql += `(seat_row="${seats[seats.length - 1].substring(0, 1)}" 
          AND seat_col="${seats[seats.length - 1].substring(1, 3)}"))`;

        const seatResponse = await seatConnection.query(seatSql);

        await seatConnection.commit();
        seatConnection.release();

        return res.status(200).json({
          success: true,
          result: seatResponse[0],
        });
      } catch (deleteSeatErr) {
        await seatConnection.rollback(0);
        seatConnection.release();
        return res.status(400).json({
          success: false,
          deleteSeatErr,
        });
      }
    } catch (deleteErr) {
      await deleteConnection.rollback();
      deleteConnection.release();
      return res.status(400).json({
        success: false,
        deleteErr,
      });
    }
  } catch (selectErr) {
    selectConnection.release();
    return res.status(400).json({
      success: false,
      selectErr,
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
  SELECT 
  movie_reservation_id, 
  member_id, 
  movie_reservation_date,
  (SELECT movie_schedule_start FROM movie_schedule as MS
    WHERE MS.movie_schedule_id=MR.movie_schedule_id) as movie_schedule_start,
  (SELECT movie_schedule_end FROM movie_schedule as MS
    WHERE MS.movie_schedule_id=MR.movie_schedule_id) as movie_schedule_end,
  seat_name,
  multiplex_id,
  (SELECT multiplex_name FROM multiplex as MUL
    WHERE MUL.multiplex_id=MR.multiplex_id) as multiplex_name,
  theater_id,
  (SELECT theater_name FROM theater as T
    WHERE T.theater_id=MR.theater_id) as theater_name,
  (SELECT theater_type FROM theater as T
    WHERE T.theater_id=MR.theater_id) as theater_type,
  movie_id,
  (SELECT movie_name FROM movie as M
    WHERE M.movie_id=MR.movie_id) as movie_name,
  (SELECT poster FROM movie as M
    WHERE M.movie_id=MR.movie_id) as poster,
  (SELECT age_limit FROM movie as M
    WHERE M.movie_id=MR.movie_id) as age_limit,
  total_price,
  movie_schedule_id
  FROM movie_reservation as MR
  WHERE movie_reservation_id="${req.params.reservationId}"`;

  try {
    const result = await connection.query(sql);
    connection.release();

    res.json({
      success: true,
      reservationInfo: result[0][0] || {},
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});
// GET /tickets/reservation/list/:memberId
// 유저 id로 예매 내역 조회
const itemPerPage = 10;

router.get("/list/:page/:memberId", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT 
  movie_reservation_id, 
  member_id, 
  movie_reservation_date,
  (SELECT movie_schedule_start FROM movie_schedule as MS
    WHERE MS.movie_schedule_id=MR.movie_schedule_id) as movie_schedule_start,
  (SELECT movie_schedule_end FROM movie_schedule as MS
    WHERE MS.movie_schedule_id=MR.movie_schedule_id) as movie_schedule_end,
  seat_name,
  multiplex_id,
  (SELECT multiplex_name FROM multiplex as MUL
    WHERE MUL.multiplex_id=MR.multiplex_id) as multiplex_name,
  theater_id,
  (SELECT theater_name FROM theater as T
    WHERE T.theater_id=MR.theater_id) as theater_name,
  (SELECT theater_type FROM theater as T
    WHERE T.theater_id=MR.theater_id) as theater_type,
  movie_id,
  (SELECT movie_name FROM movie as M
    WHERE M.movie_id=MR.movie_id) as movie_name,
  (SELECT poster FROM movie as M
    WHERE M.movie_id=MR.movie_id) as poster,
  (SELECT age_limit FROM movie as M
    WHERE M.movie_id=MR.movie_id) as age_limit,
  total_price,
  movie_schedule_id
  FROM movie_reservation as MR
  WHERE member_id="${req.params.memberId}"
  LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  try {
    const result = await connection.query(sql);
    connection.release();
    return res.status(200).json({
      success: true,
      reservationList: result[0],
    });
  } catch (err) {
    connection.release();
    console.log(err);
    return res.status(200).json({
      success: false,
      err,
    });
  }
});

module.exports = router;
