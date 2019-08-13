資料庫結構：
zihur_users
| 欄位名稱 | 欄位型態 | 說明 | 屬性 |
|----------|-------------|----------|------|
|  id  |    integer      | 會員 id  | 主鍵 ai |
| nickname | VARCHAR(64) | 暱稱     ||
| account  | VARCHAR(64) | 帳號    | 唯一 |
| password | VARCHAR(64) | 密碼     ||
| sexuality | set( 男性, 女性 ) | 性別 |  |
| avatar   | text        | 頭像網址 ||
| authority | set(normal, admin, super_admin) | 管理身份 | 預設 normal |
| is_deleted | BOOLEAN  | 是否已刪除 | 預設 0 |
| created_at | DATETIME  | 建立時間 | 預設值 |

zihur_users_certificates
| 欄位名稱 | 欄位型態 | 說明 | 屬性 |
|----------|-------------|----------|------|
|  id  |    integer      | 通行證 id  | 主鍵 ai |
| user_id  | integer | 會員 id     | 關聯 users |
| certificate | VARCHAR(64) | 通行證     | 唯一 |
| created_at | DATETIME  | 時間     | 預設值 |

zihur_comments
| 欄位名稱 | 欄位型態 | 說明 | 屬性 |
|----------|----------|------|----|
|  id  |    integer      | 留言 id  | 主鍵 ai |
| user_id  | integer     | 會員 id  | 關聯 users |
| parent_id | integer    | 父文章 id | 預設 0 |
| layer    | TINYINT     | 層級 | 預設 0 |
| content  | TEXT        | 留言內容 ||
| is_deleted | BOOLEAN  | 是否刪除 | 預設 0 |
| created_at | DATETIME  | 時間 | 預設值 |

zihur_thumbs
| 欄位名稱 | 欄位型態 | 說明 | 屬性 |
|----------|----------|------|----|
| id | integer | 評價 id | 主鍵 ai |
| post_id | integer | 文章 id | 關聯 comments |
| user_id | integer | 會員 id | 關聯 users |
| is_liked | SET(like, dislike, none) | 是否喜歡 | 預設值 none |
| created_at | DATETIME  | 時間 | 預設值 |
