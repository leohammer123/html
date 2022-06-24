<?php 
		
if(isset($_POST["username"]) and isset($_POST["password"])){
	
	if($_POST["username"]==="admin4" and $_POST["password"]==="1234567890987654321"){
		echo "flag{h1t0ry_R3cord_is_stored_in_f1le}";
	}
	else{
		echo "<script>alert('Who are you')</script>";
	}
}
else{
	echo '<html>

<body>
<form action="./ver.php" method="post">
  <label for="fname">Username:</label>
  <input type="text" id="fname" name="username" autofocus><br><br>
  <label for="lname">Password:</label>
  <input type="text" id="lname" name="password"><br><br>
  <input type="submit" value="Submit">
</form>
</body>
</html>';
}
?>
