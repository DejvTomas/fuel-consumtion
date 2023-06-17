<?php
/**
 * Class that operate on table 'Consumption'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2023-06-12 23:23
 */
class ConsumptionMySqlDAO implements ConsumptionDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return Consumption
	 */
	public function load($id){
		$sql = 'SELECT * FROM Consumption WHERE id = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id);
		return $this->getRow($sqlQuery);
	}

	/**
	 * Get all records from table
	 */
	public function queryAll(){
		$sql = 'SELECT * FROM Consumption';
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
	 * Get all records from table ordered by field
	 *
	 * @param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn){
		$sql = 'SELECT * FROM Consumption ORDER BY '.$orderColumn;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
 	 * Delete record from table
 	 * @param consumption primary key
 	 */
	public function delete($id){
		$sql = 'DELETE FROM Consumption WHERE id = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($id);
		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Consumption consumption
 	 */
	public function insert($consumption){
		$sql = 'INSERT INTO Consumption (Price, Date, Amount, Tachometer) VALUES (?, ?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($consumption->price);
		$sqlQuery->set($consumption->date);
		$sqlQuery->set($consumption->amount);
		$sqlQuery->set($consumption->tachometer);

		$id = $this->executeInsert($sqlQuery);	
		$consumption->id = $id;
		return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param Consumption consumption
 	 */
	public function update($consumption){
		$sql = 'UPDATE Consumption SET Price = ?, Date = ?, Amount = ?, Tachometer = ? WHERE id = ?';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($consumption->price);
		$sqlQuery->set($consumption->date);
		$sqlQuery->set($consumption->amount);
		$sqlQuery->set($consumption->tachometer);

		$sqlQuery->setNumber($consumption->id);
		return $this->executeUpdate($sqlQuery);
	}

	/**
 	 * Delete all rows
 	 */
	public function clean(){
		$sql = 'DELETE FROM Consumption';
		$sqlQuery = new SqlQuery($sql);
		return $this->executeUpdate($sqlQuery);
	}

	public function queryById($value, $single = false){
		$sql = 'SELECT * FROM Consumption WHERE id = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		if ($single === true)
			return $this->getRow($sqlQuery);
		else
			return $this->getList($sqlQuery);
	}

	public function queryByPrice($value, $single = false){
		$sql = 'SELECT * FROM Consumption WHERE Price = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		if ($single === true)
			return $this->getRow($sqlQuery);
		else
		return $this->getList($sqlQuery);
	}

	public function queryByDate($value, $single = false){
		$sql = 'SELECT * FROM Consumption WHERE Date = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		if ($single === true)
			return $this->getRow($sqlQuery);
		else
		return $this->getList($sqlQuery);
	}

	public function queryByAmount($value, $single = false){
		$sql = 'SELECT * FROM Consumption WHERE Amount = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		if ($single === true)
			return $this->getRow($sqlQuery);
		else
		return $this->getList($sqlQuery);
	}

	public function queryByTachometer($value, $single = false){
		$sql = 'SELECT * FROM Consumption WHERE Tachometer = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		if ($single === true)
			return $this->getRow($sqlQuery);
		else
		return $this->getList($sqlQuery);
	}


	public function deleteById($value){
		$sql = 'DELETE FROM Consumption WHERE id = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByPrice($value){
		$sql = 'DELETE FROM Consumption WHERE Price = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByDate($value){
		$sql = 'DELETE FROM Consumption WHERE Date = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByAmount($value){
		$sql = 'DELETE FROM Consumption WHERE Amount = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByTachometer($value){
		$sql = 'DELETE FROM Consumption WHERE Tachometer = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}


			
	/**
	 * Get number of rows
	 */
	 public function numRows($where=false) {
		$sql = 'SELECT COUNT(*) as total from Consumption';
		
		if ($where !== false){
			$sql.=' where ';
			$whereArr = array();
			foreach($where as $clause => $val) {
				$whereArr[] = $clause.'=\''.$val.'\'';
			}
			$sql.=' where '.implode(',',$whereArr);
		}
		$sqlQuery = new SqlQuery($sql);
		return $this->querySingleResult($sqlQuery);
	 }
	
	/**
	 * Read row
	 *
	 * @return Consumption
	 */
	protected function readRow($row){
		$consumption = new Consumption();
		
		$consumption->id = $row['id'];
		$consumption->price = $row['Price'];
		$consumption->date = $row['Date'];
		$consumption->amount = $row['Amount'];
		$consumption->tachometer = $row['Tachometer'];

		return $consumption;
	}
	
	protected function getList($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);
		$ret = array();
		for($i=0;$i<count($tab);$i++){
			$ret[$i] = $this->readRow($tab[$i]);
		}
		return $ret;
	}
	
	/**
	 * Get row
	 *
	 * @return Consumption
	 */
	protected function getRow($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);

		if(count($tab)==0){
			return null;
		}
		return $this->readRow($tab[0]);		
	}
	
	/**
	 * Execute sql query
	 */
	protected function execute($sqlQuery){
		return QueryExecutor::execute($sqlQuery);
	}
	
		
	/**
	 * Execute sql query
	 */
	protected function executeUpdate($sqlQuery){
		return QueryExecutor::executeUpdate($sqlQuery);
	}

	/**
	 * Query for one row and one column
	 */
	protected function querySingleResult($sqlQuery){
		return QueryExecutor::queryForString($sqlQuery);
	}

	/**
	 * Insert row to table
	 */
	protected function executeInsert($sqlQuery){
		return QueryExecutor::executeInsert($sqlQuery);
	}
}
?>