const express = require('express');
const router = express.Router();

const mysql = require('../mysql');

/* GET home page. */
router.post('/', function (req, res) {
  let userId = req.body.userId;
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let birthday = req.body.birthday;
  let phoneNum = req.body.phoneNum;

  const sql = 'INSERT INTO member VALUES (?,?,?,?,?,?)';

  mysql.query(
    sql,
    [userId, password, name, email, birthday, phoneNum],
    function (err, rows) {
      // 쿼리문을 이용해 데이터를 가져온다.
      if (!err) {
        // 에러가 없다면
        res.status(201).send(rows); // rows 를 보내주자
      } else {
        // 에러가 있다면?
        console.log(`err : ${err}, `);
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(409).send(err);
        } else {
          res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
        }
      }
    }
  );
});

module.exports = router;
