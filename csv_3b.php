<?php
	session_start();
	$string = "";

	$fp = fopen($_SESSION['user'] . '.csv', 'a') or die("Can't create " . $_SESSION['user'] . ".csv file");
  	$hours = $_POST['times'];
	foreach ($hours as $value)
		$string = $string . $value . ",";

	$string = substr($string, 0, -1); // backspace one character (the trailing comma)
	fwrite($fp, $string) or die("Can't write to " . $_SESSION['user'] . ".csv file.");
	fwrite($fp, "\r\n");
	fclose($fp);

  //echo json_encode($_SESSION['user'].'.csv');

	header("Location: screen_3c.php");
?>
