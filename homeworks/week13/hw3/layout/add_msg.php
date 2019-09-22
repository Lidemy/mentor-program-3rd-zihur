<form class="comments">
  <textarea name="comments" class="comments__textarea" placeholder="今晚就在這，和大家交流一下…"></textarea>
  <button class="comments__btn-leaveMsg" data-csrftoken="<?= $csrfToken?>">送出留言</button>
  <?php
    if ($user_id === '' || $auth === 'visitor') {
      echo   '<div class="unlogin">你還沒登入唷！</div>';
    } else {
      echo   '<div class="unlogin invisible">你還沒登入唷！</div>';
    }
  ?>
</form>
