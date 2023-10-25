<?php
	require_once("PersonDAL.php");

	class UserDAL extends PersonDAL {

		public static function getFirst18MoviesById(){
			$sql = "select * from _movie order by id limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6MoviesById($offset){
			$sql = "select * from _movie order by id limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function getFirst18MoviesByName($name){
			$sql = "select * from _movie where name like '%$name%' order by name limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6MoviesByName($name, $offset){
			$sql = "select * from _movie where name like '%$name%' order by name limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function getFirst18MoviesByActor($actor){
			$sql = "select * from _movie where id in (select movieId from _movie_actor where actorId in (select id from _actor where name like '%$actor%')) order by name limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6MoviesByActor($actor, $offset){
			$sql = "select * from _movie where id in (select movieId from _movie_actor where actorId in (select id from _actor where name like '%$actor%')) order by name limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function getFirst18MoviesByGenre($genre){
			$sql = "select * from _movie where id in (select movieId from _movie_genre where genreId in (select id from _genre where name like '%$genre%')) order by name limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6MoviesByGenre($genre, $offset){
			$sql = "select * from _movie where id in (select movieId from _movie_genre where genreId in (select id from _genre where name like '%$genre%')) order by name limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function getFirst18MoviesByCountry($country){
			$sql = "select * from _movie where id in (select movieId from _movie_country where countryId in (select id from _country where name like '%$country%')) order by name limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6MoviesByCountry($country, $offset){
			$sql = "select * from _movie where id in (select movieId from _movie_country where countryId in (select id from _country where name like '%$country%')) order by name limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function addToWatchlist($watchlist){
			$sql = "insert into _watchlist values (?, ?)";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("si", $watchlist->username, $watchlist->movieId);
			$stmt->execute();
			return true;
		}

		public static function removeFromWatchlist($watchlist){
			$sql = "delete from _watchlist where username = ? and movieId = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("si", $watchlist->username, $watchlist->movieId);
			$stmt->execute();
			return true;
		}

		// Return Watchlist object
		public static function getFirst18Watchlist($username){
			$sql = "select * from _movie where id in (select movieId from _watchlist where username = '$username') order by name limit 18";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->execute();
			$res = $stmt->get_result();
			if ($res->num_rows == 0){
				return null;
			}

			$allMovies = array();
			$cnt = 0;
			$movie = "@";

			while ($movie != null){
				$movies = array();
				while ($movie = $res->fetch_object()){
					$cnt++;
					array_push($movies, $movie);
					if ($cnt % 6 == 0){
						break;
					}
				}
				if ($movies != null){
					array_push($allMovies, $movies);
				}
			}
			return $allMovies;
		}

		public static function getNext6Watchlist($username, $offset){
			$sql = "select * from _movie where id in (select movieId from _watchlist where username = '$username') order by name limit 6 offset ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $offset);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			$movies = array();
			while ($movie = $res->fetch_object()){
				array_push($movies, $movie);
			}
			return $movies;
		}

		public static function evaluate($evaluation){
			if (!UserDAL::getEvaluation($evaluation->username, $evaluation->movieId)){
				$sql = "insert into _evaluation values (?, ?, ?)";
				$stmt = DatabaseConnection::$connection->prepare($sql);
				$stmt->bind_param("ssi", $evaluation->username, $evaluation->movieId, $evaluation->score);
				$stmt->execute();
			}else {
				$sql = "update _evaluation set score = ? where username = ? and movieId = ?";
				$stmt = DatabaseConnection::$connection->prepare($sql);
				$stmt->bind_param("isi", $evaluation->score, $evaluation->username, $evaluation->movieId);
				$stmt->execute();
			}
			return true;
		}

		// Return score from Evaluation object
		public static function getEvaluation($username, $movieId){
			$sql = "select score from _evaluation where username = ? and movieId = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("si", $username, $movieId);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			return $res->fetch_object();
		}

		public static function getAvgEvaluation($movieId){
			$sql = "select AVG(score) as evaluation from _evaluation where movieId = ?";
			$stmt = DatabaseConnection::$connection->prepare($sql);
			$stmt->bind_param("i", $movieId);
			$stmt->execute();
			$res = $stmt->get_result();
			if (!$res){
				return null;
			}
			return $res->fetch_object();
		}
	}
?>