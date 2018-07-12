<?php

class Bootstrap {

    const CONTROLLER = 0;
    const ACTION = 1;
    const PARAMS = 2;

    private $controllerName;
    private $action;
    private $params;

    function __construct() {
        $url = isset($_GET['url']) ?$_GET['url'] : 'index' ;
        $url = rtrim($url, '/');
        $param = explode('/', $url)[0];
        // http://localhost:8090/Customers
        // http://localhost:8090/{Customer}/orders
        // http://localhost:8090/{order}/details
        
        //http://localhost:8090/CustomerBrowser/Customers
        if (strpos($url , 'Customers') !== false ) {
            $this->action = "Customers";
        }
        //http://localhost:8090/CustomerBrowser/ALFKI/orders
        if (strpos($url , 'orders') !== false ) {
            $this->action = "OrdersPerCustomer";
            $this->params = $param;
        }
        //http://localhost:8090/CustomerBrowser/10/details
        if (strpos($url , 'details') !== false ) {
            $this->action = "OrderDetails";
            $this->params = $param;
        }
        
      
        $this->controllerName = "CustomersBrowser";
        $file = 'controllers/' . $this->controllerName . '.php';
        if (file_exists($file)) {
            require_once $file;
            $controller = new $this->controllerName;
        //    $controller->loadModel($this->controllerName);
        } else {
            return $this->Error();
        }

        if (method_exists($controller, $this->action)) {
            if ($this->params) {
                $controller->{$this->action}($this->params);
            } else {
                $controller->{$this->action}();
            }
        } else {
            return $this->Error();
        }
    }

    private function Error() {
       // echo "Error: <br>" . $url;
//        require_once 'controllers/error.php';
//        $error_controller = new myError();
//        $error_controller->index();
//        return false;
    }

}
