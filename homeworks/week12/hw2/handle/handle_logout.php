<!-- 清除 cookie -->
<?php
  setcookie("member_nickname", "", time()-3600, '/');
  setcookie("certificate", "", time()-3600, '/');
  header('Location: ../index.php');
  exit();
?>