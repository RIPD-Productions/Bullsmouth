<?php

include "dbConnection.php";
include "dotEnv.php";

(new dotEnv(__DIR__. DIRECTORY_SEPARATOR . ".env"))->load();

$host = getenv("DB_HOST");
$database = getenv("DB_DATABASE");
$user = getenv("DB_USERNAME");
$password = getenv("DB_PASSWORD");

$connect = new dbConnection($host, $database, $user, $password, $charset = NULL);

$query = $connect->connect()->query("SELECT name, score FROM highscores ORDER BY score DESC LIMIT 20");

$highscores = $query->fetchAll();

$highscoreArray = [];

foreach ($highscores as $highscore){
	$highscoreArray[] = [
		'name' => $highscore["name"],
		'score' => $highscore["score"]
	];
}

header("Content-Type: application/json");
echo json_encode($highscoreArray);