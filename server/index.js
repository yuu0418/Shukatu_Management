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
app.post('/login', async(req, res) => {
  const { userid, password } = req.body;
  try{
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userid]
    );

    if(result.rows.length === 0){
      return res.status(500).json({success: false, message: 'そのユーザーは登録されていません'});
    }
    
    const password_hash = result.rows[0].password_hash
    bcrypt.compare(password,password_hash,async function(err,result){
      if(err){
        return res.status(500).json({success: false, message: 'パスワード比較エラー'});
      }
      if( result ){
        try{const internship_data = await pool.query(
          "SELECT * FROM internship WHERE user_id = $1",
          [userid]
          );
          res.status(200).json({success: true, data: internship_data.rows})
        }catch(err){
          res.status(500).json({success: false, message: 'インターン情報取得エラー'});
        }
      }else{
        res.status(401).json({success: false, message: 'パスワードが違います'});
    }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success: false, message: 'サーバーエラー'});
  }
  
});

  /*
    // JWTトークンを発行（有効期限1時間）
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token,user });
  


//トークン認証ミドルウェア(これなにも分かってない)
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

app.get('/user-info', authenticateToken, (req, res) => {
  res.json({ message: 'ユーザーデータ', user: req.user });
});
*/

  
//サーバーきどう
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  

  