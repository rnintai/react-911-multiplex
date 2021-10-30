const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const mysql = require("../../mysql");

const itemPerPage = 25;
let pageLength = 0;
let responseObj = {
  updatedCount: 0,
  updatedMovieCodeList: [],
};

/**
 * Movie의 페이지 수를 얻어온다.
 */
router.get("/", async function (req, res, next) {
  // 페이지 수 체크
  let response = await axios
    .get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.KOBIS_KEY}&itemPerPage=${itemPerPage}&openStartDt=2021&openEndDt=2022&movieTypeCd=220101`
    )
    .catch((error) => {
      console.log(error);
    });
  // 나누어 떨어지면 몫을, 안떨어지면 1페이지 더 조회.
  pageLength =
    response.data.movieListResult.totCnt % itemPerPage != 0
      ? response.data.movieListResult.totCnt / itemPerPage + 1
      : response.data.movieListResult.totCnt / itemPerPage;
  pageLength = parseInt(pageLength);

  pageLength = 3;
  next();
});

router.get("/", function (req, res) {
  res.on("finish", async () => {
    const sql =
      "INSERT INTO movie (movie_id, movie_name, movie_name_en, movie_state, genre, released_at, director, distributor, nation) " +
      "VALUES (?,?,?,?,?,?,?,?,?) " +
      "ON DUPLICATE KEY UPDATE " +
      "movie_state=VALUES(movie_state), movie_name=VALUES(movie_name), released_at=VALUES(released_at)";
    // 모든 페이지 iterate하며 db에 추가.
    try {
      for (let i = 1; i <= pageLength; i++) {
        console.log(`page ${i}/${pageLength}`);
        let response = await axios
          .get(
            `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.KOBIS_KEY}&curPage=${i}&itemPerPage=${itemPerPage}&openStartDt=2021&openEndDt=2022&movieTypeCd=220101`
          )
          .catch((error) => {
            console.log(error);
          });
        const movieList = response.data.movieListResult.movieList;
        for (const element of movieList) {
          // 각 영화에 대해서 영화 상세정보 조회.
          let movieCd = element.movieCd;
          let movieNm = element.movieNm;
          let movieNmEn = element.movieNmEn;
          let prdtStatNm = element.prdtStatNm;
          let repGenreNm = element.repGenreNm;
          // mmmmyydd -> mmmm-yy-dd
          let openDt = element.openDt;
          openDt =
            openDt.substr(0, 4) +
            "-" +
            openDt.substr(4, 2) +
            "-" +
            openDt.substr(6, 2);
          // Array[string]
          let directors = element.directors
            .map((arr) => arr.peopleNm)
            .join(",");
          let companys = element.companys.map((arr) => arr.companyNm).join(",");
          // Array[object]
          let repNationNm = element.repNationNm;

          // 특정 장르 필터링
          if (filterGenre(movieNmEn, repNationNm, repGenreNm) == true) {
            continue;
          }
          // 업데이트 날짜 기준 -2 ~ +6개월 사이 영화만 데이터베이스에 집어넣기.
          if (checkMonths(openDt) == false) {
            continue;
          }
          const result = await mysql.query(sql, [
            movieCd,
            movieNm,
            movieNmEn,
            prdtStatNm,
            repGenreNm,
            openDt,
            directors,
            companys,
            repNationNm,
          ]);
          // console.log(result[0]);
          if (result[0].insertId != 0) {
            responseObj.updatedCount += 1;
            responseObj.updatedMovieCodeList.push(movieCd);
          }
        }
      }
      console.log(responseObj);
    } catch (e) {
      console.log(e);
    }
  });
  res.status(200).send("processing on background...");
});

function filterGenre(movieNmEn, repNationNm, repGenreNm) {
  let result =
    repGenreNm.indexOf("성인") != -1 ||
    repGenreNm.indexOf("멜로") != -1 ||
    (repNationNm.indexOf("일본") != -1 && repGenreNm.indexOf("드라마") != -1) ||
    (repNationNm.indexOf("한국") != -1 &&
      repGenreNm.indexOf("드라마") != -1 &&
      movieNmEn === "");

  return result;
}

function checkMonths(openDt) {
  const today = new Date();
  let result =
    new Date(openDt) >= today.setMonth(today.getMonth() - 2) &&
    new Date(openDt) < today.setMonth(today.getMonth() + 6);

  return result;
}
module.exports = router;
