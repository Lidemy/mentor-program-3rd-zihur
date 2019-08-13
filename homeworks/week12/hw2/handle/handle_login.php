<?php
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
  $user_id = $row['id'];
  // 產生隨機亂數，並建立通行證寫入資料庫
  $certificate = randomToken();
  $stmt_add = $conn->prepare("INSERT INTO zihur_users_certificate (user_id, certificate)
                              VALUES (?, ?) ON DUPLICATE KEY UPDATE certificate = ?");
  $stmt_add->bind_param('iss', $user_id, $certificate, $certificate);
  $result_add = $stmt_add->execute();
  if (!$result_add) {
    echo 'failed, '. $conn->error;
    echo "<script>alert('Opps, 資料連線錯誤，請再試一次');
    window.location = '../login.php'</script>";
    $conn->close();
    exit();
  }
  setcookie("certificate", $certificate, time()+3600*24, "/");
  setcookie("member_nickname", $row['nickname'], time()+3600*24, "/");
  setcookie("csrfToken", randomToken(), time()+3600*24, "/");
  header('Location: ../index.php');
  $conn->close();
  exit();
?>
