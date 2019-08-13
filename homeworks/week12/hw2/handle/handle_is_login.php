<?php
  // 透過 certificate 判斷是誰，並賦予相對應的權限
  $auth = 'visitor';
  $csrfToken = '';
  if (isset($_COOKIE['certificate'])) {
    $certificate = $_COOKIE['certificate'];
    $stmt = $conn->prepare("SELECT certificate.*, authority
                            FROM zihur_users_certificate as certificate
                            JOIN zihur_users as users 
                            ON certificate.user_id = users.id
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
    $user_id = "";
  }
  if (isset($_COOKIE['csrfToken'])) {
    $csrfToken = $_COOKIE['csrfToken'];
  }
?>
