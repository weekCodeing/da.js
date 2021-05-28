<?php
$number = $_GET["number"];
$no = $number + 5;
include("conn.php");
$sql = "SELECT * FROM ask LIMIT 0,{$no}";
$query = mysql_query($sql);
while($rs = mysql_fetch_array($query)){
	$output[] = array('id'=>$rs['id'],'title'=>$rs['title']);
}
print_r(json_encode($output,JSON_UNESCAPED_UNICODE));
?>