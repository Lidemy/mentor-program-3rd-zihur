<!-- 清除 cookie -->
<?php
  setcookie("member_nickname", "", time()-3600, '/');
  setcookie("csrfToken", "", time()-3600, '/');
  header('Location: ../index.php');
  session_destroy()
  exit();
?>