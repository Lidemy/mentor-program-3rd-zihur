## 請以自己的話解釋 API 是什麼
API (Application Programming Interface)，指的是一種資料交換的方式，因此 USB 也能稱之為是一種 API ( 因為 USB 提供了不同裝置之間的資料交換)，在軟體開發上，擁有資料的人 ( 以下簡稱開發者 ) 透過制定了 API 文件，讓其他的人能夠透過制定好的 API 規則，去獲取開發者的資料，而一般溝通上說到串 API，便是指將軟體之間的資料交換方式串聯好。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- HTTP Status 203(非授權信息)
伺服器已成功處理了請求，但返回的信息可能來自另一來源。
- HTTP Status 305（使用代理）
請求者只能使用代理訪問請求的網頁。
如果伺服器返回此響應，表示請求者應使用代理。
- HTTP: Status 403(禁止)
伺服器拒絕請求


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


| 說明 | Method | 串聯路徑 (Path) | 物件內參數 | 範例 |
| -------- | -------- | -------- |-------|-------|
| 增加餐廳資料 | POST     | `https://restaurant/list` | name: 餐廳名稱 | 新增加一筆餐廳資料 |
| 讀取所有餐廳資料 | GET      | `https://restaurant/list` | 無 | `https://restaurant/list` 讀取所有的餐廳資料 |
| 讀取單一餐廳資料 | GET      | `https://restaurant/list/:id` | 無 | `https://restaurant/list/2` 讀取 id2 的餐廳資料 |
| 更改餐廳名稱 | PATCH    | `https://restaurant/list/:id` | name: 餐廳名稱 | `https://restaurant/list/2` 更改 id2 的餐廳名稱 |
| 刪除餐廳資料 | DELETE   | `https://restaurant/list/:id` | 無 | `https://restaurant/list/2` 刪除 id2 的餐廳 |