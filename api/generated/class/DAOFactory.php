<?php

/**
 * DAOFactory
 * @author: http://phpdao.com
 * @date: ${date}
 */
class DAOFactory{

   public function __construct(){
        define('DB_HOST', 'localhost');
        define('DB_NAME', 'davidtomas');
        define('DB_USER', 'davidtomas');
        define('DB_PASS', 'quadienT2020');
    }

	
	/**
	 * @return ConsumptionMySqlExtDAO
	 */
	public function getConsumptionDAO(){
		return new ConsumptionMySqlExtDAO();
	}


}
?>