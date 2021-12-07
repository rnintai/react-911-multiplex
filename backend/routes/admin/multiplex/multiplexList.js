const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

const itemPerPage = 10;

/**
 * 지점 목록을 가져온다.
 */
router.get("/list/:page", async function (req, res) {
  let connection = await pool.getConnection();

  let curPage = req.params.page - 1;

  const sql = `SELECT * FROM multiplex
    LIMIT ${curPage * itemPerPage},${itemPerPage}`;

  try {
    const result = await connection.query(sql);
    connection.release();
    res.json({
      success: true,
      multiplexList: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

// 지점 id로 상세정보 조회
// /admin/multiplex/detail/:multiplexId

router.get("/detail/:multiplexId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `SELECT * FROM multiplex
    WHERE multiplex_id=${req.params.multiplexId}`;

  try {
    const result = await connection.query(sql);
    connection.release();
    res.json({
      success: true,
      multiplexDetail: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

module.exports = router;
