<div class="msgboard">
  <h2 class="msgtitle">醉心留言：</h2>
  <?php
    // 調用留言和使用者的資料表
    $sql = "SELECT zihur_comments.*, avatar, nickname FROM zihur_comments JOIN zihur_users USING (user_id) ORDER BY created_at DESC LIMIT 20";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
  ?>
  <div class="msgcard">
    <div class="msgcard__header">
      <?php
        echo '<img src=' . $row['avatar'] . ' alt="avatar" class="avatar">';
      ?>
      <p class="msgcard__nickname"><?php echo $row['nickname'] ?> 說：</p>
      <p class="msgcard__datetime"><?php echo $row['created_at'] ?></p>
    </div>
    <p class="msgcard__content"><?php echo $row['content'] ?></p>
    <div class="msgcard__option">
      <input type="button" value="Edit 編輯" class="msgcard__btn-edit">
      <a href="handle_delete.php"><input type="button" value="Delete 刪除" class="msgcard__btn-delete"></a>
    </div>
  </div>
  <?php
      }
    }
  ?>
</div>