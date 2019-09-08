<?php
  session_start();
  // 賦予了三樣變數，user_id、auth 權限、csrfToken
  $user_id = '';
  $auth = 'visitor';
  $csrfToken = '';
  if (isset($_SESSION['user_id']) && isset($_SESSION['auth'])) {
    $user_id = $_SESSION['user_id'];
    $auth = $_SESSION['auth'];
  };
  if (isset($_COOKIE['csrfToken'])) {
    $csrfToken = $_COOKIE['csrfToken'];
  };
?>
