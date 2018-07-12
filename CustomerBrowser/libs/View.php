<?php

class View {

    function __construct() {
       // echo 'This is the view<br>';
    }
    
    public function render($name) {
        require_once 'views/header.php';
        require_once 'views/' . $name . '.php';
        require_once 'views/footer.php';
    }

}
