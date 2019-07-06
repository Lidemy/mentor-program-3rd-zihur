<?php
  require_once('./conn.php');
  $account = $_POST['account'];
  $password = $_POST['password'];
  // 處理是否空值
  if (empty($account) || empty($password)) {
    die('請輸入帳號以及密碼');
  }
  // 確認是資料庫有這筆資料
  $sql = "SELECT * from zihur_users WHERE account = '$account' AND password = '$password'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    setcookie("member_id", $row['id'], time()+3600*24);
    setcookie("member_nickname", $row['nickname'], time()+3600*24);
    setcookie("member_avatar", $row['avatar'], time()+3600*24);
    header('Location: ./index.php');
    echo $row['id'];
  } else {
    echo 'error: ' . $conn->error;
    header('Location: ./login.php');
  }
?>
