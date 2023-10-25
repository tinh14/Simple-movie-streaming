<?php
	require_once("PersonDAL.php");

	class AdminDAL extends PersonDAL{
		
		public static function getAllMovies(){
			$sql = "select * from _movie";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function checkMovie($movieId){
			$sql = "select id from _movie where id = '$movieId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		public static function insertMovie($movie, $countryId, $movieActors, $movieGenres){
			$sql = "insert into _movie values (?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ississss", $movie->id, $movie->name, $movie->anotherName, $movie->releaseYear, $movie->description, $movie->avatar, $movie->trailer, $movie->video);
			$stmt->execute();

			$sql = "insert into _movie_country values(?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ii", $movie->id, $countryId);
			$stmt->execute();

			foreach ($movieActors as $movieActor){
				AdminDAL::insertMovieActor($movieActor);
			}
			
			foreach ($movieGenres as $movieGenre){
				AdminDAL::insertMovieGenre($movieGenre);
			}

			return true;
		}

		public static function updateMovie($movieInfo){
			$sql = "update _movie set name = ?, anotherName = ?, releaseYear = ?, description = ?, avatar = ?, trailer = ?, video = ? where id = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ssissssi", $movieInfo->name, $movieInfo->anotherName, $movieInfo->releaseYear, $movieInfo->description, $movieInfo->avatar, $movieInfo->trailer, $movieInfo->video, $movieInfo->id);
			$stmt->execute();
			return true;
		}

		public static function deleteMovie($movieId){
			$sql = "delete from _watchlist where movieId = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);
 
			$sql = "delete from _movie_actor where movieId = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);

			$sql = "delete from _movie_genre where movieId = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);

			$sql = "delete from _movie_country where movieId = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);

			$sql = "delete from _evaluation where movieId = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);
			
			$sql = "delete from _movie where id = " . $movieId;
			$stmt = DatabaseConnection::$connection->query($sql);
			return true;
		}

		// Update movie actor

		public static function insertMovieActor($movieActor){
			$sql = "insert into _movie_actor values (?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ii", $movieActor->movieId, $movieActor->actorId);
			$stmt->execute();
			return true;
		}

		// Update movie actor

		public static function deleteMovieActor($movieActor){
			$sql = "delete from _movie_actor where movieId = ? and actorId = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ii", $movieActor->movieId, $movieActor->actorId);
			$stmt->execute();
			return true;
		}

		// Update movie genre

		public static function insertMovieGenre($movieGenre){
			$sql = "insert into _movie_genre values (?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ii", $movieGenre->movieId, $movieGenre->genreId);
			$stmt->execute();
			return true;
		}

		// Update movie genre

		public static function deleteMovieGenre($movieGenre){
			$sql = "delete from _movie_genre where movieId = ? and genreId = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("ii", $movieGenre->movieId, $movieGenre->genreId);
			$stmt->execute();
			return true;
		}

		public static function checkActor($actorId){
			$sql = "select id from _actor where id = '$actorId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		public static function getAllActors(){
			$sql = "select * from _actor";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}
			$actors = array();
			while ($actor = $res->fetch_object()){
				array_push($actors, $actor);
			}
			return $actors;
		}

		public static function insertActor($actor){
			$sql = "insert into _actor values(?, ?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("iss", $actor->id, $actor->name, $actor->avatar);
			$stmt->execute();
			return true;
		}

		public static function deleteActor($actorId){
			$sql = "delete from _actor where id = '$actorId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			return true;
		}

		public static function checkGenre($genreId){
			$sql = "select id from _genre where id = '$genreId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		public static function getAllGenres(){
			$sql = "select * from _genre";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}
			$genres = array();
			while ($genre = $res->fetch_object()){
				array_push($genres, $genre);
			}
			return $genres;
		}

		public static function insertGenre($genre){
			$sql = "insert into _genre values(?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("is", $genre->id, $genre->name);
			$stmt->execute();
			return true;
		}

		public static function deleteGenre($genreId){
			$sql = "delete from _actor where id = '$genreId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			return true;
		}

		public static function checkCountry($countryId){
			$sql = "select id from _country where id = '$countryId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			return $res->num_rows != 0;
		}

		public static function getAllCountries(){
			$sql = "select * from _country";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}
			$countries = array();
			while ($country = $res->fetch_object()){
				array_push($countries, $country);
			}
			return $countries;
		}

		public static function insertCountry($country){
			$sql = "insert into _country values(?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("is", $country->id, $country->name);
			$stmt->execute();
			return true;
		}

		public static function deleteCountry($countryId){
			$sql = "delete from _country where id = '$countryId'";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			return true;
		}

		public static function getAllUsers(){
			$sql = "select * from _user";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}
			$users = array();
			while ($user = $res->fetch_object()){
				array_push($users, $user);
			}
			return $users;
		}

		public static function deleteUser($username){
			$sql = "delete from _user where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("s", $username);
			$stmt->execute();

			$sql = "delete from _account where username = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("s", $username);
			$stmt->execute();
			return true;
		}
	}
?>