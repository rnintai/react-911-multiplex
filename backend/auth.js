const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.token_secret;

const pool = require("./mysql");

const jwtMiddleware = async (req, res, next) => {
  // 클라이언트 쿠키에서 token을 가져옵니다.
  let token = req.body.token;

  let conn = await pool.getConnection();

  // token을 decode 합니다.
  jwt.verify(token, SECRET_TOKEN, async (error, decoded) => {
    if (error) {
      return res.status(500).json({ isAuth: false, error });
    }
    // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있습니다.
    // { random: user._id } 형태로 줬으므로 _id를 꺼내 씁시다
    const sql = `SELECT EXISTS(SELECT member_id
      FROM member) as success,
      member_id, 
      name, 
      email, 
      birthday, 
      phone_number, 
      gender, 
      signin_date, 
      address,
      isAdmin
      from member
      WHERE member_id="${decoded.userID}"`;

    try {
      const queryResult = await conn.query(sql);
      if (queryResult[0][0].success === 1) {
        let user = {
          member_id: queryResult[0][0].member_id,
          name: queryResult[0][0].name,
          email: queryResult[0][0].email,
          birthday: queryResult[0][0].birthday,
          phone_number: queryResult[0][0].phone_number,
          gender: queryResult[0][0].gender,
          signin_date: queryResult[0][0].signin_date,
          address: queryResult[0][0].address,
          isAdmin: queryResult[0][0].isAdmin,
        };
        req.token = token;
        req.user = user;
      }
      conn.release();
      next();
    } catch (e) {
      conn.release();
      return res.json({ isAuth: false, e });
    }
  });
};

module.exports = jwtMiddleware;
