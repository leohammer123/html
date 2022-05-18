<?php
	
	$password = "g52hS9C8C6aT";
	$db = "challenge";
	$host = 'localhost';
	$user = 'root';

	$conn = new mysqli($host, $user, $password,$db);

	if(isset($_POST["name"]) and isset($_POST["password"])){

	        $name = mysqli_real_escape_string($conn,$_POST["name"]);
		$password = mysqli_real_escape_string($conn,$_POST["password"]);

		$query = "select * from `validate` where username='%s' and password='%s';";

	        $query = sprintf($query,$clear_name);

		$query = $conn->



?>

