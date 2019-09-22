<?php
  // 透過主留言查詢留言數量
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
  } else {
    $page = 1;
  }
  // 動態更新分頁數量及上下頁，頁面呈現最多5頁，當前頁會永遠出現在數字中間
  $sql_count = "SELECT COUNT(id) AS `count` FROM zihur_comments
                WHERE zihur_comments.is_deleted != 1 AND parent_id = 0";
  $result_count = $conn->query($sql_count);
  $row = $result_count->fetch_assoc();
  $total_page = ceil($row['count'] / 20);
  if ($page > 1) {
    echo '<a href="./index.php?page=' . ($page - 1) . '"><li>＜上一頁</li></a>';
  }
  for ($i = $page - 2; $i <= $page + 2; $i += 1) {
    if ($i < 1 || $i > $total_page) {
      continue;
    } else if ($page == $i) {
      echo '<a href="./index.php?page=' . $i . '"><li class="msg__num  msg__num--actived">' . $i . '</li></a>';
    } else {
      echo '<a href="./index.php?page=' . $i . '"><li class="msg__num">' . $i . '</li></a>';
    }
  }
  if ($page < $total_page) {
    echo '<a href="./index.php?page=' . ($page + 1) . '"><li>下一頁＞</li></a>';
  }
?>