<?php

require_once './services/EventServices.php';

Flight::route('GET /events', function(){
    $eventServices = new EventServices();
    $events = $eventServices->getAllEvents();

    Flight::json($events, 200);
});

Flight::route('GET /events/@id', function($id){
    $eventServices = new EventServices();
    $event = $eventServices->getEventById($id);

    if ($event) {
        Flight::json($event, 200);
    } else {
        Flight::json(array('message' => 'Event not found'), 404);
    }
});

Flight::route('POST /add_events', function(){
    $title = Flight::request()->data['title'];
    $description = Flight::request()->data['description'];
    $date = Flight::request()->data['date'];
    $location = Flight::request()->data['location'];

    $eventServices = new EventServices();
    $eventId = $eventServices->addEvent($title, $description, $date, $location);

    Flight::json(array('eventId' => $eventId), 201);
});

Flight::route('PUT /edit_events/@id', function($id){
    $title = Flight::request()->data['title'];
    $description = Flight::request()->data['description'];
    $date = Flight::request()->data['date'];
    $location = Flight::request()->data['location'];

    $eventServices = new EventServices();
    $success = $eventServices->updateEvent($id, $title, $description, $date, $location);

    if ($success) {
        Flight::json(array('message' => 'Event updated successfully'), 200);
    } else {
        Flight::json(array('message' => 'Failed to update event'), 500);
    }
});

Flight::route('DELETE /events/@id', function($id){
    $eventServices = new EventServices();
    $success = $eventServices->deleteEvent($id);

    if ($success) {
        Flight::json(array('message' => 'Event deleted successfully'), 200);
    } else {
        Flight::json(array('message' => 'Failed to delete event'), 500);
    }
});

?>