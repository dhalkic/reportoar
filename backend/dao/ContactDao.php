<?php

require_once './Config.class.php';

class ContactDao {
    private $conn;

    public function __construct() {
        $this->conn = Config::getInstance();
    }

    public function saveContact($name, $email, $number, $subject) {
        $insertStmt = $this->conn->prepare("
            INSERT INTO contacts (name, email, number, subject)
            VALUES (:name, :email, :number, :subject)
        ");

        $insertStmt->bindParam(':name', $name);
        $insertStmt->bindParam(':email', $email);
        $insertStmt->bindParam(':number', $number);
        $insertStmt->bindParam(':subject', $subject);

        if ($insertStmt->execute()) {
            return "The message is stored in our database! Thanks for contacting us.";
        } else {
            return "Failed to save contact";
        }
    }
}

?>