<?php
	// Datenbankverbindung herstellen
	function dbconnect() {
		require("config.inc.php");

		// Stelle Verbindung her
		$mysqli = mysqli_connect($server, $user, $passwort, $datenbank);

		if($mysqli) {
			// Ändere Zeichensatz auf UTF-8
			@mysqli_query($mysqli, 'set character set utf8;');

			return $mysqli;
		// Keine Verbindung zur Datenbank möglich
		} else {
			return false;
		}
	}
?>
