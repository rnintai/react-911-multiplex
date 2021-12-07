const express = require("express");
const router = express.Router();

const pool = require("../../mysql");

// /member/info/:memberID
router.get("/:memberID", async function (req, res) {
  let conn = await pool.getConnection();

  const sql = `
  SELECT member_id, 
  name, 
  email, 
  birthday, 
  phone_number, 
  gender, 
  signin_date, 
  address,
  isAdmin
  from member 
  WHERE member_id='${req.params.memberID}'`;

  try {
    const response = await conn.query(sql);
    conn.release();
    res.json({
      msg: "success",
      data: response[0][0],
    });
  } catch (err) {
    conn.release();
    res.json({
      msg: "success",
      err,
    });
  }
});

module.exports = router;
