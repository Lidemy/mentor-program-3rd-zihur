<?php
  require_once('../conn.php');
  require_once('./handle_is_login.php');
  require_once('../utils.php');
  $res = array(
    'status'  => 0,
    'msg'     => '操作失敗，請再試一次。'
  );
  // 確認是否登入，及取得必要資資料，否則回傳錯誤
  if (!isset($_SESSION['user_id']) || !isset($_POST['comments']) || empty($_POST['comments'])) {
    echo json_encode($res);
    exit();
  }
  $comments = $_POST['comments'];
  if (isset($_POST['parent_id'])) {
    $parent_id = $_POST['parent_id'];
  } else {
    $parent_id = 0;
  }
  if (isset($_POST['layer'])) {
    $layer = $_POST['layer'];
  } else {
    $layer = 0;
  }

  csrfPrevent();
  // 寫入資料庫
  $stmt = $conn->prepare("INSERT INTO zihur_comments(user_id, parent_id, layer, content)
                          VALUES(?, ?, ?, ?)");
  $stmt->bind_param('iiis', $user_id, $parent_id, $layer, $comments);
  if (!$stmt->execute()) {
    echo json_encode($res);
    exit();
  }
  $postId = $stmt->insert_id;//    <= 取得該次連線最後一次插入的 id
  $stmt_get = $conn->prepare("SELECT comments.*, avatar, nickname, authority
                                FROM zihur_comments AS comments
                                JOIN zihur_users AS users
                                  ON comments.user_id = users.id
                               WHERE comments.id = ?");
  $stmt_get->bind_param('i', $postId);
  $stmt_get->execute();
  $result = $stmt_get->get_result();
  if ($result->num_rows < 1) {
    echo json_encode($res);
    exit();
  }
  $row = $result->fetch_assoc();

  // 找出母文章者的 userId，以方便前台做比對判斷是否呈現原 PO
  $parentUserId = $row['user_id'];
  if ($parent_id != 0) {
    $stmt_parent = $conn->prepare("SELECT * FROM zihur_comments WHERE id = ?");
    $stmt_parent->bind_param('i', $parent_id);
    $stmt_parent->execute();
    $result_parent = $stmt_parent->get_result();
    if ($result_parent->num_rows < 1) {
      echo json_encode($res);
      exit();
    }
    $row_parent = $result_parent->fetch_assoc();
    $parentUserId = $row_parent['user_id'];
  }

  $res = array(
    'status'       => 1,
    'msg'          => '已經幫你把留言放上囉！',
    'postId'       => $postId,
    'avatar'       => $row['avatar'],
    'nickname'     => $row['nickname'],
    'authority'    => $row['authority'],
    'content'      => $row['content'],
    'createdTime'  => $row['created_at'],
    'parentUserId' => $parentUserId,
    'userId'       => $row['user_id'],
  );
  echo json_encode($res);
  $conn->close();
  exit();
?>
