# Create T3 App

twitterのNextAuthでPrisma.jsするときは、
migrateが必須。
でないとエラーが出てしまう。

https://next-auth.js.org/adapters/prisma
```
$npx prisma migrate dev
```

まずは画面を作る。
コメント投稿の部分までを入れる。
inspireされた記事として投稿する。
1weekで作成する。
tweetのデータを保存する。
$5で販売する。国内500　25万円
             海外2000 $10000 120万円
$6のtutorial 
tutorialを販売する
--------------------------------
ダミーだけの投稿画面を作成
feed widget 含め
↓
create tweetして表示するところまで
↓
tweet 生データを入れて
表示
likeの切り替えまで
commentを行う

commentのcommentの実装はどうやるの？？
そこまでは考える必要は無い。
とりあえずどこまでのdb設計なら問題ないか遊んでみる。

★とりあえず、educationalなものなのでＯｋ
ツイートも返信ツイートも一緒
tweet table 
tweet
id
reply_to　1 nullable
↓
reply_tweet_id nullのものだけ持ってくる

↑
ちょっと難しそうなので
comment tableを用意する

tweet_id
text
created_at
