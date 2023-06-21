<?php

require_once './Config.class.php';

class EventDao {
    private $conn;

    public function __construct() {
        $this->conn = Config::getInstance();
    }

    public function getAllEvents() {
        $stmt = $this->conn->query("SELECT * FROM events");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addEvent($title, $description, $date, $location) {
        $stmt = $this->conn->prepare("INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)");
        $stmt->execute([$title, $description, $date, $location]);
        return $this->conn->lastInsertId();
    }

    public function updateEvent($eventId, $title, $description, $date, $location) {
        $stmt = $this->conn->prepare("UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?");
        $stmt->execute([$title, $description, $date, $location, $eventId]);
        return $stmt->rowCount() > 0;
    }

    public function deleteEvent($eventId) {
        $stmt = $this->conn->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$eventId]);
        return $stmt->rowCount() > 0;
    }

    public function getEventById($eventId) {
        $stmt = $this->conn->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$eventId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

?>