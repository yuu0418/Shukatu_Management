const express = require('express');
const cors = require('cors');
const app =express();
const PORT = process.env.PORT || 3000;//クラウドで環境変数使われてたらそれ使う


app.use(cors());//フロントからAPIさばにアクセスできる
//本番環境では下
//app.use(cors({
//    origin: 'https://　　.com'
//  }));
  


// ひなちゃんのフロントとつなげる処理したい
app.use(express.static(path.join(__dirname, '../ひなちゃんが作ったディレクトリ名')));  //Reactがビルドした静的ファイルを返す

//組み込み構成の場合
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ひなちゃんが作ったディレクトリ名/index.html'));  //ルーティング用のURLにアクセうされたときindex.htmlで返す(reactだから)
  });

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
    res.json({ success: true, token: 'abc123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


app.use(express.json()); // JSONデータを受け取れるようにする




  
//サーバーきどう
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  