$(document).ready(() => {
  let todoList = [];
  let completedList = [];
  let currentMaxId = 1;
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

  // 增加未完成任務清單內容
  function addTodo() {
    const task = {};
    task.id = currentMaxId;
    task.content = $('.form-control').val();
    todoList.push(task);
    $('.form-control').val('');
    currentMaxId += 1;
  }

  // 移除未完成任務清單內容
  function removeTodo(id) {
    todoList = todoList.filter(item => item.id !== id);
  }

  // 移除已完成任務清單內容
  function removeCompleteTodo(id) {
    completedList = completedList.filter(item => item.id !== id);
  }

  // 切換任務狀態
  function toggleTaskList(id, targetType) {
    if (targetType === 'uncompleted') {
      const task = todoList.filter(item => item.id === id);
      completedList.push(task[0]);
      removeTodo(id);
    } else if (targetType === 'completed') {
      const task = completedList.filter(item => item.id === id);
      todoList.push(task[0]);
      removeCompleteTodo(id);
    }
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
      const id = $(e.target).parents('.list__items').data('id');
      if ($(e.target).parents('.list__items').hasClass('completed')) {
        removeCompleteTodo(id);
      } else {
        removeTodo(id);
      }
      render();
    }
    // 勾選框按鈕
    if ($(e.target).hasClass('list__check')) {
      // 判斷 id 和當前點的框框屬於任務列表或是完成列表。
      const id = $(e.target).parents('.list__items').data('id');
      const targetType = ($(e.target).parents('.list__items').hasClass('uncompleted')) ? 'uncompleted' : 'completed';
      toggleTaskList(id, targetType);
      render();
    }
  });

  render();
});
