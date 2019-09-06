$(document).ready(function(){
  $("#button-add").click(function(){
    if ($(".form-control").val() != "") {      
      const listText = `
      <div class="input-group mb-3 px-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" aria-label="Checkbox for following text input">
          </div>
        </div>
        <div class="list__text text-secondary">
          <p class="mb-0">${$(".form-control").val()}</p>
        </div>
        <div class="input-group-append list__close">
          <button type="button" class="btn btn-danger close p-2" aria-label="Close">
            <span aria-hidden="true" aria-label="Close">&times;</span>
          </button>
        </div>
      </div>
      `
      $(".list").append(listText);
      $(".form-control").val("");
    }
  })

  $(".list").click(function(e) {
    // 刪除按鈕
    if ($(e.target).attr("aria-label") === "Close") {
      $(e.target).parentsUntil(".list").remove();
    }

    // 勾選完成按鈕
    if ($(e.target).hasClass("list__checked")) {
      $(e.target).parents(".input-group-text").toggleClass("completed");
      $(e.target).parents(".input-group").find(".list__text").toggleClass("text-decoration-deleted");
    };
  })

  $()  
});