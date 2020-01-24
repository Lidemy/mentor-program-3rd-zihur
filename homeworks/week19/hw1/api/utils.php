<?php

function checkQuery($stmt) {
  if ($stmt->rowCount() < 1) {
    http_response_code(404);
    echo json_encode(["message" => "有些東西出錯了"], JSON_UNESCAPED_UNICODE);
    exit();
  }
}

/**
 * 綁定參數
 */
function batchBindParam($stmt, $array) {
  $i = 1;
  /**
   * bindParam 需要傳址，所以必須要用 &$value
   * 但不是很懂原因，因為不用 foreach 的時候仍可使用 $value
   */
  foreach ($array as &$value) {
    $stmt->bindParam($i, $value);
    $i++;
  }
}