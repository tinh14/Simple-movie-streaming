<?php
	$func = $_REQUEST["func"];
	if (!isset($func)){
		return;
	}
	require_once("BLL/AdminBLL.php");
	header("Content-Type: application/json");
	$data = json_decode(file_get_contents("php://input"));
	switch ($func){
		case "getAllMovies":
			echo json_encode(AdminBLL::getAllMovies());
			break;
		case "getAllActors":
			echo json_encode(AdminBLL::getAllActors());
			break;
		case "getAllGenres":
			echo json_encode(AdminBLL::getAllGenres());
			break;
		case "getAllCountries":
			echo json_encode(AdminBLL::getAllCountries());
			break;
		case "insertMovie":
			$movie = $data->movie;
			$countryId = $data->countryId;
			$movieActors = $data->movieActors;
			$movieGenres = $data->movieGenres;
			echo json_encode(AdminBLL::insertMovie($movie, $countryId, $movieActors, $movieGenres));
			break;
	}
?>