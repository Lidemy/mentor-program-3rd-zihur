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
  <script src="./js/signup.js" defer></script>
  <title>Bartender Board-signup</title>
</head>
<body>
  <!-- 引入 nav -->
  <?php require_once('./layout/nav.php') ?>
  <main class="main">
    <div class="wrap">
      <p>你要成為會員嗎？</p>
      <p>太好了，那麼需要先請你填寫以下的資料喔！</p>
      <p>噢！提醒你一下，畢竟酒吧是個公開場合</p>
      <p class="mention">所以註冊時請勿使用任何真實的帳號或密碼喔！</p>
      <form action="./handle/handle_signup.php" method="post" class="signup">
        <label>暱稱：<input type="text" name="nickname" placeholder="請輸入暱稱"></label>
        <label>帳號：<input type="text" name="account" placeholder="請輸入帳號"></label>
        <label>密碼：<input type="password" name="password" placeholder="請輸入密碼"></label>
        <div class="sexuality">
          <p>生理性別：</p>
          <input type="radio" name="sexuality" id="sexuality1" value="男性"><label for="sexuality1">男性</label>
          <input type="radio" name="sexuality" id="sexuality2" value="女性"><label for="sexuality2">女性</label>
        </div>
        <input type="submit" value="送出 ->" class="submit">
      </form>
    </div>
  </main>
</body>
</html>