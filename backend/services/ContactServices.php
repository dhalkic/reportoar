<?php

require_once './dao/ContactDao.php';

class ContactServices {
    private $contactDao;

    public function __construct() {
        $this->contactDao = new ContactDao();
    }

    public function saveContact($name, $email, $number, $subject) {
        $message = $this->contactDao->saveContact($name, $email, $number, $subject);
        return $message;
    }
}

?>
