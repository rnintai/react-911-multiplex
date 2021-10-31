const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

/**
 * GET /omvies/detail/{movie_id}
 * 영화 1개 상세정보 조회
 */
router.get("/", async function (req, res) {});

/**
 * POST /movies/detail/{movie_id}
 *
 * 영화 줄거리, 포스터, 트레일러 업데이트
 *
 * body
 * {
 * synopsis 줄거리
 * poster 포스터 이미지 url
 * trailer 트레일러 영상 url
 * }
 */
router.post("/:movieId", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);

  const synopsis = req.body.synopsis;
  const poster = req.body.poster;
  const trailer = req.body.trailer;

  let responseObj = {
    updatedId: req.params.movieId,
    msg: "",
    updateResult: {},
  };

  try {
    let toUpdate =
      `${
        synopsis != undefined
          ? `synopsis="${synopsis}", `
          : "synopsis=synopsis, "
      }` +
      `${poster != undefined ? `poster="${poster}", ` : "poster=poster, "}` +
      `${trailer != undefined ? `trailer="${trailer}" ` : "trailer=trailer "}`;

    if (toUpdate === "") {
      res.status(400).send("업데이트 할 내용을 body에 입력해주세요.");
    } else {
      const sql = `UPDATE movie SET ${toUpdate} WHERE movie_id=${req.params.movieId}`;

      await connection.beginTransaction();

      const result = await connection.query(sql);

      let msg = "";
      if (result[0].changedRows > 0) {
        msg = `${req.params.movieId} 업데이트 완료.`;
        await connection.commit();
      } else {
        msg = `${req.params.movieId} 변경사항 없음`;
      }
      responseObj.msg = msg;
      responseObj.updateResult = result[0];
      res.status(200).send(responseObj);
    }
    connection.release();
  } catch (err) {
    await connection.rollback();

    connection.release();
    responseObj.msg = err;
    res.status(400).send(responseObj);
  }
});

module.exports = router;
