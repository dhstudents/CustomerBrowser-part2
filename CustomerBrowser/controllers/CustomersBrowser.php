<?php

class CustomersBrowser /* extends Controller */ {

    private $model;

    function __construct() {
        // parent::__construct();
        $this->model = new Model();
    }

    // http://localhost:8090/CustomerBrowser/Customers
    public function Customers() {
        $data = $this->model->getCustomers();
        $this->ToClient($data);
    }

    //http://localhost:8090/CustomerBrowser/ALFKI/orders
    public function OrdersPerCustomer($id) {
        $data = $this->model->getCustomerOrders($id);
        $this->ToClient($data);
    }

    // http://localhost:8090/CustomerBrowser/10/details
    public function OrderDetails($id) {
        $data = $this->model->getOrderDetails($id);
        $this->ToClient($data);
    }

    // view is not needed!!!!!!! 
    private function ToClient($data) {
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($data);
//        if (json_last_error() == 5) {
//            foreach ($data as $key => $value) {
//                $data[$key] = utf8ize($value);
//            }
//        } else {
//            echo $data_js;
//        }
    }

}
