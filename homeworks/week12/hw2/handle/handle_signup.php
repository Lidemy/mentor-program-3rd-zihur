<?php
  require_once('../conn.php');
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
  $stmt = $conn->prepare("INSERT INTO zihur_users(nickname, account, password, sexuality, avatar) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param('sssss', $nickname, $account, $password, $sexuality, $avatar);
  if ($stmt->execute()) {
    echo "<script>alert('註冊成功，請前往登入唷');
    window.location = '../index.php'</script>";
    exit();
  } else {
    // 我覺得最好的回饋應該是邊輸入邊驗證了，但那好像是 Week13 結合 AJAX 的進度？
    echo "<script>alert('帳號或暱稱重複囉');
    window.location = '../signup.php'</script>";
    exit();
  }
?>
