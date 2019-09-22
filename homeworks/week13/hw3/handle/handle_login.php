<?php
  session_start();
  require_once('../conn.php');
  require_once('../utils.php');
  if (!isset($_POST['account']) || !isset($_POST['password'])) {
    echo "<script>alert('請確認是否送出資料');
    window.location = '../login.php'</script>";
    exit();
  }
  $account = $_POST['account'];
  $password = $_POST['password'];
  // 處理是否空值
  if (empty($account) || empty($password)) {
    echo "<script>alert('請輸入帳號以及密碼');
    window.location = '../login.php'</script>";
    exit();
  }
  // 確認資料庫是否有這筆資料
  $stmt = $conn->prepare("SELECT * from zihur_users WHERE account = ?");
  $stmt->bind_param('s', $account);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$row = $result->fetch_assoc()) {
    $conn->close();
    echo "<script>alert('帳號或密碼錯誤');
    window.location = '../login.php'</script>";
    exit();
  }
  if (!password_verify($password, $row['password'])) {
    $conn->close();
    echo "<script>alert('帳號或密碼錯誤');
    window.location = '../login.php'</script>";
    exit();
  }
  // 通過後進行 SESSION 和 cookie 設定
  $_SESSION['user_id'] = $row['id'];
  $_SESSION['auth'] = $row['authority'];
  setcookie("member_nickname", $row['nickname'], time()+3600*24, "/");
  setcookie("csrfToken", randomToken(), time()+3600*24, "/");
  header('Location: ../index.php');
  $conn->close();
  exit();
?>
