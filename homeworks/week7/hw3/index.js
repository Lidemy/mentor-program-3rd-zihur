let btn = document.querySelectorAll(".caculate__btn");

console.log(btn);

for (let i = 0; i <= btn.length; i += 1) {
  btn[i].addEventListener('click', function(e) {
    console.log(e);
    console.log(btn[i].getAttribute);
  })
}
