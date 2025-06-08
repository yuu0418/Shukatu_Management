const express = require("express");
const pool = require("./db_link");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

//インターン企業登録
app.post("/register", async (req, res) => {
  const { intern_name, status, nextStep, memo, dueDate, tags } = req.body;
  const intern_id = uuidv4();
  const user_id = req.session.userid;

  try {
    await pool.query(
      "INSERT INTO internships (intern_id, user_id , intern_name, status, nextStep , memo , tags , dueDate ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [intern_id, user_id, intern_name, status, nextStep, memo, tags, dueDate]
    );
    res.status(201).json({ message: "internship infomation created" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//インターン企業削除
app.post("/delete", async (req, res) => {
  const { intern_id } = req.body;

  try {
    await pool.query("DELETE FROM internship WHERE intern_id = $1", [intern_id]);

    res.status(201).json({ message: "internship infomation deleted" });
  } catch (err) {
    console.error("delete error:", err);
    res.status(500).json({ error: "delete error" });
  }
});


//インターン企業修正
app.post("/update", async (req, res) => {
  const { intern_id, intern_name, status, nextStep, memo, dueDate, tags } = req.body;
  const user_id = req.session.userid;
  if (!user_id && !intern_id && !intern_name) {
    return res
      .status(500)
      .json({ error: "userid,internshipid,internshipnameのいずれかに未入力があります" });
  }

  try {
    await pool.query(
      "UPDATE internships SET intern_name = $1, status = $2, nextStep = $3, memo = $4, tags = $5, dueDate = $6 updated_at = CURRENT_TIMESTAMP FROM intern_id = $7 AND user_id = $8",
      [intern_name, status, nextStep, memo, tags, dueDate, intern_id, user_id]
    );
    res.status(201).json({ message: "internship infomation updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;