const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

// const mysql = require('../mysql');

/* GET boxoffice from kobis. */
router.get("/", async function (req, res) {
  // 페이지로 나누어 조회
  try {
    const response = await axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${process.env.KOBIS_KEY}&curPage=${req.query.page}&itemPerPage=10&openStartDt=2021&openEndDt=2021&movieTypeCd=220101&repNationCd=22041011`
      )
      .catch((error) => {
        res.status(400).send(error);
      });
    let movieList = response.data.movieListResult.movieList;
    let newList = movieList.filter((element) => {
      return element.prdtStatNm == "개봉예정";
    });
    console.log(movieList);
    res.status(200).send(newList);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
