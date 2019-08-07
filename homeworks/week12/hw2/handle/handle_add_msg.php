<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  // 確認是否登入，否則直接結束
  if ($auth === 'visiter') {
    header('Location: ../login.php');
    exit('尚未登入');
  }
  // 確認是否有留言內容
  if (!isset($_POST['comments'])) {
    header('Location: ../index.php');
    die('請輸入留言內容');
  }
  $comments = $_POST['comments'];
  // 確認留言內容不為空值
  if (empty($comments)) {
    header('Location: ../index.php');
    die('留言內容不得為空白');
  }
  // 寫入資料庫
  $stmt = $conn->prepare("INSERT INTO zihur_comments(user_id, content) VALUES(?, ?)");
  $stmt->bind_param('is', $user_id, $comments);
  if ($stmt->execute()) {
    header('Location: ../index.php');
    $conn->close();
  } else {
    echo 'failed, '. $stmt->error;
    echo "<script>資料寫入失敗</script>";
    header('Location: ../index.php');
    exit();
  }
?>
