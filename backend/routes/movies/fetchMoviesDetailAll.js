const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const mysql = require("../../mysql");

router.get("/", function (req, res) {
  res.on("finish", async function () {
    // 페이지로 나누어 조회
    let responseObj = {
      updatedCount: 0,
      updatedMovieId: [],
    };

    let rows = await mysql.query("SELECT movie_id FROM movie");
    let movieIdList = rows[0];
    // 데이터베이스 내 모든 레코드를 iterate하며 db에 추가.
    try {
      let index = 1;

      for (const element of movieIdList) {
        let movieId = element.movie_id;
        console.log(`movieId ${movieId} (${index++}/${movieIdList.length})`);
        // kobis API에서 현재 영화의
        let response = await axios
          .get(
            `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.KOBIS_KEY}&movieCd=${movieId}`
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
            `${actor.peopleNm}(${
              actor.cast === "" ? actor.peopleNm : actor.cast
            })`
          );
        }
        let actors = actorsList.join(",");
        let audits =
          movieDetail.audits.length != 0
            ? movieDetail.audits[0].watchGradeNm
            : "";
        // 상영 형태1,상영 형태2,... 의 문자열로 변형
        let showTypesList = [];
        for (const showType of movieDetail.showTypes) {
          showTypesList.push(showType.showTypeGroupNm);
        }
        let showTypes = showTypesList.join(",");

        // update 쿼리문
        const sql = `UPDATE movie SET running_time=?, actors=?, age_limit=?, show_type=? WHERE movie_id=${movieId}`;
        let insertResult = await mysql.query(sql, [
          showTm,
          actors,
          audits,
          showTypes,
        ]);

        // 변경 사항이 있을 경우 그 개수를 카운팅하여 결과로 돌려줌.
        if (insertResult[0].changedRows != 0) {
          responseObj.updatedCount += 1;
          responseObj.updatedMovieId.push(movieId);
        }
        break;
      }
      console.log(responseObj);
    } catch (e) {
      console.log(e);
    }
  });
  res.status(200).send("progess in background...");
});

module.exports = router;
