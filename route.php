<?php 
    
    Dotenv::load(__DIR__);

    $conn = new mysqli($_ENV["db_host"], $_ENV["db_user"], $_ENV["db_passwd"],$_ENV["db_db"]);

    $cate = real_escape_string($_GET["c"]);
 
    $query = "SELECT * FROM `info` WHERE 'type' = '$s'";
    sprintf($query,$cate);
    
    $res = $conn->query($query) or die($conn->error);

    $start =  file_get_contents("./template/first.html",true); 
    $cell = file_get_contents("./template/part.html",true);
    $end = file_get_contents("./template/bottom.html",true);

    sprintf($start,$cate);



    while ($row = $res->fetch_assoc()) {
        $name = $row['name'];
        $description = $row['description'];
        $difficulty = $row['difficulty'];
        $points = $row['points'];
        $file = $row['file']
        // $cell = sprintf($cell,$name) 
        $start = $start.$cell

    }
    
    $html .= $end;
    echo $html;
    // Return back

?>