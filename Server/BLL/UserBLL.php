<?php
	require_once("PersonBLL.php");
	require_once(dirname(__DIR__, 1) . "/DAL/UserDAL.php");

	class UserBLL extends PersonBLL {

		public static function register($account, $user){
			return parent::addUser($account, $user);
		}

		public static function updateInformation($user){
			return parent::changeUserInfor($user);
		}

		private static function get18ImagesVideos($movieArr){
			foreach($movieArr as &$movies){
				foreach($movies as &$movie){
					$path = dirname(__DIR__) . "/Assets/Images/Movies/" . $movie->id . "." . $movie->avatar;
					if (file_exists($path)){
						$file = file_get_contents($path);
						$base64_string = "data:image/" . $movie->avatar . ";base64," . base64_encode($file);
						$movie->avatar = $base64_string;
					}

					$path = dirname(__DIR__) . "/Assets/Videos/" . $movie->id . "." . $movie->video;
					if (file_exists($path)){
						$file = file_get_contents($path);
						$base64_string = "data:video/" . $movie->video . ";base64," . base64_encode($file);
						$movie->video = $base64_string;
					}
				}
			}
			return $movieArr;
		}

		private static function get6Images($movies){
			foreach ($movies as &$movie){
				$path = dirname(__DIR__) . "/Assets/Images/Movies/" . $movie->id . "." . $movie->avatar;
				if (file_exists($path)){
					$file = file_get_contents($path);
					$base64_string = "data:image/" . $movie->avatar . ";base64," . base64_encode($file);
					$movie->avatar = $base64_string;
				}

				$path = dirname(__DIR__) . "/Assets/Videos/" . $movie->id . "." . $movie->video;
				if (file_exists($path)){
					$file = file_get_contents($path);
					$base64_string = "data:video/" . $movie->video . ";base64," . base64_encode($file);
					$movie->video = $base64_string;
				}
			}
			return $movies;
		}

		public static function getFirst18MoviesById(){
			$movieArr = UserDAL::getFirst18MoviesById();
			return UserBLL::get18ImagesVideos($movieArr);
		}

		public static function getNext6MoviesById($offset){
			$movies = UserDAL::getNext6MoviesById($offset);
			return UserBLL::get6Images($movies);
		}

		public static function getFirst18MoviesByName($name){
			$moviesArr = UserDAL::getFirst18MoviesByName($name);
			return UserBLL::get18ImagesVideos($moviesArr);
		}

		public static function getNext6MoviesByName($name, $offset){
			$movies = UserDAL::getNext6MoviesByName($name, $offset);
			return UserBLL::get6Images($movies);
		}

		public static function getFirs18MoviesByActor($actor){
			$moviesArr = UserDAL::getFirs18MoviesByActor($actor);
			return UserBLL::get18ImagesVideos($moviesArr);
		}

		public static function getNext6MoviesByActor($actor, $offset){
			$movies = UserDAL::getNext6MoviesByActor($actor, $offset);
			return UserBLL::get6Images($movies);
		}

		public static function getFirst18MoviesByGenre($genre){
			$moviesArr = UserDAL::getFirst18MoviesByGenre($genre);
			return UserBLL::get18ImagesVideos($moviesArr);
		}

		public static function getNext6MoviesByGenre($genre, $offset){
			$movies = UserDAL::getNext6MoviesByGenre($genre, $offset);
			return UserBLL::get6Images($movies);
		}

		public static function getFirst18MoviesByCountry($country){
			$moviesArr = UserDAL::getFirst18MoviesByCountry($country);
			return UserBLL::get18ImagesVideos($moviesArr);
		}

		public static function getNext6MoviesByCountry($country, $offset){
			$movies = UserDAL::getNext6MoviesByCountry($country, $offset);
			return UserBLL::get6Images($movies);
		}

		public static function addToWatchlist($watchlist){
			return UserDAL::addToWatchList($watchlist);
		}

		public static function removeFromWatchlist($watchlist){
			return UserDAL::removeFromWatchlist($watchlist);
		}

		public static function getFirst18Watchlist($username){
			$moviesArr = UserDAL::getFirst18Watchlist($username);
			return UserBLL::get18ImagesVideos($moviesArr);
		}

		public static function getNext6Watchlist($username, $offset){
			$movies = UserDAL::getNext6Watchlist($username, $offset);
			return UserBLL::get6Images($movies);
		}

		public static function getMovieDetails($movieId){
			$evaluation = UserDAL::getAvgEvaluation($movieId);
			if ($evaluation){
				$evaluation->evaluation = round($evaluation->evaluation, 1);
			}
			$genre = UserDAL::getMovieGenre($movieId);
			$country = UserDAL::getCountry($movieId);
			$actors = UserDAL::getMovieActor($movieId);
			
			foreach ($actors as &$actor){
				$path = dirname(__DIR__) . "/Assets/Images/Actors/" . $actor->id . "." . $actor->avatar;

				if (file_exists($path)){
					$file = file_get_contents($path);
					$base64_string = "data:image/" . $actor->avatar . ";base64," . base64_encode($file);
					$actor->avatar = $base64_string;
				}
			}

			$details = array(
				"evaluation" => $evaluation,
				"genre" => $genre,
				"country" => $country,
				"actor" => $actors
			);

			return $details;
		}

		public static function evaluate($evaluation){
			return UserDAL::evaluate($evaluation);
		}

		public static function getEvaluation($username, $movieId){
			return UserDAL::getEvaluation($username, $movieId);
		}

	}
?>