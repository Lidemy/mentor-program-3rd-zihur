資料庫名稱：zihur_comments

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 留言 id  |
| user_id  | integer     | 會員 id  |
| nickname | VARCHAR(32) | 暱稱     |
| avatar   | text        | 頭像網址 |
| content  | TEXT        | 留言內容 |
| created_at | DATETIME  | 時間 |
| is_ deleted | BOOLEAN  | 是否刪除 |



資料庫名稱：zihur_users

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 會員 id  |
| nickname | VARCHAR(32) | 暱稱     |
| account  | VARCHAR(64) | 帳號     |
| password | VARCHAR(64) | 密碼     |
| sexuality | TINYINT    | 性別     |
| avatar   | text        | 頭像網址 |
| created_at | DATETIME  | 時間     |
| is_admin | BOOLEAN     | 管理身份 |
| is_ deleted | BOOLEAN  | 是否刪除 |


頁面管理：
展示前台
index.php 展示所有留言、新增留言
login.php 登入頁面
signup.php 註冊頁面

管理後台
admin.php 管理所有留言 // 先不做

處理功能：
conn.php 連結 mySQL 資料庫
handle_add.php 處理留言
handle_login.php 處理登入
handle_logout.php 處理登出
handle_signup.php 處理註冊