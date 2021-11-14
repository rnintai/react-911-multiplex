const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");

const pool = require("../../../mysql");
let jsonResult = {
  success: false,
  image: "",
  fileName: "",
  result: "",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads/poster");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("poster");
/**
 * PUT /movies/detail/{movieId}
 *
 * 영화 줄거리, 포스터, 트레일러 업데이트
 *
 * body
 * {
 * synopsis 줄거리
 * poster 포스터 이미지 url
 * trailer 트레일러 영상 url
 * }
 */

let path = "";

router.post("/:movieId", async function (req, res) {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    } else {
      path = res.req.file.path;
      jsonResult.image = res.req.file.path;
      jsonResult.fileName = res.req.file.filename;

      let connection = await pool.getConnection((conn) => conn);

      try {
        path = path.replace("public\\", "");
        const sql = `UPDATE movie SET poster=? WHERE movie_id=${req.params.movieId}`;

        const result = await connection.query(sql, [path]);

        await connection.commit();

        jsonResult.success = true;
        jsonResult.result = result[0];

        res.status(200).json(jsonResult);
        connection.release();
      } catch (err) {
        await connection.rollback();
        connection.release();

        jsonResult.success = false;
        jsonResult.err = err;

        res.status(400).json(jsonResult);
      }
    }
  });
});

module.exports = router;
