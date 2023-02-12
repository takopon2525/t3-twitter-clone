# Create T3 App

twitter の NextAuth で Prisma.js するときは、
migrate が必須。
でないとエラーが出てしまう。

https://next-auth.js.org/adapters/prisma

```
$npx prisma migrate dev
```

まずは画面を作る。
コメント投稿の部分までを入れる。
inspire された記事として投稿する。
1week で作成する。
tweet のデータを保存する。
$5 で販売する。国内 500 　 25 万円
海外 2000 $10000 120 万円
$6 の tutorial
tutorial を販売する

---

ダミーだけの投稿画面を作成
feed widget 含め
↓
create tweet して表示するところまで
↓
tweet 生データを入れて
表示
like の切り替えまで
comment を行う

comment の comment の実装はどうやるの？？
そこまでは考える必要は無い。
とりあえずどこまでの db 設計なら問題ないか遊んでみる。

★ とりあえず、educational なものなのでＯｋ
ツイートも返信ツイートも一緒
tweet table
tweet
id
reply_to 　 1 nullable
↓
reply_tweet_id null のものだけ持ってくる

↑
ちょっと難しそうなので
comment table を用意する

tweet_id
text
created_at

---

必要なライブラリの追加

react-hot-toast
react-icons
react-timeago
react-twitter-embed

## 参考記事

ここからは参考記事について書いておく。

## zodに関して

zod のエラー関連
[Zodで真のTypeScript firstを手にする](https://zenn.dev/ynakamura/articles/65d58863563fbc)
[tRPCのinputでZodのバリデーションエラーを使ったときのエラーメッセージをいい感じにする](https://zenn.dev/catnose99/scraps/081321b966fdf8)
[TypeScriptのゾッとする話 ~ Zodの紹介 ~](https://zenn.dev/uttk/articles/bd264fa884e026#.safeparse)

TweePost.tsxのtweetSchema.parse({ text });で
({text})部分がなかったためにtry catchに入らなかった。

##　TypeScriptの型安全に関して

配列から型を生成する類の芸当を行う際に使う。
[通貨の配列から通貨の型を作りたい](https://typescriptbook.jp/tips/generates-type-from-array)

## Prisma.jsの値を取得してくるところでハマったところ

[JavaScriptの配列のネストを解除するflat()とflatMap()メソッド](https://devsakaso.com/javascript-flat-flatmap-methods/)