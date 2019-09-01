$(document).ready(function(){
  $("#button-add").click(function(){
    const listText = `
    <div class="input-group mb-3 px-3 flex-fill">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input">
        </div>
      </div>
      <div class="list-item text-secondary border-top border-bottom px-3 mb-0 align-items-center d-flex">
        <p class="mb-0">${$(".form-control").val()}</p>
      </div>
      <div class="input-group-append">
        <button type="button" class="btn btn-danger" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    `
    $(".list__wrap").append($(".form-control").val(listText));
    $(".form-control").val("");
  })
});