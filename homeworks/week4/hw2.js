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

if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', listBook);
} else if (process.argv[2] === 'read') { // 或許還應該思考增加 process.argv[3] 小於資料庫的數量條件？ ( 但還不知道怎麼抓數量長度 )
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, readBook);
}
