const pool = require("./db_link");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

//本選考企業登録
router.post("/job/register", async (req, res) => {
  const { job_name, status, nextStep, memo, dueDate, tags } = req.body;
  const job_id = uuidv4();
  const user_id = req.session.userid;

  try {
    await pool.query(
      "INSERT INTO jobs (id, user_id , job_name, status, nextStep , memo , tags , dueDate ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [job_id, user_id, job_name, status, nextStep, memo, tags, dueDate]
    );
    res.status(201).json({ message: "job infomation created" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//本選考企業削除
router.post("/job/delete", async (req, res) => {
  const { job_id } = req.body;
  const user_id = req.session.userid;

  try {
    await pool.query("DELETE FROM jobs WHERE id = $1 AND user_id = $2", [job_id,user_id]);

    res.status(201).json({ message: "job infomation deleted" });
  } catch (err) {
    console.error("delete error:", err);
    res.status(500).json({ error: "delete error" });
  }
});


//本選考企業修正
router.post("/job/update", async (req, res) => {
  const { job_id,job_name, status, nextStep, memo, dueDate, tags } = req.body;
  const user_id = req.session.userid;
  if(!user_id && !job_id && !name ){
    return res.status(500).json({ error: "userid,jobid,job_nameのいずれかに未入力があります" });
  }

  try {
    await pool.query(
      "UPDATE jobs SET job_name = $1, status = $2, nextStep = $3, memo = $4, tags = $5, dueDate = $6 updated_at = CURRENT_TIMESTAMP FROM id = $7 AND user_id = $8",
      [ job_name, status, nextStep, memo, tags, dueDate, job_id, user_id]
    );
    res.status(201).json({ message: "job infomation updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;