<?php 
header('Access-Control-Allow-Origin: *'); 

if (isset($_GET["url"])) {
    $url        =   urldecode($_GET["url"]);
    $type       =   (isset($_GET["type"]))      ? $_GET["type"]   : "audio";
    $source     =   (isset($_GET["playlist"]))  ? $_GET["source"] : "individual";

    echo shell_exec("./fetch.py ".$url." ".$type." ".$source);
}
else
    echo "No URL specified.";
?>
