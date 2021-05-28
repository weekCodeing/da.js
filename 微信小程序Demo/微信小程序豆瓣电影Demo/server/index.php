<?php
print_r(file_get_contents('https://api.douban.com'.$_SERVER["REQUEST_URI"]));
?>