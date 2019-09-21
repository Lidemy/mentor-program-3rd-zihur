<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  $res = array(
    'status'  => 0,
    'msg'     => '刪除失敗，請再試一次',
  );
  // 判斷是否陌生訪客，是的話直接退回首頁
  if (!isset($_SESSION['user_id']) || !isset($_POST['post_id'])) {
    echo json_encode($res);
    exit();
  }
  csrfPrevent();
  $post_id = $_POST['post_id'];
  // 撈出資料比對是否本人或判斷是否有足夠權限刪除資料
  $stmt = $conn->prepare("SELECT comments.*
                            FROM zihur_comments as comments
                           WHERE user_id = ? AND comments.id = ?");
  $stmt->bind_param('ii', $user_id, $post_id);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!($result->num_rows > 0 || $auth === 'admin' || $auth === 'super_admin')) {
    $res = array(
      'status'  => 0,
      'msg'     => '權限不足，你 4 不 4 偷改 post_id'
    );
    echo '123';
    echo json_encode($res);
    exit();
  };
  // 執行刪除功能
  $stmt_delete = $conn->prepare("UPDATE zihur_comments
                                    SET is_deleted = 1
                                  WHERE id = ?");
  $stmt_delete->bind_param('i', $post_id);
  $result_delete = $stmt_delete->execute();
  if (!$result_delete) {
    $res = array(
      'status'  => 0,
      'msg'     => $conn->error
    );
    echo json_encode($res);
    exit();
  };
  $res = array(
    'status'  => 1,
    'msg'     => '已成功刪除留言',
  );
  echo json_encode($res);
  exit();
?>
