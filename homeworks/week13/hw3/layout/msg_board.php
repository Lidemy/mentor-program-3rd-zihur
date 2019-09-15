<?php
  // 編輯刪除區塊函式，這邊的函式自己感覺有點微妙，有種為了寫而寫的感覺
  function moreOption($row, $user_id, $auth, $csrfToken) {
    if ($row['user_id'] == $user_id || $auth === 'admin' || $auth === 'super_admin') {
      echo "<button class='msgcard__btn-edit' data-post_id='${row['id']}'>Edit 編輯</button>";
      echo "<button class='msgcard__btn-delete' data-post_id='${row['id']}' data-csrfToken='${csrfToken}'>Delete 刪除</button>";
    }
  }
  // 調出文章按讚數量查詢
  function sql_thumbs_sums($post_id, $conn) {
    $sql_thumbs = "SELECT thumbs.*
                    FROM zihur_thumbs as thumbs
                    WHERE post_id = ? AND is_liked = 'like'";
    $stmt_thumbs = $conn->prepare($sql_thumbs);
    $stmt_thumbs->bind_param('i', $post_id);
    $stmt_thumbs->execute();
    $result_thumbs = $stmt_thumbs->get_result();
    return $num_of_rows = $result_thumbs->num_rows;
  }
  // 顯示使用者的按讚狀態，不清楚是不是該拉出去寫成 layout 區塊
  function userThumb($row, $user_id, $conn) {
    $stmt_thumb = $conn->prepare("SELECT thumbs.*
                                  FROM zihur_thumbs AS thumbs 
                                  WHERE post_id = ? AND user_id = ? AND is_liked = 'like'");
    $stmt_thumb->bind_param('ii', $row['id'], $user_id);
    $stmt_thumb->execute();
    $result_thumb = $stmt_thumb->get_result();
    if ($result_thumb->num_rows === 1) {
      echo "<a href='./handle/handle_thumbs.php?post_id=${row['id']}'>";
      echo   "<button class='msgcard__btn-thumb thumb-actived'>取消按讚 ";
      echo     "<i class='far fa-thumbs-up fa-lg'></i>";
      echo     "<span> " . sql_thumbs_sums($row['id'], $conn) . "</span>";
      echo   "</button>";
      echo "</a>";
    } else {
      echo "<a href='./handle/handle_thumbs.php?post_id=${row['id']}'>";
      echo   "<button class='msgcard__btn-thumb'>按讚 ";
      echo     "<i class='far fa-thumbs-up fa-lg'></i>";
      echo     "<span> " . sql_thumbs_sums($row['id'], $conn) . "</span>";
      echo   "</button>";
      echo "</a>";
    }
  }
  // 建立回復表單函式，感覺好像也要拉出去寫成 layout 區塊，但是要拉進的 SQL 參數不同，最後還是寫成 function，不知道這樣對不對
  function createReplyForm($row_reply, $csrfToken, $layer = 0) {
    global $row;//  <= 解不了多層限制在第五層的問題，先傳父留言 id 值進來
    if (empty($csrfToken)) return;
    echo '<form action="./handle/handle_add_msg.php" method="POST" class="reply">';
    echo   '<textarea name="comments" class="reply__textarea" placeholder="回復留言"></textarea>';
    echo   '<input type="text" class="invisible" name="parent_id" value="' . $row['id'] . '">';//  <= 寫不出多層，先將父留言指定為第一層
    echo   '<input type="text" class="invisible" name="layer" value="' . $layer . '">';
    echo   '<input type="text" class="invisible" name="csrfToken" value="' . $csrfToken . '">';
    echo   '<input type="submit" class="msgcard__btn-reply" value="Reply 回覆">';
    echo '</form>';
  }
?>

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
    $stmt = $conn->prepare("SELECT comments.*, avatar, nickname, authority
                            FROM zihur_comments AS comments
                            JOIN zihur_users AS users
                              ON comments.user_id = users.id
                            WHERE comments.is_deleted != 1 AND parent_id = 0
                            ORDER BY created_at DESC LIMIT 20 OFFSET ?");
    $stmt->bind_param('i', $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $sql_reply = "SELECT comments.*, avatar, nickname, authority
                  FROM zihur_comments AS comments
                  JOIN zihur_users AS users
                    ON comments.user_id = users.id
                  WHERE comments.is_deleted != 1 AND parent_id != 0";
    $result_reply = $conn->query($sql_reply);

    // 主留言列表
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()):
  ?>
  <section class="msgcard">
    <div class="msgcard__header">
      <img src="<?= $row['avatar'] ?>" alt="avatar" class="avatar">
      <p class="msgcard__nickname  <?=$row['authority']?>"><?= xssPreventStr($row['nickname']) ?></p>
      <p class="msgcard__datetime"><?= $row['created_at'] ?></p>
    </div>
    <p class="msgcard__content"><?= nl2br(xssPreventStr($row['content'])) ?></p>
    <?php
      moreOption($row, $user_id, $auth, $csrfToken);
      userThumb($row, $user_id, $conn);
      createReplyForm($row, $csrfToken);
    ?>
    <!-- 子留言列表 -->
    <?php
    $layer = 1;
      $result_reply->data_seek(0);
      while ($row_reply = $result_reply->fetch_assoc()):
        if ($row_reply['parent_id'] == $row['id']):
    ?>
    <div class="msgcard__inside">
      <div class="inside__header">
        <img src="<?= $row_reply['avatar'] ?>" alt="avatar" class="avatar">
        <p class="inside__nickname  <?= ($row_reply['user_id'] == $row['user_id']) ? 'author' : xssPreventStr($row_reply['authority'])?>">
          <?= xssPreventStr($row_reply['nickname']) ?>
        </p>
        <p class="msgcard__datetime"><?= $row_reply['created_at'] ?></p>
      </div>
      <p class="msgcard__content"><?= nl2br(xssPreventStr($row_reply['content'])) ?></p>
      <?php
        moreOption($row_reply, $user_id, $auth, $csrfToken);//    <= 比對並叫出編輯刪除等按鈕
        userThumb($row_reply, $user_id, $conn);//                 <= 比對並叫出按讚按鈕
        createReplyForm($row_reply, $csrfToken, $layer);//        <= 建立回文表單
      ?>
    </div>
    <?php
        endif;
      endwhile;
    ?>
  </section>
  <?php
      endwhile;
    }
  ?>
</div>