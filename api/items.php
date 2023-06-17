<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once "./generated/class/DAOFactory.php";
require_once "./generated/class/include_dao.php";

$response['data'] = '';
$response['error'] = '';
try {
    $factory = new DAOFactory();
    $itemsDao = $factory->getConsumptionDAO();
    $locations = $itemsDao->queryAll();
    $response['data'] = $locations;
    echo json_encode($response['data']);
    die();
} catch (Exception $e) {
    $response['error'] = 'Error' . $e;
    echo json_encode($response);
}
