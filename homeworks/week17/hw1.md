``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
請說明以上程式碼會輸出什麼，以及盡可能詳細地解釋原因。

上面的程式碼會依序輸出：
13524

因為 JS 是單執行緒，以及具有 Event Loop 的概念，所以當進行上面的程式碼解讀時會變成這樣的順序
1. 執行到第 1 行，將程式碼放入 stack 內，並執行他
   ```js
   STACK // 有一個 stack 空間

   console.log(1)  // 放入第一行程式碼，並且列印出來
   ```

2. 執行到第 2 行，發現這是一個需要延時等待的 function，於是將這個 function 放到另一個空間，這個空間根據你是使用 node.js 或著是瀏覽器執行有些許不同，總之可以先想像成有另一個地方持續幫你監控著這行程式碼的執行完成了沒，請注意，這邊雖然設置成 0 秒，但仍然是一個需要記時的 function，接著當這個 function 延時等待完成之後，不會立即回到 stack 內，而是進入到 task queue 裡面。因此在這個時候我們就先不管它了。
   ```js
   STACK

   setTimeout() // 發現是一個延時 function，放入另一個空間，等待他完成的一刻，移入到 task queue
   ```

3. 繼續執行到第 6 行，並將 3 印了出來
   ```js
   STACK

   console.log(3) // 執行並列印出 3

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // 原本第 2 行的這個 function 等待完了，被放到了 task queue
   ```

4. 執行到第 7 行
   ```js
   STACK

   setTimeout() // 發現是一個延時 function，同樣放入另一個空間，和步驟 2 一樣

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // 第 2 行的 function 繼續在 task queue 等待
   ```

5. 執行到第 9 行
   ```js
   STACK

   console.log(5) // 執行並印出 5

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // 第 7 行的 function 
   setTimeout() // 第 2 行的 function
   ```

6. 這個時候 stack 已經沒有新的執行命令了，此時有個東西叫 Event Loop 其實一直都在來回監控著 stack 和 task queue，當他發現 stack 已經沒有新的任務進來了，會開始將 task queue 的任務開始放回去 stack 裡面，別忘了 queue 是先進先出，所以第二行會先被放回去 stack。

   ```js
   STACK

   setTimeout() // 第 2 行的 function，開始執行裡面的 console.log(2)

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // 第 7 行的 function 
   ```

7. 於是接下來的順序就如下，快速帶過去
   ```js
   STACK

   console.log(2) // 被執行到了，印出 2
   setTimeout()   // 複習一下 stack 是先進後出，因此要等上面的清空喔

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // 第 7 行的 function 
   ```
   ```js
   STACK
   // stack 又沒有要執行的內容了

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   setTimeout() // Event Loop 發現 task queue 有東西，準備放入到 stack
   ```
   ```js
   STACK

   console.log(4) // 被執行到了，印出 4
   setTimeout()   // 複習一下 stack 是先進後出，因此要等上面的清空喔

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   ```
8. 最後兩個地方的程式碼都執行結束了，而最後印出的順序是 13524。
   ```js
   STACK

   /*--------上下是兩個不同的地方-------*/
   TASK QUEUE

   ```