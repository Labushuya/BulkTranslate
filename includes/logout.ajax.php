<?php
  // Starte Session
  if(session_status() == PHP_SESSION_NONE) {
    session_start();
  }

  // Entferne eingeloggtes Konto in Session
  $_SESSION['login'] = null;
  unset($_SESSION['login']);

  if(!isset($_SESSION['login'])) {
    echo "ausgeloggt";
  } else {
    echo "fehlerLogout";
  }
?>
