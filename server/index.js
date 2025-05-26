const express = require('express');
const cors = require('cors');
const app =express();
const path = require('path');
const PORT = process.env.PORT || 3000;//クラウドで環境変数使われてたらそれ使う
//トークン発行
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // ※本番では .env に保存！
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');



app.use(express.json());

app.use(cors());//フロント,DBからAPIさばにアクセスできる
//本番環境では下
//app.use(cors({
//    origin: 'https://　　.com'
//  }));

app.get('/', (req, res) => {
  console.log('GET / accessed');
  res.send('unchi');
});



// ひなちゃんのフロントとつなげる処理したい
//app.use(express.static(path.join(__dirname, '../ひなちゃんが作ったディレクトリ名')));  //Reactがビルドした静的ファイルを返す


// ログを出す共通ミドルウェア
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
  });
  
//新規登録
app.post('/api/register',async(req,res) => {
  const { email, username, password } = req.body;
  const id = uuidv4();
  try{
      const hashedPassword = await bcrypt.hash('password', 10);
      await pool.query(
      'INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)',
      [id, email, username, hashedPassword]
    );
    res.status(201).json({ message: 'User created' });
  }catch(err){
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

///ログイン画面
app.post('/login', (req, res) => {
  const { userid, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  if (userid === 'user' && hashed === 'password_hash') {
    try{
      await pool.query(
      "SELECT * FROM internship WHERE user_id = 'userid'",///////////////////////////////////////ここ考える

      );
      res.status(201).json({message: '', internship})
    }catch(err){

    }
    // JWTトークンを発行（有効期限1時間）
    //const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    //res.json({ success: true, token,user });

    //いったんそのまま情報返す
    res.json({ success: true, user });

  }else if(username === 'user' && password != 'pass'){
    res.status(401).json({ success: false, message: 'パスワードが違います' });
  }else {
    res.status(401).json({ success: false, message: 'そのメールアドレスは登録されていません' });
  }
});


//トークン認証ミドルウェア(これなにも分かってない)
//function authenticateToken(req, res, next) {
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];

  //if (!token) return res.sendStatus(401); // トークンなし

  //jwt.verify(token, SECRET_KEY, (err, user) => {
    //if (err) return res.sendStatus(403); // トークン無効
    //req.user = user;
    //next();
  //});
//}

//app.get('/user-info', authenticateToken, (req, res) => {
  //res.json({ message: 'ユーザーデータ', user: req.user });
//});

  
//サーバーきどう
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  

  