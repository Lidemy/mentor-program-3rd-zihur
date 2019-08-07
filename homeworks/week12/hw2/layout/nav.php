<nav class="navbar">
  <div class="wrap  flex-justify-between">
      <h1 class="logo"><a href="./index.php">Bartender Board</a></h1>
    <div class="navbar__list">
    <?php
      $location = $_SERVER['PHP_SELF'];
      // 根據網址輸出
      if (strpos($location, "index.php")) {
        // 根據權限輸出狀態
        switch ($auth) {
          case 'visitor':
            echo '<a href="./login.php">登入</a>';
            echo '<a href="./signup.php">註冊</a>';
            break;
          case 'super admin':
            echo '<a href="./admin.php">管理權限</a>';
            echo '<a href="./handle/handle_logout.php">登出</a>';
            break;
          default:
            echo '<a href="./handle/handle_logout.php">登出</a>';
        }
      }
      if (strpos($location, "signup.php")) {
        echo '<a href="./login.php" class="decorate">前往登入</a>';
      }
      if (strpos($location, "login.php")) {
        echo '<a href="./signup.php" class="decorate">前往註冊</a>';
      }
      if (strpos($location, "admin.php")) {
        echo '<a href="./index.php" class="decorate">返回首頁</a>';
      }
    ?>
    </div>
  </div>
</nav>
