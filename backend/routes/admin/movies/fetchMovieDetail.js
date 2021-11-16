const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../../mysql");

router.get("/:movieId", async function (req, res) {
  let connection = await pool.getConnection();

  await connection.beginTransaction();
  try {
    // kobis API에서 현재 영화의
    let response = await axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.KOBIS_KEY}&movieCd=${req.params.movieId}`
      )
      .catch((error) => {
        console.log(error);
      });
    const movieDetail = response.data.movieInfoResult.movieInfo;

    let showTm = movieDetail.showTm;

    // 배우1(배역1),배우2(배역2),... 형태의 문자열로 변형
    let actorsList = [];
    for (let actor of movieDetail.actors) {
      actorsList.push(
        `${actor.peopleNm}(${actor.cast === "" ? actor.peopleNm : actor.cast})`
      );
    }
    let actors = actorsList.join(",");
    let audits =
      movieDetail.audits.length != 0 ? movieDetail.audits[0].watchGradeNm : "";
    // 상영 형태1,상영 형태2,... 의 문자열로 변형
    let showTypesList = [];
    for (const showType of movieDetail.showTypes) {
      showTypesList.push(showType.showTypeGroupNm);
    }
    let showTypes = showTypesList.join(",");

    // update 쿼리문
    const updateSql = `UPDATE movie SET running_time=?, actors=?, age_limit=?, show_type=? WHERE movie_id=${req.params.movieId}`;
    let updateResult = await connection.query(updateSql, [
      showTm,
      actors,
      audits,
      showTypes,
    ]);

    await connection.commit();
    connection.release();
    res.status(200).json({
      msg: "success",
      result: updateResult[0],
    });
  } catch (sqlErr) {
    await connection.rollback();
    connection.release();
    console.log(sqlErr);
    res.status(400).json({
      msg: "fail",
      sqlErr,
    });
  }
});

module.exports = router;
