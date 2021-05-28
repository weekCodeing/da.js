<?php
//数据库连接
$dbname = 'cAuth';
$host = "localhost:5825";
$user = "root";
$pwd = "你的appid";
/*调用mysql_content()连接服务器*/
$link = mysql_connect("localhost",$user,$pwd);
mysql_query("set names utf8");
if(!$link){
	die("Connect Server Failed: " . mysql_error($link));
}
/*连接成功后调用mysql_select_db()选中需要链接的数据库*/
if(!mysql_select_db($dbname,$link)){
	die("Select Database Failed: " . mysql_error($link));
}
?>