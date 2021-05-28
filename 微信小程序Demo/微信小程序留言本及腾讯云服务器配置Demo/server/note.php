<?php
include("conn.php");
$name=$_GET['name'];
$content=$_GET['content'];
$imageurl=$_GET['imageurl'];
$sql="INSERT INTO `note` (`name`,`content`,`imageurl`)VALUES ('{$name}','{$content}','{$imageurl}')";
if(mysql_query($sql)){
  echo "留言成功";
}	else{
  echo "留言失败";
}
?>