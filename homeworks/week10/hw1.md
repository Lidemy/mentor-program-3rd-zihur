# Week10 複習週筆記
照慣例又到了新的一輪複習週了，這篇是延續著這篇 [Week5 複習週筆記](https://hackmd.io/pcFZrgR4TICSR8msMCvGDw?view) 之後的內容，如果你和我一樣是前端新手可以去看看唷！
先預告一下這篇會寫到的內容大概會有：

- HTML 與 CSS
- DOM 以及 JavaScript 如何與網頁互動
- 前端利用 Ajax 與後端串接
- PHP 與 MySQL

另外一定要推一下這兩篇文章
邊學習前端的過程邊看這兩篇，感覺真的會差很多！
[零基礎的小明要如何成為前端工程師？](https://medium.com/hulis-blog/frontend-engineer-guide-297821512f4e)
[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)

那麼準備開始囉！

# Week6 - 前端基礎（一）
這週終於要進入前端的領域，學習基礎的 **HTML** 以及 **CSS**，並且開始用 HTML 與 CSS 打造出基本的網頁。另外目前基本必備的 **RWD**、**SEO** 也會大概提及一下。

## **HTML（HyperText Markup Language）**
HTML 是一種超文本標記語言，並不能算是程式語言，因為 HTML 並沒有太多程式的概念在裏頭，只是有很多的成對標籤，並且讓瀏覽器去解析這些標籤，所以實際上就是一種標記語言。
在 HTML 裡面，標籤大多都是成雙成對的出現，像這樣 `<head>` `</head>`，`<h1>` `</h1>`。
自身成對的標籤如：`<meta charset="utf-8" />`，後面的 `/` 可以不加上，但一般都會加上。

下面就是一個基本的網頁大概組成
```htmlembedded=
<!DOCTYPE HTML>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8" />
  <title>標題</title>
</head>
<body>
  <h1>123</h1>
  <div>
    內容...
  </div>
</body>
</html>
```

- `<!DOCTYPE HTML>` 告訴瀏覽器，這份文件要使用最新的 HTML 格式來渲覽這份文件
- `<html>` 是整份文件的最外圍，接下來的 `<head>`、`<body>` 都會放在這裏面
- `lang="zh-Hant-TW"` 是聲明接下來的內容使用的語言是什麼，對於區域搜尋有幫助
  zh-Hant-TW 指的是繁體中文-台灣區域，其他地區的語言可在上網查詢。
- `<head>` 通常會放一些關於這個網頁的基本相關資訊，`<body>` 則是放著網頁的主要內容
- `<meta charset="UTF-8">` 告訴瀏覽器，接下來使用什麼編碼處理內容
- `<!--我是註解內容-->` 你也可以和一般程式語言一樣寫上註解

### 各基礎標籤介紹，熟悉的可以直接跳過。
- 別忘了網頁最早的用途其實是顯示文章，所以會有一些基本針對文章的標籤。
- `<title>` 放在 `<head>` 內，指的網頁標題，會呈現在瀏覽器的每個分頁上面。
- `<h1>`~`<h6>` 指的是內容標題，共有 6 個層級，其中 `<h1>` 根據 GOOGLE 的搜尋建議，在每一個網頁上都應該只會出現一次，表示此網站最為重要的部分，也有助於搜尋結果，可用於 LOGO 部分。
- `<p>` 段落文章的意思，paragraph。
- `<div>` 是分割區塊的意思，division，有一點分組的意味。
- `<span>` 是行內標籤，常用在一個文章內，需要特別強調某段文字時，可以用這個標籤。
- `<img>` 是圖片標籤 其中具有一些常用屬性，如：src，利用它去接圖片網址，alt 則是當死圖時顯示的替代文字，title 則是當滑鼠靠上時，出現的輔助文字說明。
- `<ul>` `<ol>` `<li>` 清單標籤，ul 表示無數字排序，ol 表示有數字排序，li 必須放在上面兩個標籤以內。
- `<pre>` 顯示完整內容，preformatted text，因為一般狀態下，寫程式碼時換行會被視為空白鍵，這能強制呈現原本的完整內容。若不想使用這指令而想換行必須要打 `</br>`。
- `<table>` 表格，`<tr>` table row，`<th>` table head，`<td>` table data，依序表示水平欄位、欄位標頭、欄位資料。
  ```htmlembedded=
  <table>
    <tr>
      <th>我在第一水平欄位</th>
      <th>標頭一般會變粗體</th>
    </tr>
    <tr>
      <td>我在第二水平欄位</td>
      <td>資料</td>
    </tr>
  </table>
  ```
  <table>
    <tr>
      <th>我在第一水平欄位</th>
      <th>標頭一般會變粗體</th>
    </tr>
    <tr>
      <td>我在第二水平欄位</td>
      <td>資料</td>
    </tr>
    <tr>
      <td>我在第三水平欄位</td>
      <td>資料</td>
    </tr>
  </table>
- `<a>` 錨點或超連結標籤，anchor，可以有兩種用途：
  1. 連結到外部
  可以利用 href（**h**ypertext **ref**erence）屬性連結到外面的網址，
  還具有 target 屬性，預設是 `_self` 原頁面連到新頁面，`_blank` 會另開一個分頁連過去
  2. 連結到內部
  同樣利用 href 屬性，但填寫上網頁內其他標籤的 #id，點擊後可直接跳過去標籤位置。
- `<iframe>` 可搭配 src 屬性，直接嵌入其他人網頁的內容，但對方網站可以透過在伺服器設定 `X-Frame-Option: sameorigin` 拒絕別人嵌入。

- **表單** `<form>`、**輸入框** `<input>`
  這兩個表單標籤，有部分需要注意的地方，`<form>` 必須放在最外面，包住 `<input>`， 這樣輸入框內所填寫內容才會被囊括到表單內一同送出，其中 `<input>` 具有 type 屬性，可以指定這個輸入框應該是什麼樣類型的。更多資料可以查看這麼 [網頁](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。
  ```htmlembedded=
  <form action="###">
    <input type="text" />
    <input type="password" />
    <input type="button" />
  </form>
  ```
- 如何在網頁內顯示標籤？-Escape
  有時候我們想在網頁內顯示出`<` `>` `&`等符號，卻會被解析成語法，這時候可以用跳脫符號
  以下只列出常見的：
  |符號 |跳脫符號|
  |:---:|:---:|
  |  <  | &lt |
  |  >  | &rt |
  |  <  | &amp |
  
  
  
### 語意化標籤（Semantics Elements）
撰寫 HTML 時，要注意所謂的語意化標籤，如果你檢視別人的網頁原始碼，常會看到有人用這類標籤，他們的功能和 div 一樣，但更多了語意的概念，透過這些標籤，機器和工程師們可以更快地知道這個區塊內容是什麼。常見的語意化標籤有：`<main>`、`<footer>`、`<nav>`...等等

## SEO（Search Engine Optimization）
指的是**搜尋引擎優化**，主要目的就是幫助搜尋引擎理解我們的網頁，主動地讓我們的網頁在 google、yahoo……等搜尋引擎更為方便被搜尋到，而我們要如何在 HTML 做到這件事情呢？
- 有一個標籤是 `<meta>`，必須放在 `<head>` 裡面，它具有一些屬性和設定，能幫助我們做一些簡單的 SEO，下面是些簡單常見的作法：
  ```htmlembedded=
  <meta name="keyword" content="關鍵字, 關鍵字, 關鍵字"/>
  <meta name="description" content="網站內容敘述"/>
  ```

- **og（Open Graph Protocal）**
  這東西其實是幫助其他網站 (如社交網站 FB) 的爬蟲更了解你的網站內容。
  ```htmlembedded=
  <meta property="og:title" content="FB 標題內容">
  <meta property="og:description" content="FB 簡介敘述">
  <meta property="og:image" content="圖片網址">
  <meta property="og:image:width" content="550">
  <meta property="og:image:height" content="412">
  ```

- **JSON-ld（JSON for Linking-Data）**
  其實和 Open Graph 有點像，目的是用固定化的格式，幫助機器理解網頁內容，有許多參數可使用，請參考這個 [網頁](https://json-ld.org/)

- **robots.txt**
  給網頁爬蟲看的檔案，通常放在根目錄底下，告訴爬蟲應該做哪些事情，其中有些網站會有所謂的 **sitemap.xml**，因為網站非常大的關係，所以提供 sitemap.xml 讓爬蟲去優先爬特定的網頁。
  
- 多語言網站的整合
  有些時候你的網站有根據不同國家而有不同的語言，可以透過下面的方式，讓爬蟲知道
  ```htmlembedded=
  <link rel="alternate" hreflang="en" href="網址"/>
  <link rel="alternate" hreflang="uk" href="網址"/>
  ```
- App 下載推薦
  有時候你可能會開發出 App 版本，你會希望對方下載，可以透過類似下面的方式
  ```htmlembedded=
  <meta property="al:ios:app_name" content="名稱"/>
  <meta property="al:ios:app_store_id" content="id"/>
  ```
- Google Search Console
  這是 Google 提供的工具，能幫助你管理自己的網站，有興趣可以再研究，不再贅述。

上面這裡只有簡單介紹一些內容，SEO 一般也不會是前端工程師完全負責的，因為這通常有專門負責的人去做，更詳細的 SEO 技巧，就必須要再去進一步學習啦～

## CSS（Cascading Style Sheet）
階層式樣式表，主要負責整個網頁畫面的外觀，有三種寫法，能讓 HTML 和 CSS 做連接。
1. 直接的每一個標籤裡面寫上 style 屬性，並進行更改。
   ```htmlembedded=
   <p style="color: red;">
   ```
2. 在 Head 裡面直接寫上 style 標籤，在 style 標籤區塊內進行 CSS 設定。
   ```htmlembedded=
   <head>
     <style>
     p {
       color: blue;
     }
     </style>
   <head/>
   ```
3. 從外部引入 CSS 檔案進來。
   ```htmlembedded=
   <link rel="stylesheet" href="要連結的 CSS 檔案">`
   ```
以上面三種方式來說，第一種方式最不推薦，因為這種方式將 HTML 標籤和 CSS 混合在了一起，導致非常難以維護，第二種方式則是把 CSS 拉了出來放到了上面，適合用在簡單示範的時候，最後一種，是最常用的方式，在外面獨立寫一個 CSS 樣式表，再將其引入進來，讓 HTML 和 CSS 分開管理。

### CSS 選擇器
由於 CSS 屬性非常多，這也只是筆記，所以下面只會講基本常用的選擇方式，和一些小技巧。
- CSS Selector - 全部選擇、標籤、class、id
  ```css=
  * {color: orange}  // 選取所有元素標籤
  p {color: red}  // 選取某個一般 tag 標籤
  .class {color: blue}  // 前面有 . 選取某個 class 標籤
  #id {color: green}  // 前面有 # 選取某個 id 標籤，要注意 HTML 中一般只能有一個
  ```
- CSS Selector - 同時符合
  選擇器之間直接相接，表示要同時符合條件
  ```htmlembedded=
  <style>
    div.red {color: red}  /*選擇器之間直接相連*/
  </style>
  ```
- CSS Selector - 底下的元素
  用一個 ` ` 連接，表示下面的全部被選擇元素，不管幾層
  用 `>` 連接，表示**下面一層**的全部被選擇元素
  ```htmlembedded=
  <style>
    div .red {color: red}  /*注意這個中間多了一個 空白，和上面的有所不同*/
    div > .red {color: red} 
  </style>
  ```

- CSS Selector - 相鄰的元素
  用 `+` 連接，表示 `div` 同一層旁邊的 `.red`
  用 `~` 連接，表示 `div` 同一層之後的所有 `.green`
  ```htmlembedded=
  <style>
    div + .red {color: red}
    div ~ .green {color: green}
  </style>
  ```
- CSS Selector - Pseudo-classes 偽類
  偽類，指的是這是一個實際上不存在的選擇器，通常表示一個狀態
  ```htmlembedded=
  <style>
    div:hover {color: green}  /*這表示當滑鼠移過去的時候才作用*/
  </style>
  ```
- CSS Selector - :nth-child(n)
  需要注意，這邊指的第 n 個 div，都是實際計算 div 的位置，而不是被賦予 .red 才有計算
  為了區別，通常會是用 `:` 做為區別
  ```htmlembedded=
  <style>
    div .red:first-child {color: green}  /*表示第一個 .red*/
    div .red:last-child {color: green}  /*表示最後一個 .red*/
    div .red:nth-child(n) {color: green}  /*表示第 n 個 .red*/
    div .red:nth-child(odd) {color: green}  /*表示奇數個 .red*/
    div .red:nth-child(3n+1) {color: green}  /*表示 3n+1 個 .red，1,4,7 ...*/
  </style>
  ```
- CSS Selector - Pseudo-element 偽元素
  和偽類類似，但這是一個實際上不存在的元素
  為了區別，通常會是用 `::` 做為區別
  ```htmlembedded=
  <style>
    div .red::before {content: ""}  /*從選取元素 .red 前面插入東西*/
    div .red::after {content: ""}  /*從選取元素 .red 後面插入東西*/
    div .red::selection {content: ""}  /*選取文字反白後*/
  </style>
  ```
- 權重：!important > id > style > class > element

### 盒模型（Box model）
這個非常重要，但因為要用圖片比較好解釋，所以請一定要去 google 更明確的資料。
可以設定：`box-sizing: border-box`。

### CSS 命名方式
雖說 CSS 可以讓人自由命名，但其實已經有著許多建議的命名方式，這並非強制，但如果你依循著這樣的命名規則，對於以後不論是自身作業或著和他人協作都會降低不少時間成本。這邊介紹的是 **BEM** 這套命名規則。**BEM（Block Element Modifier）** 將 CSS 命名時分割成三個部分：
- Block 區塊
- Elment 元素名稱
- Modifier 修飾符名稱

更多請參考[這個網頁](https://cythilya.github.io/2018/05/22/bem/)。

### RWD（Responsive web design）
響應式網站設計，能夠自動根據裝置的畫面大小或縮放，而產生出相對應的畫面。
在目前人手一機的時代，尤為重要。
要達成響應式網站，必須在 `<head>` 裡面加上下面這段程式碼
```htmlembedded=
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
這段程式碼的意思大概是告訴網頁偵測並配合裝置螢幕寬度。

接著，我們可以在 CSS 裡面設定下面這段程式碼
```css=
@media screen and (max-width: 420px) {}
```
這是告訴裝置，當畫面寬度在 420 以下時，應該採用的 CSS 設定。

要讓 RWD 的設計更為完善，除了上面這兩個部分還有其他細節，這邊就不贅述
大概就是別寫死寬高，盡量以百分比去做呈現，詳細教學可參考 [這個網頁](https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=zh-tw)

## 複習週 Week6 心得小結
學到目前，我覺得其實這週的內容大多是很基礎的東西，但就是要多實作去練習，有一開始會有很多東西都是，遇到了才去查相關指令，然後就會了，而在一開始如果看了一大堆，認為自己已經會了，但都沒動手實作，那麼有百分之八十以上的機率，當你在初次實作時，通通忘光，而且會對已學過的屬性有新的認知，譬如，我每次用 Flex 來切板，都會有新體悟，連 margin 也是，而這些通常都是一些所謂的小技巧。

#### 待補筆記：
Flex、Grid、float、完整的 RWD 技巧整理、position 相關、其他小技巧

# Week7 - 前端基礎（二）
這週開始，要學習如何將過去學的 JavaScript 結合到網頁上了，因此我們會學習到一個新的名詞 DOM，並學習如何操作它，以及明白非常重要的事件傳遞機制：冒泡與捕獲。

## 到底如何執行 JavaScript？
過去我們寫了非常多的 JS 檔案，會發現到我們都是在 CLI 裡面的 node.js 去執行這份檔案，但是我們在操作網頁的時候，可沒有這麼麻煩壓？那麼我們是怎麼在網頁上執行 JS 的呢？還記得，瀏覽器本身其實也是一個程式嗎？node.js 這隻程式替我們的電腦建立了可以執行 JS 檔案的環境，那麼瀏覽器當然也可以做到這件事情！

但是透過 **瀏覽器** 執行和透過 **node.js** 執行 JS 檔案實際上是會有些許差異的，基本的語法都會是相同的，但由於執行環境並不同，因此有部分功能會是 node.js 能跑，但瀏覽器不能，或著香反過來。一般而言 node.js 的自由度會比瀏覽器更高。

要讓瀏覽器替我們執行 JS 檔案，我們只需要在寫網頁的時候透過 `<script>` 標籤，引入 JS 檔案到網頁裡面即可。
```htmlembedded=
<script src="index.js"></script>
```
需要注意這段程式碼引入的位置如果是在開頭，那麼會發生部分 HTML 內的元素還沒解析完成，而造成出錯，因此許多人會將上面這段程式碼放在頁尾的部分。或著你可以在 JS 檔案後面加上一項參數 `defer`，讓瀏覽器等到其他元素都解析完之後才執行這份 JS 檔案。
```htmlembedded=
<script src="index.js" defer></script>
```

p.s 你也可以直接把 JS 語法像上面所說的類似第二種 CSS 嵌入方法一樣寫在 html 裡面的某一段，然後用 `<script>` 標籤包住。但同樣並不完全建議。

```htmlembedded=
<script>
  ...
  ......
</script>
```

## DOM 物件文件模型（Document Object Model）
是一種 Web 的 API，透過 DOM 的規則，以一種將文件轉換成物件的形式，讓我們輕易地在 JavaScript 裡面操作並影響 HTML 的內容。
具體的內容則是將 HTML 文件內由上而下的將**文件 document**、**標籤 tag**、**元素 element**、**屬性 attribute**、**文本 text**……等都視之為**節點 node**，通過選擇不同的節點，我們便能輕易地（才怪！我覺得指令超麻煩又難找！）選擇到裡面的內容。

### 選擇想要的元素
在 JS 想要選擇想要的元素有非常多種方式，而最一開始普遍都是從文件 document 開始。
- getElementsByTagName('')
  可選到所有指定的 HTML 標籤，並以類似陣列 (HTMLCollection) 的方式呈現。
  因此需要用選取陣列的形式，選擇特定的 tag 標籤。
  ```javascript=
  document.getElementsByTagName('div');  // 選到所有的 div 標籤
  document.getElementsByTagName('div')[0];  // 選到第二個 div 標籤
  ```
- getElementsByClassName('')
  可選到所有帶有指定的 class 標籤，同樣以類似陣列 (HTMLCollection) 的方式呈現。
  ```javascript=
  document.getElementsByTagName('div');  // 選到所有的 div 標籤
  document.getElementsByTagName('div')[0];  // 選到第二個 div 標籤
  ```
- getElementById('')
  可選到所有帶有指定的 id 標籤，注意因為 id 照理只會有一個，所以這邊沒有 s。
  ```javascript=
  document.getElementByTagName('nick');  // 選到所有的 div 標籤
  ```
- querySelector('')
  可選到 **第一個** 符合條件的標籤，條件可以和 CSS 一樣的選法
  ```javascript=
  document.querySelector('div');  // 選到第一個 div 標籤
  document.querySelector('.div');  // 選到第一個 .div 標籤
  document.querySelector('#div');  // 選到第一個 #div 標籤
  ```
- querySelectorAll('')
  和上面不同，這個會選擇 **所有** 符合條件的標籤，並以類似陣列 (Nodelist) 的方式呈現。
  ```javascript=
  document.querySelector('div');  // 選到所有 div 標籤
  document.querySelector('.div');  // 選到所有帶 .div 標籤
  document.querySelector('#div');  // 選到所有帶 #div 標籤
  // 因為上面都是類似陣列呈現，所以必須要用陣列去進一步選擇指定的標籤
  document.querySelector('div')[0];  // 選到第一個 div 標籤
  document.querySelector('.div')[0];  // 選到第一個帶 .div 標籤
  document.querySelector('#div')[0];  // 選到第一個帶 #div 標籤
  ```
  
### 改變選擇元素的 CSS
選到元素之後，你可以有非常多種方式去做調整元素，而這部分的指令我當初覺得非常混雜，主要是不清楚知道自己目前使用的指令到底讓我們跑到了個狀態。

一般來說要改變 CSS，可以這麼做
- 第一種方式
  直接更改 style 屬性
  ```javascript=
  const element = document.querySelector('div') // 先選到元素，並給予變數
  element.style.padding = 10px;  // .sytle 類似進入 style 的設定
  // 接著指定 padding 的值。
  ```
  要注意的是如果要更改 padding-top 等有 `-` 連接符號的屬性，由於 . 後面不能加上此符號，因此要改成像 `paddingTop` 或著 `['padding-top']` 的方式去更改。

- 第二種方式
  另外添加 class
  ```javascript=
  const element = document.querySelector('div') // 先選到元素，並給予變數
  element.classList.add('.class1', '.class2');
  // .classList 類似進入此元素的 class 設定
  // 接著利用 add 或著 remove 指令，去添加或刪除 class 名稱。
  // 多個名稱用 class 分開。
  ```
  這種方式是一開始就預先寫好 class，之後再利用這種方式直接賦予 class 名稱，讓 CSS 生效並蓋過原本的狀態。

實作上，一般會使用第二種用另外添加 class 的方式去做更改。

### 改變選擇元素的內容
上面說了如何改變元素的 CSS，接著是元素的內容
改變內容有三個指令
- innerText
  若用 console.log 只會出現文字，不會出現其餘的標籤
  但是改變時，若有其他標籤，也會被一併替換。
- innerHtml
  若用 console.log 會連同裡面的標籤一起出現
  同樣在改變時，會連同所有標籤一併替換
- outerHtml
  若用 console.log
  會連同自己的標籤也一併顯示
  改變時一樣會所有標籤一併替換
  
### 一些 DOM 操作指令
- 刪除指定標籤 - `removeChild()`
  要刪除標籤之前要先找到其父元素才能夠刪除
```javascript=
const element = document.querySelector('div');
element.removeChild(document.querySelector('a')) // 會刪除 div 下的 a 標籤及內容
```
- 增加標籤 - `appendChild()`
  這個指令是替目前選到的元素增加一個子元素，所以一樣要先找到父元素
  別忘了要放入元素之前必須要先新建立一個元素，才能放進去。
  這時候會用到一個指令 `createElement('')` 以建立元素。
```javascript=
const element = document.querySelector('div');
const newLink = document.createElement('a') // 建立一個新的 a 標籤

element.appendChild(newLink) // 會增加 a 標籤
```
#### 作業細節補充
- 選擇插入標籤在某個子節點之前 - `prepend()`
```javascript=
boardMessage.prepend(newdiv, boardMessage.querySelector('div'))
// newdiv 會被安插在第一個 div 之前。
```
- `textarea.value` 才抓的到當前輸入的內容。

## JavaScript 網頁事件處理
### addEventListener
要讓 JavaScript 監聽網頁上的事件，非常簡單，利用下面的語法即可，這會讓我們在點擊時元素時才執行，其餘的還有非常多監聽事件可以選擇，可到 [這裡](https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener) 查詢
```javascript=
addEventListener('click', function(){
  ...
  ......// 你希望執行的程式碼
})
```
#### 作業細節及部分相關指令紀錄
- keyup、keypress、keydown 差異
  放開按鍵時，僅有部分按鍵作用、比起 keypress 可作用全部按鍵。

### 觸發事件時實際上發生了什麼事情？ - event(e)
觸發點擊事件時，實際上瀏覽器會透過參數回傳給我們一些資訊，可以透過下面這段程式碼查看
```javascript=
addEventListener('click', function(e){
  console.log(e);
})
```

透過這個資訊，我們做到一些像是下面的事情
```javascript=
// 得知使用者按下的按鍵是什麼
addEventListener('keydown', function(e){
  console.log(e.key);
})

// 得知使用者的點擊目標是什麼
addEventListener('click', function(e){
  console.log(e.target);
})

// 阻止原本預設的行為
addEventListener('submit', function(e){
  e.preventDefault();
})
```

### 事件傳遞機制（捕獲、冒泡）
事件傳遞順序為：先捕獲 (Capture Phase)，再冒泡 (Bubbling Phase)
但中間其實還有一個目標階段 (Target Phase) 唷！
- 捕獲：
  當我們點擊特定按鈕的時候，其實是從 window > document > \<tag> > element 等一層一層由上而下傳遞下去，最後捕捉到我們所要選擇的元素。

- 冒泡：
  當捕捉到我們所要的節點之後就會進入冒泡階段，一層一層由下而上傳遞回去。

而 `addEventListener` 的第三個參數，可以設定 true 或著 false（預設），讓我們決定將監聽掛在什麼樣的階段。p.s 預設為冒泡階段。

如果我們想要阻止後續的傳遞機制，可以輸入下面這個指令
```javascript=
e.stopPropagation();  // 阻止後續傳遞機制
e.stopImmediatePropagation()  // 如果有多個監聽，同時阻止所有後續的傳遞機制
```
要記得，有一點要注意的是不能設定成 `e.preventDefault`，這兩者非常容易搞混。
當我們在這過程中設定了`e.preventDefault`，事件依舊會傳遞下去，只是因為被設定了阻止預設的行為也被傳遞下去了，所以看起來跟沒有觸發事件一樣。
簡單來說，這兩者的差異最主要是一個是阻止預設行為，一個是阻止事件繼續傳遞。

更多細節：[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

### 事件代理機制（Event delegation）
事件代理意思就是我們要重複的事情太接近了，那麼直接交給一個人主要負責就好，試著自己舉個例子來說：每個人在其國家都有自由發聲的權利，但在會議上要讓每個人都要一人說一句實在是太麻煩了，也很沒有效率，因此我們才選出了上層的代議士，讓他負責整理大家的意見並在會議上進行討論。

在程式當中，最常用到的例子之一就是群組按鈕，當我們要對每個按鈕監聽，不如我們透過事件傳遞機制，監聽其上層的元素就好了，也更為方便。


## Callback function（重要概念）
如果仔細看可以注意到這個上面的 `addEventListener` 語法在 **參數的地方放入了另外一個 function**，你可能會疑惑這樣是可行的嗎？實際上，這是叫做 callback function，以上面這段程式碼來說，我們並沒有辦法寫成這樣。
```javascript=
const event = addEventListner('click');
```
我們都知道，程式是一行一行跑的，因此如果像上面這樣子寫，那電腦就會在上面這行卡住，直到我們點下按鈕才會接著進行下面的指令。而這裡的 callback function 就是告訴電腦，等我們呼叫了這段程式碼之後，你才回過頭來執行這段程式碼。

這個概念非常重要，這裡只是簡短紀錄，如有更深的疑問需要詳閱其他的技術文章。

### 釐清函式類型
有些人會把上面的 callback function 當作是**匿名函式**的概念，但實際上並不是。
在說明這個之前我們先來重新理解一下函式的類型有分成兩種：
> P.S：下面這兩種建議用英文比較好分，中文翻譯太多種，大家講法又都有點出入
- **function statements（函式敘述式）** / **function declaration**（函式宣告式）
  通常這種函式是用來宣告一個函式，而這個函式可以先被儲存下來，等到之後才調用這一個函式，因此又被稱之為 **function declaration**（函式宣告式）。
  
  而建立這種函式的方法就跟是平常宣告一個變數會使用 var、const、let 作為起始一樣，我們會利用 function 這個關鍵字放在前面，宣告建立這個函數
  ```javascript=
  function foo1() {
    ...
    ......
  }
  ```
  請注意這邊的 foo1 表示的是這個函式的名稱，因此這個函式式有名字的，又稱之**具名函式**，  而這個函式在程式碼當中，只是被宣告而已，因此會像下面這樣呼叫這個函式。
  ```javascript=
  foo1()
  ```
  
- **function expressions（函式表達式）**
  和上面的宣告方式不同，這種函式是在一開始的時候就直接給予了變數，或著說你可以理解為是先宣告了一個變數，而不是宣告一個函式，只是這個變數的內容恰巧是一個函式。
  ```javascript=
  var foo2 = function() {
    ...
    ......
  }
  ```
  同樣的請注意到這裡的 foo2 實際上並不是這個 function 的名稱！這裡的 foo2 是**變數名稱**，因此這個函式並沒有真正的名字，像這樣沒有名字的函式我們都稱之為**匿名函式**。
  但實際上，函式表達式也可以被命名，像下面這樣：
  ```javascript=
  // 你也可以叫 foo2 但這很蠢且沒太大意義，因此一般不會這樣做
  var foo2 = function nameFoo2() {
    ...
    ......
  }
  ```
  只是這個名字在函式外面是呼叫不到 nameFoo2() 的，因此實際上除了在 debug 的時候，是沒什麼用途的，也鮮少人會這麼使用。
  
回過頭來看，你可以知道，匿名函式的定義和 callback function 是沒有絕對關係的。
一般來說初學者使用第一種 function statements 的方式會更好理解，但在某些狀況下，function expressions 的特性，能更好的幫助我們編寫程式。

**P.S：下面是 function expressions 的優點（等熟悉之後再查這方面知識）**
- As closures
- As arguments to other functions
- As Immediately Invoked Function Expressions (IIFE)

釐清函式類型篇章的參考資料：
[Function Declarations vs. Function Expressions](https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052)
[進一步談JavaScript中函式的建立─function statements and function expressions](https://pjchender.blogspot.com/2016/03/javascriptfunction-statements-and.html)
[定義 JavaScript 函數（Functions）的各種方式](https://blog.gtwang.org/programming/defining-javascript-functions/)
[Javascript 開發學習心得 - 函數的多種寫法與應用限制](https://sweeteason.pixnet.net/blog/post/40371736-javascript-%E9%96%8B%E7%99%BC%E5%AD%B8%E7%BF%92%E5%BF%83%E5%BE%97---%E5%87%BD%E6%95%B8%E7%9A%84%E5%A4%9A%E7%A8%AE%E5%AF%AB%E6%B3%95%E8%88%87%E6%87%89)
[重新認識 JavaScript: Day 10 函式 Functions 的基本概念](https://ithelp.ithome.com.tw/articles/10191549)

#### 待補筆記：
額外科普一些 Browser 運作的相關知識背景，沒事可以看看，很不錯！
[Google developers](https://developers.google.com/web/updates/capabilities)

## 複習週 Week7 心得小結
這週當初在學習的時候主要卡在 DOM 的操作上不熟悉，可能是當初在學習時過於執著於指令的學習問題，因為在此之前都習慣去 MDN 找資料，因為想著既然要學就從最原始的學習，但 MDN 的 sitemap 規劃讓人有點不知所措。反到後來聽了 Huli 的話，先別直接看 MDN 資料，直接用指令去找關鍵字之後，瞬間開闊許多，因此，真有需要再去網路翻找指令就可以。
callback 的概念，老實說還是有點懵懵懂懂的，但覺得應該沒偏差太多，只是依舊很不習慣看利用callback 寫出來的語法，感覺超混亂...
另外在這次複習，重新花了時間了解關於函式的兩種類型，就一併紀錄下來了，這邊主要紀錄兩種函式的差異，還沒有深入到 hoisting 等其他概念，但查資料時，發現好像能把 function 當做 var 的概念，覺得很有趣，似乎能解釋一些 hoisting 的問題。

# Week8 - 前端基礎（三）
之前在第四週時有提過 API，也有讓用過 node.js 寫些小程式來串接。
而這週主要學習前端到底該如何操作 JavaScript 來進行 API 的串接，並且學習什麼是 Ajax。
學完之後，也會明白，透過 node.js 和透過瀏覽器呼叫 API 的根本差異是什麼？

## JS 透過 node.js 和透過瀏覽器的發送 API 之間的差異
- 透過 node.js 流程如下：
  發送 request：node.js → server
  回傳 response：server → node.js
  
- 透過瀏覽器流程如下：
  發送 request：JS → 瀏覽器 → server
  回傳 response：server → 瀏覽器 → JS
  
可以注意到，兩者差異主要是中間多了一個瀏覽器，這個瀏覽器會自動幫我們添加一些資訊，這些資訊對我們來說實際上會有一些限制必須要了解，後面會補充到。

## 交換資料的三種方式
- **透過 form 表單交換資料**
  我們可以在 HTML 裡面寫下 form 的表單，並且通過 submit 傳送資料到 server 端，藉此得到想要的資訊。
  ```
  透過這方式傳送的資料流程是這樣的：
  發送 request：JS → 瀏覽器 → server（等這邊處理好資料）
  回傳 response：server → 瀏覽器（這邊停止了，並且會換頁）
  ```
  這個方式，由於是直接透過瀏覽器上的表單交換資料，因此瀏覽器會接收到一份新的檔案，再重新渲染整個頁面，也因此畫面也會有很明顯的閃爍，嚴重甚至會有來自於等待伺服器處理完資料回傳時的停頓感。
  
  
- **透過 AJAX 的技術交換資料**
  這種方式和上面最大的差異在於，可以透過 JavaScript 接受必要更新的資料，並且在客戶端利用 JavaScript 處理完資料後，回應給瀏覽器進行局部的畫面重繪，而不需要重新接收整份文件，造成無謂的資料浪費。
  ```
  透過這方式傳送的資料流程是這樣的：
  發送 request：JS → 瀏覽器 → server
  回傳 response：server → 瀏覽器 → JS（這邊處理好資料之後）→ 瀏覽器
  ```
  詳細的相關介紹請看下面的 **AJAX** 部分
  
- **很聰明但有點危險的 JSONP 交換手法**
  上面說到瀏覽器其實會給我們添加一些資訊及限制
  其中一個就是**同源政策（Same Origin Policy）**
  - **同源政策**
    當我們要進行跨網域存取時，常會遇到這項限制，瀏覽器會自動判定我們是不是從自身的網域去存取這個網域底下的資料，如果不是，那麼就會擋下來。具體請看這篇 [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
  
  因此 Ajax 在交換資料時，常會因為瀏覽器的 **同源政策** 問題，而無法順利交換，然而我們可以利用同源政策對 script 標籤並無此項限制的特點，去做一個 function，並將資料做成 JSON 格式之後放在 function 裡面，之後便能讓人去引入這份文件，得到想要的資料。但這做法容易有一點資安上的問題。

## AJAX（Asynchronous JavaScript and XML）
Ajax 指的是非同步 JavaScript 與後端交換資料的一種技術或著說是觀念，這技術主要訴求為可以渲染部分需要的資料，而無須重新接受整份文件。

原先設計是以 XML 格式為基底的交換技術，因此名稱具有 XML，到後來衍伸出各種資料格式也能與後端交換，其中最為知名的便是 JSON 格式。

而我們要在瀏覽器上面達到 AJAX 功能，常會用到瀏覽器所提供的一項功能 **XMLHttpRequest**，另外有新的技術名詞叫做 **Fetch** 有興趣的話可以再去研究一下。

特別要注意，由於這種作法是動態產生內容，因此網頁裡面實際上並無內容，因此極度有可能被網路爬蟲（搜尋引擎）認為此網站並無太多資料，而降低 SEO。


### XMLHttpRequest
XMLHttpRequest 實際上就是一種 Web 的 API，常被用來實現AJAX技術
而整個交換資料的寫法大概是這樣子的
```javascript=
const request = new XMLHttpRequest();  // 意思是產生出一個 XMLHttpRequest
request.onload = function() {  // 也可以寫成 addEventListener('load', fun(){})
  if(request.status >= 200 && request.status < 400) {
    console.log(request.responseText)
  } else {
    console.log('err')
  }
}
request.onerror = function() {  // 只有錯誤時執行
  console.log('error')
}

request.open('GET', '要發出去的網址', true)  // 設定請求類型，網址，是否異步
request.send()  // 正式傳出 request
```
### XMLHttpRequest的更多指令及作業細節補充
- readyState 狀態
  0 表示已經產生 XMLHttpRequest，但還沒連結要撈的資料
  1 表示用了 open，但還沒把資料傳送過去
  2 表示偵測到你有用 send
  3 表示 loading
  4 表示你撈到資料了，數據已經完全接收
- onload
  確定有資料回傳了，可使用 onload 來取得回傳的值
- 如果將 `const xhr = new XMLHttpRequest;` 寫在函數外，之後兩個 function 各自送出請求，前者 function 得不到回應，因此要寫在函數內。
- 解決非異步的順序問題，可以用 callback function
- 錯誤優先回呼訊息 關鍵字查詢
- 傳送資料時的格式大多像是這樣：content=value
  不用再轉成其他格式或添加有的沒的，確保傳出去的內容是字串即可
- 記得要處理轉碼問題 → encodeURL()，重要但我還沒花時間理解...
- 這是把資訊寫進 header 的方法範例
  `xhr.setRequestHeader('Client-ID', 'u2i5e5oy5cwidtrgmt44nf110ty1vd')`
- content-type 的類型設定
  `xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')`
## 複習週 Week8 心得小結
這週的內容我覺得主要是在要讓我們更加熟悉 Week7 的技巧之外，額外添加上 XHR 的相關知識，負荷量不算重，可能難度是因為有前面的知識量鋪陳，所以覺得還算蠻剛好的，這週的挑戰題也是我在計畫中第一次做出來的，真的很開心。

過程中偶有遇到一些障礙，像是第一次遇到因為異步執行所產生的資料先後問題，變得被迫要去尋找什麼是異步什麼是非異步（我真心覺得同步這個詞翻譯沒有非異步來的好，這裡的詞彙我常常被搞混，腦袋會突然轉不過來，因為同步會直覺想到同步進行，但實際上卻是相反！）

但還好都是查一下資料就能知道利用 callback function 來達成次序上的問題，但在這邊有點好奇我原本理解的 callback function 是否正確。

原本的認知是只要先寫出函式，等到之後直接寫進其他函式進行調用，就能算是 callback function，但實際上似乎是要把 callback function 的名稱放在 "參數" 裡面並且透過輸入參數，調用到裡面的函式，才能夠算是 callback function？直接上程式碼應該會比較清楚
```javascript=
function a() {
  console.log('a');
};
function b() {
  a();
};
b();    // 會印出 a，但似乎不構成 callback function？
```
上面的方式似乎不能稱之為 callback function

```javascript=
function c() {
  console.log('c');
};
function d(cbFunction) {
  cbFunction();
};
d(c);  // 會印出 c，這樣透過參數調用，似乎才能算是構成 callback function？
```

最後就是 XMLHttpRequest 的指令，比起 DOM 好理解太多了，雖然是這麼說，但除此之外也其實還有很多不完全懂的地方，像是轉碼處理，Fetch 技術、content-type 的類型設定，都還不太明白，但感覺這些是可以先放著追進度的，就先擱置了。

推薦文章和資料：
[XMLHttpRequest — JavaScript 發送 HTTP 請求 (I)](https://notfalse.net/29/xmlhttprequest)
[XMLHttpRequest-MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest)
[AJAX 入門篇-MDN](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started)
[你真的会使用XMLHttpRequest吗？](https://segmentfault.com/a/1190000004322487)

# Week9 - 後端基礎（一）
經過三周的前端基礎內容之後，這週開始來到了後端的部分。
在這週會學習後端環境的建置方式，並且將以 PHP 為主要的語言，Node.js 為輔助進行學習
p.s 這周因為大部份是直接搬運當初學習的筆記，所以順序上可能會比較混亂，比較偏向個人的重點紀錄，所以會比較沒有統一性和順序性，可能篇章會感覺跳來跳去的

## 環境建置
開始學習之前讓我們先建置好學習的環境，以下是簡單紀錄。
UwAmp - 快速建置 php 的執行環境，包含 apache sever，mySQL
XAMPP - mac 用，內建 MariaDB，屬於 mySQL 的分支。
FileZilla - 上傳軟體
SQL 管理的部分可以改用 SQL pro

## PHP基礎語法
- 任何php語法都必須包含在下面的程式碼內
```php=
<?php
  程式碼放這裡，? 後面建議加 php;
  結尾一定要加分號;
?>
```
- 宣告變數及使用變數的方式為變數名稱前面要加上 `$`，例：`$foo`
- echo 後面接印出的東西
- `if else`、`for`、`while`……等都和 JavaScript 的語法基本相同或類似
- 瀏覽器畫面換行不可加 `/n`，要使用 `<br>`
- 建立 array 的方法：
```php=
$arr = array(1, 2, 3, 4, 5);
echo $arr[0];   // 輸出 1
```
- 印出 array 長度：`sizeof()`
```php=
$arr = array(1, 2, 3, 4, "string");
echo "length:" . sizeof($arr) . "<br>";// 輸出 length:5
echo $arr[sizeof($arr) - 1]; // 輸出 string
```
- 印出 array 內容：`var_dump`、`print_r`
```php=
// 當要輸出的 arr 內容包含多種形態時，必須使用下面的方式
var_dump($arr); // 輸出 arr 的所有 value，包含 type
print_r($arr); // 輸出比較簡潔的資訊，但不包含 type
```
- 宣告 function 的做法：
```php=
function add($a, $b) {
  return $a + $b;
}

echo add(1, 3); // 輸出 4
```
## Apache 與 PHP 原理簡介
從我們發出 request 之後，大致的流程如下：
**request => server(Apache) => php => html => server(Apache) => response**
所以 server 會根據送來的 request 去做不同的分類處理，假設是 php，就會交由 php 處理，結束後再把 php 轉成 html 之後的檔案回傳給使用者。
注意看網址的話，會發現有一些規則性，而這部分可以在 server 端裡面去做設定。

## 資料庫系統簡介
server => 程式，專門處理 request 跟 response 的程式
資料庫 => 程式，專門處理資料的程式

資料庫大致可分成兩種類型：
1. 關聯式資料庫 (Relational database)
   常見軟體：**MySQL(MariaDB是其分支)、PostgreSQL、MSSQL、Oracle Database**
   類似於 EXCEL 的表格，用於大多數時候。
2. NoSQL (Not only AQL)
   常見軟體：**Mongodb**
   不同於關聯式資料庫常有各種資料型態問題，NoSQL 以另一種方式，把一個物件儲存成類似於 JSON 的樣子。常用於 log 的時候。
   大概的樣子：
   ```
   {
     score: [10, 20, 30],
     student: {
       name: '123'
       ...
     }
   }
   ```
接下來介紹的是以 **mySQL** 這套軟體為主
因為 mySQL 其實就是一套程式，我們可以透過 CLI 進行管理，但現在已經有其他較為知名的 GUI 輔助程式協助管理：如 **phpMyAdmin、Adminer、Sequel Pro** 這些軟體有些其實也就是用 php 所寫的，或著是直接安裝在電腦上的程式，總之，你可以用各種資料庫的管理介面去進行管理。


如果資料傳送至mySQL後，phpMyAdmin 有出現亂碼時，是因為 php 內沒有加入這一行指令。
`$conn->query("SET NAMES UTF8")`

### 名詞解釋
schema 指的是資料庫的結構

## MySQL 基本語法
基本上裡面可以不用輸入反引號 ` `` ` ，除非部分資料表名稱或欄位名稱很特殊就要加上。
- 查詢資料 Select
```sql=
SELECT * FROM `qoo`(這是資料表名稱)  // 選取 qoo 資料表裡面的所有資料
SELECT id, name FROM qoo WHERE name = 2 
// 選取 qoo 裡面符合 name = 2 條件的 id 欄位，name 欄位
```
- 新增資料 Insert
```sql=
// 在 qoo 資料表的 id, username, content 的值寫入資料
INSERT INTO `qoo`(id, username, content) VALUE ("1", "Danny", "HI~")
```
- 修改資料 Update
```sql=
// 因為沒有下條件，所以會影響到所有的 id, name 欄位內容
Update `qoo` SET id = 2, name = Danny

// 將 qoo 資料表內條件為 age = 18 的 id 及 name 更改成指定資料
Update `qoo` SET id = 2, name = Danny WHERE age = 18
```
- 刪除資料 Delete
```sql=
//刪除 qoo 資料表內符合條件為 age = 18 的所有資料
DELETE FROM `qoo` WHERE age = 18
```
但很多時候不會真的這麼做，有時會給予一個 is_deleted 的欄位，給予 1 的值，等要篩資料出來的時候，在用 is_deleted = 0 去篩選出資料，這樣可以確保後悔刪除資料時，把檔案救回。


## 補充 - 關於名詞解釋
- 這邊指的資料庫就是 mySQL，但還有其他家的資料庫，這裡就不贅述，
- SQL 指令，就是能夠進行各家資料庫操作的指令，而各家的 SQL 指令則是大同小異
- 各家資料庫一般會和某一台 server 連線，掛在 server 裡面。
- php 則是一種的程式語言，由於 server 能解析 php，所以既然能夠解析 php，那麼 php 就能對 server 內的資料庫進行操控，因此 php 的主要功能有點像是 html 和資料庫的橋梁，可以透過 php 進入 server 操作 SQL 指令對資料庫進行任何更改。
為什麼會特別說是 server 解析 php，因為 html 是瀏覽器進行解析的。
- 有種東西叫做 phpMyadmin，還有其他類似的，但總歸來說這類軟體就是將原本應該要利用 SQL 指令去進行資料庫的方式，將其給 GUI 化，是一種輔助軟體。
- FTP 則是上傳軟體，能夠將檔案放到 server 裡面。
- 因為資料庫和伺服器實際上是分開的都會有各自的密碼。
- 在寫 php 時是要連線到資料庫，所以要放上資料庫的帳號密碼，不用特意連伺服器是因為一開始 php 檔案本身就會在伺服器內了，所以直接使用 localhost 就可以了。
- FTP 則是要連到伺服器，所以要輸入的是伺服器的帳號密碼。

## 複習週 Week8 心得小結
這週學習了基礎的後端知識，在學習的過程之中，雖然並不算太難理解，但是有些時候還是會混淆名詞，有可能是因為第一次接觸後端名詞，因此在最後面才會有補充的部分，作業方面，第一次開始寫多頁面的網站，同時直接合併了 php，感想是加入 php 之後，真的很感覺到混亂，Huli 有提到兩種做法，不曉得會比較推薦用哪一種方式寫，影片示範是用單行 去 echo 出來，也的確比較整齊，但不知道為什麼自己寫的時候有種不確定感？可能是因為前面 Huli 也有提到很多人用另外一種方式寫，所以怕自己之後看不懂之類的。
另外針對本週會員系統的重點：cookie 的應用，查了一下發現，session 似乎也是個很神奇的東西，Huli 講到這是一個比 cookie 更短的時間，並且不同分頁都並不共用，但我發現有個名詞是 cookie-based session，看起來 session 是建立在 cookie 的觀念基礎上？
另外帳號密碼的驗證機制，感覺好複雜，先有轉碼問題，還有要防中文輸入到帳號內的問題等等，其實自己在這次的作業都有點偷懶沒有特別去寫了，但這種東西找套件似乎也不能保證是否安全，還是只能乖乖寫了。
然後物件導向的概念，到了複習週依然先被我放著了……但是總有一天要補完它，因為感覺好像很重要，應該另外寫才對。

# 從初學到目前的心得
這次是第二次的複習週筆記了，進度其實仍然持續落後的我，一直在猶豫，這週是不是應該直接放棄，去追趕後面進度，但在繳交第八週作業後，發現自己其實在這四週之間，有不少次回去翻第五週的筆記內容，於是我想複習週的筆記整理應該還是有必要的，同時搞不好也能讓其他夥伴們來看看？（誰要看這超亂的筆記整理啊！）

同時雖然筆記的能力依然很差，速度依然很慢，但有漸漸感覺到寫文章的速度變快了一點，不論是每日心得還是筆記的部分，或許真的是像 Huli 所說的一樣，這件事情越練也會越擅長，只是不得不說，我還是很不愛寫筆記或心得，但是我知道這一定都是有回饋的，所以我會盡力寫。

另外真的很感謝 Huli 能這麼無私的教學，但我知道 Huli 似乎更希望能有教學方面的回饋，所以感謝的話就留到之後再說吧，決定現在先說說自己覺得目前課程內容的想法：
我聽課學習時是習慣抓重點的人，但不知道為什麼有些時候，Huli 講課時有些應該是很重要的部分，似乎並不會特別強調，常常在寫作業卡關時，才會發現某些細節是 Huli 上課時有講過，回去看影片才發現是被簡單帶過了，但不知道是因為真的不重要或著是課程設計時刻意不強調，希望讓我們去尋找資訊呢？因為我有感覺作業部分內容是刻意讓我們去找額外資料的，但有些部分感覺說是刻意的又有點奇怪，以自己印象最深刻的地方是要 POST 到資料庫裡面時，資料的格式寫法，雖然後來 Huli 有說到這就是一般既定的格式，就像是網址後面會用問號去帶資料一樣，但當時的我其實真的沒有這個格式概念，上網也查詢了別人帶資料的方式，但也找不到範例，我後來有發現蠻多人在帶資料時都卡關了一下，或許這是一個之後可以特別稍微說明的地方，但我想這也很難拿捏吧。
我自己很喜歡每週結束的作業檢討，能知道自己的問題所在，或許 Huli 可以在這個階段放上以新手來說寫作業時，預期大家在這次作業應該會遇到的問題，而這些問題是課程影片中刻意沒提到但希望我們去查詢到的資料。

Huli 每週的激勵文？的確有幫助到我，會讓自己覺得和這個計畫以及 Mentor 保持著聯繫，而且回應一下某週 Huli 所說的讓課程進度更順利的小技巧，我覺得真的算很有幫助，原本因為自己其實也是有一點的設計背景出身，看到 yakim 大和其他人的作品時，覺得一定也要用個好看的畫面，這是身為曾經設計的尊嚴！ＸＤ
但後來看了文章之後覺得，沒錯啊！這個計畫主要是培養寫程式不是做設計，何必呢？於是在第八週就直接先找夥伴們的樣板來改了，剛好也能藉由事後思考相同的效果兩邊的程式碼怎麼樣寫會更好這樣。但我覺得我應該還是會想調整一下吧，畢竟多少還是對完全照做夥伴的畫面有點疙瘩，可能還是要習慣吧～雖然如果是我自己的被夥伴參考，其實是會蠻開心的，但不知道別人是否也這麼想阿ＸＤ

然後自首一下第八週的物件導向內容以及相關課程還沒完全看完＠＠