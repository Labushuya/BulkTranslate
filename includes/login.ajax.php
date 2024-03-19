<?php
  // Führe Programmcode aus, wenn Parameter übergeben
  if(isset($_POST['email'])) {
    // Validiere E-Mail Adresse
    if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
      // Binde Funktionsdatei ein
      require_once 'functions.inc.php';

      $mysqli = dbconnect();

      if($mysqli) {
        // Bereinige Übergabeparameter
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $email = mysqli_real_escape_string($mysqli, $email);

        // Suche nach E-Mail Adresse in Datenbank
        $select = "SELECT * FROM `translate_logins` WHERE `email` = '" . $email . "' LIMIT 1";
        $result = mysqli_query($mysqli, $select);
        $numrow = mysqli_num_rows($result);

        // E-Mail Adresse existiert
        if($numrow == 1) {
          // Prüfe auf Sperrung
          $getrow = mysqli_fetch_assoc($result);

          if($getrow['disabled'] == true) {
            echo "kontoGesperrt";
          } else {
            // Starte Session
          	if(session_status() == PHP_SESSION_NONE) {
          		session_start();
          	}

            // Schreibe eingeloggtes Konto in Session
            $_SESSION['login'] = $email;

            echo "eingeloggt";
          }
        // E-Mail Adresse existiert nicht
        } else {
          // Erstelle
          $insert = "
                    INSERT INTO
                      `translate_logins`(
                        `id`,
                        `email`,
                        `disabled`,
                        `ach_zaehler`,
                        `ach_helloworld`,
                        `ach_initialtranslate`,
                        `ach_decadetranslate`,
                        `ach_centurytranslate`,
                        `ach_milleniumtranslate`,
                        `ach_decemmilleniumtranslate`,
                        `ach_ninja`,
                        `ach_troubleshooting`,
                        `ach_critical`,
                        `ach_maxelite`,
                        `ach_noelite`,
                        `ach_googlelock`,
                        `ach_bonuscatch`,
                        `ach_copypasta`
                      )
                      VALUES(
                        NULL,
                        '" . $email . "',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0',
                        '0'
                      )
                    ";
          $result = mysqli_query($mysqli, $insert);

          // Prüfe, ob Konto angelegt wurde
          if(mysqli_affected_rows($mysqli) == 1) {
            echo "angelegt";
          // Konto nicht angelegt
          } else {
            echo "fehlerAnlegen";
          }
        }
      // Datenbankverbindungsfehler
      } else {
        echo "fehlerDatenbank";
      }
    // E-Mail Adresse ungültig
    } else {
      echo "fehlerMailUngueltig";
    }
  }
?>
