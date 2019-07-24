<?php
  require_once('./conn.php');
  $account = $_POST['account'];
  $password = $_POST['password'];
  $password_hash = '';
  // 處理是否空值
  if (empty($account) || empty($password)) {
    die('請輸入帳號以及密碼');
  }
  // 確認是資料庫有這筆資料
  $sql = "SELECT * from zihur_users WHERE account = '$account'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    // 產生隨機亂數，並建立通行證寫入資料庫
    $word = '023456789abcdefghijkmnopqrstuvwxyz';  // 字典檔，排除 1 和 l
    $length = strlen($word);
    $certificate = '';
    for ($i = 0; $i < 32; $i += 1) {
      $certificate .= $word[rand(0, $length-1)];
    };
    $add_certify_result = $conn->query("INSERT INTO zihur_users_certificate (account, certificate) 
                                        VALUE ('$account', '$certificate') 
                                        ON DUPLICATE KEY UPDATE certificate = '$certificate'");
    if ($add_certify_result) {
      header('Location: ./index.php');
    } else {
      echo 'failed, '. $conn->error;
    }
    setcookie("certificate", $certificate, time()+3600*24);
    setcookie("member_nickname", $row['nickname'], time()+3600*24);
    header('Location: ./index.php');
  } else {
    echo 'error: ' . $conn->error;
    $conn->close();
    header('Location: ./login.php');
  }
?>
