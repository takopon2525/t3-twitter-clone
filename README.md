# Create T3 App

twitterのNextAuthでPrisma.jsするときは、
migrateが必須。
でないとエラーが出てしまう。

https://next-auth.js.org/adapters/prisma
```
$npx prisma migrate dev
```