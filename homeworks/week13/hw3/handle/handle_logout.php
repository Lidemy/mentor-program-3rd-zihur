<!-- 清除 cookie -->
<?php
  session_start();
  session_destroy();
  setcookie("member_nickname", "", time()-3600, '/');
  setcookie("csrfToken", "", time()-3600, '/');
  setcookie("PHPSESSID", "", time()-3600, '/');
  header('Location: ../index.php');
  exit();
?>