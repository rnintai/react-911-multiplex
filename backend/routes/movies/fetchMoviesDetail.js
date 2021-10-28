const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const mysql = require("../../mysql");

/* GET boxoffice from kobis. */
router.get("/", async function (req, res) {
  // 페이지로 나누어 조회
  let responseObj = {
    updatedCount: 0,
  };

  //   const a = await mysql.query(
  //     "SELECT movie_id FROM movie",
  //     function (err, result) {
  //       if (!err) {
  //         for (const item of result) {
  //           movieIdList.push(item.movie_id);
  //         }
  //       } else {
  //         res.send(err);
  //       }
  //     }
  //   );
  let rows = await mysql.query("SELECT movie_id FROM movie");
  let movieIdList = rows[0];
  // 모든 페이지 iterate하며 db에 추가.
  try {
    for (const element of movieIdList) {
      let movieId = element.movie_id;

      let response = await axios
        .get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.KOBIS_KEY}&movieCd=${movieId}`
        )
        .catch((error) => {
          res.status(400).send(error);
        });
      const movieDetail = response.data.movieInfoResult.movieInfo;

      let showTm = movieDetail.showTm;

      let actorsList = [];
      for (let actor of movieDetail.actors) {
        actorsList.push(
          `${actor.peopleNm}(${
            actor.cast === "" ? actor.peopleNm : actor.cast
          })`
        );
      }
      let actors = actorsList.join(",");

      let audits = movieDetail.audits[0].watchGradeNm;
      let showTypesList = [];
      for (const showType of movieDetail.showTypes) {
        showTypesList.push(showType.showTypeGroupNm);
      }
      let showTypes = showTypesList.join(",");

      const sql = `UPDATE movie SET running_time=?, actors=?, age_limit=?, show_type=? WHERE movie_id=${movieId}`;
      let insertResult = await mysql.query(sql, [
        showTm,
        actors,
        audits,
        showTypes,
      ]);
      console.log(insertResult[0]);
      if (insertResult[0].changedRows != 0) {
        responseObj.updatedCount += 1;
      }
    }
    res.status(200).send(responseObj);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
