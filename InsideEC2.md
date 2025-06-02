# 構築手順  
## EC2インスタンス
 - 東京リージョン
 - サブネットのリージョン："ap-northeast-1a"
 - セキュリティグループ：ssh,http,https(それぞれどこからでもアクセス可能)

## nginx
 - httpでshukatu.0824.comにアクセスしてきた人をhttpsにリダイレクト
 - localでは3012番にたてる

## github CI/CD
- mainにpushでデプロイ
- そのあとpm2をrestart

## pm2
- clientを3011で起動
- serverを3012で起動
