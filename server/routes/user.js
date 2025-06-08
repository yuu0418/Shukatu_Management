const pool = require("./db_link");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const router = express.Router();



//新規登録
app.post("/register", async (req, res) => {
  const { email, user_name, password } = req.body;
  const user_id = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (user_id, email, user_name, password_hash) VALUES ($1, $2, $3, $4)",
      [user_id, email, user_name, hashedPassword]
    );
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Database error:", err);


    if (err.code === "23505") {
      res.status(400).json({
        success: false,
        error: "このメールアドレスは既に登録されています",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "データベースエラーが発生しました",
      });
    }
  }
});

///ログイン画面
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT user_id, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "そのユーザーは登録されていません",
      });
    }

    const { id: user_id, password_hash } = result.rows[0];
    const match = await bcrypt.compare(password, password_hash);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "パスワードが違います",
      });
    }

    try {
      const internship_data = await pool.query(
        "SELECT * FROM internship WHERE user_id = $1",
        [user_id]
      );
      req.session.userid = user_id;
      res.status(200).json({ success: true, data: internship_data.rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "インターン情報取得エラー",
      });
    }
  } catch (err) {
    console.error("エラー詳細:", err);
    res.status(500).json({
      success: false,
      message: "サーバーエラー",
    });
  }
});

module.exports = router;