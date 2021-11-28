const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

router.get("/:phoneNum", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const phoneNum = req.params.phoneNum;
  try {
    const sql =
      "SELECT EXISTS (" +
      "SELECT phone_number FROM member " +
      'WHERE phone_number = "' +
      phoneNum +
      '")';

    const result = await connection.query(sql);

    connection.release();

    const key =
      result[0][0][
        'EXISTS (SELECT phone_number FROM member WHERE phone_number = "' +
          phoneNum +
          '")'
      ];

    if (key === 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
