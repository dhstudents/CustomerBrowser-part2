<?php

abstract class Controller {

    function __construct() {
        //echo 'Main Controller<br>';
        $this->view = new View();
    }
    
    public function loadModel($name) {
        $path = 'models/' . $name . '_model.php';
        if (file_exists($path)) {
            require_once $path;
            $modelName = $name . "_Model";
            $this->model = new $modelName();
        }
    }
    
    protected abstract function renderView();

}
