<?php require_once('./conn.php'); ?>
<?php
  // 透過 certificate 判斷是誰，並賦予相對應的權限
  $auth = 'normal';
  if (isset($_COOKIE['certificate'])) {
    $certificate = $_COOKIE['certificate'];
    $sql_auth = "SELECT zihur_users_certificate.*, authority
                 FROM zihur_users_certificate 
                 JOIN zihur_users ON zihur_users_certificate.account = zihur_users.account
                 WHERE certificate = '$certificate'";
    $sql_auth_result = $conn->query($sql_auth);
    while($auth_row = $sql_auth_result->fetch_assoc()) {
      $auth = $auth_row['authority'];
    }
  } else {
    $certificate = 'none';
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond&display=swap" rel="stylesheet">
  <link href="./css/normalized.css" rel="stylesheet">
  <link href="./css/style.css" rel="stylesheet">
  <script src="./js/index.js" defer></script>
  <title>Bartender Board</title>
</head>
<body>
  <?php include_once('./template_navbar.php')?>
  <main class="main">
    <div class="wrap">
      <!-- 引入問候文字 -->
      <?php include_once('./template_index-intro.php')?>
      <!-- 留言表單 -->
      <form action="./handle_add_msg.php" method="post" class="comments">
        <textarea name="comments" class="comments__textarea" placeholder="今晚就在這，和大家交流一下…"></textarea>
        <input type="submit" value="送出留言">
        <div class="unlogin  invisible">你還沒登入唷！</div>
      </form>
      <!-- 引入留言板內容 -->
      <div class="msgboard">
        <div class="msgheader">
          <h2 class="msgtitle">醉心留言：</h2>
          <ul class="msg__page">
            <?php
            // 透過主留言查詢留言數量
            if (isset($_GET['page'])) {
              $page = $_GET['page'];
            } else {
              $page = 1;
            }
            // 動態更新分頁數量及上下頁，應該還要限定最大呈現數量避免跑版，但感覺要做出來會很麻煩ＱＱ
            $sql_count = "SELECT COUNT(post_id) AS `count` FROM zihur_comments WHERE zihur_comments.is_deleted != 1";
            $sql_count_result = $conn->query($sql_count);
            $row = $sql_count_result->fetch_assoc();
            $total_page = ceil($row['count'] / 20);
            if ($page != 1 || 0) {
              echo '<a href="./index.php?page=' . ($page - 1) . '"><li>＜上一頁</li></a>';
            }
            for ($i = 1; $i <= $total_page; $i += 1) {
              if ($page == $i) {
                echo '<a href="./index.php?page=' . $i . '"><li class="msg__num  msg__num--actived">' . $i . '</li></a>';
              } else {
                echo '<a href="./index.php?page=' . $i . '"><li class="msg__num">' . $i . '</li></a>';
              }
            }
            if ($page != $total_page) {
              echo '<a href="./index.php?page=' . ($page + 1) . '"><li>下一頁＞</li></a>';
            }
            ?>
          </ul>
        </div>
        <?php
          // 調用留言和使用者的資料表
          $offset = $page * 20 - 20;
          $sql = "SELECT zihur_comments.*, avatar, nickname, zihur_users_certificate.*
                  FROM zihur_comments JOIN zihur_users USING (user_id)
                  JOIN zihur_users_certificate USING (account)
                  WHERE zihur_comments.is_deleted != 1
                  ORDER BY created_at DESC LIMIT 20 OFFSET $offset";
          $result = $conn->query($sql);
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
        ?>
        <div class="msgcard">
          <div class="msgcard__header">
            <img src="<?php echo$row['avatar'] ?>" alt="avatar" class="avatar">
            <p class="msgcard__nickname"><?php echo $row['nickname'] ?> 說：</p>
            <p class="msgcard__datetime"><?php echo $row['created_at'] ?></p>
          </div>
          <p class="msgcard__content"><?php echo nl2br($row['content']) ?></p>
          <!-- 利用通行證比對，如果是自身留言或著權限足夠，則顯示更多選項區塊 -->
          <?php
            if ($row['certificate'] === $certificate || $auth === 'admin' || $auth === 'super admin') {
          ?>
          <input type="button" value="Edit 編輯" class="msgcard__btn-edit" data-post_id="<?php echo $row['post_id']?>">
          <a href="./handle_delete.php?post_id=<?php echo $row['post_id']?>"><input type="button" value="Delete 刪除" class="msgcard__btn-delete"></a>
          <?php
            }
          ?>
          <!-- 更多選項區塊結束 -->
        </div>
        <?php
            }
          }
        ?>
      </div>
    </div>
  </main>
</body>
</html>