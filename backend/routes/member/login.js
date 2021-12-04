const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

router.post("/", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const id = req.body.id;
  const password = req.body.password;
  try {
    const idSql =
      // `SELECT member_id FROM member
      //   WHERE member_id=${id}`;
      `SELECT EXISTS 
      (SELECT member_id,password FROM member 
        WHERE member_id="${id}" AND password="${password}") 
        as success`;

    const result = await connection.query(idSql);
    connection.release();

    res.status(200).json({
      success: result[0][0].success,
      memberId: id,
    });
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
