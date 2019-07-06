<?php
  require_once('./conn.php');
  // 確認是否登入
  if (!isset($_COOKIE['member_id'])) {
    echo '尚未登入';
    header('Location: ./index.php');
    die('尚未登入');
  }

  $users_id = $_COOKIE['member_id'];  // 方便之後查詢留言的會員是誰
  $nickname = $_COOKIE['member_nickname'];
  $avatar = $_COOKIE['member_avatar'];
  $comments = $_POST['comments'];

  // 確認內容是否空值
  if (empty($comments)) {
    die('請檢查資料');
  }

  // 寫入資料庫
  $sql = "INSERT INTO zihur_comments(users_id, nickname, avatar, content) VALUES('$users_id', '$nickname', '$avatar', '$comments')";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./index.php');
  } else {
    echo 'failed, '. $conn->error;
  }
?>
