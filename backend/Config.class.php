<?php

class Config {
    private static $instance;
    private $connection;

    private function __construct() {
        try {
            $dbHost = '127.0.0.1';
            $dbName = 'repetator';
            $dbUser = 'root';
            $dbPassword = 'ademir299';

            $this->connection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Config();
        }

        return self::$instance->connection;
    }
}

?>