<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  // 確認是否登入，否則直接結束
  $res = array(
    'status'  => 0,
    'msg'     => '操作失敗，請再試一次。'
  );
  if ($auth === 'visitor') {
    echo json_encode($res);
    exit();
  }
  if (!isset($_POST['post_id'])) {
    echo json_encode($res);
    exit();
  }
  $post_id = $_POST['post_id'];
  $sql = "INSERT INTO zihur_thumbs (post_id, user_id, is_liked)
          VALUES (?, ?, 'like')
          ON DUPLICATE KEY UPDATE is_liked = IF(is_liked = 'like', 'none', 'like')";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $post_id, $user_id);
  if (!$stmt->execute()) {
    echo json_encode($res);
    exit();
  }
  $res = array(
    'status'  => 1,
    'msg'     => '',
  );
  echo json_encode($res);
  exit();
?>