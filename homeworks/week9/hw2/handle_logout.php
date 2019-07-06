<!-- 清除 cookie -->
<?php
  setcookie("member_id", "", time()-3600);
  setcookie("member_nickname", "", time()-3600);
  setcookie("member_avatar", "", time()-3600);
  header('Location: ./index.php');
?>