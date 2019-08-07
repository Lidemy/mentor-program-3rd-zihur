<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  // 判斷是否陌生訪客，是的話直接退回首頁
  if ($auth === 'visitor') {
    header('Location: ../index.php');
    die();
  }
  if (!isset($_GET['post_id']) || !isset($_GET['comments'])) {
    header('Location: ../index.php');
    die();
  }
  $post_id = $_GET['post_id'];
  $comments = $_GET['comments'];
  // 撈出資料比對是否本人或判斷是否有足夠權限更改資料
  $stmt = $conn->prepare("SELECT zihur_comments.*, zihur_users_certificate.*
                          FROM zihur_comments JOIN zihur_users USING (user_id)
                          JOIN zihur_users_certificate USING (account)
                          WHERE certificate LIKE ? AND post_id LIKE ?");
  $stmt->bind_param('si', $certificate, $post_id);
  $stmt->execute();
  $result = $stmt->get_result();
  if ($result->num_rows > 0 || $auth === 'admin' || $auth === 'super admin') {
    $stmt_update = $conn->prepare("UPDATE zihur_comments SET content = ?
                                    WHERE post_id = ?");
    $stmt_update->bind_param('si', $comments, $post_id);
    checkConn($stmt_update->execute(), $conn);
  }
  header('Location: ../index.php');
  exit('權限不足，你 4 不 4 偷改 post_id');
?>
