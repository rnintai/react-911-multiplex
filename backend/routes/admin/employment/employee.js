const express = require("express");
const router = express.Router();

const pool = require("../../../mysql");

router.get("/", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `SELECT * from employee`;

  const result = await connection.query(sql);

  try {
    connection.release();
    res.json({
      success: true,
      scheduleList: result[0],
    });
  } catch (err) {
    connection.release();
    res.json({
      success: false,
      err,
    });
  }
});

router.post("/", async function (req, res) {
  let connection = await pool.getConnection();

  let employeeId = req.body.employeeId;
  let memberId = req.body.memberId;
  let department = req.body.department;
  let position = req.body.position;
  let wage = req.body.wage;
  let employmentDate = req.body.employmentDate;

  const sql =
    "INSERT INTO employee (employee_id, member_id, department, position, wage, employment_date) " +
    "VALUES (?, ?, ?, ?, ?, ?) " +
    "ON DUPLICATE KEY UPDATE " +
    "employee_id=VALUES(employee_id), " +
    "member_id=VALUES(member_id), " +
    "department=VALUES(department), " +
    "position=VALUES(position), " +
    "wage=VALUES(wage), " +
    "employment_date=VALUES(employment_date)";

  await connection.beginTransaction();

  console.log(employeeId, memberId, department, position, wage, employmentDate);

  try {
    let result = await connection.execute(sql, [
      employeeId,
      memberId,
      department,
      position,
      wage,
      employmentDate,
    ]);

    await connection.commit();
    console.log(result);
    res.status(200).json({
      success: true,
      result: result[0],
    });
    connection.release();
  } catch (err) {
    await connection.rollback();
    res.status(400).json({
      success: false,
      err,
    });
    connection.release();
  }
});

router.post("/delete/:employeeId", async function (req, res) {
  let connection = await pool.getConnection();

  const sql = `
    DELETE FROM employee 
    WHERE employee_id = ${req.params.employeeId}`;

  await connection.beginTransaction();

  try {
    let result = await connection.execute(sql);
    await connection.commit();
    console.log(result);
    res.status(200).json({
      success: true,
      result: result[0],
    });
    connection.release();
  } catch (err) {
    await connection.rollback();
    res.status(400).json({
      success: false,
      err,
    });
    connection.release();
  }
});

module.exports = router;
