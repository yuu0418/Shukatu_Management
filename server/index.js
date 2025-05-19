const express = require('express');
const cors = require('cors');
const app =express();
const path = require('path');
const PORT = process.env.PORT || 3000;//クラウドで環境変数使われてたらそれ使う
//トークン発行
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // ※本番では .env に保存！
//.env読み込み
require('dotenv').config();
const { Pool } = require('pg');




app.use(cors());//フロントからAPIさばにアクセスできる
//本番環境では下
//app.use(cors({
//    origin: 'https://　　.com'
//  }));

app.get('/', (req, res) => {
  console.log('GET / accessed');
  res.send('unchi');
});






const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});

module.exports = pool;

// ひなちゃんのフロントとつなげる処理したい
//app.use(express.static(path.join(__dirname, '../ひなちゃんが作ったディレクトリ名')));  //Reactがビルドした静的ファイルを返す


// ログを出す共通ミドルウェア
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
  });
  

//分離構成の場合
///ログイン画面での処理(コピペ)データベース構築後変更
app.post('/login', (req, res) => {
  const { username, password } = req.body;
    // DBで認証確認（省略）
  if (username === 'user' && password === 'pass') {
    //仮情報(あとでDBから引っ張る処理を追加)
    const user = {
      id: 1,
      name: '大久保 優',
      email: '1124iikaraiti@gmail.com',
      password: '0824'
    };
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



app.use(express.json()); // JSONデータを受け取れるようにする




  
//サーバーきどう
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  