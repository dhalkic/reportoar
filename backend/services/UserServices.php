<?php

require_once './dao/UserDao.php';

class UserServices {
    private $registrationDao;

    public function __construct() {
        $this->registrationDao = new UserDao();
    }

    public function registerUser($firstName, $lastName, $email, $password) {
        $message = $this->registrationDao->registerUser($firstName, $lastName, $email, $password);
        return $message;
    }

    public function loginUser($email, $password) {
        $result = $this->registrationDao->loginUser($email, $password);
        return $result;
    }

    public function editUser($userId, $firstName, $lastName, $email, $password) {
        $message = $this->registrationDao->updateUser($userId, $firstName, $lastName, $email, $password);
        return $message;
    }

    public function getUser($userId) {
        $user = $this->registrationDao->getUser($userId);
        return $user;
    }
}

?>
