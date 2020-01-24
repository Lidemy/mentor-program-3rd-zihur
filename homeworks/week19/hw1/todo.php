<?php
require_once('conn.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $sql = "SELECT * FROM zihur_todos WHERE is_deleted = 0";

    // 確認是否有 id 參數
    if (!empty($_GET['id'])) {
      $id = $_GET['id'];
      $sql .= " AND id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(1, $id);
    } else {
      $stmt = $conn->prepare($sql);
    }

    $stmt->execute();

    echo "<pre>";
    print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
    echo "</pre>";

    // while($row = $result->fetchALL(PDO::FETCH_ASSOC)) {
    //   $res = [];
    //   array_push($res, $row['id']);
    //   array_push($res, $row['content']);
    //   echo $row['content'] . "<br>";
    // };

    break;

  case 'POST':
    if (empty($_POST['content']) || empty($_POST['is_successed'])) {
      die('請檢查資料');
    }
    $content = $_POST['content'];
    $isSuccessed = $_POST['is_successed'];

    $sql = "INSERT INTO zihur_todos ('content', 'is_successed') VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $title);
    $stmt->bindParam(2, $isSuccessed);
    $stmt->execute();
    break;

  case 'PUT':
    echo 'put';
    break;
  case 'DELETE':
    echo 'delete';
    break;
}
 