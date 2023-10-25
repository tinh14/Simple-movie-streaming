<?php
	class DatabaseConnection {
		public static $host, $user, $password, $database;
		public static $connection;

		public function __construct(){
			if (!self::$connection){
				$path = __DIR__ . "/db_info.json";
				$json = json_decode(file_get_contents($path));
				self::$host = $json->host;
				self::$user = $json->user;
				self::$password = $json->password;
				self::$database = $json->database;
				self::$connection = new mysqli(self::$host, self::$user, self::$password, self::$database);
				if (!self::$connection){
					die("Connect failed " . self::$connection->connect_error);
				}
			}
		}
	}
	new DatabaseConnection();
?>