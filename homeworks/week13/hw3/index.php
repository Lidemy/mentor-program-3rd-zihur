<?php require_once('./conn.php'); ?>
<?php require_once('./utils.php') ?>
<!-- 判斷登入狀況 -->
<?php require_once('./handle/handle_is_login.php'); ?>
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
  <script src="https://kit.fontawesome.com/39b89998cd.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" defer></script>
  <script src="./js/index.js" defer></script>
  <title>Bartender Board</title>
</head>
<body>
  <!-- 引入 nav -->
  <?php include_once('./layout/nav.php')?>
  <main class="main">
    <div class="wrap">
      <!-- 引入問候文字 -->
      <?php include_once('./layout/intro.php')?>
      <!-- 引入留言表單 -->
      <?php include_once('./layout/add_msg.php')?>
      <!-- 引入留言板內容 -->
      <?php include_once('./layout/msg_board.php')?>
    </div>
  </main>
</body>
</html>
