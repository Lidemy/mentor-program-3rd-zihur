<nav class="navbar">
  <div class="wrap  flex-justify-between">
      <h1 class="logo"><a href="./index.php">Bartender Board</a></h1>
    <div class="navbar__list">
    <?php 
      if($certificate === 'none') {
        echo '<a href="./login.php">登入</a>';
        echo '<a href="./signup.php">註冊</a>';
      } else if($auth === 'super admin'){
        echo '<a href="./manage_users_auth.php">管理權限</a>';
        echo '<a href="./handle_logout.php">登出</a>';
      } else {
        echo '<a href="./handle_logout.php">登出</a>';
      }
    ?>
    </div>
  </div>
</nav>
