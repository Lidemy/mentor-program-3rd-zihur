<?php
  // 判斷連線寫入是否成功的 function，防錯機制，成功便轉回首頁。(boolean, connect 的資料庫)
  function checkConn($result, $conn) {
    if ($result) {
      header('Location: ../index.php');
      exit();
    } else {
      echo 'Failed, '. $conn->error;
      echo '連線有問題';
    }
  }
  // 在 client 端轉址並提供訊息
  function redirect($location, $message = '') {
    if($message !== '') {
      echo "<script>alert(" . $message . ")</script>";
    }
    echo "<script>window.location = " . $location . "</script>";
  }
  // 簡化預防 XSS 輸出的函式
  function outputPreventStr($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
  }
?>
