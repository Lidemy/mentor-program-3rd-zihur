請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

答案應該是
```js
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined，或著 window 或著 global，( 端看使用什麼樣的環境 )
```
下面的解讀可能不太正確，但應該會比較直覺，我自己對於 this 的解讀是看呼叫時，倒數第二個所指涉的位置做為 this 所指向的**執行環境(EC)**，請注意到是呼叫的位置，而不是程式碼原本的位置

## obj.inner.hello()
1. 執行 `obj.inner.hello()`，記住這裡是呼叫下面 console.log 的地方
2. 執行 `console.log(this.value)`，回去看誰執行的，發現是 `obj.inner.hello()`
3. 倒數第二個是 `obj.inner`，將這個賦值到 this 裡面
4. 變成 `console.log(obj.inner.value)`
5. 輸出 2。

## obj2.hello()
1. 執行 `obj2.hello()`，記住這裡是呼叫下面 console.log 的地方
2. 執行 `console.log(this.value)`，回去看誰執行的，發現是 `obj2.hello()`
3. 倒數第二個是 `obj2`，將這個賦值到 this 裡面
4. 變成 `console.log(obj2.value)`
5. 進一步解讀，`console.log(obj.inner.value)`。
6. 輸出 2。

## hello()
1. 執行 `hello()`，記住這裡是呼叫下面 console.log 的地方
2. 執行 `console.log(this.value)`，回去看誰執行的，發現是 `hello()`
3. 倒數第二個什麼都沒有的狀況下，根據執行的環境決定是什麼，假設是瀏覽器便可能是 window，將這個賦值到 this 裡面
4. 變成 `console.log(window.value)`
5. 輸出 undefined，因為 windows 並沒有 value 的 變數值，換句話說如果有，就不會是 undefined。

補充紀錄一下：
1. 嚴格模式底下就都是 undefined
2. 非嚴格模式，瀏覽器底下是 window
3. 非嚴格模式，node.js 底下是 global


---
這方法套用在 class 也可以迅速理解
```js
class Car {
  setName(name) {
    this.name = name
  }
  
  getName() {
    return this.name
  }

  anotherName = {
    name: 'Lulu',
    test: function() {
      return this;
    }
  }
}
const myCar = new Car()
const testCar = myCar.anotherName
const testCar2 = myCar.anotherName.test

myCar.setName('hello')

console.log(myCar.getName())  // hello
console.log(myCar.anotherName.test())  // Lulu
console.log(testCar.test())   // Lulu
console.log(myCar.getName())  // hello
console.log(testCar2())       // 看執行環境和模式可能是 undefined 或著噴錯
```