<?php
  require_once('./conn.php');
  $nickname = $_POST['nickname'];
  $account = $_POST['account'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $sexuality = $_POST['sexuality'];
  // 確認是否空數值
  if (empty($nickname) || empty($account) || empty($password) || empty($sexuality)) {
    die('請檢查資料');
  }
  // 確認是否帳號重複，如果有則回歸申請頁面，但暱稱則無所謂
  $sql = "SELECT * from zihur_users WHERE account = '$account'";
  if ($conn->query($sql)->num_rows > 0) {
    header('Location: ./signup.php');
    die('帳號重複');  // 不確定是否要再加 die，怕會繼續執行後面的程式碼，導致寫入到資料庫中，所以先寫
  }
  // 依據性別設定酒杯頭貼
  switch ($sexuality) {
    case '男性':
      $avatar = './img/avatar_boy.png';
      break;
    case '女性':
      $avatar = './img/avatar_girl.png';
      break;
    default:
      die('請選擇男性或女性');    // 雖然想不到其他可能，但一樣為了保險而添加
  }

  // 將資料寫入資料庫
  $sql = "INSERT INTO zihur_users(nickname, account, password, sexuality, avatar) VALUES('$nickname', '$account', '$password', '$sexuality', '$avatar')";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./login.php');
  } else {
    echo 'failed, '. $conn->error;
  }
?>
