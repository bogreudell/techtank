<?php
	session_start();
	$string = "";

	$fp = fopen($_SESSION['user'] . '.csv', 'a') or die("Can't create " . $_SESSION['user'] . ".csv file");
	/*foreach ($_POST as $key => $value) {
		if (strcmp($value[0], "Not at all") == 0) { $val = "0"; }
		else if (strcmp($value[0], "A little") == 0) { $val = "0.25"; }
		else if (strcmp($value[0], "Some") == 0) { $val = "0.5"; }
		else if (strcmp($value[0], "A lot") == 0) { $val = "0.75"; }
		else if (strcmp($value[0], "Completely") == 0) { $val = "1"; }
		$string = $string . $val . ",";
	}

	$string = substr($string, 0, -1);
	fwrite($fp, $string) or die("Can't write to " . $_SESSION['user'] . ".csv file.");
	fwrite($fp, "\r\n");
	fclose($fp);*/

	header("Location: screen_3a.php");
?>
