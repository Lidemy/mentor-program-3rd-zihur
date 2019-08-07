<?php require_once('./conn.php'); ?>
<?php require_once('./handle/handle_is_login.php') ?>
<?php
  if ($auth !== 'visitor') {
    header('Location: ./index.php');
    exit();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond&display=swap" rel="stylesheet">
  <link href="./css/normalized.css" rel="stylesheet">
  <link href="./css/style.css" rel="stylesheet">
  <script src="./js/login.js" defer></script>
  <title>Bartender Board-login</title>
</head>
<body>
  <!-- 引入 nav -->
  <?php require_once('./layout/nav.php') ?>
  <main class="main">
    <div class="wrap">
      <p>噢！你好像曾來過是嗎？</p>
      <p>很抱歉，因為客人太多了，能不能告訴我你是誰呢？</p>
      <p>如果我認錯了，也歡迎成為我們的會員喔！</p>
      <form action="./handle/handle_login.php" method="post" class="login">
        <label>帳號：<input type="text" name="account" placeholder="請輸入帳號"></label>
        <label>密碼：<input type="password" name="password" placeholder="請輸入密碼"></label>
        <input type="submit" value="登入 ->" class="submit">
      </form>
    </div>
  </main>
</body>
</html>