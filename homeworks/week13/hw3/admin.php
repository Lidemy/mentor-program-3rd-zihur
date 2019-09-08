<?php
  require_once('./conn.php');
  require_once('./handle/handle_is_login.php');
  if ($auth !== 'super_admin') {
    header('Location: ../index.php');
    die('你的權限不足以進入後台');
  }
  // 權限驗證結束
?>
<?php
  // 處理 POST，將更改的值進行更新。
  $result_msg = "";
  if (isset($_POST['authority'])) {
    $authority = $_POST['authority'];
    $account = $_POST['account'];
    for ($i = 0; $i < count($account); $i += 1) {
      $stmt = $conn->prepare("UPDATE zihur_users 
                              SET authority = ? 
                              WHERE account = ?");
      $stmt->bind_param('ss', $authority[$i], $account[$i]);
      $result = $stmt->execute();
    if ($result) {
      $result_msg = '<P class="mention">已經成功更新囉</p>';
    } else {
      $result_msg = '<P>似乎出了點問題，請聯繫後端</p>';
    }
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
  <link href="./css/manage_style.css" rel="stylesheet">
  <script src="./js/manage_index.js" defer></script>
  <title>Bartender Board 後台管理 - 會員權限</title>
</head>
<body>
<!-- 引入 nav -->
  <?php include_once('./layout/nav.php')?>
  <div class="wrap">
    <h2>會員權限管理</h2>
    <p>頁面好多好亂啊～</p>
    <form action="./admin.php" method="post" class="member">
      <table>
        <tbody>
          <tr>
            <th>暱稱</th>
            <th>帳號</th>
            <th>權限</th>
          </tr>
        <?php include_once('./layout/user_list.php') ?>
        </tbody>
      </table>
      <input type="submit" class="member__submit">
    </form>
    <?= $result_msg ?>
  </div>
</body>
</html>