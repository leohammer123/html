<?php

$password = "g52hS9C8C6aT";
$db = "challenge";
$host = 'localhost';
$user = 'root';

$conn = new mysqli($host, $user, $password,$db);


$val = $_GET["check"];
$salt = "secret_salt987";
$query = "SELECT * FROM `validate` WHERE 'validate' = 0";
$result = $conn->query($query);

$find = 0;
$usr = "";

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	  if ($row["password"]==$val){
		  $find=1;
		  $usr = $row["username"];
	  }
  }
}

if($find){
	$query = 'UPDATE `validate` SET `validate`=1 WHERE username="%s";';
	$query = sprintf($query,$usr);
	 $conn->query($query);
        $conn->close();
	echo "confirm success , Now you can close this page.";
}
else{
	echo "Something is wrong";
}

?>

