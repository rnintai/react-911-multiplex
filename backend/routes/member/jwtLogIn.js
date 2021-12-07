const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

const pool = require("../../mysql");

const saltRounds = 10;
// const salt = process.env.salt;
const SECRET_TOKEN = process.env.token_secret;

router.post("/login", async function (req, res) {
  let connection = await pool.getConnection();
  const id = req.body.userId;
  let password = req.body.password;

  const sql = `SELECT EXISTS 
  (SELECT member_id FROM member) as success,
  member_id,
  password
  FROM member
  WHERE member_id="${id}"`;

  try {
    const result = await connection.query(sql);
    if (result[0][0].success === 1) {
      const dbPassword = result[0][0].password;

      const checkPW = (pool) => {
        bcrypt.compare(password, dbPassword, async (error, isMatch) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: "something wrong" });
          }
          if (isMatch) {
            // 비밀번호가 맞으면 token을 생성해야 합니다.
            // secret 토큰 값은 특정 유저를 감별하는데 사용합니다.

            // 토큰 생성 7일간 유효
            const generatedToken = jwt.sign({ userID: id }, SECRET_TOKEN, {
              expiresIn: "7d",
            });

            // 해당 유저에게 token값 할당 후 저장
            // user.token = generatedToken;

            let connection = await pool.getConnection();

            const tokenSql = `
            UPDATE member
            SET token="${generatedToken}" 
            WHERE member_id="${id}"`;

            try {
              await connection.beginTransaction();
              await connection.query(tokenSql);

              await connection.commit();
              connection.release();
              return res
                .cookie("x_auth", generatedToken, {
                  maxAge: 1000 * 60 * 60 * 24 * 7, // 7일간 유지
                  httpOnly: true,
                })
                .status(200)
                .json({
                  loginSuccess: true,
                  userId: id,
                  token: generatedToken,
                });
            } catch (e) {
              await connection.rollback();
              connection.release();
              console.log(e);
              return res
                .status(400)
                .json({ error: "something wrong", result: e });
            }
          } else {
            // await connection.rollback();
            return res.status(203).json({
              loginSuccess: false,
              message: "비밀번호가 틀렸습니다.",
            });
          }
        });
      };
      checkPW(pool);

      connection.release();
    } else {
      connection.release();
      return res.status(203).json({
        loginSuccess: false,
        message: "아이디가 존재하지 않습니다.",
      });
    }
  } catch (err) {
    console.log(err);
    connection.release();
  }
});

router.post("/signup", async function (req, res) {
  let userId = req.body.userId;
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let birthday = req.body.birthday;
  let phoneNum = req.body.phoneNum;
  let gender = req.body.gender;
  let signInDate = new Date();
  let address = req.body.address;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    // 솔트 생성 실패시
    if (err)
      return res.status(500).json({
        registerSuccess: false,
        message: "비밀번호 해쉬화에 실패했습니다.",
      });

    // salt 생성에 성공시 hash 진행
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: "비밀번호 해쉬화에 실패했습니다.",
        });

      // 비밀번호를 해쉬된 값으로 대체합니다.
      password = hash;

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
  });
});

module.exports = router;
