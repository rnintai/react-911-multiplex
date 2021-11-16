const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

router.get("/:userId", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const userId = req.params.userId;
  try {
    const sql =
      "SELECT EXISTS (" +
      "SELECT member_id FROM member " +
      'WHERE member_id = "' +
      userId +
      '")';

    const result = await connection.query(sql);

    connection.release();

    const key =
      result[0][0][
        'EXISTS (SELECT member_id FROM member WHERE member_id = "' +
          userId +
          '")'
      ];

    if (key === 0) {
      res.status(200).send("available");
    } else {
      res.status(409).send("unavailable");
    }
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
