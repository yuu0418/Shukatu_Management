const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080; //クラウドで環境変数使われてたらそれ使う
//トークン発行
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // ※本番では .env に保存！
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

app.use(express.json());

app.use(cors()); //フロント,DBからAPIさばにアクセスできる
//本番環境では下
//app.use(cors({
//    origin: 'https://　　.com'
//  }));

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
app.post("/api/register", async (req, res) => {
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

  // ユーザー情報をデータベースから取得
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [userid]
    );

    // ユーザーが存在しない場合
    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "そのメールアドレスまたはユーザー名は登録されていません",
      });
    }

    const user = userResult.rows[0];

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "パスワードが違います",
      });
    }

    // パスワードが正しい場合、インターンシップ情報を取得
    const internshipResult = await pool.query(
      "SELECT * FROM internship WHERE user_id = $1",
      [user.id]
    );

    // JWTトークンを発行（有効期限1時間）
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // レスポンスを返す（パスワードハッシュは除外）
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      created_at: user.created_at,
    };

    res.status(200).json({
      success: true,
      message: "ログイン成功",
      token,
      user: userInfo,
      internship: internshipResult.rows,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "サーバーエラーが発生しました",
    });
  }
});

//サーバーきどう
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
