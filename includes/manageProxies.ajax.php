<?php
  // Debugging: setze Fehlerlevel
  error_reporting(E_ALL);

  // Binde Funktionsdatei ein
  require_once('vendor/autoload.php');
  require_once('functions.inc.php');

  // Starte Session
  if(session_status() == PHP_SESSION_NONE) {
    session_start();
  }

  // Debugging
  // session_destroy();

  // Erstelle Proxy-Liste in Session
  $_SESSION['proxies'] = array();

  // Lege Zählervariablen fest
  $callbackPRX = "";
  $maxVersuche = 0;
  $proxyGesamt = 0;
  $proxyGHTTPS = 0;
  $proxyLevel3 = 0;
  $proxyHTTPS3 = 0;
  $proxyLevel2 = 0;
  $proxyHTTPS2 = 0;
  $proxyLevel1 = 0;
  $proxyHTTPS1 = 0;

  // Erstelle ProxyFetcher-Objekt
  $manager = new \ProxyFetcher\Manager();

  // Erstelle weitere Schleife für max. 5 Versuche
  while($maxVersuche < 6) {
    /*
     * Lege Suchpriorität fest
     * Primär:
     *   Elite Proxies
     *   Versuche 0 bis 2
     * Sekundär:
     *   anonyme Proxies
     *   Versuch 3
     * Tertiär:
     *   transparente Proxies
     *   Versuch 4
     */
     switch($maxVersuche) {
       case 0:
       case 1:
       case 2:
        // Filtere Proxies mit Port 80 (Elite Proxies)
        $proxies = $manager->fetch(
                                ['provider' => 'sslproxies.org'],
                                ['type' => 'Elite'],
                                ['port' => 80],
                                ['limit' => 100]
                              );
       break;
       case 3:
       case 4:
        // Filtere Proxies mit Port 80 (anonyme Proxies)
        $proxies = $manager->fetch(
                                ['provider' => 'gatherproxy.com'],
                                ['type' => 'Anonymous'],
                                ['port' => 80],
                                ['limit' => 100]
                              );
       break;
       case 5:
       // Filtere Proxies mit Port 80 (transparente Proxies)
       $proxies = $manager->fetch(
                                ['provider' => 'gatherproxy.com'],
                                ['type' => 'Transparent'],
                                ['port' => 80],
                                ['limit' => 100]
                            );
       break;
       // Standard: Elite Proxies
       default:
        // Filtere Proxies mit Port 80 (Elite Proxies)
        $proxies = $manager->fetch(
                                ['provider' => 'gatherproxy.com'],
                                ['type' => 'Elite'],
                                ['port' => 80],
                                ['limit' => 100]
                              );
        break;
     }

     ## debugging
     /*
       Ausgabe: var_dump($proxies);
       array(13) {
         [0] =>  object(ProxyFetcher\Proxy)#433 (5) {
                   ["ip":"ProxyFetcher\Proxy":private] => string(13) "179.61.180.63"
                   ["port":"ProxyFetcher\Proxy":private] => int(4045)
                   ["country":"ProxyFetcher\Proxy":private] => string(2) "DE"
                   ["https":"ProxyFetcher\Proxy":private] => bool(false)
                   ["type":"ProxyFetcher\Proxy":private] => string(11) "transparent"
                 }
         [1] =>  object(ProxyFetcher\Proxy)#503 (5) {
                   ["ip":"ProxyFetcher\Proxy":private] => string(13) "179.61.174.94"
                   ["port":"ProxyFetcher\Proxy":private] => int(4045)
                   ["country":"ProxyFetcher\Proxy":private] => string(2) "DE"
                   ["https":"ProxyFetcher\Proxy":private] => bool(false)
                   ["type":"ProxyFetcher\Proxy":private] => string(11) "transparent"
                 }
       }
     */

     // Konvertiere Objekt zu Array
     $konvertArray = array();

     for($j = 0; $j < count($proxies); $j++) {
       foreach((array)$proxies[$j] as $key => $value) {
         // Bereinige Key
         $key = str_replace('ProxyFetcher\Proxy', '', $key);
         $key = trim($key);

         // Erzwinge String-Typ bei Ports
         if($key == 'port' OR $key == 'https') {
           $value = (string)$value;
         }

         $konvertArray[$j][$key] = $value;
       }
     }

     ## debugging
     /*
       echo "<pre>";
       var_dump($konvertArray);
       echo "</pre>";
       exit;
     */

     // Durchlaufe Schleife und sortiere irrelevante Proxies aus
     for($j = 0; $j < count($konvertArray); $j++) {
       // Hole nur Proxies, welche nicht vom Typ SOCK sind
       if(stripos($konvertArray[$j]['type'], 'SOCK') === false) {
         ## Debugging
         // echo $konvertArray[$j]['ip'] . ':' . $konvertArray[$j]['port'] . '<br />';

         // Aktualisiere Zählerstände
         if($konvertArray[$j]['ip'] !== '') {
           $proxyGesamt++;
         }

         if($konvertArray[$j]['https'] == 1) {
           $proxyGHTTPS++;
         }

         if(stripos($konvertArray[$j]['type'], 'Elite') !== false) {
           // Typ nach Klassifizierung
           $typ = 3;

           $proxyLevel3++;

           if($konvertArray[$j]['https'] == 1) {
             $proxyHTTPS3++;
           }
         } elseif(stripos($konvertArray[$j]['type'], 'Anonymous') !== false) {
           // Typ nach Klassifizierung
           $typ = 2;

           $proxyLevel2++;

           if($konvertArray[$j]['https'] == 1) {
             $proxyHTTPS2++;
           }
         } elseif(stripos($konvertArray[$j]['type'], 'Transparent') !== false) {
           // Typ nach Klassifizierung
           $typ = 1;

           $proxyLevel1++;

           if($konvertArray[$j]['https'] == 1) {
             $proxyHTTPS1++;
           }
         }

         // Erstelle Proxy-Struktur
         $proxy = $konvertArray[$j]['ip'] . ':' . $konvertArray[$j]['port'];

         ## Debugging
         // echo $proxy . "<br />";

         // Proxy nicht bereits in Liste vorhanden
         if(!in_array($proxy, $_SESSION['proxies'])) {
           /*
           // Teste Proxy auf Gültigkeit
           $checker = file_get_contents('http://prx.mindsources.net/bulktranslate/includes/checker.php?ip=' . $konvertArray[$j]['ip'] . '&port=' . $konvertArray[$j]['port'] . '&timeout=10');

           ## Debugging
           // var_dump($checker);

           // Prüfe, ob Proxy verfügbar
           if(strpos($checker, '{"result":{"success":true') !== false) {
             // Speichere Proxyadresse in Session-Array
             $_SESSION['proxies'][]['adresse'] = $konvertArray[$j]['ip'];
             $_SESSION['proxies'][]['port'] = $konvertArray[$j]['port'];
           }
           */

           // In Session gespeicherter Proxy
           $_SESSION['proxies'][] = $konvertArray[$j]['ip'] . ':' . $konvertArray[$j]['port'] . ':' . $konvertArray[$j]['https'] . ':' . $typ;

           // Callback
           $callbackPRX = $proxyGesamt . "#" . $proxyGHTTPS . "#" . $proxyLevel3 . "#" . $proxyHTTPS3 . "#" . $proxyLevel2 . "#" . $proxyHTTPS2 . "#" . $proxyLevel1 . "#" . $proxyHTTPS1;
         }
       }

       // Prüfe, ob mind. 40 Proxies vorhanden sind
       if(count($_SESSION['proxies']) >= 50) {
         // Beende Schleife
         break;
       }
     // Ende for-Schleife 2
     }

     // Prüfe, ob mind. 40 Proxies vorhanden sind
     if(count($_SESSION['proxies']) >= 50) {
       // Beende Schleife
       break;
     } else {
       // Erhöhe Durchlaufzähler um eins
       $maxVersuche++;
     }
   // Ende while-Schleife
   }

   // Prüfe letztmals, ob Session-Proxy-Liste Inhalt besitzt
   if(count($_SESSION['proxies']) == 0) {
     // Werfe kritischen Fehler aus
     $callbackPRX = "fehlerProxyListeLeer";
   }

   // Gebe Callback aus
   echo $callbackPRX;
?>
