require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // ← ここを環境変数に変更
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // 数値にしたい場合は parseInt(process.env.DB_PORT, 10)
});

module.exports = pool;

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ 接続成功:", res.rows[0]);
  } catch (err) {
    console.error("❌ 接続失敗:", err);
  }
})();
