<?php

require_once './services/ContactServices.php';

Flight::route('POST /contact', function(){
    $name = Flight::request()->data['name'];
    $email = Flight::request()->data['email'];
    $number = Flight::request()->data['number'];
    $subject = Flight::request()->data['subject'];

    $contactServices = new ContactServices();
    $message = $contactServices->saveContact($name, $email, $number, $subject);

    Flight::json(array('message' => $message), 200);
});

?>