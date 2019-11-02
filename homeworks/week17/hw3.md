請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
``` js
var a = 1
function fn(){
  console.log(a)  // undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a)  // 20
  function fn2(){
    console.log(a)  // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a)  // 1
a = 10
console.log(a)  // 10
console.log(b)  // 100
```

答案是
```js
1
5
6
20
1
10
100
```

## 執行順序
程式開始執行之後，先開始編譯階段
```js
globalEC:
{
  OV: {
    a   = undefined
    fn  = 0x00  // 指向記憶體位置
  }
}
```
開始執行程式，這時候會賦值並進入 fn()，同樣會先進入 fnEC 環境，並且開始編譯 fnEC 的內容
```js
globalEC:
{
  OV: {
    a   = 1     // 在 line 1 被賦值了
    fn  = 0x00  // 指向記憶體位置
  }
}

fnEC:
{
  OV: {
    a   = undefined
    fn2 = 0x10  // 指向記憶體位置
  }
}
```
fnEC 編譯完成，執行 fnEC 的程式區塊，此時跑到了 line 3，檢查 fnEC 有沒有 a，有就回傳值
```js
/* 到了 line 3 印出了 undefined，因為此時 fnEC 裡面的 a 是 undefined */

globalEC:
{
  OV: {
    a   = 1
    fn  = 0x00  // 指向記憶體位置
  }
}

fnEC:
{
  OV: {
    a   = undefined
    fn2 = 0x10  // 指向記憶體位置
  }
}
```
跑到了 line 4
```js
/* 到了 line 4，fnEC 裡面的 a 被賦值 5 */

globalEC:
{
  OV: {
    a   = 1
    fn  = 0x00  // 指向記憶體位置
  }
}

fnEC:
{
  OV: {
    a   = 5
    fn2 = 0x10  // 指向記憶體位置
  }
}
```
跑到 line 5，印出了 5 之後，接著跑到 line 6，運算後賦值
```js
/* 此時 line 5 已經印出來 fnEC 的 a 了 */

globalEC:
{
  OV: {
    a   = 1
    fn  = 0x00  // 指向記憶體位置
  }
}

fnEC:
{
  OV: {
    a   = 6     // line 6 運算後賦值
    fn2 = 0x10  // 指向記憶體位置
  }
}
```
接著 var a，已經在編譯階段處理了，所以跳過直接進入 fn2EC 的執行，並此時開始編譯 fn2EC
```js
/* 此時進入 fnEC2 的編譯階段 */

globalEC:
{
  OV: {
    a   = 1
    fn  = 0x00  // 指向記憶體位置
  }
}

fnEC:
{
  OV: {
    a   = 6     
    fn2 = 0x10  // 指向記憶體位置
  }
}

fnEC2:
{
  OV: {
    // 發現什麼都沒有先宣告的，所以什麼都沒放入
  }
}
```
開始執行 fn2EC，line 11，因為 fn2EC 找不到 a，所以往上層找並印出了 fnEC 的 a
```js
/* line 11，因為 fn2EC 找不到 a，所以往上層找並找到了 fnEC 的 a，所以最後印出 6
 * 這邊有個機制沒特別說到，就是 scope chain，簡單來說會紀錄上下層的關係 */

globalEC:
{
  OV: {
    a   = 1
    fn  = 0x00
  }
}

fnEC:
{
  OV: {
    a   = 6     // line 6 
    fn2 = 0x10  // 指向記憶體位置
  }
}

fnEC2:
{
  OV: {
    // 空
  }
}
```
賦值 a = 20，b = 100，因為一樣都沒有，所以同樣會往上尋找最近的進行賦值，而因為 b 一直到最上層都沒有被定義過，這時候會在 globalEC 自動建立一個 b: 100，須注意這邊指非嚴格模式的狀態。
```js
/* 只要在當前 EC 找不到就會透過 scope chain 往上層找，所以 fnEC 的 a 變成 20
 * b 因為都找不到，會自動在 globalEC 建立 b = 100 */

globalEC:
{
  OV: {
    a   = 1
    b   = 100   // line 13 建立並賦值
    fn  = 0x00
  }
}

fnEC:
{
  OV: {
    a   = 20    // line 12 賦值
    fn2 = 0x10  // 指向記憶體位置
  }
}

fnEC2:
{
  OV: {
    // 空
  }
}
```

結束 fn2() 的執行，並確認已無被其他 chain 記錄著，便會自動釋放掉運算空間，回到 line 8 繼續執行 fnEC 的程式碼，此時印出 20
```js
/* 結束 fn2() 之後，繼續執行 line 8，並列印出 20，準備結束 fnEC 的執行*/

globalEC:
{
  OV: {
    a   = 1
    b   = 100   // line 13 建立並賦值
    fn  = 0x00
  }
}

fnEC:
{
  OV: {
    a   = 20    // line 8 印出
    fn2 = 0x10  // 指向記憶體位置
  }
}

```
結束 fn()，釋放掉 fnEC，繼續執行到 line 18，印出 1
```js
globalEC:
{
  OV: {
    a   = 1     // line 18 印出 1
    b   = 100
    fn  = 0x00
  }
}
```
接著就是賦值 a = 10，並印出 a 和 b 的值，也就是 10 和 100
```js
globalEC:
{
  OV: {
    a   = 10     // line 19 賦值 10，line 20 印出 10
    b   = 100    // line 21 印出 100
    fn  = 0x00
  }
}
```

執行結束！