const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const mysql = require("../../mysql");

/* GET boxoffice from kobis. */
router.get("/", async function (req, res) {
  // 페이지로 나누어 조회
  let pageLength = undefined;
  const itemPerPage = 25;

  const sql =
    "INSERT INTO movie (movie_id, movie_name, movie_name_en, movie_state, genre, released_at, director, distributor, nation) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE movie_state=VALUES(movie_state)";

  // 페이지 수 체크.

  let response = await axios
    .get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.KOBIS_KEY}&itemPerPage=${itemPerPage}&openStartDt=2021&openEndDt=2021&movieTypeCd=220101&repNationCd=22041011`
    )
    .catch((error) => {
      res.status(400).send(error);
    });
  if (pageLength == undefined) {
    // 나누어 떨어지면 몫을, 안떨어지면 1페이지 더 조회.
    pageLength =
      response.data.movieListResult.totCnt % itemPerPage != 0
        ? response.data.movieListResult.totCnt / itemPerPage + 1
        : response.data.movieListResult.totCnt / itemPerPage;
  }

  // 모든 페이지 iterate하며 db에 추가.
  try {
    for (let i = 1; i <= pageLength; i++) {
      let response = await axios
        .get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.KOBIS_KEY}&curPage=${i}&itemPerPage=${itemPerPage}&openStartDt=2021&openEndDt=2021&movieTypeCd=220101`
        )
        .catch((error) => {
          res.status(400).send(error);
        });
      const movieList = response.data.movieListResult.movieList;
      // console.log(response.data.movieListResult.totCnt, pageLength);
      for (const element of movieList) {
        // 각 영화에 대해서 영화 상세정보 조회.
        let movieCd = element.movieCd;
        let movieNm = element.movieNm;
        let movieNmEn = element.movieNmEn;
        let prdtStatNm = element.prdtStatNm;
        let genreAlt = element.genreAlt;
        // mmmmyydd -> mmmm-yy-dd
        let openDt = element.openDt;
        openDt =
          openDt.substr(0, 4) +
          "-" +
          openDt.substr(4, 2) +
          "-" +
          openDt.substr(6, 2);
        // Array[string]
        let directors = element.directors.map((arr) => arr.peopleNm).join(", ");
        let companys = element.companys.map((arr) => arr.companyNm).join(", ");
        // Array[object]
        let nationAlt = element.nationAlt;

        if (genreAlt.indexOf("성인물(에로)") != -1) {
          continue;
        }

        mysql.query(
          sql,
          [
            movieCd,
            movieNm,
            movieNmEn,
            prdtStatNm,
            genreAlt,
            openDt,
            directors,
            companys,
            nationAlt,
          ],
          function (err, rows) {
            if (!err) {
              console.log(rows);
            } else {
              res.send(err);
            }
          }
        );
      }
    }
    mysql.query("SELECT * FROM movie", function (err, rows) {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
