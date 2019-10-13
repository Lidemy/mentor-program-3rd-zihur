# Week15 複習週筆記
[原文版本](https://hackmd.io/dxak1pV6SBGZJVfYhqkLNQ?both)

終於來到了第 15 週，這是第三篇筆記了，同樣有非常多要學習的內容，依照慣例，一開始先紀錄這次的內容大概會有些什麼
之前的複習文章請往這裡走，[第一篇](https://hackmd.io/pcFZrgR4TICSR8msMCvGDw)、[第二篇](https://hackmd.io/ItuelUC_R-68FGry4Kn_1A)。

1. Session 與 Cookie 的差異
2. 資訊安全（Hashing, SQL Injection, XSS）
3. jQuery
4. Bootstrap
5. Promise
6. 網路基礎知識
7. 資料庫的基本 ACID 概念
8. 部署、ssh 連線

這次要複習的內容眾多，加上過往複習的經驗，這裡部分章節可能會稍微帶過，而重點複習自己不熟的地方，所以除了上述這些，最後會在補上物件導向，這個部份其實應該是在第九週的內容，但上次的複習週想趕進度偷懶了，但發現自己在寫 PHP 的時候極為不熟，決定在這邊複習下相關基礎知識。

# Week11 - 後端基礎（二）
這週延續之前第九週的後端內容，我們開始接觸到後端極為重要的基礎觀念，其中 Cookie 和 Session，這兩者的比喻和說明，網路上已經有非常多了，如果要深入探討的話可以直接參考 Huli 的 [系列文章](https://medium.com/@hulitw/session-and-cookie-15e47ed838bc)，這邊只簡單比喻和記錄用法，除此之外還會說明關於密碼方面的問題。

## Cookie 篇
Cookie 其實就是個文字類型的小型檔案，會以 Key = Value 的形式透過瀏覽器儲存在 Client 端裡面，而當進入網站時，會根據不同網域自動帶入此網站所設定的 Cookie 資訊，下面這篇故事是個人寫作業時的小小譬喻，請多指教。

> 來說說一個小故事，每天小明都會去家裡附近的雜貨店買東西，雜貨店的老闆娘人非常好，但就是有個問題，每次小明來到店裡都會問他：
>
> 客人你住哪裡啊？
  客人你想要買什麼東西啊？
  客人你第一次來我店裡是什麼時候啊？
  客人你是男的還是女的阿？
  客人你叫什麼啊？
  客人你的興趣是什麼啊？
  客人你聽音樂嗎？
  ……更多問題
  有些問題看起來很重要，有些問題看起來則是莫名其妙（嘿！這邊一個單押呢！），久而久之，小明覺得非常麻煩，明明每天都到雜貨店買東西，怎麼一直都要被問重複的問題呢？於是小明想了一個妙招，他決定穿著一套名為 Chrome 的衣服，並且在這件衣服的外面，直接貼上許多的便條紙，並且小明直接請老闆娘在紙上寫著類似像下面的內容：name=zihur;location=Taiwan;music=yes，這麼一來，只要小明到店裡，老闆娘自己看衣服上面便條紙所寫的內容後，就不用一直問他了，而這便條紙功能就類似於是 cookie 了。
>
> 從上面這個故事來看，大家就可以知道 cookie 是個多方便的東西了，但是其實也隱藏著一些眉眉角角：
>
> 1. 今天小明心血來潮換穿了一件名為 Edge 的衣服去店哩，突然發現，老闆娘又問他這些問題了，原來是因為老闆娘一直都是看便條紙上的資訊，但便條紙是黏在 chrome 這件衣服上面的，所以老闆娘就看不到這些資訊了。
> 2. cookie 是用文字的形式寫到便條紙上，而便條紙的空間有限，因此能記錄下的資訊數量其實也有限。
> 3. 每次當小明想和老闆娘要求一些東西的時候，老闆娘都會習慣整張紙看過一遍，所以當你要求看三張圖片時，老闆娘就會看這張便條紙三次，如果便條紙上的內容非常多，老闆娘就會花費許多力氣一直去看他，即便老闆娘上一秒才剛看過這些資訊。
> 4. 便條紙會逐漸不再具有黏性，寫上去的字也會逐漸模糊，因此這表示著 cookie 上的資訊通常是有保存時間限制的。
> 5. 如果你有注意看故事內容的話，你會發現這張便條紙上的內容，是老闆娘寫給小明的，這也相當合理，因為老闆娘自己才知道要詢問那些問題，而老闆娘會根據小明的回答或行為，寫下相對應的內容。但實際上便條紙一直黏貼在小明的 chrome 衣服上，而這衣服又一直在小明這裡，這也表示小明甚至其他人當然也能在這張便條紙上寫下其他資訊偽造囉。
> 6. 這大概是 cookie 最重要的知識之一了，那就是便條紙既然是貼在衣服外面的，這意味著，這非常容易被其他人看到並且存取這些資訊，更甚者有心人可以偽造 cookie。
> [color=#52bbbf]
> 
> [name=Zihur]

### PHP 的 Cookies 用法：
#### **設定 cookies：**
```php=
<?php
setcookie(key, value, time()+3600); // 存活一小時
/* setcookie("變數名稱", "變數值", "存活時間", "路徑", "網域")
 * 路徑為指定可以存取該 Cookie 的路徑，網域同理
 * 此語法屬於 header 設置，因此必須在任何輸出之前呼叫 */
 
/* 小技巧，可以用下面的方式搭配函式設定，更清楚 */
setcookie(key, value, strtotime('+30 days'))
?>
```
#### **使用 cookies：**
```php=+
<?php
echo $_COOKIE["key"];  // value;
?>
```
#### **更新 cookies：**
實際上並未有更新 cookie 的指令，所以只能重新設定，下面只有第一種作法是正確的
- **正確方法**
  ```php=
  <?php
  setcookie("color", "red");
  echo $_COOKIE["color"];
  /*color is red*/
  /* your codes and functions*/
  setcookie("color", "blue");
  echo $_COOKIE["color"];
  /*new color is blue*/
  ?>
  ```
- **錯誤方法**
  ```php=
  <?php
  $_COOKIE["color"] = "yellow";  // wrong way!
  ?>
  ```
  :::info
  上面**第一種方法**才是正確的更新方式
  **第二種方法**是錯誤的，因為這種方式是新增加內容到 **cookies** 的陣列內
  實際上並未 **Set-Cookie 到 HTTP header** 內，因此無法傳送設定到 client 端。
  :::
  [參考連結](https://stackoverflow.com/questions/20064926/difference-between-setcookie-and-cookie-in-php)
  
#### **刪除 cookies：**
你常會看到有人使用 unset()，但這其實並未真正刪除，這只是清空了變數的賦值，正確做法是重新設定一個會過期的的 cookie
```php=
<?php
unset($_COOKIE["yourcookie"]);  // wrong way & no need!
setcookie("color", " ", time()-3600);  // 利用過期，而真正意義上的清除 cookie
?>
```
[參考連結](https://www.sitepoint.com/community/t/deleting-a-cookie-with-php/201508)

### JavaScript 的 Cookies 用法：
要在 JS 內設定 cookie 可以透過 document.cookie 進行操作

#### **設定 cookies：**
```javascript=
/* 默認情況下，持續時間為關閉瀏覽器，同樣當然也能設定網域等參數 */
document.cookie = "name=test";

/* 可以寫成下面的 function 方便使用 */
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
```
#### **使用 cookies：**
在 JS 要使用特定 cookie 會比較麻煩，因為當呼叫 cookie 時，會自動把所有的 cookie 以字串形式帶出來像是這樣 `cookie1=value; cookie2=value; cookie3=value;`，因此通常要搭配寫成 function 使用。
```javascript=
/* 這樣會把所有的 cookie 以字串形式帶出 */
var x = document.cookie;
console.log(x);

/* 可以寫成下面的 function 方便使用 */
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
```

#### **更新 cookies：**
```javascript=
/* 只要重新設定 cookies 即可 */
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
```

#### **刪除 cookies：**
```javascript=
/* 只要過期時間比現在的時間早即可 */
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

/* 可以寫成下面的 function 方便使用 */
function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}
```

## Session 篇
當初學習 Session 時，吃了很大的苦頭，原因是因為我一直把 php 的 Session 機制和瀏覽器的 **session storage** 當成是相同的東西了，包含了 **local storage** 但實際上，這兩者都是瀏覽器也就是 Client 端才有的東西，php 是無法設定的。而此時當你查資料時，不意外的還會查到 Cookie-based session 這個名詞，然後就會更加混亂了！

基本上 Session 指的是一種紀錄狀態機制，由於網路本身式無狀態性的，為了在網路上辨認使用者，而產生出來的**機制**，你說 cookie 也能夠拿來辨認資訊啊？沒錯，但是這兩者講的內容是完全不相干的，因為今天即便你沒有 cookie 也能建立起這種辨認使用者身分的機制，只是因為 cookies 太方便了，所以大家都習慣使用 cookie 來實踐 Session 的機制。

實際應用上我們會利用到 cookie 的時候只有在第一次登入時會給予一個亂碼的證件，之後就認證不認人了，而這個證件會對應到 Server 內的使用者資料，而其中特別要注意的是因為 **Session 是將使用者資料儲存在 Server 端的，因此，解決了 cookie 被輕易被仿造身分的問題**，這邊只是簡單解釋，更多相關的說明就請再去查詢網路資料，不再贅述。

### PHP 的 Session 用法：
#### **啟用 Session：**
在 php 使用 session 之前，必須先啟用 session，因此都會在輸出 html 之前啟用
```php=
<?php
session_start();
```
#### **設定 Session：**
```php=+
<?php
$_SESSION['UserName']='Jordan';
```
#### **使用 Session：**
```php=+
<?php
/* 直接呼叫即可 */
echo $_SESSION['UserName'];
```
#### **更新 Session：**
重新設定一次變數名稱的值即可 
```php=+
<?php
$_SESSION['UserName']='Mike';
```
#### **刪除 Session：**
[參考連結](https://blog.csdn.net/qq_26291823/article/details/51005528)
```php=+
<?php
/* session_unset() 僅刪除所有的 session 值，並未刪除變數 */
session_unset();

/* session_destroy() 刪除所有的 session 變數，並且結束此次的 Session，釋放空間 */
session_destroy();

/* unset($_SESSION['xxx']) 可以單獨刪除某個 session */
unset($_SESSION['xxx']);

/* 千萬不要 unset($_SESSION) 這會導致無法在寫入任何 Session*/
```


## 密碼篇
當我們要將使用者的密碼一併存入資料庫內時，必須要注意到一件事情，假如今天有人入侵了資料庫，那麼這個資料庫就會被看光光了，其中密碼的部分，更會被一覽無遺，因此我們在儲存時，是絕對不能存明碼的，必須要先經過 "加鹽" 以及 "雜湊處理"。請注意這邊不會使用 **一般加密**
### 加鹽 (salt)：
加鹽指的是，為了避免使用者使用過於簡單的密碼，存入之前會自動為其增加一些複雜性。
### 雜湊 (hash)：
雜湊其實就是一種特殊的演算法，這種特殊的演算法有許多種，例如 SHA-256、MD5、SHA-1 等（後兩者已經被證實不安全。），雜湊會將密碼變成一串不可逆的亂碼，原理是經過一些方式，將無限大的可能收斂至有限度的可能性，因此同樣的一組亂碼，回推回去會有無數種可能，使得其 **不可逆**，而既然如此也就代表會有碰撞的可能性，一個優秀的演算法，會盡量減少這個可能性。
### 加密 (Encryption)：
加密有分對稱式加密以及非對稱式加密，而一般在說加密時，就是代表此方式只要擁有密鑰，就 **可逆推** 回去的，但雜湊無須密鑰，也 **不可逆推**，因此雜湊函式不能被稱之為加密。
這邊只簡單帶過兩者差異。[參考資料](https://blog.techbridge.cc/2017/04/16/simple-cryptography/)
- #### 對稱式加密
  對稱式加密指的是，雙方在加解密時都使用相同的密鑰，因此只要擁有密鑰就可以進行解密。這樣的方式會造成假設在傳送資料過程中被攔截了，就能輕易被解開。如：BASE-64 等
- #### 非對稱式加密
  非對稱指的是，每個人都會各自擁有一個公開密鑰，以及私人密鑰，進行加解密的時候會是使用不同的鑰匙，這樣的方式能確保即便被攔截，也無法正確解密。如：RSA, DSA, ECC等

### php 內建雜湊函式 (password_hash)：
版本限定：(PHP 5 >= 5.5.0, PHP 7)
在 php 內要進行雜湊函式相當簡單，只要使用 `password_hash()` 加密，`password_verify()` 解密即可。以下參考自同期的 [Yakim 文章](https://yakimhsu.com/project/project_w11_Info_Security-Hash.html)
```php=
<?php
$password = '123456'; // 原始密碼

/* 第二個參數 PASSWORD_DEFAULT，能設定要使用的加鹽字串，建議預設即可 */
$hash_password = password_hash($password, PASSWORD_DEFAULT);
if (password_verify($password , $hash_password)) {
   echo "密碼正確";
} else {  
   echo "密碼錯誤";
}
```
> [name=Yakim][color=red]

## 複習週 Week11 心得小結
這週主要重點在 Cookie、Session、基礎密碼學的資安觀念，如同前面所說當初學習的時候為了明確說出 Session 定義撞牆了許久，只知道資料存放位置的差異，還有實際上 Session 是為了解決網路無狀態的問題，而產生出來的一種機制，然而大概只有我一直把這個東西和瀏覽器的 **session storage** 以及 **local storage** 弄混在一起，導致我一直覺得資料是可以被改變的。弄清楚之後就好懂了許多，感謝 Huli 的文章和教學 🙇‍
密碼學的部分，其實我是到後面伺服器部署的階段才更加熟悉，因為會使用 SSH 去進行認證，而這部分其實就是非對稱式加密的應用囉～

# Week12 - 後端基礎（三）
經過了 Week11 Cookie、Session 以及密碼學的基礎知識之後，至此已經可以實作出基本的會員系統了。但是，實際上在這個部分還有許多的問題。那就是常見的資安攻擊手法、XSS 攻擊、SQL injection，CSRF，這週進度就是會大概知道要如何防範這幾種攻擊方式，只要能了解，大部分的惡意攻擊都能抵擋。

## XSS 攻擊 (Cross-site scripting)
XSS 又譯作跨網站指令碼，這種攻擊本質是透過程式碼的漏洞，將惡意的程式碼注入到程式之中，繼而做出各種程式執行，此種攻擊手法有非常多種，以下是常見的有三種型態：
- 儲存型 (Stored)
  此種主要常見於各大論壇、留言板等地方，之所以被稱之為儲存型，是因為會將程式碼儲存到資料庫中，而只要當網站從資料庫讀取資料並呈現於網頁時，就會觸發程式碼。
  
  ```htmlmixed=
  <form action="database.php">  // 會傳去後端處理，並且資料會儲存到資料庫內
    <input type="text">  // 提供了可輸入留言的欄位，之後會於下面的 div 內出現
    <input type="submit">
  </form>

  /* 正常狀況下 div 內會直接輸出字串 */
  <div>
    安安，我會是正常的字串內容
  </div>

  /* 有人在上面提供的欄位內惡意輸入 <script>alert('安安')</script> */
  <div>
    <script>alert('安安')</script> // 有心者可以放入各種程式碼。
  </div>
  ```
  由於這種方式是永久將程式碼植入資料庫內，因此，一旦發生，通常都極為嚴重。
  
- 反射型 (Reflected)
  此種行為程式碼不會儲存於資料庫內，而是後端會直接利用前台給予的資料直接返回呈現於頁面，常見於利用 GET 方法來進行前後端資料交換的時候。

  ```htmlmixed=
  /* 原始程式碼 */
  <p>HI~</p>
  <p><?=$_GET['name']?></p>// 這邊設計成直接去吃網址的 name 值

  /* 網址列：http://example.com?name=Danny */
  <p>HI~</p>
  <p>Danny></p> // 正常呈現 Danny 這個人名

  /* 網址列：http://example.com?name=<script>alert('安安')</script> */
  <p>HI~</p>
  <p>這裡被寫入了彈跳程式碼</p>
  ```
  這範例可以看到是利用了網址進行注入，有人可能會說，那是使用者刻意把程式碼打在網址壓，也只會影響自己，誰會特意這麼做呢？恩...太天真了，如果有人先打好再傳這段網址給別人呢？
  什麼！？你說這麼明顯的網址，也太容易被識破。
  恩...有道理～但你是不是忘了還有一個東西叫做 **短網址服務** 呢？
  
- DOM 型 (DOM-Based)
  要理解這種攻擊方法必須要先熟知 DOM 的操作，很多時候，網頁會是透過 JavaScript 接收資料並直接生成畫面，常見於如果使用了 inner.html 去做生成畫面的話，就容易會發生，這種通常會需要使用者親自在畫面中輸入特定內容才會觸發，因此大多需要配合第一種和第二種的攻擊手法。

以上三種攻擊型態，前兩種大多都是因為後端沒有仔細做好檢查進行特定字元跳脫，而直接生成資料給前台而觸發的，第三種則是前端並沒有仔細做好檢查而產生的程式漏洞，

### 防範方式 (Escaped)
基本上要防範這種攻擊，就是在輸出資料的時候要去跳脫字元，絕對不能直接輸出原始資料。
```php=
// php 跳脫字元的內建函式 htmlspecialchars
echo htmlspecialchars($str, ENT_QUOTES, 'utf-8')

// 輸出時需要 encoding
& --> &amp;
< --> &lt;
> --> &gt;
" --> &quot;
' --> &#x27;     
/ --> &#x2F;
```

## SQL injection
這種攻擊手法是利用寫入 sql 語法上的漏洞進行攻擊
```sql=
-- 原先的程式碼
SELECT * FROM users WHERE account= '$name' AND password = '$password'
```

原本預期使用者正常輸入帳號密碼之後，能夠選到該使用者的資料，但假如有人在輸入帳號密碼時改成這樣 `' or 1=1 /* `。
```sql=
-- 被輸入惡意字串後的程式碼，變成了下面這樣
SELECT * FROM users WHERE account= '' or 1=1 /*' AND password = '$password'
```
很明顯，透過改變了語句上的邏輯寫法，原本只會撈限定使用者的資料變成了全部會員的資料

如果網站遇到了這種攻擊手法，後果是非常嚴重的，因為這是直接入侵了資料庫，並且直接對資料庫進行各種操控，所以包含拿走資料，甚至刪除整個資料庫都可以。

### 防範方式 (Prepare Statement)
使用 php 內建的 Prepare Statement，這個功能基本上在執行 sql 指令的時候，會自動把輸入的字元進行跳脫，從而避免攻擊。

在使用 Prepare Statement 的時候，會有兩種取得資料的用法，各有優劣，這邊僅介紹 **get_result** 的寫法，**bind_result** 請看[參考連結](https://codeday.me/bug/20170918/73847.html)（絕對不是我太懶ＸＤ）

#### get_result 用法：
```php=
<?php
/* 建立模板 */
$stmt = $conn->prepared('SELECT * FROM users WHERE account= ? AND password = ?');

/* 將參數放入模板 */
$stmt->bind_param(ss, $name, $password);

/* 執行 sql 指令 */
$stmt->execute();

/* 儲存 sql 執行後的結果 */
$result = $stmt->get_result();

/* 判斷執行後回傳的資料筆數 */
if ($result->num_rows > 0) {
/* 撈出資料，此時在第一筆，通常會搭配 while 迴圈使用 */
  $row = $result->fetch_assoc();
}

```

### 關於 XSS 和 SQL injection 的觀念小提醒
- 做跳脫處理的時候，一般會選擇在==輸出時處理==，因為資料庫應該就是要去完整儲存使用者輸入的資料，而不該去隨意去改變使用者的資料。
- 何時該做 prepare statement 的時候，答案是==建議所有都做==！因為這是最安全的，也能養成好習慣，即便你認為都是自己的資料在互換，但你不會知道何時會改變需求變成使用者輸入。

## CSRF 攻擊
基本上這篇的防禦手法和觀念就是依照 Huli 的這篇 [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/) 所實作的，所以只會重點紀錄，想了解更多，請一定要點進去看唷！

又名跨站請求偽造，主要是利用瀏覽器在向網站發出請求時，會自動帶入使用者的 cookie 這點作為攻擊手段，第一次聽到這個攻擊手法的時候，感覺超級可怕的，為什麼這麼說呢？因為它可以讓使用者在 A 網站，不知不覺的在 B 網站做了各種你意想不到的事情，像是刪除自己的留言...之類的，什麼！？你說這感覺還好？那如果它能讓你不知不覺就把帳戶的錢轉出去了呢？是不是感覺有點可怕了呢？

### 防範方式
要預防這種攻擊，有很多種面向，但也都會有各自的優缺點。
- 加上圖形驗證碼、簡訊驗證碼等等
  最為安全，但如果只是刪除文章就要驗證一次，過於麻煩。
- 加上 CSRF token
  透過 Server 端生成 token，存放於 Server 端，比對 request 和 Server 的 token
- Double Submit Cookie
  透過 Server 端生成 token，存放於 Client 端的 cookie，比對 request 和 cookie 的 token
- client side 的 Double Submit Cookie
  前兩者，都是 Server 端生成，這次全部改由 Client 端生成
- SameSite - browser 本身的防禦
  既然漏洞來自 browser 的機制，那就從 browser 下手，透過設定 samesite 預防

:::warning
細節內容龐大，請看上面提供的文章，這裡就暫時不贅述...
:::

## 複習週 week12 心得小結
這週重點在於各式各樣的資安問題，其實當初在寫的時候就有想到一些基本的 XSS 問題了，但苦於要一個一個字元判斷跳脫，感覺很不實際，還好這週有學到作法囉～雖說早有注意到 XSS，但其餘各種 XSS 攻擊手法還是很大開眼界，更不用說是 SQL injection 跟 CORS 了。

# Week13 前端基礎（四）
結束了連續幾週後端的學習，我們已經知道，無論如何，後端都應該再做一次驗證以及資安防護了，接著這週回到了前端，會學習到 Bootstrap 和 jQuery 等知名 library 的使用，其中還有 Fetch & promise 等重要觀念的地方。

## Bootstrap
Bootstrap 是一套前端的 UI 用 library，透過一些已經制定好的 CSS 樣式，能幫助快速建構出版型，同時能夠方便支援 RWD，更已有寫好的部分元件，結合 jQuery 套件便可直接套用，而這些 UI 通常都能直接跨瀏覽器支援，畢竟最一開始這些 library 目的之一就是為了能方便相容於各個瀏覽器而開發出來的 library。

### 網格系統 (Grid system)
Bootstrap 這套 UI 函式庫運用到了這個系統，因此在這邊稍微提及，簡單來說就是透過平面設計的概念，將網頁切分成多個欄位，設計上便能根據這些欄位進行寬度設計，而最大的好處就是能夠方便因應目前越趨多元的螢幕尺寸，進行 RWD 設計。
其實這個部分應該可以完全跳脫出 Bootstrap 獨自寫下一個小章節，但這邊只是簡單帶過而已。

### 小提醒
別忘了 Bootstrap 就只是一個幫助快速建構的 UI 函式庫，這意味著，也有其他的 UI 函式庫可以使用，如果 CSS 和 JS 底子夠深，你甚至也能完全跳脫 Bootstrap 自行做出一套方便使用的函式庫，而 Bootstrap 最大的好處就是幾乎能相容各瀏覽器，如果你方便些，這是個很好的工具，缺點是你和其他網站的相似度可能會很高就是了。

## jQuery
> 不曉得這套件名稱是不是就代表 "JavaScript 的查詢 (Query)" 呢？
> [name=Zihur][color=#52bbbf]

當初最一開始自己接觸這塊的時候，一直以為是個很複雜的東西，但如果先學會了原生的 JavaScript 是如何操作 Dom 物件之後，就能夠很快速的抓到重點了，差別只是語法的使用而已，而我自己目前對於這套工具的想像就是要改善原生 JavaScript 的幾個問題

1. 選擇特定標籤相對麻煩
2. 減少操作 DOM 物件的指令
3. 更為方便的處理基本常見動畫，也因此 bootstrap 部分功能會依賴此套件
4. 各瀏覽器之間的相容性問題

其實前三個都是針對網頁的 DOM 元素進行指令操作時的步驟優化，第四個則解決長久以來前端一直很頭痛的問題，這也說明了為何此套件能如此廣泛應用。畢竟人一直是個以 "懶" 作為創意原動力的生物，能少打指令當然就少打阿 XD

## Fetch & Promise （前端重要觀念，但有點複雜）
### Fetch：
這東西就是新時代的 **XMLHttpRequest**！是利用 ES6 中的 Promise 作為回應
溫習一下之前串接 Twitch API 的時候是怎麼用 **XMLHttpRequest** 做的。
```javascript=
const xhr = new XMLHttpRequest();
xhr.open('get', `https://api.twitch.tv/kraken/streams/`);  // 請求方法及位置
xhr.setRequestHeader('Client-ID', 'xxxxx');  // 設置請求的 header
xhr.send();  // 正式發出請求

// 請求成功時執行 onload
xhr.onload = (res) => {
  // Do something...
}

// 請求失敗時執行 onerror
xhr.onerror= (res) => {
  // Do something...
}
```
可以發現其實有蠻多步驟的，於是 ES6 開始使用了下面這個方法


#### Fetch 用法
```javascript=
fetch('url')    // <= 可設定方法和 header，詳閱其他技術文
/* 請求成功執行，res 是請求成功後得到的內容 */
  .then((res) => {
    // Do something...
    console.log(res.json)  // <= 這是 res 提供的方法，可呈現 json 格式
    console.log(res.text)  // <= 這是 res 提供的方法，可呈現字串格式
    return result          // <= 回傳 result
  })
  .then((result) => {      // <= 接收前面的 result 繼續 .then 做其他事情
    // Do something...
  })
  
/* 錯誤回應的時候執行，如 404, 500 */
  .catch((err) => {
    // Do something...
  })
```
下面是語法說明簡化版本：
```javascript=
fetch(url, {})   // 這邊開始使用 fetch 可第二個參數設定請求頭，請求方法等
  .then()        // 請求成功進行 callback，可連續多個 .then
  .catch()       // 請求失敗進行 callback
```
恩看起來 fetch 被包裝起來，使用上變得更簡單了，但為什麼會跟 Promise 扯上關係？
那是因為如果我們這麼做，你會發現 fetch 其實是個 Promise 物件。
```javascript=
const api = fetch(url);
console.log(api);    // 回傳 Promise 物件
```
到這邊我們對於 Fetch 已經了解一半了，接著要來說 Promise 到底是什麼？

###### 參考資料
[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
[鐵人賽：ES6 原生 Fetch 遠端資料方法](https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/)

### Promise：
這東西其實就是個 "物件"，就有點像我們寫了一個下面這樣的物件一樣
但**實際上有些不一樣**，會更像是 **class** 的做法。
```javascript=
// 其實是最近寫太多 php 都快忘了怎麼寫 JS 物件...藉此複習一下
const person = {
  firstname: 'Zihur',
  lastname: 'Zhang',
  address: {
    country: 'Taiwan',
    city:    'city',
    locate:  'locate',
  },
  
/* 下面都是我突然有的天真想法，寫法很玄，我還不確定能否正常運作，待測試 XD */
  family: [A, B, C],
  rule: function sayGoHome() {
    console.log('I want to go home!');
    return 'test';
  },
}
```

而 Promise 的出現其實是為了解決 **標準化非同步操作** 程式碼，雖然有約定俗成的 **error first** 慣例，但畢竟是 function 參數的順序是看每個人怎麼寫的，如果今天有人不是按照這個慣例，那麼程式碼就會容易出現問題了，同時如果你去細想原本的 xhr 的做法，會非常容易產生像下面 **回呼地獄 (Callback hell)** 的狀況。

```javascript=
doFirst(function(err, res) {
  doSecond((err, res) => {
    doThird((err, res) => {
      ...
    })
  })
})
```

上面是簡單說明 Promise 為何出現，以及為了解決什麼事情，接著才是用法說明，會教你如何自己建立一個 Promise 物件，方便大家之後把非同步的操作包裝起來，大家就不用猜回傳值，直接使用 promise 的呼叫方法去寫即可。
#### Promise 用法
```javascript=
/* 建立 Promise 物件時，依序帶入兩個函式，resolve, reject */
const doFirst = new Promise(function(resolve, reject) {
  // 執行一些非同步操作，像是 XMLRequest，最終呼叫
  resolve('成功時要回傳的值');
  // or
  reject('失敗時要回傳的值')
});


// 要用的時候，就可以很簡單的變成這樣操作
doFirst.then(result => {
  console.log(result)  // '成功時要回傳的值'
}).catch(err => {
  console.log(err)     // '失敗時要回傳的值'
})
```
:::info
**補充說明：**
1. 你甚至可以在 .then 裡面另外 call 一個 Promise
   此時回傳的值會是 Promise 執行完的結果，而不會是回傳 Promise 物件
2. 這部分還有牽涉到 chaining 的部分，會解釋為何可以這樣一直接下去，待研究
:::
> Promise 執行內容換成執行 XMLRequest，會發現其實就跟 Fetch 的用法類似[color=red]
 
#### Promise 的三種狀態
- pending   (執行中)
- fulfilled (成功時的狀態)
- rejected  (失敗時的狀態)

一旦變成了 fulfilled 或 rejected 狀態，就不會再變成其他狀態

### 關於 Fetch & Promise 心得
這段寫到目前，其實自己還是有點似懂非懂，所以可能會發現部分說明跳的很快或不清楚，但畢竟是筆記就還是先記著了，如果有人發現錯誤，還請不吝指教。

### polyfill
這其實只是一個名詞，由於 Fetch 和 Promise 是比較新的東西，還並未所有瀏覽器都支援，類似這種狀況，會有一種叫做 polyfill 的概念，一旦引入這些程式碼進來，就能幫助你以舊有技術模擬這種行為，因此你可以不必去針對瀏覽器支援而特別進行判斷。


## 複習週 Week13 心得小結
這一週主要學習了幾個常見工具，老實說，為了熟悉 Bootstrap 和 jQuery，花了不少時間，但後來才發現，原來大家都是大概知道就好了！畢竟後面框架似乎都能處理掉了，而且大多數都是語法問題而已，反倒是 Promise & Fetch 感覺才會比較需要多花時間理解觀念。
另外趁著複習，才發現原來是當時學 API 就應該要先自己查過相關知識，有 Fetch 基本概念了...難怪第一次看這邊課程的時候有點跟不太上，一直到我重新看過好幾次才真的比較了解。甚至感覺要有 class 的物件導向基本語法概念會更好學習，至少我是重新理解之後才回來看懂這個章節，果然上次複習匆忙跳過物件導向是錯的ＱＱ

# Week14 後端基礎（四）
這一週又回來後端了，突然覺得前端有點快結束！？
不過這週的內容我覺得其實很重要，畢竟身為一個專門寫網頁的軟體工程師，如果沒有能力建構出一個基本的網站，似乎有點說不過去呢！所以在這週我們終於要來學習架站以及部屬囉，說到架站，以往都會直接聯想 Wordpress 或著 Wix 這種方便的工具，但我們這次是要真正的部屬一個屬於自己的網站，從主機購買、安裝 Server、網址購買、防火牆設定等等都會在這週學習到基本的概念！除此之外還會學到資料庫的 ACID 概念、以及網頁的 Cache 知識

## 資料庫 (補充 - 重要觀念)
之前已經有教基礎的資料庫操作，這週會再學習到更深入一些的功能，以及重要的 Lock 功能、ACID 原則、Transaction 功能...等等。

### NoSQL (Not Only SQL)
這是之前就有提到過的東西，所以只是在補充一點特性
- 沒有 Scheme，可以想像成 JSON 直接存入 DB
- 用 key-value 來存入
- 不支援 JOIN
- 通常用來儲存一些結構不固定的資料 (log 之類的)

### Transaction 交易
就想像成真的交易行為，以 A 轉帳到 B 這狀況為例，實際上程式做了至少兩個步驟
A 扣 20 元，B 增加 20 元，這兩個動作應該要是同時發生的，但網路隨時會出問題，假如有一個環節出錯，那就應該把這整件事情退回到最一開始的狀態。

### ACID 原則
為了保證 Transaction 的正確性，於是資料庫在操作時，應該要符合以下四個特性
1. 原子性（Atomicity）：要嘛全部成功，要嘛全部失敗
2. 一致性（Consistency）：維持資料的一致性（錢的總數相同）
3. 隔離性（Isolation）：多筆交易不會互相影響（不能同時改同一個值）
4. 持久性（Durability）：交易成功後，寫入的資料不會不見

### 競爭危害(Race Condition)
今天如果有兩個人同時間對機器發出請求，此時就會很有可能發生互相競爭資源的狀況，像是票券超賣問題，此時就會違反了 ACID 原則的第 2 第 3 項規定，因此會需要 **Lock** 資料。
此時電腦就會先處理先到的請求，其他的請求，就會等待排隊。
舉例：`$conn->query("SELECT id FROM money WHERE money = 20" FOR UPDATE)`
:::info
**Lock** 其實也有不同等級，要特別留意
:::

### 實作相關語法
為了確保 ACID，php 和資料庫連線時其實也提供了內建語法
但這邊只是暫時收錄語法紀錄而已，相關知識並不完全，請一定要去看參考資料。
```php=
<?php
/* 關閉 autocommit 之後，只要尚未 commit 都會視為一個同一個 transaction */
$conn->autocommit(FALSE);
$conn->begin_transaction();  // 如果沒有關閉 autocommit，就需要下這行宣告
$conn->query("UPDATE FROM money SET amount = 20");

/* 將資料鎖住，避免超賣問題 */
$conn->query("UPDATE FROM money SET sum = 10" FOR UPDATE);

if (TRUE) {                 // 去判斷這次的操作是否成功
  $conn->commit();          // 如果 query 成功，執行這次的指令
} else {
  $conn->rollback();        // 如果 query 失敗，就退回所有操作
}
```
##### 額外資料
 [MySQL 交易功能 Transaction 整理](https://xyz.cinc.biz/2013/05/mysql-transaction.html)
**JMeter** 壓力測試用工具

---
接下來的是介紹資料庫內建的三個功能，這部分的重要性我覺得則是要看情況，畢竟下面這三個亂用的話，很容易會造成其他人的困擾
### View
這東西就只是一張虛擬的 Table
但因為是虛擬的，所以通常不會對其做 CRUD 的操作，且一般人可能不會知道有一張 View 的存在，所以如果沒有專人維護，通常不建議使用此功能，常用於開放表格給其他人看，但不想給對方知道實際表格內容的時候
```sql=
CREATE VIEW order_detail AS
    SELECT o.id, u.name, o.quantity, o.price
        FROM `order` AS o
    JOIN `users` AS u ON o.name = u.name
    ORDER BY o.id ASC
```
這樣就能快速建立一張 View 資料表了

### 預存程序 (Stored Procedure)
就像是 SQL 的 function 一樣，但不要把這個和內建的 sum() 等 function 搞錯了。
同樣實作上不建議亂用
```sql=
DELIMITER //              -- 這裡是告訴 sql 以什麼符號作為區塊結束標記
CREATE PROCEDURE GetOrders(id INT)    -- 要給予型態
  BEGIN
    SELECT * FROM `orders`
    WHERE user_id = id;   -- 以 ; 表示 sql 指令
  END //                  -- 這裡被結束
DELIMITER ;               -- 將符號指定回原本的 ;

--- 使用時如下 ---
CALL GetOrder(3)          -- 找 id = 3
```

### 觸發器 (Trigger)
類似於 hook 的概念，常用於自動偵測資料庫異動，紀錄 log 的時候，用的好的話會很方便，但別亂用在其他地方，別人 Debug 會很難找。

```sql=
DELIMITER //
CREATE TRIGGER before_product_update
    BEFORE UPDATE ON products
    FOR EACH ROW
BEGIN
  INSERT INTO products(product_id, name, price, action)
  VALUE(OLD.id, OLD.name, OLD.price, 'UPDATE');
END //
DELIMITER ;
```

## 網路基礎觀念 (偏理論，可跳過)
複習一下網路相關的基礎知識，這邊只簡單提及，主要是降低對網路的陌生感
- OSI 七層協定 (Open System Interconnection)
  這個是最一開始理論上的網路模型，但過於嚴謹而發展不易，因此目前現實上採用下面的 TCP/IP
- TCP/IP 四層協定
  這是目前網路實際運作上所採用的模型架構，同樣有層級概念。
  1. 應用層
     主要是一些常見的協定
     像是 http(一般網路)、SMTP(信箱)、POP3(信箱)、FTP(傳輸)、SSH...等
  2. 傳送層
     等等只會大概說明 TCP UDP
  3. 網路層
     常說的 IP (Internet Protocal) 就在這層
  4. 鏈結層
     比較偏向實體的東西，像是路由器，網路電纜...等
  :::info
  資料傳送時，是一層一層傳遞下去，在往上一層一層回應。
  下面這張圖充分顯示了相對應的層級，以及在各層級所採用的通訊標準
  :::

  ![網路協定圖片](https://i.imgur.com/Kqnylvp.gif)

###### 參考資料
[鳥哥的私房菜](http://linux.vbird.org/linux_server/0110network_basic.php#whatisnetwork_osi)

- IP (Internet Protocal)
  - IP Address
  - 有分內網和外網 IP
    192.168.XXX.XXX 一般來說都是內網 IP，也就是虛擬 IP
- TCP vs UDP
  - TCP
    **三次握手機制**，速度較慢，但保證能建立可靠的連線，一般網路應用
  - UDP
    速度較快，但不保證對方能收的到，常用於網路電話，音樂串流等
### 如何連線到一個網站？
最一開始是要透過 IP 去連線到對方的主機位置，但是 IP 都是數字太難記了，所以有了網域
- 網域 Domain
  其實就像是我們平常輸入的網址，怎麼來的？可以去像網域供應商購買
  但還是有個問題是，網域供應商要怎麼把網址轉換成 IP？
- DNS (Domain Name Server)
  有一個網路上的系統，會負責將網址對應到 IP 位置，這部分只要你在網域供應商設定好，接著就會自動登入到 DNS 上面了。而有許多企業都有提供 DNS 服務、譬如知名的 8.8.8.8 連線位置就是 google 所提供的。
### 網站的背後到底是什麼？
#### 伺服器
伺服器其實就是一台電腦裝有伺服器的程式。
- 虛擬空間(只有空間，沒有操作權限，想像一下背包客棧的多人房間)
- 虛擬主機(一台實體主機，可以有很多個虛擬主機，可以視為 cloud，想像一下套房)
- 實體主機(完整的一台主機，想像一下房子)
:::info
實際上最為熱門和實用的其實是虛擬主機(VPS)
:::
#### 如何操控伺服器呢？
如果是只有虛擬空間，那你大概只能使用 FTP 上傳檔案而已，但若是後兩者，或許可以選擇遠端桌面控制(一般是 windows 系統)，但最常見的還是像 linux 一樣會是使用 SSH(Secure Shell) 進行連線，這時候就會要用到我們第一週所學的 CLI 指令囉！所以要把 Command-Line 學好...

額外小補充：**VPN** (Virtual Private Network) 就像是先連進一台主機，在從那台主機當成跳板連到別的地方，應用在翻牆，公司內網。

#### 網路位址轉譯（Network Address Translation, NAT）
可以把這個想像成是一個閘道口，將公司的網路分成內外網，公司內網彼此看的見，但外網則無法看見內網，內外網的溝通，都會先通過 NAT，如此公司每台電腦對外的 IP 也都會統一顯示。

#### 負載均衡(Load Balancer)
有些時候，網站流量會很大，這個時候不可能把所有流量都導到一台機器上處理，因此必須要將請求分散開來到不同主機上，此時就會有一台主機負責平均分配流量的這項工作，這樣假使某台機器有問題，也能由其他的機器先頂著。

#### 資料庫 Replication
一般狀況下，資料都是讀多寫少，因此，我們可以讓一個主資料庫專門負責寫入資料，並且透過一些方法同步到從屬的資料庫，而我們抓取資料的時候，都是去從屬資料庫抓取資料，如此就可以做到讀寫分離，降低主資料庫的負擔。

#### 資料庫高可用性(High Available)
盡可能的保證兩個以上的資料庫可以隨時運作，避免當唯一的資料庫受損時，服務便中斷了。

## 部署
接著要來說明部署的部分囉，會分幾個步驟簡單說明，另外萬分感謝學長姐的筆記阿！
基本上這邊的操作流程甚至可以直接看下面幾篇文章，就能一步一步部署出自己的網站了！
下面只是補充記錄一些流程和說明

[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
[一小時完成 VPS (Virtual Private Server) 部署](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/21)
[如何遠端連接虛擬主機上的 mySQL 資料庫 ？](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33)

文章內你常會看到安裝 LAMP 這名詞，意思是 Linux + Apache + Mysql + Php
- 購買主機
  在進行架站之前，我們必須要有主機，而前面說到有三種主機，我們這次會是採用租借一台虛擬主機 (VPS) 並且在上面進行架站，提供主機服務的廠商有非常多，像是 **DigitalOcean**，**中華電信**...等等，但這邊我們使用的會是亞馬遜(amazon) 所提供的 AWS，其中的 EC2 服務，因為只要你有信用卡，便能申請 1 年的免費試用，當然其他家主機商也有各自的優惠，就不多做說明。在購買主機時，請注意，我們選擇的是使用 linux 系統的 Ubuntu OS，版本的部份以年份表示，每兩年更新一次，LTS 表示長期維護版，請盡量選擇這種的。
- 安裝 server 軟體
  這邊使用的是 Apache
- 安裝資料庫軟體
  這邊使用的是 mysql
- 安裝資料庫的管理介面 GUI
  如果你非常善於操作資料庫，這個其實可以不用裝，可以完全使用 CLI
  但如果你跟我一樣菜，還是乖乖安裝 phpmyadmin 吧，會方便許多
- 設定防火牆
  如果沒有設定好防火牆的 port 號，那你會很有可能無法透過瀏覽器連到你的主機，或著資安的部分門戶大開，所以請確保有設定過，以下是常用 port，防火牆設定的 [教學文章](https://www.arthurtoday.com/2013/12/ubuntu-ufw-add-firewall-rules.html)
  可以透過關鍵字 "ufw" 去尋找更多教學

  | port 號 | 連線方式    | 備註 |
  | ------ | ---------- | ---- |
  | 80     | http       ||
  | 443    | https      ||
  | 3306   | php mysqli ||
  | 22     | SSH 連線    ||
  | 20、21 | FTP 連線    ||

- 申請網域
  主機買好了之後，也都安裝設定完成了之後，實際上你的網站就已經架設好了，沒有意外的話直接在網址輸入你的 ip 便可以直接連到你的網站了，但是 ip 太不方便記憶了，因此我們還需要去申請所謂的網域名稱，這部分同樣是去尋找網域供應商購買，這部分一樣有很多家，像是前陣子瘋狂打廣告的 Godaddy 也是，但我選擇使用的是 **gandi**，原因是剛好有一年的網域贊助，而且感覺也不差，同時有送 1 年的 SSL 憑證，感謝乾爹 :smile:
  下面的 SSH 憑證安裝也會以 gandi 示範唷～

### SSL 憑證 - 如何在 ubuntu 安裝憑證
上面的部屬環節，會發現學長姊的筆記並沒有寫到這塊，但我自己感覺這蠻重要的，而且當初自己找資料申請的時候，也是撞死了不少腦細胞，所以我打算試著寫一篇 SSL 的基礎安裝步驟，也幫助自己之後腦袋退化的時候有文章可以找。

這邊前面的步驟基本上都是依照學長姐的文章進行設定的，但版本會有差異，然後我是利用 gandi 進行申請的，但除了申請流程不同，後續安裝應該都是一樣的
:::success
**主機環境**：AWS 的 ubuntu 18.04 LTS
**phpmyadmin**: 4.9.1 (有自己另外升級 phpmyadmin)
**mysql**：Ver 14.14 Distrib 5.7.27 20190722
:::

1. **先產生 CSR（憑證簽署要求）**
   這個東西必須要在主機的電腦上自行產生
   所以先連到 AWS 的主機之後，輸入下面的指令
   `openssl req -nodes -newkey rsa:2048 -sha256 -keyout myserver.key -out server.csr`
   輸入之後系統會詢問一些個人問題，這些問題就是憑證上會帶的一些資料
   ![](https://i.imgur.com/PfAJAaq.png)

   問題範例：
   ```
   Country Name (2 letter code) [AU]: US
   State or Province Name (full name) [Some-State]: Minnesota
   Locality Name (eg, city) []: Moorhead
   Organization Name (eg, company) [Internet Widgits Pty Ltd]: MyCompany Inc.
   Organizational Unit Name (eg, section) []: IT
   Common Name (eg, YOUR name) []: subdomain.example.com
   Email Address []:
   A challenge password []:
   An optional company name []:
   ```
   這裡面的問題，有個欄位非常重要，就是
   `Common Name (eg, YOUR name) []: 這裡的網域請填你當初申請的網域名稱`
   
   輸入完之後你當前的資料夾位置會產生兩把鑰匙，一個是公開的 .csr，一個是私有的 .key
   接著用 cat 指令打開 csr 會看到下面的文字檔，請整份內容複製起來
   ```
   -----BEGIN CERTIFICATE REQUEST-----
   KJLA46F21GL126ASFQDGGH
   FIS8AE5N8KJLAFGL126ASF
   把整份文件，包含上下的 BIGIN 以及 END 一同複製起來
   -----END CERTIFICATE REQUEST-----
   ```
   
   ^註^ 有沒有覺得分公鑰和私鑰很熟悉？這東西其實就類似是 RSA 非對稱式加密
   windows 請看 [gandi 官方中文教學](https://docs.gandi.net/zh-hant/ssl/common_operations/csr.html)
   
2. **於 gandi 申請購買 SSL 憑證**
   ###### 因為我們是架設在 AWS，所以選擇其他主機
   ![](https://i.imgur.com/pC5QFHx.png)
   
   ###### 這邊選擇最便宜的標準憑證，以及單一位址
   ![](https://i.imgur.com/dwgVm6G.png)
   
   ###### 把剛剛複製的 CSR 貼上去吧
   ![](https://i.imgur.com/pdBRNqC.png)

   按下一步之後，就是開始驗證程序了
   沒意外，你的電子信箱會收到幾封信件
   ![](https://i.imgur.com/Lb27bKN.png)

3. **進行身分認證**
   其中一封信會告訴你有三種認證方式
   - 經由 DNS 認證(至少三小時過後)
   - 經由信箱認證(最快，真的超快)
   - 檔案認證
   
   雖然說第一種，設定完 CNAME 似乎就會自動認證了，但我選擇的是第二種，經由信箱認證，這邊的信箱認證比較特別，是要用他指定的信箱收信，這部分我忘了截圖，但你可以到 gandi 網站管理域名那邊申請一個免費的信箱，名稱就是用他指定的，接著你就可以到信箱內去收信了
   ![](https://i.imgur.com/e0eU0lU.png)
   
   ###### 信裡面會有連結把你導到這個頁面
   ![](https://i.imgur.com/7PRXCYm.png)
   
   ###### 接著輸入他給你的認證碼即可
   ![](https://i.imgur.com/69RFW85.png)

4. **下載 SSL 憑證、中繼憑證**
   接著回到憑證的地方，如果看到這個畫面，表示憑證驗證已經通過了
   找不到這地方的話他也會寄一封信給你，讓你連到這裡
   ###### 請下載此頁面的 SSL 憑證 .crt，以及中繼憑證 .pem，並存放到你電腦理安全的位置。
   ![](https://i.imgur.com/o7dNNzk.png)
   
5. **安裝憑證到 AWS 主機裡**
   如果你已經有 FTP 連線了，那就可以直接使用 FTP 把檔案傳到你的 AWS 主機裡面，如果你跟我一樣還沒搞定 FTP 連線，那你可以使用 `scp` 指令把檔案上傳到遠端的 AWS 主機裡。
   ###### 請記得存放的位置必須要是安全的資料夾。
   ```
   scp 檔案 主機位置:存放目錄位置   <= 上傳
   scp 主機位置:檔案 存放目錄位置   <= 下載
   ```
   
   如果不懂指令請看 [鳥哥的 Linux 私房菜](http://linux.vbird.org/linux_server/0310telnetssh.php#scp)
   
6. **設定伺服器讀取憑證**
   如果你和我一樣是依照上面學長姐的筆記進行 server 安裝的，那你應該可以到這個位置
   `cd /etc/apache2/sites-available/`
   用 vim 編輯 **000-default.conf**
   `sudo vim 000-default.conf`
   
   在原本的 `<VirtualHost xxx.xxx.x.x:80>` 區塊之下，增加並修改下面的程式碼
   此為範例程式碼。
   ```
   <VirtualHost xxx.xxx.x.x:443>
     DocumentRoot /var/www/html
     ServerName coolexample.com www.coolexample.com
       SSLEngine on
       SSLCertificateFile /path/to/coolexample.crt
       SSLCertificateKeyFile /path/to/privatekey.key
       SSLCertificateChainFile /path/to/intermediate.pem
   </VirtualHost>
   ```
   
   `/path/to/` 這邊請改成當初你存放憑證的地方
   別忘了將 `xxx.xxx.x.x:443` 這邊改成你的網域 ip 和 port 443
   
   接著在外面下此命令，確認設定是否有錯誤
   `sudo apache2ctl configtest`
   如果沒有錯，即可下重啟 server 的指令
   `sudo systemctl restart apache2`
   接著開瀏覽器打上 `https://網址`，進行確認
   
   > 這邊也是很複雜的地方，進行檔案更改前，建議請先備份一下，因為很多相似檔名，相似資料夾，而且網路上找到的作法都是偏舊的，新版本的安裝方式已經讓資料夾結構有所更改了。[color=red]
   
7. **將 http 重新定向到 https**
   好不容易都設定好了，卻發現直接打網址時會一直自動跑到 http，所以你希望將 80 port 轉址到 443 port，也就是永久將 http 轉向到 https。網路上有許多教學是利用 .htaccess 進行設定，但 Apache 官方其實後來有建議另一種更好的方式，因為 .htaccess 似乎容易有安全與耗能問題之類的，請參考這篇 [第二個解答](https://stackoverflow.com/questions/4083221/how-to-redirect-all-http-requests-to-https/21798882#21798882)
   
   作法也很簡單，在原本的 80 port 裡面多打上一行程式碼即可
   ```
   <VirtualHost xxx.xxx.x.x:80>
     ServerName www.example.com
     Redirect / https://www.example.com/
   </VirtualHost>
   ```
   > 當初轉址做法，因為 .htaccess 感覺很複雜，所以找超久答案，最後找到更好的做法[color=red]
   > 
###### 參考文章 - 每一篇查到的文章設定方式都是有所差異的，需要多方比較資訊
[Ubuntu Server with Apache2: Create CSR & Install SSL Certificate (OpenSSL)](https://www.digicert.com/csr-ssl-installation/ubuntu-server-with-apache2-openssl.htm#ssl_certificate_install)
[Godaddy](https://tw.godaddy.com/help/apache-ubuntu-ssl-32078)
[Ubuntu +SSL +正式的CA 設定](http://n.sfs.tw/content/index/10939)

## 複習週 Week13 心得小結
Week13 的複習內容，我原本預期不會很多的，結果我錯了...答案是超級多，而且這週的內容其實還有幾個小細節沒有說明到，另外 SSL 的憑證設定，複習的時候才發現原來就是**非對稱式加密**的應用壓！恍然大悟。
我覺得除了 ACID 等觀念，相對來說感覺是平常比較少會接觸到的東西，像是 Server 部署的相關知識還有安全性考量等等，如果能有機會好好玩過 linux 系統應該會更得心應手，但仍舊是個很棒的一週，因為能完整了解整個架站的過程，感謝學長姐的筆記。
然後再度自首物件導向和 cache 雖然已經複習過了，但沒有寫進來，因為想趕進度...所以先擱著一下@@

# 複習週總心得
我的連假Ｒ～
其實原本想說只要寫重點就好，方便加快速度，但是只要一寫下去，就覺得好多東西感覺都很重要，不寫下來的話好像不行...然後 SSL 是我原本就想寫的東西，但是寫到最後發現有點忘掉 VirtualHost 寫的位置了...但我印象中是沒有太大差別的，如果有同學看了之後設定有錯請再告訴我...

然後目前因為工作關係，進度大延遲，真的很怕做了半年，沒有什麼長進，最近又要硬學 Laravel，但我還是覺得自己基礎打不穩，這樣去接觸後端框架很不好。
另外由於公司工作流程的關係，像是從沒拿到明確的需求，或著一開始的邏輯架構設計就有問題，導致開發效率又會很低，所以一直再想，該怎麼增加效率，還有什麼樣的經驗才能真的算是經驗呢？如果說自己還在進度內，還多少會有點信心，總之有點感到焦慮。
:::spoiler 不免俗的依然要再次感謝 Huli 的教學！
彩蛋！前台改價格，後台直接收單進資料庫這種經驗根本就是再收爛攤子的ＱＱ
:::
