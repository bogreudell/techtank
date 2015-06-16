<?php
	session_start();
	$name = $_POST["username"];
	$_SESSION['user'] = $name;

	$fp = fopen($name . '.csv', 'a') or die("Can't create " . $_SESSION['user'] . ".csv file");
	fclose($fp);

	header("Location: screen_2a.php");
?>
