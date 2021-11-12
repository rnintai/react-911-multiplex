const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

/**
 * GET /omvies/detail/{movieId}
 * 영화 1개 상세정보 조회
 */
router.get("/", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  try {
    const sql = `SELECT * FROM movie WHERE movie_id=?`;

    const result = await connection.query(sql, req.params.movieId);

    connection.release();

    console.log("success");
    res.status(200).send({ msg: "success", movieDetail: result[0] });
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send({ msg: "failed", error: err });
  }
});

/**
 * PUT /movies/detail/{movieId}
 *
 * 영화 줄거리, 포스터, 트레일러 업데이트
 *
 * body
 * {
 * synopsis 줄거리
 * poster 포스터 이미지 url
 * poster_thumb 포스터 썸네일 url
 * trailer 트레일러 영상 url
 * }
 */
router.put("/:movieId", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const movie_id = req.params.movieId;
  const synopsis = req.body.synopsis;
  const poster = req.body.poster;
  const posterThumb = req.body.posterThumb;
  const trailer = req.body.trailer;
  try {
    const sql = `UPDATE movie SET synopsis=?, poster=?, poster_thumb=?, trailer=? WHERE movie_id=${movie_id}`;

    const result = await connection.query(sql, [
      synopsis,
      poster,
      posterThumb,
      trailer,
    ]);

    await connection.commit();

    res.status(200).send({
      msg: "success",
      result: result[0],
    });
    connection.release();
  } catch (err) {
    await connection.rollback();
    connection.release();

    console.log(err);
    res.status(400).send({
      msg: "fail",
      error: err,
    });
  }
});

module.exports = router;
