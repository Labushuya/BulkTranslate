<?php
	use Stichoza\GoogleTranslate\GoogleTranslate;

	// Debugging: setze Fehlerlevel
	error_reporting(E_ALL);

	// Binde Funktionsdatei ein
  require_once('vendor/autoload.php');
  require_once('functions.inc.php');

	// Führe Programmcode aus, wenn Übergabeparameter gesetzt
	if(isset($_POST)) {
		// Starte Session
		if(session_status() == PHP_SESSION_NONE) {
			session_start();
		}

		## Debugging
		// session_destroy();

		/*
		 * Lege Flag-Session an, um bereits verwendete Proxies
		 * nicht direkt noch einmal zu verwenden
		 */
		 if(!isset($_SESSION['flags'])) {
			 $_SESSION['flags'] = "";
		 }

		// Prüfe, ob alle Parameter korrekt übergeben wurden
		if(
			isset($_POST['text'], $_POST['qSpr'], $_POST['zSpr']) &&
			!empty($_POST['text']) &&
			!empty($_POST['qSpr']) &&
			!empty($_POST['zSpr'])
		) {
			$text = $_POST['text'];
			$qSpr = $_POST['qSpr'];
			$zSpr = $_POST['zSpr'];

			if(is_array($zSpr)) {
				// Anzahl zu übersetzender Sprachen
				$anzahlSprachen = count($zSpr);

				if($anzahlSprachen > 0) {
					// Anzahl Proxies
					$anzahlProxies = count($_SESSION['proxies']);

					// Prüfe zuerst, ob ausreichend Proxies vorhanden sind
					if($anzahlProxies >= floor($anzahlSprachen)) {
						// Prüfe, ob weitere Sprachen übersetzt werden sollen
						if($anzahlSprachen > 0) {
							// Splitte Proxy-Informationen auf (nimm immer ersten Proxy)
							$proxyInfo = explode(':', $_SESSION['proxies'][0]);

							// Lege Informationen fest
							$ip 		= $proxyInfo[0];
							$port 	= $proxyInfo[1];
							$https 	= $proxyInfo[2];
							$typ 		= $proxyInfo[3];

							// Lege Protokoll für Anfrage an Google-Server fest
							if($https == '') {
								$proxyServer = '"http" => "tcp://' . $ip . ':' . $port . '"';
							} elseif($https == 1) {
								$proxyServer = '"https" => "tcp://' . $ip . ':' . $port . '"';
							}

							// Erstelle GoogleTranslate-Objekt
							$tr = new GoogleTranslate();

							/*
							$tr = new GoogleTranslate($qSpr, $zSpr[0]);
							$ergebnis = $tr->setOptions(['timeout' => 10, 'proxy' => [$proxyServer], 'headers' => ['User-Agent' => $_SERVER['HTTP_USER_AGENT']]])->translate($text);
							// Übersetze Text für Sprache auf Index 0
							print_r($ergebnis);
							*/

							// echo $tr->setSource($qSpr)->setTarget($zSpr[0])->translate($text);
							$callback = $tr
													->setSource($qSpr)
													->setTarget($zSpr[0])
													->setOptions([
															'timeout' => 10,
															'proxy' => [$proxyServer],
															'headers' => [
																'User-Agent' => $_SERVER['HTTP_USER_AGENT']]
															])
													->translate($text);

							/*
							 * Wurde bereits ein Proxy aus der Liste entfernt,
							 * füge diesen wieder aus Session-Flag hinzu
							 */
							if(!empty($_SESSION['flags'])) {
								$_SESSION['proxies'][] = $_SESSION['flags'];
							}

							// Füge verwendeten Proxy der Flag-Session hinzu
							$_SESSION['flags'] = $_SESSION['proxies'][0];

							// Entferne verwendeten Proxy aus Proxy-Liste
							unset($_SESSION['proxies'][0]);

							// Ordne Array-Schlüssel neu
							$_SESSION['proxies'] = array_values($_SESSION['proxies']);

							// Prüfe Callback auf mögliche Fehler
							if($callback == null) {
								// Keine Übersetzung möglich
								echo "fehlerKeineUebersetzung";
							/*} elseif(stripos($callback, "503") === false) {
								// Service not available
								echo "fehlerGoogleSperrung";
							} elseif(stripos($callback, "429") === false) {
								// Too many requests (siehe oben)
								echo "fehlerZuVieleAnfragen";
							} elseif(stripos($callback, "413") === false) {
								// Request Entity too large (mehr als 5.000 Buchstaben)
								echo "fehlerTextZuGross";
							} elseif(stripos($callback, "413") === false) {
								// Forbidden (wenn HTML oder bestimmte Buchstaben übersetzt werden sollen)
								echo "fehlerUebesetzungUngueltig";
							*/} else {
								// Alles in Ordnung
								// Ersetze Index 0 mit übersetzter Sprache
								$zSpr[0] = $callback;

								// Gebe Array zurück
								echo json_encode($zSpr);

								// Debugging
								// print_r($zSpr);
							}
						// Übersetzungsvorgang beendet
						} else {
							echo "vorgangBeendet";
						}
					// Keine ausreichende Anzahl Proxies vorhanden
					} else {
						echo "fehlerAnzahlProxies";
					}
				// Vorgang beendet
				} else {
					echo "vorgangBeendet";
				}
			// Kein Array übergeben worden
			} else {
				echo "fehlerKeinArray";
			}
		} else {
			echo "fehlerParameter";
		}
	}
?>
