<form action="./handle/handle_add_msg.php" method="post" class="comments">
  <textarea name="comments" class="comments__textarea" placeholder="今晚就在這，和大家交流一下…"></textarea>
  <input type="text" class="invisible" name="csrfToken" value="<?= $csrfToken?>">
  <input type="submit" value="送出留言">
  <div class="unlogin  invisible">你還沒登入唷！</div>
</form>