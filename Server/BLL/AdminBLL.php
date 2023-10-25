<?php
	require_once("PersonBLL.php");
	require_once(dirname(__DIR__, 1) . "/DAL/AdminDAL.php");

	class AdminBLL extends PersonBLL{
		
		public static function getAllMovies(){
			$movies = AdminDAL::getAllMovies();

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

				$movie->actors = AdminDAL::getMovieActor($movie->id);

				foreach ($movie->actors as &$actor){
					$path = dirname(__DIR__) . "/Assets/Images/Actors/" . $actor->id . "." . $actor->avatar;
					if (file_exists($path)){
						$file = file_get_contents($path);
						$base64_string = "data:image/" . $actor->avatar . ";base64," . base64_encode($file);
						$actor->avatar = $base64_string;
					}
				}

				$movie->genres = AdminDAL::getMovieGenre($movie->id);
				$movie->country = AdminDAL::getCountry($movie->id);
			}

			return $movies;
		}

		public static function insertMovie($movie, $countryId, $movieActors, $movieGenres){
			if (AdminDAL::checkMovie($movie->id)){
				return "Phim đã tồn tại";
			}
			$type = explode("/", explode(";", $movie->avatar)[0])[1];
			$path = dirname(__DIR__) . "/Assets/Images/Movies/" . $movie->id . "." . $type;
			$file = file_get_contents($movie->avatar);
			file_put_contents($path, $file);
			$movie->avatar = $type;

			$type = explode("/", explode(";", $movie->video)[0])[1];
			$path = dirname(__DIR__) . "/Assets/Videos/" . $movie->id . "." . $type;
			$file = file_get_contents($movie->video);
			file_put_contents($path, $file);
			$movie->video = $type;

			return AdminDAL::insertMovie($movie, $countryId, $movieActors, $movieGenres);
		}

		public static function updateMovieInfo($movieInfo){
			return AdminDAL::updateMovie($movieInfo);
		}

		public static function updateMovieAvatar($movieInfo, $movieAvatar){
			$ext = explode("/", explode(";", $movieAvatar)[0])[1];
			$path = dirname(__DIR__) . "Assets/Images/Movies/" . $movieInfo->id . "." . $ext;
			if (file_exists($path)){
				unlink($path);
			}
			$file = file_get_contents($movieAvatar);
			file_put_contents($path, $file);
			return AdminBLL::updateMovieInfo($movieInfo);
		}

		public static function updateMovieVideo($movieInfo, $movieVideo){
			$ext = explode("/", explode(";", $movieVideo)[0])[1];
			$path = dirname(__DIR__) . "Assets/Videos/" . $movieInfo->id . "." . $ext;
			if (file_exists($path)){
				unlink($path);
			}
			$file = file_get_contents($movieVideo);
			file_put_contents($path, $file);
			return AdminBLL::updateMovieInfo($movieInfo);
		}

		public static function deleteMovie($movieId, $movieAvatar, $movieVideo){
			$path = dirname(__DIR__) . "Assets/Images/Movies" . $movieId . "." . $movieAvatar;
			if (file_exists($path)){
				unlink($path);
			}

			$path = dirname(__DIR__) . "Assets/Videos/" . $movieId . "." . $movieVideo;
			if (file_exists($path)){
				unlink($path);
			}
			return AdminDAL::deleteMovie($movieId);
		}

		public static function insertMovieActor($movieActor){
			return AdminDAL::insertMovieActor($movieActor);
		}

		public static function deleteMovieActor($movieActor){
			return AdminDAL::deleteMovieActor($movieActor);
		}

		public static function insertMovieGenre($movieGenre){
			return AdminDAL::insertMovieGenre($movieGenre);
		}

		public static function deleteMovieGenre($movieGenre){
			return AdminDAL::deleteMovieGenre($movieGenre);
		}

		public static function getAllActors(){
			return AdminDAL::getAllActors();
		}

		public static function insertActor($actor){
			if (AdminDAL::checkActor($actor->id)){
				return "Diễn viên đã tồn tại";
			}
			$ext = explode("/", explode(";", $movieVideo)[0])[1];
			$path = dirname(__DIR__) . "Assets/Images/Actors/" . $actor->id . "." . $ext;
			$file = file_get_contents($actor->avatar);
			file_put_contents($path, $file);
			return AdminDAL::insertActor($actor);
		}

		public static function updateActorInfo($actorInfo){
			return AdminDAL::updateActorInfo($actorInfo);
		}

		public static function updateActorAvatar($actorInfo, $avatar){
			$path = dirname(__DIR__) . "Assets/Images/Actors/" . $actorInfo->id . "." . $actor->avatar;
			if (file_exists($path)){
				unlink($path);
			}
			$file = file_get_contents($movie->avatar);
			file_put_contents($path, $file);
			return AdminBLL::updateActorInfo($actorInfo);
		}

		public static function deleteActor($actorId, $actorAvatar){
			$path = dirname(__DIR__) . "Assets/Images/Actors" . $actorId . "." . $actorAvatar;
			if (file_exists($path)){
				unlink($path);
			}
			return AdminDAL::deleteActor($actorId);
		}

		public static function getAllGenres(){
			return AdminDAL::getAllGenres();
		}

		public static function insertGenre($genre){
			if (AdminDAL::checkGenre($genre)){
				return "Thể loại này đã tồn tại";
			}
			return AdminDAL::insertGenre($genre);
		}

		public static function deleteGenre($genreId){
			return AdminDAL::deleteGenre($genreId);
		}

		public static function getAllCountries(){
			return AdminDAL::getAllCountries();
		}

		public static function insertCountry($country){
			if (AdminDAL::checkCountry($country)){
				return "Quốc gia này đã tồn tại";
			}
			return AdminDAL::insertCountry($country);
		}

		public static function deleteCountry($countryId){
			return AdminDAL::deleteCountry($countryId);
		}

		public static function getAllUsers(){
			return AdminDAL::getAllUsers();
		}

		public static function deleteUser($username){
			return AdminDAL::deleteUser($username);
		}


	}
?>