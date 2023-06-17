<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2023-06-12 23:23
 */
interface ConsumptionDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Consumption 
	 */
	public function load($id);

	/**
	 * Get all records from table
	 */
	public function queryAll();
	
	/**
	 * Get all records from table ordered by field
	 * @Param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn);
	
	/**
 	 * Delete record from table
 	 * @param consumption primary key
 	 */
	public function delete($id);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Consumption consumption
 	 */
	public function insert($consumption);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Consumption consumption
 	 */
	public function update($consumption);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByPrice($value, $single);

	public function queryByDate($value, $single);

	public function queryByAmount($value, $single);

	public function queryByTachometer($value, $single);


	public function deleteByPrice($value);

	public function deleteByDate($value);

	public function deleteByAmount($value);

	public function deleteByTachometer($value);


}
?>