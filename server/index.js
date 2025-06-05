const express = require("express");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080; //クラウドで環境変数使われてたらそれ使う
//トークン発行
//const jwt = require('jsonwebtoken');
//const SECRET_KEY = 'your_secret_key'; // ※本番では .env に保存！
const pool = require("./db");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

app.use(express.json());

app.use(cors()); //フロント,DBからAPIさばにアクセスできる
//本番環境では下
//app.use(cors({
//    origin: 'https://　　.com'
//  }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // 開発中はfalse、本番ではtrue＋HTTPS
  })
);

app.get("/", (req, res) => {
  console.log("GET / accessed");
  res.send("unchi");
});

const tasks = [
  {
    id: "1",
    name: "aaa株式会社",
    status: "結果待ち",
    nextStep: "面接",
    dueDate: "2025-05-10",
    tags: ["フロントエンド", "Webアプリ", "React"],
  },
  {
    id: "2",
    name: "bbbbb",
    status: "応募予定",
    nextStep: "書類選考",
    dueDate: "2025-05-15",
    tags: ["インフラ", "サーバー"],
  },
];

app.get("/tasks", (req, res) => {
  console.log("GET /tasks accessed");
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  try {
    console.log("POST /tasks accessed");
    const { name, status, nextStep, dueDate, tags } = req.body;
    const newTask = {
      id: uuidv4(),
      name,
      status,
      nextStep,
      dueDate,
      tags: tags || [],
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

// ログを出す共通ミドルウェア
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//新規登録
app.post("/api/user/register", async (req, res) => {
  const { email, username, password } = req.body;
  const id = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
      [id, email, username, hashedPassword]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

///ログイン画面
app.post("/login", async (req, res) => {
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

//インターン企業登録
app.post("/api/intern/register", async (req, res) => {
  const { name, status, nextStep, memo, dueDate, tags } = req.body;
  const intern_id = uuidv4();
  const user_id = req.session.userid;

  try {
    await pool.query(
      "INSERT INTO internships (id, user_id , name, status, nextStep , memo , tags , dueDate ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [intern_id, user_id, name, status, nextStep, memo, tags, dueDate]
    );
    res.status(201).json({ message: "internship created" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//インターン企業削除
app.post("/api/intern/delete", async (req, res) => {
  const { intern_id } = req.body;

  try {
    await pool.query("DELETE FROM internship WHERE id = $1", [intern_id]);

    res.status(201).json({ message: "internship deleted" });
  } catch (err) {
    console.error("delete error:", err);
    res.status(500).json({ error: "delete error" });
  }
});


//インターン企業修正
app.post("/api/intern/update", async (req, res) => {
  const { intern_id,name, status, nextStep, memo, dueDate, tags } = req.body;
  const user_id = req.session.userid;
  if(!user_id && !intern_id && !name ){
    return res.status(500).json({ error: "userid,internshipid,nameのいずれかに未入力があります" });
  }

  try {
    await pool.query(
      "UPDATE internships SET name = $1, status = $2, nextStep = $3, memo = $4, tags = $5, dueDate = $6 updated_at = CURRENT_TIMESTAMP FROM id = $7 AND user_id = $8",
      [ name, status, nextStep, memo, tags, dueDate, intern_id, user_id]
    );
    res.status(201).json({ message: "internship updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/*
 JWTトークンを発行（有効期限1時間）
const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
res.json({ success: true, token,user });
トークン認証ミドルウェア(これなにも分かってない)
function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) return res.sendStatus(401); // トークンなし

jwt.verify(token, SECRET_KEY, (err, user) => {
if (err) return res.sendStatus(403); // トークン無効
req.user = user;
next();
});
}
*/

//app.get('/user-info', authenticateToken, (req, res) => {
//res.json({ message: 'ユーザーデータ', user: req.user });
//});

//サーバーきどう
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
