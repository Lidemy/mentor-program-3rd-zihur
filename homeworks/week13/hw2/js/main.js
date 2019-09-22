$(document).ready(() => {
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
            <label class="mb-0"><input type="checkbox" class="list__check" aria-label="Checkbox for following text input"></label>
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
      $('.list__title--completed').before(listText);
      $('.form-control').val('');
      countTasks();
    }
  }
  /* 函式區 END */

  /* 監聽事件區 */
  $('#button-add').click(() => {
    addList();
  });
  $('.form-control').keyup((e) => {
    if (e.key === 'Enter') addList();
  });

  $('.list').click((e) => {
    // 刪除按鈕
    if ($(e.target).attr('aria-label') === 'Close') {
      $(e.target).parents('.list__items').remove();
      countTasks();
      countCompleteTasks();
    }
    // 勾選框按鈕
    if ($(e.target).hasClass('list__check')) {
      const list = $(e.target).parents(('.list__items'));
      list.toggleClass('completed');
      list.toggleClass('uncompleted');
      if (list.hasClass('completed')) {
        $('.list__title--completed').after(list);
      } else {
        $('.list__title--completed').before(list);
      }
      countTasks();
      countCompleteTasks();
    }
  });
  /* 監聽事件區 END */
  countTasks();
  countCompleteTasks();
});
