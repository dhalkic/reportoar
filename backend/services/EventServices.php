<?php

require_once './dao/EventDao.php';

class EventServices {
    private $eventDao;

    public function __construct() {
        $this->eventDao = new EventDao();
    }

    public function addEvent($title, $description, $date, $location) {
        return $this->eventDao->addEvent($title, $description, $date, $location);
    }

    public function updateEvent($eventId, $title, $description, $date, $location) {
        return $this->eventDao->updateEvent($eventId, $title, $description, $date, $location);
    }

    public function deleteEvent($eventId) {
        return $this->eventDao->deleteEvent($eventId);
    }

    public function getAllEvents() {
        return $this->eventDao->getAllEvents();
    }

    public function getEventById($eventId) {
        return $this->eventDao->getEventById($eventId);
    }
}

?>