const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

/**
 * 박스오피스에서 개봉한 영화 중 예매율 상위 10위. 예매율이 같을 경우 이름순으로 정렬.
 * 추후
 */
router.get("/", async function (req, res) {
  try {
    let connection = await pool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT *, 
      (SELECT count(movie_reservation_id) FROM
      movie_reservation AS MR
      WHERE MR.movie_id=movie.movie_id) as real_reserved_count
      FROM movie 
      ORDER BY reserved_count DESC, movie_name ASC 
      LIMIT 10`;

      const result = await connection.query(sql);

      connection.release();

      console.log("success");
      res.status(200).send({ boxOfficeList: result[0] });
    } catch (err) {
      connection.release();

      console.log(err);
      res.status(400).send(err);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
