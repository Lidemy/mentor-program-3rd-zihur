<?php
  require_once('./conn.php');
  // 判斷連線寫入是否成功的 function，防錯機制
  function checkConn($result) {
    global $conn;
    if ($result) {
      header('Location: ./index.php');
    } else {
      echo 'Failed, '. $conn->error;
    }
  }

  // 透過 certificate 判斷是誰，並賦予相對應的權限
  $auth = 'normal';
  $post_id = $_GET['post_id'];
  $comments = $_GET['comments'];
  if (isset($_COOKIE['certificate'])) {
    $certificate = $_COOKIE['certificate'];
    $sql_auth = "SELECT zihur_users_certificate.*, authority
                  FROM zihur_users_certificate 
                  JOIN zihur_users ON zihur_users_certificate.account = zihur_users.account
                  WHERE certificate = '$certificate'";
    $sql_auth_result = $conn->query($sql_auth);
    while($auth_row = $sql_auth_result->fetch_assoc()) {
      $auth = $auth_row['authority'];
    }
  } else {
    header('Location: ./login.php');
    die('尚未登入');
  }
  // 透過判斷權限決定能否直接更改資料
  if ($auth === 'admin' || $auth === 'super admin') {
    $sql = "UPDATE zihur_comments SET content = '$comments' WHERE post_id = '$post_id'";
    $result = $conn->query($sql);
    checkConn($result);
  } else {
    // 權限不足，進一步透過能否叫出資料確認通行證以及文章是否同一人
    $sql_certify = "SELECT zihur_comments.*, zihur_users_certificate.* 
                    FROM zihur_comments JOIN zihur_users USING (user_id) 
                    JOIN zihur_users_certificate USING (account)
                    WHERE certificate LIKE '$certificate' AND post_id LIKE '$post_id'";
    $sql_certify_result = $conn->query($sql_certify);
    if ($sql_certify_result->num_rows > 0 && !empty($comments)) {
      $sql = "UPDATE zihur_comments SET content = '$comments' WHERE post_id = '$post_id'";
      $result = $conn->query($sql);
      checkConn($result);
    } else {
      die('權限不足，你 4 不 4 偷改 post_id');
    }
  }
?>
 