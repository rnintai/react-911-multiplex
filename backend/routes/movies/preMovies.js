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
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.xml?key=${process.env.KOBIS_KEY}&curPage=${i}&openStartDt=2021&openEndDt=2021`
      )
      .catch((error) => {
        res.status(400).send(error);
      });
    res.status(200).send(response.data.boxOfficeResult);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
