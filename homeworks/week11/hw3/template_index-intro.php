<?php
  if(!isset($_COOKIE["member_nickname"])) {
    echo '<p>HI~ 我是今晚的 Bartender：Zihur</p>';
  } else {        
    echo '<p>HI~ ' . $_COOKIE["member_nickname"] . '，很高興看到你</p>';
  }
?>
<p>歡迎來到這，不介意的話，留下一些想說的話吧！</p>