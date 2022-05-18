<?php

include 'email.php';
use Dotenv\Dotenv;

require __DIR__ . './../vendor/autoload.php';

$dotenv = new Dotenv(__DIR__ . "/..");
$dotenv->load();
Dotenv::load(__DIR__);


// Create connection

$conn = new mysqli($_ENV["db_host"], $_ENV["db_user"], $_ENV["db_passwd"],$_ENV["db_db"]);


if(isset($_POST["name"]) && isset($_POST["email"])){
	$clear_name = mysqli_real_escape_string($conn,$_POST["name"]);
	$clear_email = mysqli_real_escape_string($conn,$_POST["email"]);

	$query = "select * from `validate` where username='%s';";

	$query = sprintf($query,$clear_name);
	$result=$conn->query($query) or die($conn->error);
	if (mysqli_num_rows($result)!=0) {
		echo  json_encode(array('success'=>false, 'error'=>'This username has been used'));
	}

	else{

		$result = sendmail($_POST["name"],$_POST["password"],$_POST["email"]);
		echo $result;
	
		$query = "select count(*) from validate";
		$res = $conn->query($query) or die($conn->error);
		$id = 0;
		while ($row = $res->fetch_assoc()) {
			$id = $row['count(*)'];
		}

		$query = "INSERT INTO `validate` (`validate`, `id`, `gmail`, `username`, `password`) VALUES (0, %d, '%s', '%s', '%s');";
		$query = sprintf($query,$id,$clear_email,$clear_name,hash('sha256',$_POST["password"].$_ENV["db_salt"].$_POST["name"]));
		$conn->query($query);
		$conn->close();
	}

}


?>
