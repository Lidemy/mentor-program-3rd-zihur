<?php
  require_once('../conn.php');
  if (!isset($_POST['account']) || !isset($_POST['password'])) {
    echo "<script>alert('請確認是否送出資料');
    window.location = '../login.php'</script>";
    exit();
  }
  $account = $_POST['account'];
  $password = $_POST['password'];
  $password_hash = '';
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
  // 產生隨機亂數，並建立通行證寫入資料庫
  $word = '023456789abcdefghijkmnopqrstuvwxyz';  // 字典檔，排除 1 和 l
  $length = strlen($word);
  $certificate = '';
  for ($i = 0; $i < 32; $i += 1) {
    $certificate .= $word[rand(0, $length-1)];
  };
  $stmt_add = $conn->prepare("INSERT INTO zihur_users_certificate (account, certificate)
                              VALUE (?, ?) ON DUPLICATE KEY UPDATE certificate = ?");
  $stmt_add->bind_param('sss', $account, $certificate, $certificate);
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
  header('Location: ../index.php');
  $conn->close();
  exit();
?>
