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
    let connection = await pool.getConnection((conn) => conn);

    const sql =
      "SELECT * FROM movie " +
      "ORDER BY reserved_count DESC, movie_name ASC " +
      "LIMIT 10;";

    const result = await connection.query(sql);

    (await connection).release();

    console.log("success");
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
