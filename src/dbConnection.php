<?php

class dbConnection{

	public $host;
	public $database;
	public $user;
	public $password;
	public $charset;
	
	public function __construct($host, $database, $user, $password, $charset)
	{
		$this->host = $host;
		$this->database = $database;
		$this->user = $user;
		$this->password = $password;
		
		if($charset == NULL){
			$this->charset = "utf8mb4";
		} else {
			$this->charset = $charset;
		}
	}
	
	public function connect(): PDO
	{
		
		$dsn = "mysql:host=$this->host;dbname=$this->database;charset=$this->charset";
		$options = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		try {
			$pdo = new PDO($dsn, $this->user, $this->password, $options);
		} catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
		
		return $pdo;
	}
	
}


