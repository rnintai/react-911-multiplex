const express = require("express");
const router = express.Router();
require("dotenv").config();

const pool = require("../../mysql");

/**
 * 페이지화된 영화 목록 가져오기
 */
router.get("/", async function (req, res) {
  let connection = await pool.getConnection((conn) => conn);
  const curPage = req.params.page - 1;
  try {
    const sql = `SELECT * FROM movie ORDER BY released_at DESC LIMIT 
    ${curPage * 15},15;`;

    const result = await connection.query(sql);

    connection.release();

    console.log("success");
    res.status(200).send({ success: "success", movieList: result[0] });
  } catch (err) {
    connection.release();

    console.log(err);
    res.status(400).send({ fail: "failed", error: err });
  }
});

module.exports = router;
