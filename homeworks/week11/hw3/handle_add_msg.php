<?php
  require_once('./conn.php');
  // 確認是否有通行證，否則直接結束
  if (!isset($_COOKIE['certificate'])) {
    header('Location: ./login.php');
    die('尚未登入');
  } else {
  // 確認有 cookie 之後賦予變數
    $certificate = $_COOKIE['certificate'];
    $comments = $_POST['comments'];
    $sql_certify = "SELECT zihur_users_certificate.*, user_id 
                    FROM zihur_users_certificate JOIN zihur_users USING (account)
                    WHERE certificate LIKE '$certificate'";
    $sql_certify_result = $conn->query($sql_certify);
    // 透過能否叫出資料，確認通行證是否和資料庫符合並確認表單內容是否空值
    if ($sql_certify_result->num_rows > 0 && !empty($comments)) {
      $row = $sql_certify_result->fetch_assoc();
      $user_id = $row['user_id'];
      // 寫入資料庫
      $sql = "INSERT INTO zihur_comments(user_id, content) VALUES('$user_id', '$comments')";
      $result = $conn->query($sql);
      // 判斷連線寫入是否成功，防錯機制
      if ($result) {
        header('Location: ./index.php');
      } else {
        echo 'failed, '. $conn->error;
      }
    } else {
      die('資料有錯（通行證有錯或留言內容為空）');
    }
  }
?>
 