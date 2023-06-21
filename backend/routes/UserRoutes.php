<?php

require_once './services/UserServices.php';

Flight::route('POST /register', function(){
    $firstName = Flight::request()->data['firstName'];
    $lastName = Flight::request()->data['lastName'];
    $email = Flight::request()->data['email'];
    $password = Flight::request()->data['password'];
  
    $userServices = new UserServices();
    $message = $userServices->registerUser($firstName, $lastName, $email, $password);
  
    Flight::json(array('message' => $message), 200);
});

Flight::route('POST /login', function(){
    $email = Flight::request()->data['email'];
    $password = Flight::request()->data['password'];
  
    $userServices = new UserServices();
    $result = $userServices->loginUser($email, $password);
  
    if (is_array($result)) {
        Flight::json($result, 200);
    } else {
        Flight::json(array('message' => $result), 401);
    }
});

Flight::route('POST /edit_user/@id', function($id){
    $firstName = Flight::request()->data['firstName'];
    $lastName = Flight::request()->data['lastName'];
    $email = Flight::request()->data['email'];
    $password = Flight::request()->data['password'];

    $userServices = new UserServices();
    $message = $userServices->editUser($id, $firstName, $lastName, $email, $password);

    Flight::json(array('message' => $message), 200);
});

Flight::route('GET /get_user/@id', function($id){
    $userServices = new UserServices();
    $user = $userServices->getUser($id);

    Flight::json($user, 200);
});

?>
