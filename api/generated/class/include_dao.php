<?php
	//include all DAO files
	require_once('sql/Connection.class.php');
	require_once('sql/ConnectionFactory.class.php');
	require_once('sql/ConnectionProperty.class.php');
	require_once('sql/QueryExecutor.class.php');
	require_once('sql/Transaction.class.php');
	require_once('sql/SqlQuery.class.php');
	require_once('core/ArrayList.class.php');
	require_once('DAOFactory.php');

 	
	require_once('dao/ConsumptionDAO.class.php');
	require_once('dto/Consumption.class.php');
	require_once('mysql/ConsumptionMySqlDAO.class.php');
	require_once('mysql/ext/ConsumptionMySqlExtDAO.class.php');

?>