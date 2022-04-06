<?php
        if(isset($_GET["c"])){
                switch($_GET["c"]){
                        case "pwn";
                                $file = file_get_contents("/opt/bitnami/projects/ctf/category/pwn.html",true);
                                echo $file;
                                break;
                        case "web";
                                $file = file_get_contents("/opt/bitnami/projects/ctf/category/web.html",true);
                                echo $file;
                                break;
                        default;
                                $file = file_get_contents("/opt/bitnami/projects/ctf/category/404.html",true);
                                echo $file;
                                break;
                }
        }
        else{
                $file = file_get_contents("/opt/bitnami/projects/ctf/category/search.html",true);
                echo $file;

        }

?>