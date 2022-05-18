<?php


	Dotenv::load(__DIR__);
	$conn = new mysqli($_ENV["db_host"], $_ENV["db_user"], $_ENV["db_passwd"],$_ENV["db_db"]);

	$val = $_GET["check"];
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
		echo "Confirm success.Now you can close this page.";
	}
	else{
		echo "Email validate failed ,please contact with admin if there is any problem.";
	}

?>

