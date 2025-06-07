const pool = require("./db_link");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const router = express.Router();

//新規登録
router.post("/register", async (req, res) => {
  const { email, user_name, password } = req.body;
  const id = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (id, email, user_name, password_hash) VALUES ($1, $2, $3, $4)",
      [id, email, user_name, hashedPassword]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});


///ログイン画面
router.post("/login", async (req, res) => {
  const { userid, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userid]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "そのユーザーは登録されていません" });
    }

    const password_hash = result.rows[0].password_hash;
    // ...existing code...
    bcrypt.compare(password, password_hash, async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "パスワード比較エラー" });
      }
      if (result) {
        try {
          const internship_data = await pool.query(
            "SELECT * FROM internship WHERE user_id = $1",
            [userid]
          );
          req.session.userid = userid;
          res.status(200).json({ success: true, data: internship_data.rows });
        } catch (err) {
          res
            .status(500)
            .json({ success: false, message: "インターン情報取得エラー" });
        }
      } else {
        res
          .status(401)
          .json({ success: false, message: "パスワードが違います" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "サーバーエラー" });
  }
});

module.exports = router;