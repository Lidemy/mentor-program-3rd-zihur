<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  $res = array(
    'status'  => 0,
    'msg'     => '編輯留言失敗，請再試一次'
  );
  // 判斷是否陌生訪客，及確認是否取得應有的資訊。
  if (!isset($_SESSION['user_id']) || !isset($_POST['post_id']) || !isset($_POST['comments']) || empty($_POST['comments'])){
    echo json_encode($res);
    exit();
  }
  $post_id = $_POST['post_id'];
  $comments = $_POST['comments'];
  csrfPrevent();
  // 撈出資料比對是否本人或判斷是否有足夠權限更改資料
  $stmt = $conn->prepare("SELECT comments.*
                          FROM zihur_comments as comments
                          WHERE user_id = ? AND comments.id = ?");
  $stmt->bind_param('si', $user_id, $post_id);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!($result->num_rows > 0 || $auth === 'admin' || $auth === 'super_admin')) {
    echo json_encode($res);
    exit();
  }

  $stmt_update = $conn->prepare("UPDATE zihur_comments SET content = ?
                                 WHERE id = ?");
  $stmt_update->bind_param('si', $comments, $post_id);
  if (!$stmt_update->execute()) {
    echo json_encode($res);
    exit();
  }
  
  $res = array(
  'status'  => 1,
  'msg'     => '已成功編輯留言'
  );
  echo json_encode($res);
  exit();
?>
