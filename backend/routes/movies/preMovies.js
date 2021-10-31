const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

/**
 * /omvies/pre?page=조회 페이지
 * 박스오피스에서 개봉한 영화 중 예매율 상위 10위. 예매율이 같을 경우 이름순으로 정렬.
 * 추후
 */
router.get("/", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);

  const itemsPerPage = 12;
  const startIndex = req.query.page * itemsPerPage;
  try {
    const sql = `SELECT * FROM movie
      WHERE movie_state="개봉예정"
      ORDER BY released_at ASC
      LIMIT ${startIndex}, ${itemsPerPage}`;

    const result = await connection.query(sql);

    connection.release();

    console.log("success");
    res.status(200).send(result[0]);
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
