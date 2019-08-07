<?php
  // 透過 certificate 判斷是誰，並賦予相對應的權限
  $auth = 'visitor';
  if (isset($_COOKIE['certificate'])) {
    $certificate = $_COOKIE['certificate'];
    $stmt = $conn->prepare("SELECT zihur_users_certificate.*, authority, user_id
                            FROM zihur_users_certificate 
                            JOIN zihur_users ON zihur_users_certificate.account = zihur_users.account
                            WHERE certificate = ?");
    $stmt->bind_param('s', $certificate);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()) {
      $auth = $row['authority'];
      $user_id = $row['user_id'];
    }
  } else {
    $certificate = 'none';
  }
?>
