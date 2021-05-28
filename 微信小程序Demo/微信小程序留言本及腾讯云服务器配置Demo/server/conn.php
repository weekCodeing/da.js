<?php
//数据库链接
$dbname = 'cAuth';
$host = "localhost:5825";
$user = "root";
$pwd = "你的appID";
/*接着跳用mysql_connect()链接服务器*/
$link = mysql_connect($host,$user,$pwd);
if(!$link){
  die("Connect Server Failed: " . mysql_error($link));
}
if(!mysql_select_db($dbname,$link)){
  die("Select Database Failed: " . mysql_error($link));
}
?>