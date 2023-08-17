<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once "./generated/class/DAOFactory.php";
require_once "./generated/class/include_dao.php";

$jsonData = json_decode(file_get_contents('php://input'));
$response['data'] = '';
$response['error'] = '';
try {

    if (isset($jsonData->id)) {
        $factory = new DAOFactory();
        $itemsDao = $factory->getConsumptionDAO();
        // insert new
        $itemsDao->delete($jsonData->id);
        $locations = $itemsDao->queryAll();
        $response['data'] = $locations;
        echo json_encode($response['data']);
        die();
    }

    $response['error'] = 'Invalid arguments';
    echo json_encode($response);
} catch (Exception $e) {
    $response['error'] = 'Error' . $e;
    echo json_encode($response);
}
