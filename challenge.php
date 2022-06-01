<?php 
    
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createMutable(__DIR__, '.env');
    $dotenv->load();

    $conn = new mysqli($_ENV["db_host"], $_ENV["db_user"], $_ENV["db_passwd"],$_ENV["db_db"]);

    if(!isset($_GET["c"])){
	echo file_get_contents("./template/menu.html",true);
}
	else{
    $cate = mysqli_escape_string($conn,$_GET["c"]);
    $query = "SELECT * FROM `info` WHERE type = '%s'";
    $query = sprintf($query,$cate);
    $res = $conn->query($query) or die($conn->error);

    $start =  file_get_contents("./template/first.html",true); 
    $cell = file_get_contents("./template/part.html",true);
    $end = file_get_contents("./template/bottom.html",true);

    $start = sprintf($start,$cate,$cate);
 
    $find=1;

    while ($row = $res->fetch_assoc()) {
        $name = $row['name'];
        $description = $row['description'];
        $difficulty = $row['difficulty'];
        $points = $row['points'];
	$file = $row['file'];
	$temp = $cell;
        $temp = sprintf($temp,$name,$description,$file,$difficulty,$points);
	$start .= $temp;
	$find=0;

    }

    if($find){
	echo file_get_contents("./template/404.html",true);
    }
    else{
    
	    $start .= $end;
	    echo $start;
	    // Return back
}
	}
?>
