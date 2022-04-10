<?php

include 'email.php';

if(isset($_GET["name"]) && isset($_GET["email"])){
	echo "1234";
	$result = sendmail($_GET["name"],$_GET["email"],$_GET["text-1"]);
	echo $result;
}
?>
