<?php
  // Starte Session
  if(session_status() == PHP_SESSION_NONE) {
    session_start();
  }

  // Führe Programmcode aus, wenn Parameter übergeben
  if(isset($_POST['erfolg']) && isset($_SESSION['login']) && $_SESSION['login'] !== "") {
    // Binde Funktionsdatei ein
    require_once 'functions.inc.php';

    $mysqli = dbconnect();

    if($mysqli) {
      // Bereinige Übergabeparameter
      $erfolg = filter_var($_POST['erfolg'], FILTER_SANITIZE_STRING);
      $erfolg = mysqli_real_escape_string($mysqli, $erfolg);

      // Suche nach E-Mail Adresse in Datenbank
      $select = "SELECT * FROM `translate_logins` WHERE `email` = '" . $_SESSION['login'] . "' LIMIT 1";
      $result = mysqli_query($mysqli, $select);
      $numrow = mysqli_num_rows($result);

      // E-Mail Adresse existiert
      if($numrow == 1) {
        $getrow = mysqli_fetch_assoc($result);

        // Prüfe Art des Erfolges
        switch($erfolg) {
          case "helloworld":
          case "troubleshooting":
          case "maxelite":
          case "noelite":
          case "googlelock":
          case "bonuscatch":
          case "copypasta":
            if($getrow['ach_' . $erfolg] == 0) {
              $update =  "
                         UPDATE
                           `translate_logins`
                         SET
                           `ach_" . $erfolg . "` = 1
                         WHERE
                           `email` = '" . $_SESSION['login'] . "'
                         ";
              $result = mysqli_query($mysqli, $update);

              // Prüfe, ob Erfolg gespeichert wurde
              if(mysqli_affected_rows($mysqli) == 1) {
                echo $erfolg;
              // Erfolg nicht gespeichert
              } else {
                echo "fehlerSpeichern";
              }
            } else {
              echo "nichtNotwendig";
            }
          break;
          case "standard":
            // Prüfe, derzeitigen Zählerstand
            $zaehlerStand = $getrow['ach_zaehler'];

            if($zaehlerStand == 0) {
              $erfolg = "initialtranslate";
              $anforderung = 1;
            } elseif($zaehlerStand > 0 && $zaehlerStand < 10) {
              $erfolg = "decadetranslate";
              $anforderung = 10;
            } elseif($zaehlerStand > 10 && $zaehlerStand < 100) {
              $erfolg = "centurytranslate";
              $anforderung = 100;
            } elseif($zaehlerStand > 100 && $zaehlerStand < 1000) {
              $erfolg = "milleniumtranslate";
              $anforderung = 1000;
            } elseif($zaehlerStand > 1000 && $zaehlerStand < 10000) {
              $erfolg = "decemmilleniumtranslate";
              $anforderung = 10000;
            }

            $update =  "
                       UPDATE
                         `translate_logins`
                       SET
                         `ach_zaehler` = `ach_zaehler` + 1
                       WHERE
                         `email` = '" . $_SESSION['login'] . "'
                       ";
            $result = mysqli_query($mysqli, $update);

            // Prüfe, ob Erfolg gespeichert wurde
            if(mysqli_affected_rows($mysqli) == 1) {
              // Prüfe, ob Anforderung an Erfolg erreicht wurde
              $select = "SELECT * FROM `translate_logins` WHERE `email` = '" . $_SESSION['login'] . "' AND `ach_zaehler` = '" . $anforderung . "' LIMIT 1";
              $result = mysqli_query($mysqli, $select);
              $numrow = mysqli_num_rows($result);

              // Erfolg freigeschaltet, aktualisiere
              if($numrow == 1) {
                $update =  "
                           UPDATE
                             `translate_logins`
                           SET
                             `ach_" . $erfolg . "` = 1
                           WHERE
                             `email` = '" . $_SESSION['login'] . "'
                           ";
                $result = mysqli_query($mysqli, $update);

                // Prüfe, ob Erfolg gespeichert wurde
                if(mysqli_affected_rows($mysqli) == 1) {
                  echo $erfolg;
                // Erfolg nicht gespeichert
                } else {
                  // Vergleiche Werte
                  $select = "SELECT * FROM `translate_logins` WHERE `email` = '" . $_SESSION['login'] . "' LIMIT 1";
                  $result = mysqli_query($mysqli, $select);
                  $getrow = mysqli_fetch_assoc($result);

                  if($zaehlerStand !== $getrow['ach_zaehler']) {
                    // Fehler
                    echo "fehlerSpeichernZaehler";
                  } else {
                    // Keine Aktualisierung notwendig
                    echo "nichtNotwendig";
                  }
                }
              }
            // Erfolg nicht gespeichert
            } else {
              echo "fehlerSpeichern";
            }
          break;
        }
      } else {
        "fehlerMailUnbekannt";
      }
    // Datenbankverbindungsfehler
    } else {
      echo "fehlerDatenbank";
    }
  }
?>
