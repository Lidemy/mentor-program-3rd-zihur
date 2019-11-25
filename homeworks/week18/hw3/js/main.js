/* eslint-disable */
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
  // 增加未完成任務清單
  function addList() {
    if ($('.form-control').val() !== '') {
      const listText = `
        <div class="list__items input-group mb-3 uncompleted">
          <div class="input-group-prepend  border-0">
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input"></label> // eslignore
          </div>
          <div class="list__text text-secondary border-0">
            <p class="mb-0">${$('.form-control').val()}</p>
          </div>
          <div class="list__close input-group-append border-0">
            <button type="button" class="btn btn-danger close p-2" aria-label="Close">
              <span aria-hidden="true" aria-label="Close">&times;</span>
            </button>
          </div>
        </div>
      `;
      $('.list__title').after(listText);
      $('.form-control').val('');
      countTasks();
    }
  }

  function addTodo() {
    const task = {};
    task.content = $('.form-control').val();
    todoList.push(task);
    $('.form-control').val('');
  }

  function removeTodo(id) {
    todoList = todoList.filter((item, index) => index !== id);
  }

  function completeTodo() {
    const task = {};
    task.content = $(e.target).parents('.list__items').find('.list__text').text();
    completedList.push(task);
  }

  function removeCompleteTodo(id) {
    completedList = todoList = todoList.filter((item, index) => index !== id)
  }
  function render() {
    let listTitle = {
      todo: $('.list__title'),
      completed: $('.list__title--completed'),
    }
    $('.list').empty();
    $('.list:eq(0)').append(listTitle.todo);
    $('.list:eq(1)').append(listTitle.completed);

    for (let i = 0; i < todoList.length; i += 1) {
      todoTask = `
        <div class="list__items input-group mb-3 uncompleted" data-id="${i}">
          <div class="input-group-prepend  border-0">
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input"></label>
          </div>
          <div class="list__text text-secondary border-0">
            <p class="mb-0">${todoList[i].content}</p>
          </div>
          <div class="list__close input-group-append border-0">
            <button type="button" class="btn btn-danger close p-2" aria-label="Close">
              <span aria-hidden="true" aria-label="Close">&times;</span>
            </button>
          </div>
        </div>`;
      $('.list:eq(0)').append(todoTask);
    }

    for (let i = 0; i < completedList.length; i += 1) {
      completedTask = `
        <div class="list__items input-group mb-3 completed">
          <div class="input-group-prepend  border-0">
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input" checked></label>
          </div>
          <div class="list__text text-secondary border-0">
            <p class="mb-0">${completedList[i].content}</p>
          </div>
          <div class="list__close input-group-append border-0">
            <button type="button" class="btn btn-danger close p-2" aria-label="Close">
              <span aria-hidden="true" aria-label="Close">&times;</span>
            </button>
          </div>
        </div>`;
      $('.list:eq(1)').append(completedTask);
    }
  }
  /* 函式區 END */

  /* 監聽事件區 */
  $('#button-add').click(() => {
    if ($('.form-control').val() !== '') {
      addTodo();
      render();
    }
  });
  $('.form-control').keyup((e) => {
    if (e.key === 'Enter') {
      addTodo();
      render();
    }
  });

  $('.list').click((e) => {
    // 刪除按鈕
    if ($(e.target).attr('aria-label') === 'Close') {
      // $(e.target).parents('.list__items').remove();
      let id = $(e.target).parents('.list__items').data('id');
      removeTodo(id);
      render();
      countTasks();
      countCompleteTasks();
    }
    // 勾選框按鈕
    if ($(e.target).hasClass('list__check')) {
      const list = $(e.target).parents('.list__items');
      list.toggleClass('completed');
      list.toggleClass('uncompleted');
      if (list.hasClass('completed')) {
        $('.list__title--completed').after(list);
      } else {
        $('.list__title').after(list);
      }
      countTasks();
      countCompleteTasks();
    }
  });
  /* 監聽事件區 END */
  render();
  countTasks();
  countCompleteTasks();
});
