const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

// const mysql = require('../mysql');

/* GET boxoffice from kobis. */
router.get('/', async function (req, res) {
  try {
    const response = await axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${req.query.date}&multiMovieYn=N`
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
