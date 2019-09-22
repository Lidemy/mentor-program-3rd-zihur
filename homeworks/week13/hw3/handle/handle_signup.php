<?php
  require_once('../conn.php');
  require_once('../utils.php');
  if (
    isset($_POST['nickname']) && isset($_POST['account']) &&
    isset($_POST['password']) && isset($_POST['sexuality']) &&
    !empty($_POST['nickname']) && !empty($_POST['account']) &&
    !empty($_POST['password']) && !empty($_POST['sexuality'])
  ) {
    $nickname = $_POST['nickname'];
    $account = $_POST['account'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $sexuality = $_POST['sexuality'];
  } else {
    echo "<script>alert('請檢查資料');
    window.location = '../signup.php'</script>";
    exit();
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
      die('請選擇男性或女性');    // 雖然想不到其他可能，但為了保險而添加
  }
  // 將資料寫入資料庫
  $stmt = $conn->prepare("INSERT INTO zihur_users(nickname, account, password, sexuality, avatar)
                          VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param('sssss', $nickname, $account, $password, $sexuality, $avatar);
  if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    session_start();
    $_SESSION['user_id'] = $userId;
    $_SESSION['auth'] = 'normal';
    setcookie("member_nickname", $nickname, time()+3600*24, "/");
    setcookie("csrfToken", randomToken(), time()+3600*24, "/");
    echo "<script>alert('註冊成功了唷，將自動為你登入');
    window.location = '../index.php'</script>";
    exit();
  } else {
    // 我覺得最好的回饋應該是邊輸入邊驗證了，但好像之後有套件能用就...
    echo "<script>alert('帳號或暱稱重複囉');
    window.location = '../signup.php'</script>";
    exit();
  }
?>
