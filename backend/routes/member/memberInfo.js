const express = require("express");
const router = express.Router();

// const pool = require("../../mysql");

const jwtMiddleware = require("../../auth");

// /member/info
router.post("/", jwtMiddleware, async function (req, res) {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    res.json({
      success: false,
      err,
    });
  }
});

module.exports = router;
