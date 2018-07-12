<?php
spl_autoload_register( function ($class) {
    require_once "libs/$class.php";
});
//Session::init();
$app = new Bootstrap();
