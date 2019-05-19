// 請閱讀開頭給的 API 文件並串接，用 node.js 寫出一個程式並接受參數，
// 輸出相對應的結果，範例如下：

// ``` js
// node hw3.js list // 印出前二十本書的 id 與書名
// node hw3.js read 1 // 輸出 id 為 1 的書籍
// node hw3.js delete 1 // 刪除 id 為 1 的書籍
// node hw3.js create "I love coding" // 新增一本名為 I love coding 的書
// node hw3.js update 1 "new name" // 更新 id 為 1 的書名為 new name
// ```
const request = require('request');

const listBook = (error, response, body) => {
  const json = JSON.parse(body);
  for (let i = 0; i < json.length; i += 1) {
    console.log(`${json[i].id} ${json[i].name}`);
  }
};

const readBook = (error, response, body) => {
  const json = JSON.parse(body);
  console.log(json.name);
};

const deleteBook = () => {
  console.log(`'you have been delete data: id ${process.argv[3]}`);
};

const createBook = (error, response, body) => {
  const json = JSON.parse(body);
  console.log(`${json.id} ${json.name}`);
};

const updateBook = (error, response, body) => {
  const json = JSON.parse(body);
  console.log(`${json.id} ${json.name}`);
};


switch (process.argv[2]) {
  default:
    console.log('u can use list, read id, delete id, creat "book name", update id "new name"');
    break;
  case 'list':
    request('https://lidemy-book-store.herokuapp.com/books?_limit=20', listBook);
    break;
  case 'read':
    request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, readBook);
    break;
  case 'delete':
    request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, deleteBook);
    break;
  case 'create':
    request.post('https://lidemy-book-store.herokuapp.com/books/', { form: { name: process.argv[3] } }, createBook);
    break;
  case 'update':
    request.patch(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, { form: { name: process.argv[4] } }, updateBook);
    break;
}
