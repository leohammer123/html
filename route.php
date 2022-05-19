<?php 
    
    require 'vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createMutable(__DIR__, '.env');
	$dotenv->load();

    $conn = new mysqli($_ENV["db_host"], $_ENV["db_user"], $_ENV["db_passwd"],$_ENV["db_db"]);

    $cate = real_escape_string($_GET["c"]);
    $query = "SELECT * FROM `info` WHERE 'type' = '%s'";
    $query = sprintf($query,$cate);
    
    $res = $conn->query($query) or die($conn->error);

    $start =  file_get_contents("./template/first.html",true); 
    $cell = file_get_contents("./template/part.html",true);
    $end = file_get_contents("./template/bottom.html",true);

    $start = sprintf($start,$cate,$cate);



    while ($row = $res->fetch_assoc()) {
        $name = $row['name'];
        $description = $row['description'];
        $difficulty = $row['difficulty'];
        $points = $row['points'];
        $file = $row['file'];
        $cell = sprintf($cell,$name,$description,$file,$difficulty,$points);
        $start = $start.$cell;

    }
    
    $start .= $end;
    //
    echo $html;
    // Return back

?>
