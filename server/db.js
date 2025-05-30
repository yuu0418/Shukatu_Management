const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'myuser',
  host: 'db', // docker-composeのサービス名
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

module.exports = pool;

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ 接続成功:', res.rows[0]);
  } catch (err) {
    console.error('❌ 接続失敗:', err);
  }
})();

