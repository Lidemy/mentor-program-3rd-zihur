/**
 * 此版本是後來想到的一個做法，參考自公司前端的類似做法，打完 api 之後，直接 reload 頁面
 * 感覺使用者體驗沒這麼好，是個很暴力的解法，但因為很簡單所以還是直接寫寫看了，然後再近一步改進，改成清空 render 畫面
 * 想知道 reload 這是否算是 SPA 呢？如果改成後者這種作法又是否會比 main.js 的版本好呢？
 */

$(document).ready(() => {
  let todoList = [];
  let completedList = [];
  /* 函式區 */

  // 計算並呈現當前未完成任務數量
  function countTasks() {
    const items = $('.list > .uncompleted').length;
    const text = `Here are <em class="highlight">${items}</em> pending items`;
    $('.list__title').html(text);
  }

  // 計算並呈現當前完成任務數量
  function countCompleteTasks() {
    const items = $('.list > .completed').length;
    const text = `You have completed <em class="highlight">${items}</em> tasks`;
    $('.list__title--completed').html(text);
  }

  // 清空並重新渲染畫面
  function render() {
    const listTitle = {
      todo: $('.list__title'),
      completed: $('.list__title--completed'),
    };
    $('.list').empty();
    $('.list:eq(0)').append(listTitle.todo);
    $('.list:eq(1)').append(listTitle.completed);
    todoList.map((item) => {
      const todoTask = `
        <div class="list__items input-group mb-3 uncompleted" data-id="${item.id}">
          <div class="input-group-prepend  border-0">
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input"></label>
          </div>
          <div class="list__text text-secondary border-0">
            <p class="mb-0">${item.content}</p>
          </div>
          <div class="list__close input-group-append border-0">
            <button type="button" class="btn btn-danger close p-2" aria-label="Close">
              <span aria-hidden="true" aria-label="Close">&times;</span>
            </button>
          </div>
        </div>`;
      return $('.list:eq(0)').append(todoTask);
    });

    completedList.map((item) => {
      const completedTask = `
        <div class="list__items input-group mb-3 completed" data-id="${item.id}">
          <div class="input-group-prepend  border-0">
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input" checked></label>
          </div>
          <div class="list__text text-secondary border-0">
            <p class="mb-0">${item.content}</p>
          </div>
          <div class="list__close input-group-append border-0">
            <button type="button" class="btn btn-danger close p-2" aria-label="Close">
              <span aria-hidden="true" aria-label="Close">&times;</span>
            </button>
          </div>
        </div>`;
      return $('.list:eq(1)').append(completedTask);
    });

    countTasks();
    countCompleteTasks();
  }

  // 取得 api
  function getTodoApi() {
    fetch('http://localhost/zihur/week19/hw1/api/todos')
      .then(res => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        todoList = [];
        completedList = [];
        jsonRes.filter(data => data.status === 0).forEach(data => todoList.push(data));
        jsonRes.filter(data => data.status === 1).forEach(data => completedList.push(data));
        render();
      })
      .catch(err => console.error('res:', err));
  }

  // 增加未完成任務清單內容
  function createTodoApi() {
    const content = $('.form-control').val();

    fetch('http://localhost/zihur/week19/hw1/api/todos', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        status: '0',
      }),
    }).then(res => res.json())
      .then(() => getTodoApi())
      .catch(err => console.error(err));
  }

  // 更新 api
  function updateTodoApi(content, status, id) {
    const url = `http://localhost/zihur/week19/hw1/api/todos/${id}`;
    fetch(url, {
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        status,
      }),
    }).then(res => res.json())
      .then(() => getTodoApi())
      .catch(err => console.error(err));
  }

  // 刪除 api
  function deleteTodoApi(id) {
    const url = `http://localhost/zihur/week19/hw1/api/todos/${id}`;
    fetch(url, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(() => getTodoApi())
      .catch(err => console.error(err));
  }

  /* 監聽事件區 */
  $('#button-add').click(() => {
    if ($('.form-control').val() !== '') {
      createTodoApi();
    }
  });

  $('.form-control').keyup((e) => {
    if (e.key === 'Enter' && $('.form-control').val() !== '') {
      createTodoApi();
    }
  });

  $('.list').click((e) => {
    // 刪除按鈕
    if ($(e.target).attr('aria-label') === 'Close') {
      const id = $(e.target).parents('.list__items').data('id');
      deleteTodoApi(id);
    }
    // 勾選框按鈕
    if ($(e.target).hasClass('list__check')) {
      // 判斷 id 和當前點的框框屬於任務列表或是完成列表。
      const id = $(e.target).parents('.list__items').data('id');
      const targetType = ($(e.target).parents('.list__items').hasClass('uncompleted')) ? 1 : 0;
      const content = $(e.target).parents('.list__items').find('p').text();
      updateTodoApi(content, targetType, id);
    }
  });

  getTodoApi();
});
