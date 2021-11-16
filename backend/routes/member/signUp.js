const express = require("express");
const router = express.Router();

const pool = require("../../mysql");

router.post("/", async function (req, res) {
  let userId = req.body.userId;
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let birthday = req.body.birthday;
  let phoneNum = req.body.phoneNum;
  let gender = req.body.gender;
  let signInDate = new Date();
  let address = req.body.address;

  console.log(
    userId,
    password,
    name,
    email,
    birthday,
    phoneNum,
    gender,
    signInDate,
    address
  );
  let conn = await pool.getConnection();

  const sql =
    "INSERT INTO member (member_id,password,name,email,birthday,phone_number,gender,signin_date,address) VALUES (?,?,?,?,?,?,?,?,?)";

  await conn.beginTransaction();

  try {
    let response = await conn.query(sql, [
      userId,
      password,
      name,
      email,
      birthday,
      phoneNum,
      gender,
      signInDate,
      address,
    ]);
    await conn.commit();
    console.log(response[0]);

    conn.release();
    res.status(200).json({
      success: true,
      result: response[0],
    });
  } catch (err) {
    console.log(err);
    await conn.rollback();
    conn.release();
    res.status(400).json({
      success: false,
      err,
    });
  }
});

module.exports = router;
