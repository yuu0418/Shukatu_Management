const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const app = express();
const PORT = process.env.PORT || 8080; //クラウドで環境変数使われてたらそれ使う
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

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
    cookie: { secure: true }, // 開発中はfalse、本番ではtrue
  })
);

// ログを出す共通ミドルウェア
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const interRoutes = require("./routes/internship");
const jobRoutes = require("./routes/job")
const userRoutes = require("./routes/user")
const dbRoutes = require("./routes/db_link")


app.use("/internship", interRoutes);
app.use("/job", jobRoutes);
app.use("/user", userRoutes);
app.use("/db", dbRoutes);

app.use(express.json());


app.get("/", (req, res) => {
  console.log("GET / accessed");
  res.send("hello");
});

const tasks = [
  {
    intern_id: "1",
    intern_name: "aaa株式会社",
    status: "結果待ち",
    nextStep: "面接",
    dueDate: "2025-05-10",
    tags: ["フロントエンド", "Webアプリ", "React"],
  },
  {
    intern_id: "2",
    intern_name: "bbbbb",
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
    const { intern_name, status, nextStep, dueDate, tags } = req.body;
    const newTask = {
      intern_id: uuidv4(),
      intern_name,
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


//サーバーきどう
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // サーバー起動時にこれを追加してテスト
  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Database connected successfully:", res.rows[0]);
    }
  });
});
