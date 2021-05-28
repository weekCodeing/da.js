<?php

include("conn.php");
$sql = "SELECT * FROM `note` ORDER BY `id` DESC limit 5 ";
$query=mysql_query($sql);

while($rs = mysql_fetch_array($query)) {
   
$output[]=array('name'=>$rs['name'],'content'=>$rs['content'],'pic'=>$rs['imageurl']);
}

 print_r(json_encode($output));				
					

?>