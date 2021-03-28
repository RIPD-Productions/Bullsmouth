<?php

include 'dbConnection.php';
include "dotEnv.php";

(new dotEnv(__DIR__. DIRECTORY_SEPARATOR . ".env"))->load();

$host = getenv("DB_HOST");
$database = getenv("DB_DATABASE");
$user = getenv("DB_USERNAME");
$password = getenv("DB_PASSWORD");

$connect = new dbConnection($host, $database, $user, $password, $charset = NULL);

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$score =  filter_var($_POST['score'], FILTER_SANITIZE_NUMBER_INT);

$query = $connect->connect()->prepare("INSERT INTO highscores (name, score) VALUES (?,?)");

$query->execute([$name, $score]);
