<?php 
header('Access-Control-Allow-Origin: *'); 
$songurl=$_GET['url'];
echo shell_exec("./fetch.py ".$songurl);
?>
