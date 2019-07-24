<?php
  require_once('./conn.php');
  // 根據通行證給予權限，並驗證權限
  $auth = 'normal';
  if (isset($_COOKIE['certificate'])) {
    $certificate = $_COOKIE['certificate'];
    $sql_auth = "SELECT zihur_users_certificate.*, authority
                 FROM zihur_users_certificate 
                 JOIN zihur_users ON zihur_users_certificate.account = zihur_users.account
                 WHERE certificate = '$certificate'";
    $sql_auth_result = $conn->query($sql_auth);
    while($auth_row = $sql_auth_result->fetch_assoc()) {
      $auth = $auth_row['authority'];
    }
  } else {
    $certificate = 'none';
  }
  if ($auth !== 'super admin') {
    die('你的權限不足以進入後台');
  }
  // 權限驗證結束
?>
<?php
  // 處理 POST
  if (isset($_POST['authority'])) {
    $authority = $_POST['authority'];
    $account = $_POST['account'];
    for ($i = 0; $i < count($account); $i += 1) {
      $sql = "UPDATE zihur_users SET authority = '$authority[$i]' WHERE account = '$account[$i]'";
      $result = $conn->query($sql);
    }
    if ($result) {
      echo '<P class="mention">已經成功更新囉</p>';
    } else {
      echo '<P>似乎出了點問題</p>';
    }
  }
  /* 目前感覺這樣送請求，使用者一多，又不小心多重複按了幾次 F5，server 就要被搞爆了=..=
     後者問題很好解決，另外開一個頁面處理就能避免 F5 時一直重複執行程式碼了，但總感覺哪裡怪怪的，直覺告訴我應該能寫在同一頁
     前者就有點麻煩，假設希望保留使用者的便利操作，選好資料之後，可以一鍵將 POST 請求送出
     但這樣就會變成一次更改所有資料，連同沒更改的，覺得應該要改成有更改的資料才傳送，但不知道要怎麼寫判斷
     不曉得 Huli 有沒有更好的想法呢？還是我想太多了，應該直接把送出按鈕嵌在每個帳號後面，改哪一筆就按一次送出？ */
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
  <link href="./css/manage_style.css" rel="stylesheet">
  <script src="./js/manage_index.js" defer></script>
  <title>Bartender Board 後台管理 - 會員權限</title>
</head>
<body>
  <div class="wrap">
    <h1>會員權限管理</h1>
    <p>我突然明白為什麼所有的後台系統都這麼醜了</p>
    <p>因為做到這裏我就有點懶得再美化它了XD</p>
    <form action="./manage_users_auth.php" method="post" class="member">
      <table>
        <tbody>
          <tr>
            <th>暱稱</th>
            <th>帳號</th>
            <th>權限</th>
          </tr>
        <?php
          $sql = "SELECT zihur_users.*, certificate 
                  FROM zihur_users LEFT JOIN zihur_users_certificate USING(account) 
                  WHERE certificate != '$certificate'";
          $result = $conn->query($sql);
          while ($row = $result->fetch_assoc()) {
        ?>
          <tr>
            <td><?php echo $row['nickname']; ?></td>
            <td><?php echo $row['account']; ?><input type="text" name="account[]" value="<?php echo $row['account']; ?>" class="invisible"></td>
            <td>
              <?php echo "<select name='authority[]' data-auth=\"" . $row['authority'] . "\">" ?>
                <option value="normal">一般會員</option>
                <option value="admin">管理員</option>
                <option value="super admin">超級管理員</option>
              </select>
            </td>
          </tr>
        <?php
          }
        ?>
        </tbody>
      </table>
      <input type="submit" class="member__submit">
    </form>
  </div>
</body>
</html>