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