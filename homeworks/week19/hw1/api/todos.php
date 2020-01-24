<?php
require_once('conn.php');
require_once('utils.php');

// solve CORS problems
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

date_default_timezone_set("Asia/Taipei"); // 必須要設定這個，才能使用 now 函式，除非有設定 php.ini

$method = $_SERVER['REQUEST_METHOD'];
$id = "";
if (isset($_GET['id'])) {
  $id = $_GET['id'];
}

switch ($method) {
  case 'GET':
    $sql = "SELECT * FROM zihur_todos WHERE deleted_at IS NULL";

    /**
     * 確認是否有 id 參數是否為空值
     * 數字以外的問題，會在 .htaccess 的正規表達式被過濾掉
     */
    if (!empty($_GET['id'])) {
      $sql .= " AND id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(1, $id);
    } else {
      $stmt = $conn->prepare($sql);
    }
    $stmt->execute();
    
    if ($rows = $stmt->fetchAll()) {
      foreach ($rows as $row) {
        $res[] = $row;
      }
      echo json_encode($res);
    };
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['content']) || !isset($data['status'])) {
      die('請檢查資料');
    };
    $content = $data['content'];
    $status = $data['status'];

    $sql = "INSERT INTO zihur_todos (content, status) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    batchBindParam($stmt, [$content, $status]);
    $stmt->execute();
    checkQuery($stmt);
    $data['id'] = $conn->lastInsertId();
    echo json_encode(['message' => "請求成功", 'lastInsert' => $data], JSON_UNESCAPED_UNICODE);
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($id) || !isset($data['content']) || !isset($data['status'])) {
      die('請檢查資料');
    }
    $content = $data['content'];
    $status = $data['status'];
    
    $sql = "UPDATE zihur_todos SET content = ?, status = ? WHERE id = ? AND deleted_at IS NULL";
    $stmt = $conn->prepare($sql);
    batchBindParam($stmt, [$content, $status, $id]);
    if (!$stmt->execute()) {
      echo json_encode(["message" => "有些東西出錯了"], JSON_UNESCAPED_UNICODE);
      exit();
    };
    echo json_encode(["message" => "請求成功"], JSON_UNESCAPED_UNICODE);
    break;
    
  case 'DELETE':
    $sql = "UPDATE zihur_todos SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL";
    $stmt = $conn->prepare($sql);
    $now = date("Y-m-d H:m:s");
    batchBindParam($stmt, [$now, $id]);
    if (!$stmt->execute()) {
      echo json_encode(["message" => "有些東西出錯了"], JSON_UNESCAPED_UNICODE);
      exit();
    }
    echo json_encode(["message" => "請求成功"], JSON_UNESCAPED_UNICODE);
    break;

  case 'OPTION':
    break;
}
 