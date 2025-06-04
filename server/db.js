require("dotenv").config({ path: "../.env" });
console.log("🔍 DB_PASSWORD:", process.env.DB_PASSWORD);
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
