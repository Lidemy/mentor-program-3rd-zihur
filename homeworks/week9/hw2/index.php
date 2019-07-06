<?php require_once('./conn.php'); ?>
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
  <script src="./js/index.js" defer></script>
  <title>Bartender Board</title>
</head>
<body>
  <nav class="navbar">
    <div class="wrap  flex-justify-between">
        <h1 class="logo"><a href="./index.php">Bartender Board</a></h1>
      <div class="navbar__list">
      <?php 
        if(!isset($_COOKIE["member_id"])) {
          echo '<a href="./login.php">登入</a>';
          echo '<a href="./signup.php">註冊</a>';
        } else {
          echo '<a href="./handle_logout.php">登出</a>';
        }
      ?>
        <!-- <a href="./login.php">登入</a>
        <a href="./signup.php">註冊</a> -->
      </div>
    </div>
  </nav>
  <main class="main">
    <div class="wrap">
      <?php
      if(!isset($_COOKIE["member_id"])) {
        echo '<p>HI~ 我是今晚的 Bartender：Zihur</p>';
      } else {        
        echo '<p>HI~ ' . $_COOKIE["member_nickname"] . '，我是今晚的 Bartender：Zihur</p>';
      }
      ?>
      <p>歡迎來到這裡，不介意的話，留下一些想說的話吧！</p>
      <form action="./handle_add.php" method="post" class="comments">
        <textarea name="comments" class="comments__textarea" placeholder="今晚就在這，和大家交流一下…"></textarea>
        <input type="submit" value="送出留言">
        <div class="unlogin  invisible">你還沒登入唷！</div>
      </form>
      <div class="msgboard">
        <h2 class="msgtitle">醉心留言：</h2>
        <?php
          $sql = "SELECT * from zihur_comments ORDER BY created_at DESC LIMIT 20";
          $result = $conn->query($sql);
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
        ?>
        <div class="msgcard">
          <div class="msgcard__header">
            <?php
              echo '<img src=' . $row['avatar'] . ' alt="avatar" class="avatar">';
            ?>
            <p class="msgcard__nickname"><?php echo $row['nickname'] ?> 說：</p>
            <p class="msgcard__datetime"><?php echo $row['created_at'] ?></p>
          </div>
          <p class="msgcard__content"><?php echo $row['content'] ?></p>
        </div>
        <?php
            }
          }
        ?>
          <!-- <div class="msgcard__header">
            <img src="./img/avatar_boy.png" alt="avatar" class="avatar">
            <p class="msgcard__nickname">小明 說：</p>
            <p class="msgcard__datetime">2019-07-01 10:30:16</p>
          </div>
          <p class="msgcard__content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque cupiditate ipsum cumque veniam quia est harum quisquam recusandae vitae necessitatibus.</p>
        </div>
        <div class="msgcard">
          <div class="msgcard__header">
            <img src="./img/avatar_girl.png" alt="avatar" class="avatar">
            <p class="msgcard__nickname">小美 說：</p>
            <p class="msgcard__datetime">2019-07-01 10:30:16</p>
          </div>
          <p class="msgcard__content">過去未經課程斗內這樣沒什麼股權，帶來趕緊中有打算出版不出知識法人登錄提交就不萬華版權，是的禮物，出。</p>
        </div> -->
      </div>
    </div>
  </main>
</body>
</html>