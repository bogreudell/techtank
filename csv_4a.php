<?php
	session_start();
	$string1 = "";
  	$string2 = "";
  

	$fp = fopen($_SESSION['user'] . '.csv', 'a') or die("Can't create " . $_SESSION['user'] . ".csv file");
	/*foreach ($_POST as $key => $value) {
		if (strcmp($value[0], "Completely") == 0) { $val1="1"; $val2="0";}
		else if (strcmp($value[0], "Mostly") == 0) { $val1="0.67" $val2="0";}
		else if (strcmp($value[0], "Somewhat") == 0) { $val1="0.33"; $val2="0";}
		else if (strcmp($value[0], "Neither") == 0) { $val1="0"; $val2="0";}
		else if (strcmp($value[0], "nSomewhat") == 0) { $val1="0"; $val2="0.33";}
    else if (strcmp($value[0], "nMostly") == 0) { $val1="0"; $val2="0.67";}
    else if (strcmp($value[0], "nCompletely") == 0) { $val1="0"; $val2="1";}
		$string1 = $string1 . $val1 . ",";
    $string2 = $string2 . $val2 . ",";
	}

	$string = substr($string, 0, -1);
	fwrite($fp, $string1) or die("Can't write to " . $_SESSION['user'] . ".csv file.");
  fwrite($fp, "\r\n");
  fwrite($fp, $string2) or die("Can't write to " . $_SESSION['user'] . ".csv file.");
	fwrite($fp, "\r\n");
	fclose($fp);*/

	header("Location: screen_4b.php");
?>
