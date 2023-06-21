<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit;
}

require_once 'vendor/autoload.php';
require_once 'Config.class.php';

require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/ContactRoutes.php';
require_once __DIR__.'/routes/EventRoutes.php';

Flight::start();

?>
