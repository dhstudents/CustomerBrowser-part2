<?php
//https://stackoverflow.com/questions/19361282/why-would-json-encode-return-an-empty-string
// for real database
class Database extends PDO {
// charset=utf8
    function __construct() {
        parent::__construct('mysql:host=localhost;dbname=northwind;charset=utf8','root', '');
    }
}

// for text file database
//class Database {
//    function __construct() {
//    }
//}