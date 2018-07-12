<?php

class Model {

    function __construct() {
        $this->db = new Database();
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

//SELECT * FROM customers order by CustomerID
    function getCustomers() {
        $data = array();
        $stmt = $this->db->prepare("SELECT * FROM customers");
        if ($stmt->execute()) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $data;
    }
//SELECT * FROM orders where CustomerID = 'VICTE' order by OrderID
    function getCustomerOrders($custid) {
        $data = array();
        $stmt = $this->db->prepare("SELECT * FROM orders where CustomerID=:id order by OrderID");
        if ($stmt->execute(array('id' => $custid))) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $data;
    }

//SELECT od.* , p.ProductName FROM `order details` as od inner join products as p 
//     on od.ProductID = p.ProductID
//	  where OrderID = 10248
    function getOrderDetails($orderid) {
        $data = array();
        $sql = "SELECT od.* , p.ProductName FROM `order details` as od ";
        $sql .= "inner join products as p ";
        $sql .= "on od.ProductID = p.ProductID ";
        $sql .= "where OrderID = :id ";
        
        $stmt = $this->db->prepare($sql);
        if ($stmt->execute(array('id' => $orderid))) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $data;
    }

    function load($modelName) {
        // file exist!!!!!
        require_once 'models/' . $modelName . '_model.php';
        $modelClass = $modelName . '_Model';
        return new $modelClass();
    }

}
