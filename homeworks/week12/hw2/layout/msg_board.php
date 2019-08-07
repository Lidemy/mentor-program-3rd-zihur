<div class="msgboard">
  <div class="msgheader">
    <h2 class="msgtitle">醉心留言：</h2>
    <ul class="msg__page">
      <!-- 引入分頁功能 -->
      <?php include_once('./layout/pagination.php')?>
    </ul>
  </div>
  <?php
    // SQL 指令，查詢留言列表
    $offset = $page * 20 - 20;
    $sql = "SELECT zihur_comments.*, avatar, nickname, zihur_users_certificate.*
            FROM zihur_comments JOIN zihur_users USING (user_id)
            JOIN zihur_users_certificate USING (account)
            WHERE zihur_comments.is_deleted != 1
            ORDER BY created_at DESC LIMIT 20 OFFSET $offset";
    $result = $conn->query($sql);
    // 留言列表
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()):
  ?>
  <section class="msgcard">
    <div class="msgcard__header">
      <img src="<?= $row['avatar'] ?>" alt="avatar" class="avatar">
      <p class="msgcard__nickname"><?= outputPreventStr($row['nickname']) ?> 說：</p>
      <p class="msgcard__datetime"><?= $row['created_at'] ?></p>
    </div>
    <p class="msgcard__content"><?= nl2br(outputPreventStr($row['content'])) ?></p>
    <?php
    // 編輯刪除區塊
      if ($row['certificate'] === $certificate || $auth === 'admin' || $auth === 'super admin') {
    ?>
    <input type="button" value="Edit 編輯" class="msgcard__btn-edit" data-post_id="<?= $row['post_id']?>">
    <a href="./handle/handle_delete.php?post_id=<?= $row['post_id']?>">
      <input type="button" value="Delete 刪除" class="msgcard__btn-delete">
    </a>
    <?php } ?>
  </section>
  <?php
      endwhile;
    }
  ?>
</div>