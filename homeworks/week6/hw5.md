## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- `<textarea></textarea>`
  可顯示文字區域，相關屬性有 name：名稱（可重複）、id：名稱（不可重複）、cols、rows、disabled、readonly、wrap等
- `<hr />` 分隔線
- `<b></b>` 粗體字、`<i></i>` `<em></em>` 斜體字、`<u></u>`底線
- `<embed></embed>` 嵌入影音檔，相關屬性有 src、align、autostart、ShowPositionControls、ShowTracker 等
  更多資訊：http://kcs.kcjh.ptc.edu.tw/~spt/computer/html/embed.htm


## 請問什麼是盒模型（box model）
- 指的是由 content、padding、border、margin 等屬性，由內到外像盒子一樣包覆的範圍，在網頁上每個標籤都有自己所佔據的空間。而現行有兩種常見的盒模型
1. 預設的傳統盒模型，當我們設定 width、height 的時候，其所指定的範圍其實只有 content 的部分而已，但這在操作上有些不方便，因為一般人並沒有盒模型的概念，溝通時所說的 width、height 指的通常都是到 border 的這段可見範圍，因此延伸出了下面第二種盒模型。
2. 當你設定 `box-sizing: border-box` 之後，width、height 等屬性判斷範圍將會包含了 padding、border，這樣在溝通和操作上會更為直覺。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- block（區塊元素）：
  每一個元素都會**佔據父容器的整行**，可設定寬高、邊距、內距等屬性，常見預設為 block 標籤的有 `div`、`h1`、`ul` 等。

- inline（行內元素）：
  元素會左右並排，不可設定寬高，但可以被內距撐開高度，常見預設為 inline 的有 `span`、`a`、`input`、`img`、`em` 均屬 inline。

- inline-block（行內區塊元素）：
  綜合以上兩種的優點，可設定寬高、邊距等，排列時呈現左右排列。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static
  預設值，會依照一般由上至下，由左至右的方式進行排列

- relative
  相對定位，可以被設定 `top`、`right`、`bottom`、`left` 等屬性，接著會**相對的**移動原本自己應該待的位置。

- absolute
  絕對定位，需要有一個參考點，會往上尋找母容器的定位，並且以**不是** `static` 定位的元素作為參考點，會跳脫正常的排版流程，其他元素會無視以 absolute 為定位方式的元素繼續進行排版。

  可以被設定 `top`、`right`、`bottom`、`left` 等屬性。


- fixed
  固定定位，他會以瀏覽器的視窗（viewport）作為定位，不論如何操作畫面，都不會影響他的位置。
  可以被設定 `top`、`right`、`bottom`、`left` 等屬性。