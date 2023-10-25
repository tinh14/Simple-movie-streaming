<?php
	require_once("DatabaseConnection.php");
	class PersonDAL {

		public static function existAccount($username){
			$sql = "select username from _account where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("s", $username);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		// Return true or false
		public static function checkAccount($account){
			$sql = "select username from _account where username = ? and pwd = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ss", $account->username, $account->pwd);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		// Return Admin or User object
		public static function login($account){
			// Neu account cua admin
			$sql = "select * from _admin where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("s", $account->username);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows){
				$obj = $res->fetch_object();
				return $obj;
			}

			// Neu account cua user
			$sql = "select * from _user where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("s", $account->username);
			$stmt->execute();
			$res = $stmt->get_result();
			$obj = $res->fetch_object();
			return $obj;
		}

		public static function addUser($account, $user){
			$sql = "insert into _account values (?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ss", $account->username, $account->pwd);
			$stmt->execute();
			
			$sql = "insert into _user values (?, ?, ?, ?, ?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("sssssi", $user->username, $user->firstname, $user->lastname, $user->email, $user->avatar, $user->active);
			$stmt->execute();
			return true;
		}

		public static function changeUserInfor($user){
			$sql = "update _user set firstname = ?, lastname = ?, email = ?, avatar = ?, active = ? where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ssssis", $user->firstname, $user->lastname, $user->email, $user->avatar, $user->active, $user->username);
			$stmt->execute();
			return true;
		}

		public static function changeUserPassword($account){
			$sql = "update _account set pwd = ? where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ss", $account->pwd, $account->username);
			$stmt->execute();
			return true;
		}

		public static function getMovieGenre($movieId){
			$sql = "select * from _genre where id in (select genreId from _movie_genre where movieId = ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $movieId);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res == null){
				return null;
			}
			$genres = array();
			while ($genre = $res->fetch_object()){
				array_push($genres, $genre);
			}
			return $genres;
		}

		public static function getCountry($movieId){
			$sql = "select * from _country where id = (select countryId from _movie_country where movieId = ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $movieId);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			return $res->fetch_object();
		}

		public static function getMovieActor($movieId){
			$sql = "select * from _actor where id in (select actorId from _movie_actor where movieId = ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $movieId);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res == null){
				return null;
			}
			$actors = array();
			while ($actor = $res->fetch_object()){
				array_push($actors, $actor);
			}
			return $actors;
		}
	}
?>