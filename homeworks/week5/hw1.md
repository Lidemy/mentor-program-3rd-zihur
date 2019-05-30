## 前四週心得與解題心得

# Week5 複習周筆記
> 特別感謝 ClayGao 授權部分的筆記內容！！

這篇文章主要看到了同一期的同伴寫的[筆記](https://github.com/Lidemy/mentor-program-3rd-ClayGao/blob/master/homeworks/week5/hw1.md)，覺得太厲害了，決定參考他的筆記當作架構，並且自己也嘗試重新寫一篇自己的複習內容，主要是複習過去 Week1~Week4 的學習過程。

如果你和我一樣剛學習程式，那麼你有很高的機會在這篇看到到許多新東西。

開始之前先說一下關於 [Markdown](https://markdown.tw/) 語法還有[中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)，這兩樣並非程式相關，但我覺得這兩樣真的對於日後要筆記問題時會非常好用。有機會可以了解一下。

# Week1-暖身週
認識並且學習 **CLI**、**Git**、**GitHub**。

## CLI
CLI (Command-Line Interface) 是一種相對於 GUI (Graphic User Interface) 的操作方式，透過輸入各種指令，與電腦進行操作，因此舉例來說 Windows 的命令提示字元就算是 CLI 的一種了。

- **CLI 基礎指令 (僅限 Cmder)**

| 指令（全名）| 功能 | 額外說明 |
| -----| ----- | ----- |
| pwd <br/>(print working directory) | 印出所在位置 |
| ls (list) | 列出現在資料夾底下檔案 | 加入-al 可看詳細資料及隱藏檔案 |
| cd (change directory) | 移動所在位置 | |
| touch | 建立檔案、更改檔案時間 | |
| rm (remove) | 移除檔案 | 加入 -r 使整個資料夾刪除 |
| mkdir (make directory) | 建立資料夾 | |
| mv (move) | 移動檔案、更改檔名 | |
| cp (copy) | 複製檔案 | |
| cat | 將檔案內容印出 | |
| echo | 列印出後面的東西|
| grep | 抓取關鍵字 | grep n A / 從 A 檔案抓出 n|
| wget | 下載檔案 | windows 需要另外安裝指令 |
| curl | 送出request | 加入-I 抓取網頁 header |
| > (redirection)| 重新導向 input output | 前項會完全**取代**後項內容 |
| >> (append) | 重新導向 input output | 前項會**接續**在後項內容 |
| &#124; (pipe) | 將左邊輸出設為右邊輸入 |  |

##### 補充資料：
[cURL 指令集-EN](https://zh.scribd.com/document/90229628/Curl-Manual)
[好用的 Cmder](https://cmder.net/)


## Git
Git 指的是一套版本控制系統的軟體，概念其實很簡單，首先想像自己在開發專案過程中，是否常常會有類似下面的狀況呢？

![各種版本命名截圖](https://i.imgur.com/cJdthLC.png)

這種方式常常做到最後就會發現根本不知道做到哪裡了，同時也不清楚以前的檔案到底修改了什麼，而 Git 便是為了協助我們順利解決這些關於版本控制上的相關問題。

- **Git 基本指令**

  | 指令 | 功能說明 |
  |:---:|---------|
  | git init | 初始化並將當前資料夾加入版本控制，並且產生 .git 資料夾 |
  | git status | 查看目前 git 的狀態，非常好用 |
  | git add / git add . | 將指定檔案加入版本控制 / 將所有檔案加入版本控制</br>新建檔案時必用 |
  | git rm --cached</br>git rm --cached -r . | 將指定檔案移除版本控制 / 將所有檔案移除版本控制 |
  | git commit -m "訊息" | 新建一個版本，並留下訊息供日後了解</br>-m 可改 -am，可省下 add 步驟，但不會加入新增的檔案 |
  | git log</br>git log --oneline | 查看歷史紀錄，可得知版本編號 / 簡易版的紀錄 |
  | git checkout 版本編號 | 切換到過去的版本編號，可輸入分支名稱跳至該分支的最新版本 |
  | git branch -v | 查看所有分支及當前分支，-v 可省略 |
  | git branch "分支名稱" | 創建新分支 |
  | git branch -d "分支名稱" | 刪除分支，-d 替換成 -D 可強制刪除尚未 merge 的分支 |
  | git diff | 比較檔案的差異，後面接兩組版本編號可以看到兩組之間的差別 |
  | git merge "B" | 將 B 分支合併到當下所在的分支名稱 |

  有時候 git merge 時，會有衝突產生，以下是分辨方式
   week1 這個 branch 被 merge 至 master 中，123.js 這個檔案產生衝突，打開檔案會顯示：

  | 123.js 檔案內容 |
  | :-------: |
  | <<<<<<<<<<<< HEAD |
  | master 內容 |
  | ================ |
  | week1 內容 |
  | >>>>>>>>>>>> week1 |
  | 其它相同的部分 |

  簡而言之，============ 用來分開兩個 branch 中該檔案各自不同的部分，而至此，是一個自由編輯的模式，所以你要留那一個 branch 的部分或者你要怎樣重新編輯都是可以的。
  > [name=ClayGao]

##### 補充資料：
在開始時，可以先建立 **.gitignore**，這是一個**文件名稱**而非指令，裡面能打上不想被加入版本控制的檔案名稱，這些檔案將會在之後 commit 時被忽略掉，是個非常好用的東西

如果在 git commit 的時候出現錯誤，跳出了一個要設定帳號跟姓名的畫面，請輸入以下指令
（記得把名字跟 email 換成你自己的）

`git config --global user.name "your name"`
`git config --global user.email "youremail"`


如果你的作業系統是 Windows，請注意後面的字串一定要用雙引號，用單引號的話會出錯：

`git commit -am 'error'` // 錯誤
`git commit -am "success"` // 正確

## GitHub
許多人會誤認為 GitHub 和 Git 是一樣的，但實際上 GitHub 僅僅是 Git 要進行多人協作時的一種管道，工程師們將受到 Git 管理的專案，放到網路上 GitHub 內，從而讓其他人一同協作，所以 GitHub 主要只是一個放置 Git repository 的地方而已。

- **GitHub 相關基本指令**

  | 指令 | 功能說明 |
  |---|---|
  | git remote add origin | 接 "連線位置"，表示新增一個名為 origin 的遠端 repo |
  | git remote rm origin | 可移除和名為 origin 的遠端 repo 連線 |
  | git push -u origin master | 將本機的 master 分支推到遠端的 origin</br>-u 是設定日後直接 push 的位置，可省略 |
  | git pull origin master | 把遠端 origin 的資料拉回到本機 master 上並且 merge |
  | git clone | 接 "連線位置"，通常是首次看到新專案時，將專案抓下來 |

##### 補充資料：
[為你自己學 Git - 如何 Push 上傳到 GitHub？](https://gitbook.tw/chapters/github/push-to-github.html) --- 裡面有說到 origin 是什麼。
其它諸如 `--rebase / git fetch`……等，都能在高見龍前輩的文章找到更詳細的教學。

#### 複習週 Week1 心得小結
現在回頭來看第一周，才發現原來自己已經學了這麼多新知識，無論是之前略有耳聞的 Git / GitHub 或著是從沒研究過的 CLI、Markdown，中文排版指北等等。而趁這次複習時，也實驗了一些之前一直沒能嘗試的狀況劇，像是如何連到 GitHub 上不同的 repo，下達 `git remote` 等指令時，到底做了什麼事情？

除此之外也意外發現了更多之前忽略掉的東西，例如 `git pull` 其實是 `fetch` + `merge` 的指令，原來 `git commit -am` 不會加入新增的檔案……等

但其實也還有好多問題沒來得及解決，只是感覺上不那麼重要就先擺著了，像是 CLI 的挑戰題，shell script的相關知識等。


---
# Week2-JavaScript(1)
這週開始進入 JavaScript，同時也導入了 **ESLint** 機制，採用的是 **Airbnb** 的規則。

## 運算子
### 算術運算子

| 運算子 | 意義 |  /  | 運算子 | 意義 |
|:-----:|-----|-----|-----|-----|
|  `+`  | 加法 |     |`%` | 取餘數 |
|  `-`  | 減法 |     |`++`| 等同 +1 |
|  `*`  | 乘法 |     |`--`| 等同 -1 |
|  `/`  | 除法 |     |`**`| 次方 |

- **關於 i++ 和 \++i 的差異**：

  ```javascript=
  let num = 0;
  let i = 0;
  num = i++ // 先運算 num = i，再運算 i = i + 1，結果為 num = 0
  num = ++i // 先運算 i = i + 1，再運算 num = i，結果為 num = 1
  ```

### 邏輯運算子
所有 **null**、**0**、**NaN**、**空字串 ("")**，或**未定義 (undefined)** 都會被轉換為 false，其餘皆會被轉換為 true。

| 運算子 | 意義 |
|:-----:|-----|
|`&&`| AND / 前項和後項，必須均為 true 才會回傳後項的 true 值|
|`||`| OR / 前項或後項只要其中一項為 true 則回傳第一個遇到的 true 值
|`!` | NOT / 回傳相反的結果 |
延伸概念：**短路特性**

### 比較運算子

| 運算子 | 意義 |
|:-:|-----|
| `>` / `>=` | 大於 / 大於等於 |
| `<` / `<=` | 小於 / 小於等於 |
| `==` | 等於 |
| `!=` | 不等於 |
| `===` | 嚴格等於 |
| `!==` | 嚴格不等於|

#### 關於 = / == / === 之間的差異
先講結論，平常操作上盡量使用 `===` **嚴格等於**或 `!==` **嚴格不等於**做判斷。

| 類型 | 意義 |
|:-:|---|
|=  | 意思是**賦值**，將後項賦予給前項 |
|== | 意思是**等於**，判斷前後項的值是否相同，但**不考慮型別** |
|===| 意思是**嚴格等於**，判斷前後項的值是否相同，同時**考慮型別** |

```javascript=
  let x = 3;  let y = 5;  let z = "5";
  x = y     // 結果會是 x = 5
  y == z    // 結果會是 true
  y === z   // 結果會是 false
```

### **位元運算子 & 二進位制**
是採用二進位制的的運算方式，同時因為是電腦底層的溝通運作方式，所以這種運算速度理論上會更快一些，要理解這部分需要先有二進位制的概念。

| 運算子 | 意義 | / | 運算子 | 意義 |
|:---:|---|---|:---:|---|
| `&` | 將每個 bit 做相加後回傳 || `~` | 將每個 bit 做反轉之後回傳 |
| `|` | 將每個 bit 做 OR 之後回傳 ||`<<`| 將每個位元向左移動要求的位數，延伸運用：等於乘以 2 的 n 次方 |
| `^` | 將每個 bit 做 XOR 之後回傳 ||`>>`| 將每個位元向左移動要求的位數，延伸運用：等於除以 2 的 n 次方 |

### 浮點數問題
所謂浮點數問題指的是計算時產生的出來的數字，實際上會有**誤差**，亦即你認為你所儲存的數字是 0.3，但實際上可能卻是 0.300000002，這會導致某些錯誤
例如 a = 0.3，a + 0.1 === 0.4，回傳結果可能會是 false

## 變數 (variable)
### 變數命名
1. 不可以保留字、數字開頭、部分特殊符號等方式命名
2. JavaScript 中有區分大小寫
3. 命名有兩種主流：用 _ 連接，另一種則是較推薦的駝峰式命名法
4. 命名時要與內容有所相關和有所意義。
5. 如果只有宣告卻沒有賦值，預設會是 undefined

### 變數的各種型態
1. boolean
2. number
3. string
4. object （包含陣列 arrey）
5. undefined
6. function

上述中 null 被歸類在 object 中，普遍被認為是個原始錯誤。
任何 number + string 都會將 number 轉變成 string。
###### (上面這部分是自行整理，需再多方查詢[資料](https://developer.mozilla.org/zh-CN/docs/web/javascript/data_structures))

### 從 object 深入理解變數（重要概念）

```javascript=
1 === 1 // ture
'abc' === 'abc' // true

[] === []  // false
[1] === [1] // false
{} === {} // false
{a:1} === {a:1} // false
```

上述陣列和物件不相等的原因，是因為**當陣列和物件在做比較判斷時，其比較的部分為「記憶體位置」，而非值**。
在 Javascript 裡面，宣告物件變數時，電腦會指派一個無法查詢的記憶體位置（假定是 `0x01`）接著 `0x01` 儲存變數內容，所以比較兩個物件時，儘管這兩個物件的值相同，但實際上的記憶體位置並不相同，因此會產生 false。

```javascript=
[1] === [1] // 實際上相比的是 0x01 === 0x02，而回傳 false
{a: 1} === {a: 1} // 實際上相比的是 0x03 === 0x04，而回傳 false
```

接著討論一下，如果加入了變數之後的各種狀況？
- 下面的狀況是，abc2 在第二行指令看似被賦予了和 abc 相同的值，但實際上是被賦予了記憶體位置，此時去改變了 abc2.a 的值，等同於改變了 0x01 這個位置內的 {a: 1}，因此最後的結果就會是 {a: 2}。

  ```javascript=
  var abc = {a: 1} // 電腦分配一個記憶體位置給 {a: 1}，假設其為 0x01，接著將 0x01 賦予給 abc
  var abc2 = abc // 此時其實是將 abc 內中的 0x01 賦予 abc，而非 0x01 所放置的值 {a:1}

  abc2.a = 2 //將 0x01 所放置的值 {a: 1} 改變成了 {a: 2}
  console.log(abc) // 結果是 {a: 2}，因為 abc 的記憶體位置本身就是 0x01。
  ```

  

- 下面的狀況二，abc2 在第四行多被賦予了一個新的 {a: 1}，乍看之下沒有改變，但其實是被賦予了新的記憶體位置 0x02，因此這時候的 abc2 和 abc 已經徹底是在不同的位置了，最後相比較時，理所當然的被回傳了 false。

  ```javascript=
  var abc = {a: 1} 
  var abc2 = abc

  abc2 = {a: 1}// 這裡其實是分配了一個 0x02 位置，內容是 {a: 1}，接著賦予給 abc2 這個變數

  console.log(abc2)  // 回傳 {a:1}，因為 0x02 這個記憶體內容是{a: 1}
  console.log(abc === abc2)
  // 回傳 false，這是因為 abc2 內中的 {a:1} 是另外一個 {a:1}，不是 0x01 的那個 {a:1}
  ```

  

**結論：**
  當你指派一個物件放入一個變數的時候，你放入的是一個記憶體位置。而該物件的記憶體位置是一個物件對上一個位置，再透過這個位置去找到這個物件內的值。
  因此假設你要 call 一個物件，過程大概會是這樣：

  > call => 物件的記憶體位置 => 物件裡的值

  將物件放入變數，是將物件的記憶體位置放入變數，所以 calling 過程會變下面的狀態：

  > call => 變數 => 變數裡的物件的記憶體位置 => 物件裡的值

## 物件（Object）
- 物件形式為 { key : value, key2 : value }
- 儲存於變數時，**實際儲存的是記憶體位置**
- 呼叫物件的內容方法為 **obj.key** 或 **obj['key']**，注意不是 obj[key]
- 物件內可以再放入物件或陣列
- 因此物件裡面有物件時，可以 **obj.key** 後面再接 **.name** 呼叫

## 陣列（array）
- 陣列形式為：[value, value2]
- 儲存於變數時，**實際儲存的是記憶體位置**
- 陣列屬於物件型別，內建函式中有些會改變原本的值，有些不會改變，需特別注意
- 陣列內也可以再放入陣列

##  判斷式
### if 判斷式
if ( ) 內的回傳若為 true ，則會開始執行 { } 內的所有內容

- if 

```javascript=
if ( true ) {
  console.log("會把我印出來唷")
}
```

- if else

```javascript=
if ( false ) {
  console.log("我不會被印出來唷")
} else if ( true ) {
  console.log("我會被印出來唷，但如果上面是 true 我就不會被印出來了")
} else {
  console.log("如果上面的都是 false，那我才會被印出來唷")
}
```

### switch case
使用時機：對同一個變數進行多次條件判斷的時候，可以使用 switch
要記得 switch 採用的是**嚴格判斷**
另外 switch 在裡面似乎不能寫太複雜的判斷式，僅能判斷是否等同於什麼值，因此應該**不能寫巢狀判斷**。（待確認）

```javascript=
var a = 1

switch(a) {
  case: 1  // 判斷 a 的值是否為 1
    console.log('a 為 1')
    break // 要加入，否則會接續著印出
  case: 2
    console.log('a 為 2')
    break
  case: 3
    console.log('a 為 3')
    break
  default:   // 想像成 else ，即上述 case 都為 false
    console.log(' a 超過 3 或非 number')
}

// a 為 1
```

也能將兩個 case 合併在一起

```javascript=
var a = 1

switch(a) {
  case: 1  // 判斷 a 的值是否為 1
  case: 2
      console.log('a 為 1 或 2')
      break
  case: 3
      console.log('a 為 3')
      break
  default:   // 想像成 else ，即上述 case 都為 false
      console.log(' a 超過 3 或非 number')
}

// a 為 1 或 2
```

神奇技巧，在類似判斷時也可以這樣做

```javascript=
var a = 1

var a_number = ['a 為 1', 'a 為 2', 'a 為 3']
console.log(a_number[a - 1]) 
```

即 a 若是多少，就印出什麼樣的內容，即該索引值的值，而值的內容可以表現出 a 為何。

### 三元運算（ternary）
是一種簡化判斷式的語法，但可讀性未必這麼好，基本架構如下
>condition ? A : B

先判斷 ? 前面的 condition 是否為 true，是的話執行回傳 A ，否則執行回傳 B

```javascript=
answer = 10 > 8 ? 'yes' : 'no'    //回傳 yes
```

也能使用巢狀判斷

```javascript=
var a = 9
var answer = a > 8 ?  ( a === 10  ? ' Yes, a = 10 ' : 'No, it isnt' ): 'no'

console.log(answer) // No, it isnt
```

## 迴圈（loop）
要注意別寫出無窮迴圈的程式碼，另外在 chrome 瀏覽器內操作的話，可以在第一行多加一條程式碼 `debugger` 方便你進行除錯。
### Do while

```javascript=
do {
  console.log("我會先被印出至少一次")
  i = 1
  i++
  if (i > 10) {
    break
  }
} while (true);
```

會**先執行至少一次** do 裡面的內容，接著判斷 while 後面的條件是否回傳 true，是的話就返回到 do 重新執行內容。

**小提醒**：如果在 if 內放 break，執行到這裡時會直接中斷迴圈，如果放 continue，則會跳過迴圈內後續的其他東西，直接進入 while 判斷

### While
和 do while 的差異在於，while 會先判斷條件，才開始執行。

```javascript=
while (true) {
  console.log("我會先被印出至少一次")
  i = 1
  i++
  if (i > 10) {
    break
  }
}   
```

### For loop
架構基本上為 for（初始值; 終止條件; i 每一圈要做的事情）
操作時，會先檢查條件，才開始執行迴圈內容。

```javascript=
for (i = 0; i <= 10; i += 1) {
  console.log('這是最常用的迴圈語法唷')
}
```
**小提醒**：
也可以使用 break 或 continue，運作方式同 while : 跳出然後直接去判斷
初始值 不一定要具備，但後面的 ; 一樣要存在。`for( ; i <= 10; i += 1)`

## 函式（function）
函式其實就是以前數學曾經學過的 **y = f(x) = x + 2**
其中 **y = 回傳值（return）**，**x = 參數**，**f(x) = 函數**，**x + 2 = 函式內容**

### 函式結構

```javascript=
function test() {

}

// function 名稱為 test
// () 中為參數 (argument)
// {} 中為執行區塊，也就是函式內容
// 每個 function 一定會有一個回傳值 return，但不一定要寫
```

### 宣告函式的常見方法
這裡僅簡單介紹基本宣告方式，有關匿名函式還有 ES6 箭頭函式等的詳細介紹，請看 Week3
1. 基本方式
  
  ```javascript=
  function test(x) {  // test 是函式的名字
      return x*2
  }

  var a = test(2)    // 這裡只是把函式賦予給變數 a
  console.log(a)     // 4
  ```

2. 放入變數之中 (屬於匿名函式)

  ```javascript=
  var a = function(x) {  // a 不完全算是 function 的名字，而是變數
      console.log(x*2)
  }

  a(2) // a 即 該函式，印出 4
  ```

3. 箭頭函式（ES6）

  ```javascript=
  var a = (x)　=> {    // x 為參數，可用 , 隔開
      console.log(x*2)
  }

  a(2) // a 即 該函式，印出 4
  ```

### 函式觀念
- 變數可以用來接收函式的回傳值，使用 = 連接
- 關於 return 和 console.log( )
  每一個函式一定會有一個 return 值，你可以把它想成是這個函式執行之後的解答，預設值是 undefined，因此在函式的最後必須要寫上 return，告訴這個函式解答是什麼，否則無論如何呼叫函式，得到的結果都會是 undefined。
  
  其實 console.log( ) 主要用途只有一個，那就是將 ( ) 裡面的內容，呈現在螢幕上而已，沒錯！就只有這項功能，其他功能都沒有。所以它不具備有 "回傳" 的能力，即便你在函式中設定了 console.log 指令，對函式本身來說，儘管它印出了東西，但是它並不知道這就是解答，所以回傳的內容一樣會是 undefined。
  
  因此這兩個是完全不同的東西。
- 當 return 被執行時，表示這個函式的解答已經找到了，因此程式就不會再繼續跑這個函式內其他的內容了。
- 一個函式的參數可以有相當多個，但參數的命名盡量取有意義的，非必要，但相當重要。
- 函式本身是個**物件型別**，所以函式內什麼都可以放。
- **參數**（Parameter）和**引數**（Argument）這兩者差異可以看這篇[資料](https://thisworldmyworld.blogspot.com/2009/12/blog-post_08.html)

  ```javascript=
  function abc(){  // ()內是參數，這裡無設定
  return arguments[0] +  arguments[1] +  arguments[2]
  }

  console.log(abc(5,1,2))　// 8，(5,1,2) 是引數
  ```
  上面函式中的 arguments[]，代表函數的處理可以用引數，參數無格式限制。
  需要注意的是，arguments 是 Object 物件，而非 Array，所以在方法的使用上你沒辦法對其使用 Array 的方法。但可以對其使用索引值 ( arguments[index] )，也能用 length 方法操作。
  
- **函式中的參數也可以代入函式作為引數（極重要）**

  ```javascript=
  function transform(arr, transformType) {
      var result = []
      for (var i = 0; i < arr.length; i++) {
          result.push(transformType(arr[i]))
      }
      return result
  }

  function triple(x) {
      return x * 3
  }

  console.log(transform([2,5,8],triple)) // [ 6, 15, 24 ]
  ```
  可以看到上面使用的參數為 triple 函式，依此類推，你可以在主函式中代入各式各樣你想要用的工具函式

  用**匿名函式**的方式寫則是
  
  ```javascript=
  function transform(arr, transformType) {
      var result = []
      for (var i = 0; i < arr.length; i++) {
          result.push(transformType(arr[i]))
      }
      return result
  }

  console.log(transform([2,5,8],function triple(x) {
      return x * 3
  })) // [ 6, 15, 24 ]
  ```
  
- **傳參數的運作機制（極重要）
  可與前述之從 object 深入理解變數 - 理解值與記憶體位置做觀念連結**
  
  參數運作外在的變數時，不會直接改變變數，具體而言，JS 會複製一份你看不到的變數進入參數做運算，但運算之後的結果不會改變該變數
  
  ```javascript=
  function abc(x){
    return x * 2
  }

  var a = 2
  
  abc(a) //呼叫函式 abc()
  console.log(abc(a)) //4
  console.log(a) //2
  ```
  
  那如果 a 是物件呢 ?
  
  ```javascript=
  function abc(x){
    x.num++
  }

  var a = {
      num : 2
  }
  
  abc(a) // 呼叫函式 abc()
  console.log(a) // { num : 3 }
  ```
  
  可以看到 num 的值被改變了，這是因為即使你是複製一份進去參數做運算，但本質上變數 a 與參數內的 x.num++ 都是基於同一個記憶體位置對上同一個值，也就是 2，所以你在參數內的運算，也會對該值做更動。
  
  那如果換一個方式呢？
  
  ```javascript=
  function abc(x){
      x = {
          num : 3
      }
  }

  var a = {
      num : 2
  }
  
  abc(a)    //呼叫函式 abc()
  console.log(a)  // { num : 2}
  ```
  
  與之前所述將物件放入變數 - 理解值與記憶體位置的觀念相同，看到參數內的 = 了嗎 ? 這邊的意思是重新賦值的意思，也就是說 { num : 3 } 是一個新的物件 ( 新的記憶體位置指向一個新的物件的值 )，和變數 a 所指向的 { num : 2 } 是不同的東西。

  綜合觀念而言，如果重新賦予一個物件，那這個物件本身都是全新的，與現有的物件並沒有關聯，即使他們內中的屬性與值一模一樣，但由於記憶體位置不同，所指向的也不會一樣。
  
#### 複習週 Week2 心得小結
這週邊看著同學的筆記，嘗試更優化了一些，還有調整了一些內容用自己的方式詮釋。
JavaScript 基礎內容比想像中還要多非常多，即便是已經節省了部分內容，依然多花了好幾倍的預期時間在這週上面，當初在學習時，其實沒遇到太大困難，題目也寫得很順利，反倒是現在做筆記的時候發現有很多的小細節，藉著這次的複習，對於參數、引數的了解，物件值與記憶體的關係，迴圈，位元運算觀念……等也更加熟悉了一些。
也因此突然明白了當初做題目時關於 Immutability 的盲點。這個真的超級重要！！不然會發現自己不停 debug。

# Week3-JavaScript(2)
這週依然是講述 JavaScript 但主要著重在 **ES6** 的部分，其他常用內建函式的部分有時間的話再另外整理一篇起來，除了上述之外，同時還會講述**模組**（module）的概念，node.js 運用基礎，unit test 單元測試基礎等。

## 模組（module）
模組的概念其實就是把專門某功能常用的函式獨立出一份文件，在需要的時候透過連結呼叫出來，這樣做的好處是，可以降低彼此之間的依賴性，比較不容易造成其他功能的損壞。

而 Node.js 本身就有提供了許多內建模組，讓人進行引用，因為是 Node.js 內建的模組，所以引用時不必特別加上路徑。

### require（拉來用）
以 Node.js 內建的模組 os 為例，我可以要求使用，並使用裡面的其中一個 function 名為 platform，官方文件表示這個函式會回傳一個字串來辨別你的作業系統平台

```javascript=
var os = require('os')  // 習慣上變數名稱會使用你要引入的該 Module，這樣比較好辨別

console.log(os.platform()) // Win32 ( 乾我也買不起 MAC )
```

### export (借出去用)
既然能拉別人的來使用，當然也能借出去給別人使用，下面列出多種方式：

假設建立一個檔名叫做 threeTimes.js，在裡面放一個函式，你可以取用這個模組內的函式功能 - 將帶入的值乘以 3

- #### 第一種輸出方法（好理解）

  ```javascript=
  function triple(x) {
      return x*3
  }

  module.export = triple
  ```

  這種輸出方式，之後要呼叫 module 功能時，用下面的方法即可

  ```javascript=
  var threeTimes = require('./threeTimes') // 加上檔案路徑，可以不加副檔名 js

  console.log(triple(3)) // 9
  ```

- #### 第二種輸出方法
  如果你一次要輸出多個函式，不只一個 triple，那你可以用物件把各函式打包送出

  ```javascript=
  function triple(x) {
      return x*3
  }

  function triple2(x) {
      return (x*3)*2
  }

  module.exports = {
      fun1 : triple,
      fun2 : triple2
  }
  ```

  你也可以建立一個變數 obj 為物件，然後放入 `{ }` 內的函式，最後使 module.exports = obj

  而在 require 這端要呼叫功能時，便是呼叫物件裡面的功能名稱，記得**使用字串**包住

  ```javascript=
  var threeTimes = require('./threeTimes') // 加上檔案路徑，可以不加副檔名 js

  console.log(threeTimes.fun1(3),threeTimes.fun2(3)) // 6 18
  ```

- #### 第三種輸出方法
  第三種輸出形式也是同上面的物件形式 exports. 但直接想像 exports. 本身就是一個空的物件，後面所接的就像是 `{ }` 內中的東西

  ```javascript=
  function triple(x) {
      return x*3
  }

  function triple2(x) {
      return (x*3)*2
  }

  exports.fun1 = triple
  exports.fun2 = triple2
  ```
  呼叫方式類似於第二種輸出方法

###### 補充：ES6 有多了新的方式，可以去研究一下

## npm (Node Package Manager)
npm 其實是一個管理套件，世界上有許許多多的開發者前輩早已寫好許多 module，並且樂意共享他們的 module，而 npm 就是一個能協助我們下載或著分享 module 的工具。
npm 在安裝 node.js 的時候就會連同下載了。

### 安裝套件
找到想安裝的 module 之後，利用 CLI 輸入 `npm install '套件名稱'`，便可快速安裝完成，同時在你的專案資料夾內，會多出一個 node_modules 資料夾，這個資料夾將會統一管理我們所安裝的所有 module。日後引用 module 的時候，如果沒有添加完整路徑，系統會自動在這個資料夾內尋找。

### 打包套件 - package.json
專案中常會用到許多 module，要打包時會造成檔案大小非常的大，但實際上這些 module 在 npm 上都已經有了，因此當你想轉換開發環境時，這些 module 並不需要一同打包，只需要在 package.json，設定好相關內容即可。

- **具體流程**
  安裝套件時，先輸入 `npm init`，接著按下 ENTER 連續跳過詢問，這樣即可初始化專案並自動產生出一個 package.json 的檔案，這個檔案會記錄著專案的相關資訊，包含使用了那些 npm 套件（記載在 "dependencies" 之後），當要安裝套件時把 `--save` 加在最後面，就會自動將套件資訊加入 package.json 了。
  
  日後如果換了一個新的開發環境，只需要帶著 package.json 並在 CLI 輸入 `npm install` 便會自動把專案所需的套件自動從 npm 下載安裝了。
  
  **所以 node_modules 通常不會納入 Git 控管，我們會將它放入 .gitignore ，我們只要記錄 package.json 即可。**
  
  **小提醒**：
  package.json 裡面有個 devDependencies，與 dependencies 的差別在於前者為開發環境才會使用到的套件。如果你是要安裝在 devDependencies 底下，則是使用 `--save-dev`。

### 腳本執行 - script
package.json 底下有個 script 區塊可以設定你想執行的指令名稱，指令名稱後面可以指定你要執行什麼，因此 start 和後面的指令內容都是可以更改的，這可以用來做其他許多延伸運用。

```javascript=
"script" : {
    "start": "node index.js"
}
// start 算是約定俗成的寫法，主要是讓其他人開啟入口檔案
```

以上面這段程式碼來說：
這時候在 CLI 輸入 `npm run start`，就等同於輸入 `node index.js`

### 類似的替代工具 - yarn
yarn 是 Facebook 所新開發的工具，使用起來和 npm 非常接近，差別在 yarn 比較快
可以去官方網站[安裝](https://yarnpkg.com/zh-Hans/)，或著在 CLI 輸入 `npm install yarn`。

|npm|yarn|
|:--|:---|
|npm -v|yarn -v|
|npm install|yarn|
|npm install <套件名稱>|yarn add <套件名稱>|
|npm install <套件名稱> --save|yarn add <套件名稱> (即 yarn 會自動將套件寫入 package.json ) |

### 單元測試 - 用 jest 寫 unit test
專案過程中，我們常會需要確認寫出來的程式是否正確，這時候就會使用到 jest 進行單元測試。

Jest 同樣是 Facebook 開放出來的 open source，可以直接到[官網](https://jestjs.io/)依序步驟安裝 jest
通常測試的時候，測試檔會要被測試的 function 分開來，利用 module 的方式進行測試。

- **實際操作**
  首先去 package.json 將 script 區塊底下的 "test" 底下的值改為 "jest"，之後便可以使用 npm run test 來運行 jest 套件。
  
  假設現在需要測試某 function，名稱為 repeat ，這個 function 位於檔案 index.js 中，那就利用模組的方式輸出該 function，然後在測試檔案引入來測試。

  這時候我們建立測試檔案 index.test.js，在要進行測試的檔案後面添加 .test 這是一個淺規則的命名方法，代表是 index 的測試專用檔案。

  檔案 index.test.js 內容為：
  ```javascript=
  var repeat = require('./index')

  test('abc 重複 5 次應該要等於 abcabcabcabcabc',function() {
      expect(repeat('abc',5)).toBe('abcabcabcabcabc')
  });
  
  // 下面是將程式碼轉換成中文意思
  
  test('對於測試的描述',function() {
        expect(要測試的函式(參數)).toBe(該函式應該 return 的結果)
    });
  ```
  
  這時候在 CLI 輸入 npm run test，就會尋找所有副檔名為 test.js 的檔案。
  ( 如果你要測試單一個檔案，"test" 後面就是輸入 "jest <檔名>" )
  假如你的 npm 版本較新，也可使用 npx jest index.rest.js 去執行檔案。

- **多項測試**
  通常測試時，會重複不只一個測試
  當要多做幾次測試的話，在最外層加入 `describe('描述', function(){ 測試內容即可 })`

  ```javascript=
  var a = require('該exports')

  describe('總測試名稱', function() {
    test(
      '描述',
      function() {
          expect(要測試的函式(參數)).toBe(該函式 return 的結果)
      }
    )

    test(
      '描述',
          function() {
      expect(要測試的函式(參數)).toBe(該函式 return 的結果)
      }
    )

    test(
      '描述',
      function() {
          expect(要測試的函式(參數)).toBe(該函式 return 的結果)
      }
    )
  })
  ```
- 測試驅動開發 TDD (test-driven development)
  這其實是指一種開發模式，過往是先寫好 function 再進行測試，而 TDD 的流程其實是先寫好測試再進行開發，這樣的流程是當程式寫好，測試通常也就寫好了。

## ES6 語法
由於在 2015 年發布，又稱 ES 2015
所謂 ES6 指的是 JavaScript 依據 ECMAScript 2015 的標準所制訂出的下一代語言標準，在這次的標準中新增了許多新的功能和新的觀念。

### 宣告的新方法 const / let

- **const**
  你無法對 const 建立的變數重新賦值，但若是被賦予物件型別，你仍然可以更改內中記憶體位置指向的值。
  
- **let**
  在程式世界裡，有個名詞叫做**作用域（scope）**，大致概念如下：
  變數運行機制會**從最內層找到最外層**，而在 JavaScript 內用 var 宣告的變數，其變數的範圍空間會是以**函式的 `{ }` 做為邊界**。

  ```javascript=
  function abc() {
      var a = 5
      console.log(a)  // 我看得到 a 是 5
  }

  abc()
  console.log(a)  // 我找不到 a
  ```

  上面這段說明了作用域的影響，得到的結果會是 5 與一個 undefined
  原因是因為第三行的 console.log() 找到了函式內層的 a，值為 5
  但在函式外層的 console.log() 卻找不到內層的 a，所以顯示 undefined

  但這其實對於其他程式語言來說，並不嚴謹，舉例來說像是下面的程式碼：

  ```javascript=
  function abc() {
    var a = 5
    if (true) {
      var b = 10
    }
    console.log(a)  // 5，因為我看得到 a 是 5
    console.log(b)  // 10，雖然 b 在 if 裡面，但我仍看的到 b 是 10 唷
  }

  abc()
  console.log(a)  // 我找不到 a
  console.log(b)  // 我找不到 b
  ```

  一般來說，作用域的範圍會是以 `{ }` 作為分界，在這狀況下用 var 宣告的變數相當容易造成開發人員的混亂。

  而利用 ES6 的 let 宣告的程式碼，則能將作用域限縮在 `{ }` 裡面
  ```javascript=
  function abc() {
    let a = 5
    if (true) {
      let b = 10
    }
    console.log(a)  // 5，因為我看得到 a 是 5
    console.log(b)  // 我找不到 b
  }

  abc()
  console.log(a)  // 我找不到 a
  console.log(b)  // 我找不到 b
  ```
  因此**建議使用 ES6 的 let 進行宣告**，const 也和 let 有相同特性。

### 字符版（Template Literals）
在字符版，你所打的任何內容都會完整呈現，如果想要添加變數，在 `${變數}` 符號內增加你所需要變數名稱或功能等即可。

```javascript=
// 舊有方式
console.log('我必須要用 \n 才能斷行' + variable + '還要跳出來再加上變數名稱，')

// 用字符版
consolo.log(`我可以自由
斷行，可以用${variable}，用符版去新增變數。`)
```

### 解構（Destructuring）
- **用法**
  當想要將物件、陣列中的元素拿出來放入變數中的時候，可以使用
  針對陣列舉例來說，過往的做法是像下面這樣：
  ```javascript=
  const arr = [1, 2, 3, 4]

  var first = arr[0]
  var second = arr[1]
  var third = arr[2]
  var fourth arr[4]

  console.log(second, third) // 2 3
  ```

  在 ES6 之後我們輕鬆用解構做到相同的事情
  ```javascript=
  const arr = [1, 2, 3, 4]
  var [first, second, third, fourth] = arr

  console.log(second, third) // 2 3
  ```
  
  簡單的說解構其實幫我們做了兩件事情：
  1. **宣告了變數**
  2. **將相對應位置的值賦予給了變數**
  
- **陣列的解構**

  ```javascript=
  var [a,b,c,d,e,f,e] = [1,2,3,4,5,6]

  console.log(b) // 2
  console.log(e) // undefined
  ```
  
  值得注意的是上述中的 e 在後面又重複出現了，會沒有分別對應的值，而出現了 undefined
  
- **物件的解構**

  ```javascript=
  const obj = {
    name: 'nick',
    age: '26',
    country: 'Taiwan'
  }

  var {name, age, country} = obj    //須注意這邊的變數名稱，須和內容的名稱相同

  console.log(name)    // nick
  ```

  如果解構的變數名稱不存在於物件內，則會回傳 undefined，因此解構的變數名稱一定要和物件內的名稱相同，如 `var {name, age}` 會對應到裡面的 name 和 age。
  
- **進一步的解構**
  我們都知道物件可以再放入新的物件，所以物件解構之後當然也可以繼續解構下去，看起來很饒舌？直接看例子：

  ```javascript=
  const obj = {
    name: 'nick',
    age: '26',
    country: 'Taiwan',
    family: {
      father: 'josh',
      mother: 'selina'
    }
  }
  
  var {family} = obj    // 變數 family = family: {father: josh, mother: selina}
  var {father} = family // 變數 father = josh

  var {family:{father}}) = obj
  // 你甚至可以直接寫上面這行，直接宣告變數 father = josh
  ```
  
  上面的例子中先用 family 對 obj 進行了解構，隨即又使用 father 對 family 進行了解構。
  
- **在 function 裡面操作解構**
  下面這段程式碼，是標準要印出 a 內容的作法
  ```javascript=
  function test(obj) {
    console.log(obj.a)  // 印出 hello
  }

  test({                // 這段程式碼其實只是呼叫 test()，而放入的內容
    a: 'hello',         // 是一個物件{a: 'hello', b: 'nick'}
    b: 'nick'
  }) 
  ```
  下面這段程式碼，是個簡單的針對 function 利用解構去印叫出想要的內容
  ```javascript=
  function test({a, b}) {   // 將 obj 解構成 {a, b}
    console.log(a)          // 一樣可印出 hello
  }

  test({                    // 這段程式碼其實只是呼叫 test()，而放入的內容
    a: 'hello',             // 是一個物件{a: 'hello', b: 'nick'}
    b: 'nick'
  })
  ```
  
### 展開運算子（Spread Operator）
想將物件、陣列攤平的時候非常方便使用，只要在想展開的東西前面加上`...`即可。
  
- **陣列展開**：
  ```javascript=
  var arr1 = [1, 2, 3]
  var arr2 = [4, 5, 6]
  var arr3 = [arr1, arr2]

  console.log(arr3)        // [[1, 2, 3], [4, 5, 6]]
  console.log(...arr1, ...arr2)  // [1, 2, 3, 4, 5, 6]
  ```
- **物件展開**：

  ```javascript=
  var obj1 = {
    a: 1,
    b: 2
  }
  var obj2 = {
    d: 4
  }

  var obj3 = {
    ...obj1,
    c: 3,
    ...obj2,
    d: 5
  }
  console.log(obj3)        // {a: 1, b: 2, c: 3, d: 5}
  ```
  要注意的地方是，後面的 d: 5 會蓋掉前面的 d: 4。
  
- **用法**
  **複製物件或陣列（非常好用）**：
  ```javascript=
  var arr = [2,3,4]
  var arr2 = [...arr]

  console.log(arr2) // [2,3,4]
  ```
  用展開運算子複製物件或陣列，會是一個全新的物件或陣列，新的記憶體位置與新的值，所以可以不用擔心在更改過程中改到原本被複製的物件 / 陣列的值。
  （忘記原理的話去看上面的 week2 的重要概念）
  
### 反向展開（Rest Parameters）
- **陣列例子**
  通常與解構搭配使用，可以理解為變數 rest 前的 `...` 將剩下的內容打包起來給變數 rest，打包的概念正如同展開的相反，故稱反向展開。
  ```javascript=
  var arr = [1,2,3,4]
  var [a,...rest] = arr        // rest 是自定義變數名稱，可改

  console.log(rest) // [2,3,4]
  ```
  
  注意 ...rest 只能放在解構的最後一個區塊，你沒辦法在後面再接變數
  所以　var [a,...rest, theLast ] = arr 這樣的寫法是行不通的

  
- **物件例子**
  物件也是同樣寫法
  
  ```javascript=
  obj1 = {
      a:1,
      b:2,
      c:3
  }

  var {a , ...obj2} = obj1

  console.log(obj2)  // { b: 2, c: 3 }
  ```
- **函式例子**
  反向展開也可以用在函式，參考下面兩個例子
  ```javascript=
  function sum(...args) {
      console.log(args)
      return args[0] + args[1]
  }

  console.log(sum(3,5))  // 8
  ```

  ```javascript=
  function sum(a,...args) {
      console.log(args)
      return a + args[0]
  }

  console.log(sum(3,5,50,60,70))  // 8
  ```
  可以發現這樣的用法很像函式的 arguments，差別在於上述例子中使用反向展開的 args 本質是**陣列**，而之前的 arguments 是長得像陣列的**物件**。
  
### 預設值（Default Parameters）
主要是運用在 function 上面，可以替參數賦予預設值，只需要在參數後面寫上 `= '預設值'` 即可
```javascript=
function(a, b, c = 10) {
  return (a + b) * c
}

console.log(sum(3,5)) // 80

```
從上面可以看到，參數 c 被賦予了預設值 10，因此可以得出 80，**同樣也可用在解構**。

```javascript=
const obj1 = {
  a: 1,
}

const {a = 2, b: 'hello'} = obj1

console.log(a, b)  // 1 'hello'
```

### 箭頭函式（Arrow Function）
一種新的函式宣告方法，可以讓語法更簡潔，習慣後可讀性會更高
下面兩種是原本的宣告方式，功能相同
```javascript=
function test(num) {
  return num * 3
}
```

```javascript=
const test = function(num) {
  return num * 3
}
```
將上面的使用箭頭函式簡化之後
```javascript=
const test => num > num * 3  // 第一個 num 是參數，num * 3 是回傳值
```
可以看到簡化之後變得非常簡潔，使用箭頭函式時有幾個需要注意的點：
- function 變成了以 `=>` 表示，並搬到後方。
- 參數若只有一個，可省略`( )`，若沒有參數或多個參數，仍要保留 `( )`
- `>` 後面的內容表示回傳值，若內容過多仍可寫成 `{ }` 的形式

### ES6 模組（Import 與 Export）
ES6 新增了 import 還有 export 的語法，這兩個是成對的，如同 export 與 require 一樣
同樣地，這語法也有幾種不同的輸出寫法可供選擇，需要注意的是這個語法在 node.js 可能無法執行，這是因為 node.js 還不支援這個語法，因此我們需要使用 Babel 套件來執行（詳情請看 Babel 章節）。

- **第一種**
  基本寫法
  輸出端，檔案名稱為 utils：
  ```javascript=
  export function double(num) {
    return num * 2
  }

  export const PI = 3.14
  ```

  輸入端寫法：
  ```javascript=
  import {double, PI} from './utils'
  
  console.log(double(10), PI)  // 20 3.14
  ```
  
- **第二種**
  將 export 獨立出來，用 `{ }` 進行整合
  **輸出端：**
  ```javascript=
  function double(num) {
    return num * 2
  }

  const PI = 3.14
  
  export {               // 將 export 獨立出來用 { } 包住要輸出的函式名稱
    double as mutiple,   // 可以透過 as 將 double 換成你想要的變數名稱
    PI                   // 變數名稱不變
  }
  ```
  
  **輸入端：**
  ```javascript=
  import {mutiple, PI} from './utils'  // double 變數更換成 mutiple 了
  
  console.log(mutiple(10), PI)  // 20 3.14
  ```
  
  需要注意的是，`export { }` 雖然長得很像物件，但並不是一個物件屬性，這個輸出方式，可以透過 as 將原本的名稱，更換成其他的變數名稱，而輸入端則可使用設定好的變數名稱。
  
  **小提醒**：
  你也可以將 as 寫在輸入端中
  ```javascript=
  import {mutiple as other, PI} from './utils'  // mutiple 又更換成 other 了
  
  console.log(other(10), PI)  // 20 3.14
  ```
  
- **第三種**
  將全部輸出的 function 都輸入進檔案內
  ```javascript=
  import * as utils from './utils'  // 將所有函式一次 import 並更換成 utils
  
  console.log(utils.mutiple(10), utils.PI)  // 20 3.14
  ```
  
  不管輸出端用第幾種方式寫，在輸入端一律將有輸出的函式一次 import 進來，並給予一個變數名稱，而在呼叫時則在函式前面加上給予的變數名稱即可，可以想像成是呼叫物件的值。
  
- **第四種**
  在輸出端加入 default，自動產生和函式名稱相同的變數名稱
  **輸出端**
  ```javascript=
  export default function double(num) {
    return num * 2
  }
  ```
  
  輸入端
  ```javascript=
  import double utils from './utils'    // 可直接傳入 double，而無須使用 { }
  
  console.log(double(10))               // 20
  ```
  
  透過加入了 default 指令，輸入端可省略 `{ }`，直接打上函式名稱，即可呼叫。
  
## Babel（相容語法工具）
Babel 是一個轉換套件，由於前端技術的發展太過快速，有許多功能，瀏覽器都尚未能夠支援，而 Babel 便能協助我們將新的語法轉換並相容在舊的瀏覽器上面。

Babel 官網的[安裝說明](https://babeljs.io/docs/en/next/babel-node.html)

這次主要說明的東西是 **babel-node**
這東西可以把它當作 Node 使用即可，差別在於這可以執行更新的指令，但因為效能較差並**不推薦使用在 production 上面**，這東西只要自己玩玩就好，如果要使用在 production 上，babel 有提供另外的工具。

設定步驟：

先安裝必要套件
`npm install --save-dev @babel/core @babel/node @babel/preset-env`

安裝之後 便可執行 `npx babel-node`，這部分類似於使用 node 的操作，單純輸入會進入編輯模式，後面可加上要開啟的檔案，讓 babel-node 去跑指定的程式。

這時候如果你執行程式時一樣發生了錯誤，可能是因為沒有安裝 `@babel/preset-env` 
（但上面在第一步驟已經有先幫大家輸入了）

這個套件的功能是告訴 babel 要將語法轉換成多舊的版本。
這時候雖然安裝了套件，如果還是會出錯，這是因為你還沒告訴 babel 你要使用這個套件

所以，你需要新增一個檔案 .babelrc，在檔案內填入內容，告訴 babel 要用這個 preset：
```
{

 "presets": ["@babel/preset-env"]

}
```
最後使用 `npx babel-node '檔案名稱'` 即可。

#### 複習週 Week3 心得小結
這週的內容，要複習的內容比想像中多很多，除了 ES6 的語法，對於 module 的部分則是有了更深的理解，因為當初的題目更多時候是先照搬語法，知道這語法能這樣用，但其實不知道詳細的原理，有點囫圇吞棗的感覺。至於這麼多種 export 和 import 的方式，自己也還沒實測哪種最為便利，但估計之後會是採用 ES6 較多吧？
也稍微理解了一些為何當初為何會要先學 npm jest 等工具了。


# Week4-網路基礎
在這週開始講解關於網路的一些基礎知識，會讓你知道網路背後大概的運作模式是怎麼樣的，而常常聽到的 API 到底是什麼，也會在這週開始學習，好，接著開始繼續複習筆記了！

## 傳紙條的故事
根據傳紙條守則，我們可以發現幾個跟網路相關的重點
- 至少經過三步驟，確保雙方都能收發
  1. A 發送 給 B，B 收到訊息（B 接收 OK）
  2. B 回傳給 A，A 收到訊息（A 的接收 OK，同時也能知道**自己在第一步的發送**也 OK）
  3. A 再回傳給 B，B 收到訊息（B 發現自己在第二步的發送是 OK 的）

- 資訊標準化：
  1. 數字格式統一（http status code）
  2. 資訊類別統一（http status）
  3. 回復格式統一（header / body）
  4. 動作統一（http method）


- 不同服務：
  1. 有很多不同種的服務代號（port 概念）
  2. 因為服務不同，格式也不同（不一定有 header / body）
  3. 因為服務不同，也不一定需要三次確認（UDP）
  4. 不一定要寫地址，可直接寫域名（DNS 會轉換根據域名找到地址）

- 協定（protocol）
  在傳紙條的故事裡面，千千訂出了一套標準化的規定，讓大家遵守這個規定，並依賴這個規定省略掉很多溝通上的成本。

  所以**協定就是為了能讓彼此能夠溝通所建立起來的規範**
  
## 關於 HTTP（HyperText Transfer Protocol）
中文翻譯**為超文本傳輸協定**，說穿了其實就只是一套網路上的標準而已，之所以重要是因為是目前網頁前端和後端的溝通基礎。
網址前頭的 https，就是代表我們是基於 HTTP Protocol 的基礎上來進行網路操作

### HTTP request / HTTP response
所謂的 request 簡單來說指的其實就是當使用者（Client）在網路上要查看一個網頁的時候，必須要跟伺服器（Server）請求檔案文件的這一項行為
而伺服器接收到了使用者的 request 請求之後，會給予回覆，這就是 response

**簡短敘述如下**
Client 會傳送出一個 http request 給 Server，Server 回傳一個 response 給 Client

Server 的 response 被瀏覽器處理，成為使用者可見到的畫面或文字

request 的內容通常包含下列資訊： - method ( 會決定 response ) - header - body ( 若 method 為 POST )

當 method 為 POST 的時候，Chrome 可以看到 POST 的格式內容，這表示了在之後使用 request 套件的時候，我們會在 POST 使用 {} 寫入內容送出。

response 的內容通常包含下列資訊： - Status Code - header - body - 其他資訊，如 date 等..

### HTTP Method
指的是發送什麼樣動作的請求到伺服器端，**常見的有：GET / POST / DELETE / PATCH**

### HTTP Status
指的是伺服器回傳的狀態碼，每種狀態碼各有其代表的意思。**常見的有：200 / 301 / 404 等等**
##### 補充資料：
[其它 HTTP Method](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)
[HTTP Status Code](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)


### DNS (Domain Name System)
負責處理將域名轉換為 IP 位置（Chrome 開發人員可以看到 Headers 底下有 Remote Adress）回傳給 Client，Client 再根據這個 IP 對 Server 發送 request

每個域名都有它所對應的 IP 位置。一些盜版軟體的原理會把驗證用的域名的 IP 改為你自己的電腦的 host，也就是 Localhost，因為不會有任何 response 或服務，所以可以通過驗證。

##### 補充資料：
- Mac 可以在 CLI 輸入 nslookup 查看特定網址的 IP 位置
- 有個很神秘的檔案，可以在裡面輸入 ip 網址，會讓你在之後輸入網址時轉只到你輸入的 IP 位置，在影片[NET101] 2-3章，但應該不是很重要
- 127.0.0.1  預設都是指向自身電腦

### request 套件
永遠別忘記瀏覽器也是另一套軟體而已，意思是你不用透過瀏覽器，也能取得你要的 response，有個 library，叫做 request，透過它我們便能使用 CLI 取得資料。[request 官方文件]( https://www.npmjs.com/package/request)

藉由這個套件運行 request 與接收 response 的過程，我們可以了解到瀏覽器也只是一個程式。因為即使不使用瀏覽器，也可以發送 request 與接收 response

## TCP/IP
###### 會這樣命名，是因為其底下的 TCP 與 IP 特別重要，所以以這兩者命名
### 網路的層級
在說明 TCP/IP 之前必須要先了解**網路的層級**
在網路的世界裡，每一層的協定都是基於每一個層級之上，就像千千傳紙條的協議是建立在三次連接之上，三次連接的協議又是建立在郵差傳送紙條的機制之上，一層一層堆疊起來。
- [OSI 七層](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B)
- [TCP / IP 四層](http://cn.linux.vbird.org/linux_server/0110network_basic.php#whatisnetwork_tcpip)

### IP (Internet Protocol)
所謂 IP 指的是**網路上的地址**，而相關的協議有兩個 **IPv4** 和 **IPv6**，最主要差異，是為了解決 IP 地址不夠用的問題。

**下面對於各種 IP 的說明，可能並不完全正確，僅先暫時理解即可。**
- **固定 IP**
  基本上 Server 都會是固定 IP
- **浮動 IP**
  指的是每次連網時，IP 都會不一樣，一般用戶大多都會是使用這種 IP，也較能避免被駭客攻擊
- **虛擬 IP**
  指的是內網 IP，想像一下，家中的數據機，會分享給好幾台電腦使用網路，所以實際上，你們都是共用一個 IP 位置，但每台電腦又應該要有一個 IP，因此這時候就會是虛擬 IP，通常會是以 192.168.0.XX 為開頭

### 連接埠（Port）
port 主要是分類服務，每一個伺服器都會有許多不同的服務內容，而如何區分這些內容的依據就是依靠 port，舉例來說，今天使用了連到了某個 IP 可能是 **124.42.150**，在這後面加上 **:80**，就表示你今天要連到 **124.42.150:80** 這個服務，而伺服器如果有監聽 :80 這個 port，Server 就會回傳相對應的服務內容給 Client 端。

而常見的**預設 port** 如下：
|協議類型|port|
|---|---|
|HTTP|80|
|HTTPS|443|
|FTP|21|

測試的話，通常會用冷門的 3000、4000 等

### TCP 與 UDP
在傳輸層有兩個最常見的協定
- TCP：講求穩定與可靠
  標準的**三次握手**，應用在大多數場合。
- UDP：講求快速
  容易丟失封包，但會一直丟出訊息，應用在即時戰況，視訊等等。

  ##### 補充資料：
  [關於三次握手](https://zhuanlan.zhihu.com/p/24860273)
  
## API
### 什麼是API
指的是一種資料交換的介面，不一定只應用在網路上（其為 Web API），因此 USB 也能稱之為是一種 API（因為 USB 提供了不同裝置之間的資料交換），在軟體開發上，擁有資料的人（以下簡稱開發者）透過制定了 API 文件，讓其他的人能夠透過制定好的 API 規則，去獲取開發者的資料，而一般溝通上說到串 API，便是指將軟體之間的資料交換方式串聯好。

**我們一般使用的 Web API 基本上是 HTTP API**，**也就是 API 遵守 HTTP 的協定來交換資料**。反過來說，API 不一定會建立在 HTTP 之上，那串接的方法也會有所不同。

它的概念也可以理解成橋樑連接兩座島嶼，而橋樑上的車輛就像資料一樣在兩座島嶼之間來回行駛，有來有往。而這座橋樑的設計也僅為了一定的車輛，比如說坦克車和大貨車就不得由這座橋樑行駛，因為有限高和限重。

### SDK ( Software Development Kit )
SDK 其實就是打包了成群的 API，可以讓人直接呼叫即可

### 串接 API 流程：
1. 去看懂那該死的官方 API 文件
2. 遵守 Step.1
3. 嘗試串接它！

##### 補充資料：
還有一種網路交換資料方法：SOAP，由於較少人使用，大概了解即可


### RESTful
指的是一種制定 API 文件的網站架構風格，但不是一種規範。目前大多的 API 都套用 RESTful，它的目的為簡潔化並標準化，算是潛規則之一。

## JSON ( Javascript Object Notation )
JSON 是一種**資料格式**
非常像 JS 的物件，但是寫法會是 `{"name": "josh"}`，注意前面的 name 也被 "" 包住了。

現行網站內容較多使用的格式，逐漸取代 XML，與 JS 相容性好，可透過語法 JSON.parse() 將 JSON 格式轉換為物件，也可以將物件使用 JSON.stringify() 轉換為 JSON 格式的字串

JSON 也可以在其它的程式語言中使用


##### 補充資料：
XML (Extensible Markup Language) 是種舊的資料格式但仍有人使用，因此也需要了解一下。

## 與網路相關的額外好用工具
- cURL 是 CLI 非常好用的工具，相關[指令集](https://zh.scribd.com/document/90229628/Curl-Manual)
- ping
- telnet
- nslookup

上面這些都是非常好用的工具，可以稍加研究。

#### 複習週 Week4 心得小結
這週的印象非常深刻，因為這也是我開始嚴重掉進度的一週，有很多觀念要重新建立，以往對於這方面的知識都是略懂略懂，從未深刻研究過，而 API 的部分雖然已經看懂了概念，但實際上操作時會有很多問題，也有很多小細節和觀念是剛學習時不會特別注意到的，而當回過頭來重新複習的時候，才會特別注意到，原來是這麼回事阿！

# 不負責任結語
這篇內容，只是一個正在嘗試成為 geeker 的菜鳥所寫出的複習筆記，所以不保證完全正確
雖說如此，其中很大部分是自己理解後還有參考同伴筆記後所寫出的東西，所以就和同伴說的一樣還是有 90% 的把握概率吧！

其實還有一些參考的補充資料沒補上，但那等有時間在補齊吧。
