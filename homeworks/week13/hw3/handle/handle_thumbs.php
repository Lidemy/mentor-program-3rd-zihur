<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  // 確認是否登入，否則直接結束
  if ($auth === 'visitor') {
    echo "<script>alert('你還沒登入唷！');
    document.location.href='../login.php'</script>";
    exit('尚未登入');
  }
  if (!isset($_GET['post_id'])) {
    header('Location: ../index.php');
    exit('尚未登入');
  }
  $post_id = $_GET['post_id'];
  $sql = "INSERT INTO zihur_thumbs (post_id, user_id, is_liked)
          VALUES (?, ?, 'like')
          ON DUPLICATE KEY UPDATE is_liked = IF(is_liked = 'like', 'none', 'like')";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $post_id, $user_id);
  checkConn($stmt->execute(), $conn);
?>