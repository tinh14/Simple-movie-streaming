<?php
	$func = $_REQUEST["func"];
	if (!isset($func)){
		return;
	}
	require_once("BLL/UserBLL.php");
	header("Content-Type: application/json");
	$data = json_decode(file_get_contents("php://input"));
	switch ($func){
		case "login":
			$account = $data;
			echo json_encode(UserBLL::login($account));
			break;
		case "register":
			$account = $data->account;
			$user = $data->user;
			echo json_encode(UserBLL::register($account, $user));
			break;
		case "getFirst18MoviesById":
			echo json_encode(UserBLL::getFirst18MoviesById());
			break;
		case "getNext6MoviesById":
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6MoviesById($offset));
			break;
		case "getFirst18MoviesByName":
			$name = $data->name;
			echo json_encode(UserBLL::getFirst18MoviesByName($name));
			break;
		case "getNext6MoviesByName":
			$name = $data->name;
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6MoviesByName($name, $offset));
			break;
		case "getFirst18MoviesByActor":
			$actor = $data->name;
			echo json_encode(UserBLL::getFirst18MoviesByActor($actor));
			break;
		case "getNext6MoviesByActor":
			$actor = $data->name;
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6MoviesByActor($actor, $offset));
			break;
		case "getFirst18MoviesByGenre":
			$genre = $data->name;
			echo json_encode(UserBLL::getFirst18MoviesByGenre($genre));
			break;
		case "getNext6MoviesByGenre":
			$genre = $data->name;
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6MoviesByGenre($genre, $offset));
			break;
		case "getFirst18MoviesByCountry":
			$country = $data->name;
			echo json_encode(UserBLL::getFirst18MoviesByCountry($country));
			break;
		case "getNext6MoviesByCountry":
			$country = $data->name;
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6MoviesByCountry($country, $offset));
			break;
		case "getFirst18Watchlist":
			$username = $data->username;
			echo json_encode(UserBLL::getFirst18Watchlist($username));
			break;
		case "getNext6Watchlist":
			$username = $data->username;
			$offset = $data->offset;
			echo json_encode(UserBLL::getNext6Watchlist($username, $offset));
			break;
		case "addToWatchlist":
			$watchlist = $data;
			echo json_encode(UserBLL::addToWatchlist($watchlist));
			break;
		case "removeFromWatchlist":
			$watchlist = $data;
			echo json_encode(UserBLL::removeFromWatchlist($watchlist));
			break;
		case "updateInformation":
			$user = $data;
			echo json_encode(UserBLL::updateInformation($user));
			break;
		case "changeUserPassword":
			$account = $data;
			echo json_encode(UserBLL::changeUserPassword($account));
			break;
		case "getMovieDetails":
			$movieId = $data->movieId;
			echo json_encode(UserBLL::getMovieDetails($movieId));
			break;
		case "getEvaluation":
			$username = $data->username;
			$movieId = $data->movieId;
			echo json_encode(UserBLL::getEvaluation($username, $movieId));
			break;
		case "evaluate":
			$evaluation = $data;
			echo json_encode(UserBLL::evaluate($evaluation));
			break;
	}
?>