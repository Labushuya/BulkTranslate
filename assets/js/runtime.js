console.log(erfolgeFreischalten);

// Global Scope Variablen
// Erstelle Array für Sprachen
var sprachenArray = new Array;

// Hole Anzahl Elemente
var anzahlSprachen = sprachenArray.length;

// Globale Variablen
var quellSprache = "",
    textSource = "",
    vonEnglisch = "",
    vonDeutsch = "",
    zielSprachen = "",
    proxyGesamt = 0,
    proxyGHTTPS = 0,
    proxyLevel3 = 0,
    proxyHTTPS3 = 0,
    proxyLevel2 = 0,
    proxyHTTPS2 = 0,
    proxyLevel1 = 0,
    proxyHTTPS1 = 0;

// Kopierfunktion
var kopiereInhalt = new ClipboardJS('.kopierenIcon');

kopiereInhalt.on('success', function(e) {
  // Erfolg: Proxy-Liste anzeigen
  if(erfolgeFreischalten == 1) {
    manageAchievements("copypasta");
  }

  console.log(e);
});

kopiereInhalt.on('error', function(e) {
  console.log(e);
});

$(document).ready(function() {
  if(erfolgeFreischalten == 1) {
    // Erster Erfolg
    manageAchievements("helloworld");
  }

  // Login & Logout
  $('#login').click(function() {
    Swal.fire({
      title: 'Einloggen',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      html: '<table style="text-align: left" class="inhalt"><tr><td colspan="2">Wenn du möchtest, kannst du dich einloggen bzw. erstmalig registrieren. Ist kein Muss, aber so hast du Zugriff auf Erfolge und nette Gimmicks. <i class="purpur far fa-smile-beam"></i></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td colspan="2">Trage einfach deine E-Mail Adresse ein. Das System erkennt automatisch, ob du bereits registriert bist und loggt dich dann ein.</td></tr></table>',
      showConfirmButton: true,
      confirmButtonText: '<i class="far fa-grin-hearts"></i>&emsp;<strong>Her mit dem Krempel!</strong>',
      confirmButtonColor: 'rgb(145,11,67)',
      showCancelButton: true,
      cancelButtonText: '<i class="far fa-meh-rolling-eyes"></i>&emsp;Och, nee du. Lass mal.',
      cancelButtonColor: '#333',
      backdrop:	`
                linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                center
                no-repeat
                `
    }).then((login) => {
      if (login.value) {
        $.ajax({
          type: 'POST',
          url: 'includes/login.ajax.php',
          data: {
                  'email': login.value
          },
          success: function(callback) {
              if(callback == "eingeloggt") {
                // Verstecke Login und zeige Logout
                $('#login').hide();
                $('#logout').show();

                // Benutzer eingeloggt
                Swal.fire({
                  type: 'success',
                  title: '<span class="purpur">Du bist jetzt eingeloggt!</span>&emsp;<i class="far fa-grin-beam"></i>',
                  html: 'Willkommen zurück! <i class="fas fa-drum"></i>',
                  timer: 2500,
                  onClose: () => {
                    // Erneuere Seite
                    location.href = "index.php";
                  },
                  showConfirmButton: false,
                  showCancelButton: false,
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                });
              } else if(callback == "angelegt") {
                // Verstecke Login und zeige Logout
                $('#login').hide();
                $('#logout').show();

                // Benutzer angelegt und eingeloggt
                Swal.fire({
                  type: 'success',
                  title: '<span class="purpur">Geladen und entsichert!</span>&emsp;<i class="far fa-grin-beam"></i>',
                  html: 'Dein Benutzerkonto wurde angelegt und du bist nun eingeloggt! <i class="fas fa-drum"></i>',
                  timer: 2500,
                  onClose: () => {
                    // Erneuere Seite
                    location.href = "index.php";
                  },
                  showConfirmButton: false,
                  showCancelButton: false,
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                });
              } else if(callback == "fehlerAnlegen") {
                Swal.fire({
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                  allowEnterKey: false,
                  type: 'error',
                  title: 'Hoppla!',
                  html: '<span class="purpur">Dein Benutzerkonto konnte nicht angelegt werden! Bitte prüfe deine Internetverbindung. Ansonsten versuche es später noch einmal!</span>&emsp;<i class="far fa-frown"></i>',
                  footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '</em></span>',
                  showConfirmButton: true,
                  confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
                  confirmButtonColor: 'rgb(145,11,67)',
                  showCancelButton: true,
                  cancelButtonText: 'Abbrechen',
                  cancelButtonColor: '#333',
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                }).then((result) => {
                  if (result.value) {
                    $('.swal2-input').val(login.value);
                    $('#login').trigger("click");
                  }
                });
              } else if(callback == "fehlerDatenbank") {
                Swal.fire({
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                  allowEnterKey: false,
                  type: 'error',
                  title: 'Hoppla!',
                  html: '<span class="purpur">Sieht wohl so aus als sei die Datenbank nicht erreichbar! Bitte prüfe deine Internetverbindung. Ansonsten versuche es später noch einmal!</span>&emsp;<i class="far fa-frown"></i>',
                  footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '</em></span>',
                  showConfirmButton: true,
                  confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
                  confirmButtonColor: 'rgb(145,11,67)',
                  showCancelButton: true,
                  cancelButtonText: 'Abbrechen',
                  cancelButtonColor: '#333',
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                }).then((result) => {
                  if (result.value) {
                    $('.swal2-input').val(login.value);
                    $('#login').trigger("click");
                  }
                });
              } else if(callback == "fehlerMailUngueltig") {
                Swal.fire({
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                  allowEnterKey: false,
                  type: 'error',
                  title: 'Hoppla!',
                  html: '<span class="purpur">Du hast eine ungültige E-Mail Adresse angegeben!</span> <i class="far fa-frown"></i>',
                  footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '</em></span>',
                  showConfirmButton: true,
                  confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
                  confirmButtonColor: 'rgb(145,11,67)',
                  showCancelButton: true,
                  cancelButtonText: 'Abbrechen',
                  cancelButtonColor: '#333',
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                }).then((result) => {
                  if (result.value) {
                    $('#login').trigger("click");
                  }
                });
              } else {
                Swal.fire({
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                  allowEnterKey: false,
                  type: 'error',
                  title: 'Hoppla!',
                  html: '<span class="purpur">Gut also jetzt bin selbst ich überfragt. Was auch immer du gemacht hast, durfte nicht passieren.</span> <i class="far fa-dizzy"></i>',
                  footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: oookayWTF?!/loginanfrage</em></span>',
                  showConfirmButton: true,
                  confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
                  confirmButtonColor: 'rgb(145,11,67)',
                  showCancelButton: true,
                  cancelButtonText: 'Abbrechen',
                  cancelButtonColor: '#333',
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                }).then((result) => {
                  if (result.value) {
                    $('#login').trigger("click");
                  }
                });
              }
          },
          error: function (jqXHR, exception) {
            var msg = '',
                cde = '';

            if(jqXHR.status === 0) {
              msg = 'Nicht verbunden. Überprüfe das Netzwerk.';
              cde = 0;
            } else if(jqXHR.status == 404) {
              msg = 'Angeforderte Seite nicht gefunden.';
              cde = 404;
            } else if(jqXHR.status == 500) {
              msg = 'Interner Serverfehler.';
              cde = 500;
            } else if(exception === 'parsererror') {
              msg = 'Angeforderte JSON-Analyse fehlgeschlagen.';
              cde = parsererror;
            } else if(exception === 'timeout') {
              msg = 'Timeout-Fehler.';
              cde = timeout;
            } else if(exception === 'abort') {
              msg = 'Ajax-Anfrage abgebrochen.';
              cde = abort;
            } else {
              msg = 'Nicht erfasster Fehler.';
              cde = jqXHR.responseText;
            }

            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              type: 'error',
              title: 'Hoppla!',
              html: '<span class="purpur">Fehler: ' + msg + '</span> <i class="far fa-frown"></i>',
              footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + cde + '/loginanfrage</em></span>',
              showConfirmButton: true,
              confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
              confirmButtonColor: 'rgb(145,11,67)',
              backdrop:	`
                        linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                        center
                        no-repeat
                        `
            }).then((result) => {
              if (result.value) {
                $('.swal2-input').val(login.value);
                $('#login').trigger("click");
              }
            });
          }
        });

        console.log(erfolgeFreischalten);
      }
    });
  });

  $('#logout').click(function() {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Ausloggen',
      html: '<span class="purpur">Du wirst ausgeloggt ..</span><br /><br /><svg id="ladeAnimation" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#910b43" stroke="none"><animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform></path></svg>',
      showConfirmButton: false,
      showCancelButton: false,
      backdrop:	`
                linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                center
                no-repeat
                `
    });

    $.ajax({
      type: 'POST',
      url: 'includes/logout.ajax.php',
      success: function(callback) {
          if(callback == "ausgeloggt") {
            // Verstecke Logout und zeige Login
            $('#logout').hide();
            $('#login').show();

            // Setze Erfolgvariable auf true
            var erfolgeFreischalten = 0;

            // Öffne Status-Meldung über erfolgreiche Validierung
            Swal.fire({
              type: 'success',
              html: '<span class="purpur">Erfolgreich ausgeloggt!</span> <i class="far fa-smile-beam"></i>',
              timer: 2500,
              showConfirmButton: false,
              showCancelButton: false,
              backdrop:	`
                        linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                        center
                        no-repeat
                        `
            });
          } else {
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              type: 'error',
              title: 'Hoppla!',
              html: '<span class="purpur">Ausloggen unvollständig!</span> <i class="far fa-frown"></i>',
              showConfirmButton: true,
              confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Erzwinge Logout!',
              confirmButtonColor: 'rgb(145,11,67)',
              backdrop:	`
                        linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                        center
                        no-repeat
                        `
            }).then((result) => {
              if (result.value) {
                location.href = "index.php";
              }
            });
          }
      },
      error: function (jqXHR, exception) {
        var msg = '',
            cde = '';

        if(jqXHR.status === 0) {
          msg = 'Nicht verbunden. Überprüfe das Netzwerk.';
          cde = 0;
        } else if(jqXHR.status == 404) {
          msg = 'Angeforderte Seite nicht gefunden.';
          cde = 404;
        } else if(jqXHR.status == 500) {
          msg = 'Interner Serverfehler.';
          cde = 500;
        } else if(exception === 'parsererror') {
          msg = 'Angeforderte JSON-Analyse fehlgeschlagen.';
          cde = parsererror;
        } else if(exception === 'timeout') {
          msg = 'Timeout-Fehler.';
          cde = timeout;
        } else if(exception === 'abort') {
          msg = 'Ajax-Anfrage abgebrochen.';
          cde = abort;
        } else {
          msg = 'Nicht erfasster Fehler.';
          cde = jqXHR.responseText;
        }

        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          type: 'error',
          title: 'Hoppla!',
          html: '<span class="purpur">Fehler: ' + msg + '</span> <i class="far fa-frown"></i>',
          footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + cde + '</em></span>',
          showConfirmButton: true,
          confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
          confirmButtonColor: 'rgb(145,11,67)',
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        }).then((result) => {
          if (result.value) {
            location.href = "index.php";
          }
        });
      }
    });
  });

  // Prüfe bei Seitenaufruf Proxies, wenn nötig
  // Ändere Text von Übersetzen-Button
  $('#uebersetzen').text('Proxy-Validierung. Bitte warten!');

  // Blockiere jegliche Eingabe
  Swal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    title: 'Validiere Proxy-Liste',
    html: '<span class="purpur">Bitte warte kurz, es geht gleich weiter ..</span><br /><br /><svg id="ladeAnimation" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#910b43" stroke="none"><animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform></path></svg>',
    footer: '<span style="font-size; small;">Sollte nicht länger als 60 Sekunden dauern. <i class="purpur fas fa-rocket"></i></span>',
    showConfirmButton: false,
    showCancelButton: false,
    backdrop:	`
              linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
              center
              no-repeat
              `
  });

  $.ajax({
    type: "POST",
    url: "includes/manageProxies.ajax.php",
    // Anfrage an URL gesendet
    success: function(callback) {
      if(callback == "fehlerProxyListeLeer") {
        // Erfolg: Fehler
        if(erfolgeFreischalten == 1) {
          manageAchievements("troubleshooting");
        }

        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          type: 'error',
          title: 'Hoppla!',
          html: '<span class="purpur">Es sieht wohl so aus als gab es einen Fehler beim Validieren der Proxy-Liste.</span> <i class="far fa-frown"></i>',
          footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: validateProxylist</em></span>',
          showConfirmButton: true,
          confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
          confirmButtonColor: 'rgb(145,11,67)',
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        }).then((result) => {
          if (result.value) {
            location.href = "index.php";
          }
        });
      // Alles außer "bereit" wird als Fehler betrachtet
      } else {
        // Öffne Status-Meldung über erfolgreiche Validierung
        Swal.fire({
          type: 'success',
          html: '<span class="purpur">Proxy-Liste validiert!</span> <i class="far fa-smile-beam"></i>',
          timer: 2500,
          showConfirmButton: false,
          showCancelButton: false,
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        });

        // Splitte Callback auf
        var split = callback.split('#');

        // Gesamtanzahl Proxies
        var proxyGesamt = split[0];

        // davon mit HTTPS Protokoll
        var proxyGHTTPS = split[1];

        // Anzahl Elite Proxies
        var proxyLevel3 = split[2];

        // davon mit HTTPS Protokoll
        var proxyHTTPS3 = split[3];

        // Anzahl anonymer Proxies
        var proxyLevel2 = split[4];

        // davon mit HTTPS Protokoll
        var proxyHTTPS2 = split[5];

        // Anzahl transparenter Proxies
        var proxyLevel1 = split[6];

        // davon mit HTTPS Protokoll
        var proxyHTTPS1 = split[7];

        // Prüfe wie viele Elite Proxies vorhanden sind
        if(proxyLevel3 < 20) {
          if(proxyLevel3 == 0) {
            // Erfolg: Keine Elite Proxies
            if(erfolgeFreischalten == 1) {
              manageAchievements("noelite");
            } else {
              // Erfolg: Kritischer Elite Proxy Bestand
              if(erfolgeFreischalten == 1) {
                manageAchievements("critical");
              }
            }
          }

          // Blende Hinweis über riskante Nutzung ein
          $('#wenigEliteProxies').show();

          // Gebe Warnung aus
          Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            type: 'warning',
            title: 'Proxy Status',
            html: '<table style="border-collapse: collapse; text-align: left" class="inhalt"><tr><td colspan="2"><span style="font-weight: bold; font-size: small; text-align: justify;">Achtung! Es sind lediglich ' + proxyLevel3 + ' Elite Proxies vorhanden! IP-Sperrung durch Google möglich! Proxy-Liste sollte aktualisiert werden!</span></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><strong>Gesamtanzahl Proxies</strong></td><td><strong>' + proxyGesamt + '</strong></td></tr><tr><td><strong>davon mit HTTPS Protokoll</strong></td><td><strong>' + proxyGHTTPS + '</strong></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-grin-beam"></i> Anzahl Elite Proxies</td><td>' + proxyLevel3 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS3 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-smile"></i> Anzahl anonymer Proxies</td><td>' + proxyLevel2 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS2 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-meh"></i> Anzahl transparenter Proxies</td><td>' + proxyLevel1 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS1 + '</td></tr></table>',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-redo"></i>&emsp;automatisch aktualisieren',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: '<i class="fas fa-exclamation-triangle" style="color: red;"></i>&emsp;manuell aktualisieren</span>',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if(result.value) {
              let timerInterval

              Swal.fire({
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: false,
                type: 'info',
                html: '<span class="purpur">Seite wird in <strong>5</strong> Minuten aktualisiert!</span> <i class="far fa-smile-beam"></i>',
                footer: '<span style="font-size; small;">Klicken zum Abbrechen</span>',
                showConfirmButton: true,
                confirmButtonText: 'Vorgang abbrechen',
                confirmButtonColor: '#333',
                showCancelButton: false,
                timer: 300000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong')
                        .textContent = Math.ceil(swal.getTimerLeft() / 60000)
                  }, 60000)
                },
                onClose: (result) => {
                  clearInterval(timerInterval);
                },
                backdrop:	`
                          linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                          center
                          no-repeat
                          `
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  location.href = "index.php";
                } else {
                  Swal.fire({
                    type: 'warning',
                    html: '<span class="purpur">Vorgang abgebrochen!</span> <i class="far fa-frown"></i>',
                    timer: 2500,
                    showConfirmButton: false,
                    showCancelButton: false,
                    backdrop:	`
                              linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                              center
                              no-repeat
                              `
                  });
                }
              });
            }
          });

          // Warnung als Click-Listener
          $('#proxyStatus').click(function() {
            // Erfolg: Proxy-Liste anzeigen
            if(erfolgeFreischalten == 1) {
              manageAchievements("ninja");
            }

            // Gebe Warnung aus
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              type: 'warning',
              title: 'Proxy Status',
              html: '<table style="border-collapse: collapse; text-align: left" class="inhalt"><tr><td colspan="2"><span style="font-weight: bold; font-size: small; text-align: justify;">Achtung! Es sind lediglich ' + proxyLevel3 + ' Elite Proxies vorhanden! IP-Sperrung durch Google möglich! Proxy-Liste sollte aktualisiert werden!</span></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><strong>Gesamtanzahl Proxies</strong></td><td><strong>' + proxyGesamt + '</strong></td></tr><tr><td><strong>davon mit HTTPS Protokoll</strong></td><td><strong>' + proxyGHTTPS + '</strong></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-grin-beam"></i> Anzahl Elite Proxies</td><td>' + proxyLevel3 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS3 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-smile"></i> Anzahl anonymer Proxies</td><td>' + proxyLevel2 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS2 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-meh"></i> Anzahl transparenter Proxies</td><td>' + proxyLevel1 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS1 + '</td></tr></table>',
              showConfirmButton: true,
              confirmButtonText: '<i class="fas fa-redo"></i>&emsp;automatisch aktualisieren',
              confirmButtonColor: 'rgb(145,11,67)',
              showCancelButton: true,
              cancelButtonText: '<i class="fas fa-exclamation-triangle" style="color: red;"></i>&emsp;manuell aktualisieren</span>',
              cancelButtonColor: '#333',
              backdrop:	`
                        linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                        center
                        no-repeat
                        `
            }).then((result) => {
              if(result.value) {
                let timerInterval

                Swal.fire({
                  allowOutsideClick: true,
                  allowEscapeKey: true,
                  allowEnterKey: false,
                  type: 'info',
                  html: '<span class="purpur">Seite wird in <strong>5</strong> Minuten aktualisiert!</span> <i class="far fa-smile-beam"></i>',
                  footer: '<span style="font-size; small;">Klicken zum Abbrechen</span>',
                  showConfirmButton: true,
                  confirmButtonText: 'Vorgang abbrechen',
                  confirmButtonColor: '#333',
                  showCancelButton: false,
                  timer: 300000,
                  timerProgressBar: true,
                  onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                      Swal.getContent().querySelector('strong')
                          .textContent = Math.ceil(swal.getTimerLeft() / 60000)
                    }, 60000)
                  },
                  onClose: (result) => {
                    clearInterval(timerInterval);
                  },
                  backdrop:	`
                            linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                            center
                            no-repeat
                            `
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    location.href = "index.php";
                  } else {
                    Swal.fire({
                      type: 'warning',
                      html: '<span class="purpur">Vorgang abgebrochen!</span> <i class="far fa-frown"></i>',
                      timer: 2500,
                      showConfirmButton: false,
                      showCancelButton: false,
                      backdrop:	`
                                linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                                center
                                no-repeat
                                `
                    });
                  }
                });
              }
            });
          });
        } else {
          if(proxyLevel3 == proxyGesamt) {
            // Erfolg: Max. Elite Proxies
            if(erfolgeFreischalten == 1) {
              manageAchievements("maxelite");
            }
          }

          // Proxy-Status
          $('#proxyStatus').click(function() {
            // Erfolg: Proxy-Liste anzeigen
            if(erfolgeFreischalten == 1) {
              manageAchievements("ninja");
            }

            Swal.fire({
              type: 'info',
              title: 'Proxy Status',
              html: '<table style="text-align: left" class="inhalt"><tr><td colspan="2"><span class="purpur">Da will\'s wohl jemand genau wissen, was?</span> <i class="far fa-laugh-squint"></i></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><strong>Gesamtanzahl Proxies</strong></td><td><strong>' + proxyGesamt + '</strong></td></tr><tr><td><strong>davon mit HTTPS Protokoll</strong></td><td><strong>' + proxyGHTTPS + '</strong></td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-grin-beam"></i> Anzahl Elite Proxies</td><td>' + proxyLevel3 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS3 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-smile"></i> Anzahl anonymer Proxies</td><td>' + proxyLevel2 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS2 + '</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td><i class="far fa-meh"></i> Anzahl transparenter Proxies</td><td>' + proxyLevel1 + '</td></tr><tr><td><i class="fas fa-lock"></i> davon mit HTTPS Protokoll</td><td>' + proxyHTTPS1 + '</td></tr></table>',
              showConfirmButton: true,
              confirmButtonText: 'Alles klar!',
              confirmButtonColor: 'rgb(145,11,67)',
              backdrop:	`
                        linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                        center
                        no-repeat
                        `
            });
          });
        }

        // Blende Proxy-Status Icon ein
        $('#proxyStatus').show();

        // Ändere Text von Übersetzen-Button
        $('#uebersetzen').text('Bitte mindestens eine Sprache auswählen!');
      }
    },
    error: function (jqXHR, exception) {
      // Erfolg: Fehler
      if(erfolgeFreischalten == 1) {
        manageAchievements("troubleshooting");
      }

      var msg = '',
          cde = '';

      if(jqXHR.status === 0) {
        msg = 'Nicht verbunden. Überprüfe das Netzwerk.';
        cde = 0;
      } else if(jqXHR.status == 404) {
        msg = 'Angeforderte Seite nicht gefunden.';
        cde = 404;
      } else if(jqXHR.status == 500) {
        msg = 'Interner Serverfehler.';
        cde = 500;
      } else if(exception === 'parsererror') {
        msg = 'Angeforderte JSON-Analyse fehlgeschlagen.';
        cde = parsererror;
      } else if(exception === 'timeout') {
        msg = 'Timeout-Fehler.';
        cde = timeout;
      } else if(exception === 'abort') {
        msg = 'Ajax-Anfrage abgebrochen.';
        cde = abort;
      } else {
        msg = 'Nicht erfasster Fehler.';
        cde = jqXHR.responseText;
      }

      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        type: 'error',
        title: 'Hoppla!',
        html: '<span class="purpur">Fehler: ' + msg + '</span> <i class="far fa-frown"></i>',
        footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + cde + '</em></span>',
        showConfirmButton: true,
        confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
        confirmButtonColor: 'rgb(145,11,67)',
        backdrop:	`
                  linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                  center
                  no-repeat
                  `
      }).then((result) => {
        if (result.value) {
          location.href = "index.php";
        }
      });
    }
  });

  /*
   * Wenn Sprache angeklickt wird, füge diese dem Sprachen-Array
   * hinzu oder entferne diese wieder
   */
  $('.sprache').click(function() {
    // Markierstatus von Element
    var checked = $(this).prop('checked');

    // Wert von Element
    var sprache = $(this).val();

    // Sprache hinzufügen
    if(checked === true) {
      // Failsafe: Prüfe, ob bereits in Array
      if(sprachenArray.indexOf(sprache) === -1) {
        sprachenArray.push(sprache);
      }

      // Gebe übersetzen-Button frei, wenn mind. 1 Sprache ausgewählt
      $('#uebersetzen').prop('disabled', false);

      // Ändere Text
      $('#uebersetzen').text('übersetzen');
    // Sprache entfernen
    } else {
      sprachenArray = $.grep(sprachenArray, function(value) {
        return value != sprache
      });
    }

    // Debugging
    // console.log(sprachenArray);
    // alert('click');

    // GUI Manipulation
    $('#alle').prop('checked', false);
  })
  // Überwache Auswahl der Sprachen und sperre Submit-Button / gebe Submit-Button frei
  .change(function() {
    var sprachenAuswahl = $('.sprache'),
        mindEineAuswahl = false;

    sprachenAuswahl.each(function() {
      var aktuellesElement = $(this).prop("checked");

      if(aktuellesElement === true) {
        mindEineAuswahl = true;
      }
    });

    if(mindEineAuswahl === true) {
      // Gebe übersetzen-Button frei
      $('#uebersetzen').prop('disabled', false);

      // Ändere Text
      $('#uebersetzen').text('übersetzen');
    } else {
      // Sperre übersetzen-Button
      $('#uebersetzen').prop('disabled', true);

      // Ändere Text
      $('#uebersetzen').text('Bitte mindestens eine Sprache auswählen!');
    }

    // Debugging
    // console.log(sprachenArray);
    // alert('change');
  });

  // Überwache Auswahl der Sprachen für Deutsch-Englisch Wechsel
  $('html').on('click', '.sprache', function() {
    // Markierstatus von Element
    var checked = $(this).prop('checked');

    // Wert von Element
    var sprache = $(this).val();

    // Sprache hinzufügen
    if(checked === true) {
      // Failsafe: Prüfe, ob bereits in Array
      if(sprachenArray.indexOf(sprache) === -1) {
        sprachenArray.push(sprache);
      }

      // Gebe übersetzen-Button frei, wenn mind. 1 Sprache ausgewählt
      $('#uebersetzen').prop('disabled', false);

      // Ändere Text
      $('#uebersetzen').text('übersetzen');
    // Sprache entfernen
    } else {
      sprachenArray = $.grep(sprachenArray, function(value) {
        return value != sprache
      });
    }

    // Debugging
    // console.log(sprachenArray);
    // alert('click');

    // GUI Manipulation
    $('#alle').prop('checked', false);
  });

  // Lösche alle Sprachen aus Array
  $('#keine').click(function() {
    // Markierstatus von Element
    var checked = $(this).prop('checked');

    // Hole alle Elemente der Klasse Sprache
    var alleSprachen = $('.sprache');

    if(checked === true) {
      alleSprachen.each(function() {
        // Wert des aktuellen Elements
        var sprache = $(this).val();

        sprachenArray = $.grep(sprachenArray, function(value) {
          return value != sprache
        });
      });
    }

    // Debugging
    // console.log(sprachenArray);

    // GUI Manipulation
    $('.sprache').prop('checked', false);

    // Verstecke "Keine"-Marker
    $('#zeigeKeine').hide();

    // Entferne Markierung
    $('#keine').prop('checked', false);

    // Zeige "Alle"-Marker
    $('#zeigeAlle').show();

    // Sperre übersetzen-Button
    $('#uebersetzen').prop('disabled', true);

    // Ändere Text
    $('#uebersetzen').text('Bitte mindestens eine Sprache auswählen!');
  });

  // Füge alle Sprachen dem Array hinzu
  $('#alle').click(function() {
    // Markierstatus von Element
    var checked = $(this).prop('checked');

    // Hole alle Elemente der Klasse Sprache
    var alleSprachen = $('.sprache');

    if(checked === true) {
      alleSprachen.each(function() {
        // Wert des aktuellen Elements
        var sprache = $(this).val();

        // Failsafe: Prüfe, ob bereits in Array
        if(sprachenArray.indexOf(sprache) === -1) {
          sprachenArray.push(sprache);
        }
      });
    }

    // Debugging
    // console.log(sprachenArray);

    // GUI Manipulation
    $('.sprache').prop('checked', true);

    // Verstecke "Alle"-Marker
    $('#zeigeAlle').hide();

    // Entferne Markierung
    $('#alle').prop('checked', false);

    // Zeige "Keine"-Marker
    $('#zeigeKeine').show();

    // Gebe übersetzen-Button frei
    $('#uebersetzen').prop('disabled', false);

    // Ändere Text
    $('#uebersetzen').text('übersetzen');
  });

  // Passe Quell- auf Zielsprache an (DE --> EN und vice versa)
  $('#qde').click(function() {
    // Verstecke deutsche Zielsprache
    $('#zuDeutsch').hide();

    // Markierstatus von de-Element
    var checked = $('#de').prop('checked');

    // Falls Auswahl markiert war, behalte diese bei
    if(checked === true) {
      // Entferne Auswahl
      $('#de').prop('checked', false);

      // Entferne sprachen-Klasse
      $('#de').removeClass('sprache');

      // Füge bei englisch hinzu
      $('#en').prop('checked', true);

      // Füge sprachen-Klasse hinzu
      $('#en').addClass('sprache');

      // Füge Wert von en-Element dem Array hinzu, falls ausgewählt
      var sprache = $('#en').val();

      // Failsafe: Prüfe, ob bereits in Array
      if(sprachenArray.indexOf(sprache) === -1) {
        sprachenArray.push(sprache);
      }
    // Ansonsten passe nur Klassen an
    } else {
      // Entferne sprachen-Klasse
      $('#de').removeClass('sprache');

      // Füge sprachen-Klasse hinzu
      $('#en').addClass('sprache');
    }

    // Zeige englische Zielsprache
    $('#zuEnglisch').show();

    // Setze Wert für neue Quellsprache (deutsch)
    $('#qde').val('de');

    // Entferne Wert von de-Element aus Array
    var sprache = $('#de').val();

    sprachenArray = $.grep(sprachenArray, function(value) {
      return value != sprache
    });

    // Entferne Wert von alter Zielsprache (englisch)
    $('#qen').val('');

    // Debugging
    // console.log(sprachenArray);
  });

  $('#qen').click(function() {
    // Verstecke englische Zielsprache
    $('#zuEnglisch').hide();

    // Markierstatus von en-Element
    var checked = $('#en').prop('checked');

    // Falls Auswahl markiert war, behalte diese bei
    if(checked === true) {
      // Entferne Auswahl
      $('#en').prop('checked', false);

      // Entferne sprachen-Klasse
      $('#en').removeClass('sprache');

      // Füge bei englisch hinzu
      $('#de').prop('checked', true);

      // Füge sprachen-Klasse hinzu
      $('#de').addClass('sprache');

      // Füge Wert von de-Element dem Array hinzu, falls ausgewählt
      var sprache = $('#de').val();

      // Failsafe: Prüfe, ob bereits in Array
      if(sprachenArray.indexOf(sprache) === -1) {
        sprachenArray.push(sprache);
      }
    // Ansonsten passe nur Klassen an
    } else {
      // Entferne sprachen-Klasse
      $('#en').removeClass('sprache');

      // Füge sprachen-Klasse hinzu
      $('#de').addClass('sprache');
    }

    // Zeige deutsche Zielsprache
    $('#zuDeutsch').show();

    // Setze Wert für neue Quellsprache (englisch)
    $('#qen').val('en');

    // Entferne Wert von en-Element aus Array
    var sprache = $('#en').val();

    sprachenArray = $.grep(sprachenArray, function(value) {
      return value != sprache
    });

    // Entferne Wert von alter Zielsprache (deutsch)
    $('#qde').val('');

    // Debugging
    // console.log(sprachenArray);
  });

  // Abschicken von Anfrage
  $('#uebersetzen').click(function() {
    /* Um mehrfache Anfragen hintereinander zu vermeiden, wird
     * ein Standardwert übermittelt, der Serverseitig per Switch
     * als default-Case aufgerufen wird. Somit prüft dieser, welcher
     * Erfolg freigeschaltet bzw. erhöht wird
     */
    if(erfolgeFreischalten == 1) {
      manageAchievements("standard");
    }

    // Leere zuerset mögliche vorangegangene Übersetzungen
    $('#ergebnis').html("");

    // Hole Anzahl Elemente
    anzahlSprachen = sprachenArray.length;

    // Sollen mehr als 5 Sprachen übersetzt werden, blende Hinweis ein
    if(anzahlSprachen > 5) {
      // Blockiere jegliche Eingabe
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        type: 'info',
        title: 'Ouha!',
        html: '<span class="purpur">Junge, Junge! Aber lass mich nur machen ..</span><br /><br /><svg id="ladeAnimation" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#910b43" stroke="none"><animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform></path></svg>',
        footer: '<span style="font-size; small; font-style: oblique;" class="regenbogen"><strong>Voodoo und Magie!</strong> <i class="purpur fas fa-magic"></i></span>',
        showConfirmButton: false,
        showCancelButton: false,
        backdrop:	`
                  linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                  center
                  no-repeat
                  `
      });
    }

    // Prüfe, welche Quell-Sprache gewählt wurde
    vonEnglisch = $('#qen').prop('checked'),
    vonDeutsch = $('#qde').prop('checked'),
    quellSprache = "";

    if(vonEnglisch === true) {
      quellSprache = $('#qen').val();
    } else if(vonDeutsch === true) {
      quellSprache = $('#qde').val();
    /*
      Sollte keine Quell-Sprache gewählt sein,
      was nicht vorkommen sollte, wird automatisch
      die englische Sprache gewählt
    */
    } else {
      quellSprache = 'en';
    }

    // Hole zu übersetzenden Text
    textSource = $('#textSource').val();

    // Zeige Lade Container
    $('#loader').show();

    // Korrigiere Reihenfolge des Sprachen-Arrays
    var zSprSortiert = ["bg", "zh-TW", "zh-CN", "da", "de", "en", "et", "fi", "fr", "el", "id", "it", "ja", "ko", "hr", "lv", "lt", "ms", "nl", "no", "pl", "pt", "pt-BR", "ro", "ru", "sv", "sr", "sk", "sl", "es", "th", "cs", "tr", "hu"];

    for(var i = 0; i < zSprSortiert.length; i++) {
      /*
       * Erstelle Array mit vorgegebener Sortierung
       * und entferne alle Werte, die sich nicht im
       * übergebenen Array befinden
       */
       if(sprachenArray.indexOf(zSprSortiert[i]) === -1) {
         zSprSortiert = $.grep(zSprSortiert, function(value) {
           return value != zSprSortiert[i]
         });
       }

       if(i == (zSprSortiert.length - 1)) {
        // Sortiere anschließend alle Array-Schlüssel neu
        zSprSortiert.filter(function(item) {
          return item != undefined
        }).join();

        // Übergebe korrigiertes Array an Original-Array
        sprachenArray = zSprSortiert;

        console.log(sprachenArray);
      }
    }

    // Beginne mit Senden der Anfragen
    sendeAnfrage(sprachenArray);

    // Debugging
    /*
    console.log("Zu übersetzender Text: ' + ''' + textSource + ''");
    console.log("Sprachen, in die übersetzt werden soll:\n\r");
    console.log(sprachenArray);
    */
  });
});

// Funktion zum Senden aller Anfragen
function sendeAnfrage(zielSprachen) {
  // Debugging
  // console.log("Erstanfrage: " + zielSprachen);

  $.ajax({
    type: "POST",
    url: "includes/uebersetze.ajax.php",
    data: {
      qSpr: quellSprache,
      zSpr: zielSprachen,
      text: textSource
    },
    // Anfrage an URL gesendet
    success: function(callback) {
      // Debugging
      // console.log("Callback: " + callback);

      try {
        var callbackObj = JSON.parse(callback);

        // Debugging
        // console.log("Callback Objekt: " + callbackObj);
      } catch(error) {}

      if($.isArray(callbackObj) === true) {
        // Gebe derzeitige Sprache als Überschrift aus
        var spracheUeberschrift = "";

        switch(sprachenArray[0]) {
          case "pt":
            var spracheUeberschrift = "portugiesisch";
          break;
          case "pt-BR":
            var spracheUeberschrift = "portugiesisch <em class=\"purpur\">(Brasilien)</em>";
          break;
          case "zh-CN":
            var spracheUeberschrift = "chinesisch <em class=\"purpur\">(VR China)</em>";
          break;
          case "zh-TW":
            var spracheUeberschrift = "chinesisch <em class=\"purpur\">(Taiwan)</em>";
          break;
          case "bg":
            var spracheUeberschrift = "bulgarisch";
          break;
          case "hr":
            var spracheUeberschrift = "kroatisch";
          break;
          case "cs":
            var spracheUeberschrift = "tschechisch";
          break;
          case "da":
            var spracheUeberschrift = "dänisch";
          break;
          case "nl":
            var spracheUeberschrift = "niederländisch";
          break;
          case "et":
            var spracheUeberschrift = "estnisch";
          break;
          case "fi":
            var spracheUeberschrift = "finnisch";
          break;
          case "fr":
            var spracheUeberschrift = "französisch";
          break;
          case "de":
            var spracheUeberschrift = "deutsch";
          break;
          case "en":
            var spracheUeberschrift = "englisch";
          break;
          case "el":
            var spracheUeberschrift = "griechisch";
          break;
          case "hu":
            var spracheUeberschrift = "ungarisch";
          break;
          case "id":
            var spracheUeberschrift = "indonesisch";
          break;
          case "it":
            var spracheUeberschrift = "italienisch";
          break;
          case "ja":
            var spracheUeberschrift = "japanisch";
          break;
          case "ko":
            var spracheUeberschrift = "koreanisch";
          break;
          case "lv":
            var spracheUeberschrift = "lettisch";
          break;
          case "lt":
            var spracheUeberschrift = "litauisch";
          break;
          case "ms":
            var spracheUeberschrift = "malaisisch";
          break;
          case "no":
            var spracheUeberschrift = "norwegisch";
          break;
          case "pl":
            var spracheUeberschrift = "polnisch";
          break;
          case "ro":
            var spracheUeberschrift = "rumänisch";
          break;
          case "ru":
            var spracheUeberschrift = "russisch";
          break;
          case "sr":
            var spracheUeberschrift = "serbisch";

            const convert = function(string) {
              var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
              var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')

              return string.split('').map(function(char) {
                var index = cyrillic.indexOf(char)

                if (!~index)
                  return char
                  return latin[index]
                }).join('')
            }

            // Soll in lat. Buchstaben dargestellt werden
            callbackObj[0] = convert(callbackObj[0]);
          break;
          case "sk":
            var spracheUeberschrift = "slowakisch";
          break;
          case "sl":
            var spracheUeberschrift = "slowenisch";
          break;
          case "es":
            var spracheUeberschrift = "spanisch";
          break;
          case "sv":
            var spracheUeberschrift = "schwedisch";
          break;
          case "th":
            var spracheUeberschrift = "thailändisch";
          break;
          case "tr":
            var spracheUeberschrift = "türkisch";
          break;
          default:
            var spracheUeberschrift = "deutsch";
          break;
        }

        // Debugging
        // console.log("Callback manipuliert: " + callbackObj);

        // Hole übersetzten Text auf Index 0 und hänge ihn an Container
        $('#ergebnis').html($('#ergebnis').html() + '<table width="100%" cellspacing="5px" cellpadding="0" border="0" class="bottom"><tr><td><fieldset class="uebersetzt"><legend>' + spracheUeberschrift + '</legend><textarea rows="5" name="uebersetzungErgebnis[]" id="' + sprachenArray[0] + '" class="uebersetzungErgebnis">' + callbackObj[0] + '</textarea><span class="kopierenContainer"><i class="fas fa-copy purpur kopierenIcon" data-clipboard-action="copy" data-clipboard-target="#' + sprachenArray[0] + '"></i></span></fieldset></td></tr></table>');

        // Debugging
        // console.log("Callback fertig für Rückgabe: " + callback);

        // Entferne ersten Wert aus Array
        sprachenArray = $.grep(sprachenArray, function(value) {
          return value != sprachenArray[0]
        });

        //	Sende Anfrage erneut nur wenn Elemente vorhanden sind
        if(sprachenArray.length > 0) {
          // Sende nächste Anfrage mit Versatz zwischen 500 und 2500ms
          var timeOut = Math.floor(Math.random() * (2500 - 500 + 1) + 500);

          // Debugging
          console.log("gesendet mit " + timeOut + "ms Versatz");

          setTimeout(sendeAnfrage(sprachenArray), timeOut);
        // Übersetzung beendet
        } else {
          // Öffne Status-Meldung über erfolgreiche Übersetzung
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });

          Toast.fire({
            type: 'success',
            title: '<span class="purpur">Übersetzung abgeschlossen!</span>',
          });

          // Blende Lade Animation aus
          $('#loader').hide();

          // Lösche Checkbox Auswahl
          $('.sprache').prop('checked', false);

          // Leere zu übersetzenden Text
          $('#textSource').val('');

          // Zeige "Alle"-Marker
          $('#zeigeAlle').show();

          // Verstecke "Keine"-Marker
          $('#zeigeKeine').hide();

          // Sperre übersetzen-Button
          $('#uebersetzen').prop('disabled', true);

          // Ändere Text
          $('#uebersetzen').text('Bitte mindestens eine Sprache auswählen!');
        }
      // Prüfe, ob Vorgang beendet oder Fehler
      } else if(callback === "vorgangBeendet") {
        // Öffne Status-Meldung über erfolgreiche Übersetzung
        Swal.fire({
          type: 'success',
          html: '<span class="purpur">Übersetzung abgeschlossen!</span> <i class="far fa-smile-beam"></i>',
          timer: 2500,
          showConfirmButton: false,
          showCancelButton: false,
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        });

        // Blende Lade Animation aus
        $('#ladeAnimation').hide();
      } else if(callback === "fehlerAnzahlProxies") {
        // Erfolg: Fehler
        if(erfolgeFreischalten == 1) {
          manageAchievements("troubleshooting");
        }

        // Keine ausreichenden Proxies vorhanden
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          type: 'error',
          title: 'Hoppla!',
          html: '<span class="purpur">Scheinbar reichen deine Proxies nicht aus, aber das macht nichts. Lade einfach die Seite neu und prüfe anschließend, ob du über ausreichend Proxies verfügst. Dazu klickst du auf den roten Ninja oben rechts.</span> <i class="far fa-laugh-beam"></i>',
          footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: fetchProxyNotReachable</em></span>',
          showConfirmButton: true,
          confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
          confirmButtonColor: 'rgb(145,11,67)',
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        }).then((result) => {
          if (result.value) {
            location.href = "index.php";
          }
        });
      } else if(callback === "fehlerParameter") {
        // Erfolg: Fehler
        if(erfolgeFreischalten == 1) {
          manageAchievements("troubleshooting");
        }

        // Parameter wurden ungültig übergeben
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          type: 'error',
          title: 'Hoppla!',
          html: '<span class="purpur">Das sollte jetzt nicht passieren! <i class="far fa-flushed"></i> Scheinbar gab es einen Fehler bei der Parameterübergabe. Bitte prüfe deine Angaben oder lade die Seite neu.</span> <i class="far fa-grin-beam-sweat"></i>',
          footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: invalidParameters</em></span>',
          showConfirmButton: true,
          confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
          confirmButtonColor: 'rgb(145,11,67)',
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        }).then((result) => {
          if (result.value) {
            location.href = "index.php";
          }
        });
      } else {
        // Erfolg: Fehler
        if(erfolgeFreischalten == 1) {
          manageAchievements("troubleshooting");
        }

        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          type: 'error',
          title: 'Hoppla!',
          html: '<span class="purpur">Gut also jetzt bin selbst ich überfragt. Was auch immer du gemacht hast, durfte nicht passieren.</span> <i class="far fa-dizzy"></i>',
          footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: oookayWTF?!</em></span>',
          showConfirmButton: true,
          confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
          confirmButtonColor: 'rgb(145,11,67)',
          backdrop:	`
                    linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                    center
                    no-repeat
                    `
        }).then((result) => {
          if (result.value) {
            location.href = "index.php";
          }
        });
      }
    },
    error: function (jqXHR, exception) {
      // Erfolg: Fehler
      if(erfolgeFreischalten == 1) {
        manageAchievements("troubleshooting");
      }

      var msg = '',
          cde = '';

      if(jqXHR.status === 0) {
        msg = 'Nicht verbunden. Überprüfe das Netzwerk.';
        cde = 0;
      } else if(jqXHR.status == 404) {
        msg = 'Angeforderte Seite nicht gefunden.';
        cde = 404;
      } else if(jqXHR.status == 500) {
        msg = 'Interner Serverfehler.';
        cde = 500;
      } else if(exception === 'parsererror') {
        msg = 'Angeforderte JSON-Analyse fehlgeschlagen.';
        cde = parsererror;
      } else if(exception === 'timeout') {
        msg = 'Timeout-Fehler.';
        cde = timeout;
      } else if(exception === 'abort') {
        msg = 'Ajax-Anfrage abgebrochen.';
        cde = abort;
      } else {
        msg = 'Nicht erfasster Fehler.';
        cde = jqXHR.responseText;
      }

      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        type: 'error',
        title: 'Hoppla!',
        html: '<span class="purpur">Fehler: ' + msg + '</span> <i class="far fa-frown"></i>',
        footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + cde + '</em></span>',
        showConfirmButton: true,
        confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
        confirmButtonColor: 'rgb(145,11,67)',
        backdrop:	`
                  linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                  center
                  no-repeat
                  `
      }).then((result) => {
        if (result.value) {
          location.href = "index.php";
        }
      });
    }
  });
}

function manageAchievements(erfolg) {
  $.ajax({
    type: 'POST',
    url: 'includes/manageAchievements.ajax.php',
    data: {
            'erfolg': erfolg
    },
    success: function(callback) {
        if(
            callback == "helloworld" ||
            callback == "initialtranslate" ||
            callback == "decadetranslate" ||
            callback == "centurytranslate" ||
            callback == "milleniumtranslate" ||
            callback == "decemmilleniumtranslate" ||
            callback == "ninja" ||
            callback == "troubleshooting" ||
            callback == "critical" ||
            callback == "maxelite" ||
            callback == "noelite" ||
            callback == "googlelock" ||
            callback == "bonuscatch" ||
            callback == "copypasta"
        ) {
          switch(callback) {
            case "helloworld":
              var text = "Hallo Welt!";
            break;
            case "initialtranslate":
              var text = "Erste Schritte";
            break;
            case "decadetranslate":
              var text = "Dolmetscher-Level: Amateur";
            break;
            case "centurytranslate":
              var text = "Dolmetscher-Level: Profi";
            break;
            case "milleniumtranslate":
              var text = "Dolmetscher-Level: Experte";
            break;
            case "decemmilleniumtranslate":
              var text = "Dolmetscher-Level: Legende";
            break;
            case "ninja":
              var text = "Angriff der Spionage-Nerds!";
            break;
            case "troubleshooting":
              var text = "It's not a bug! It's an undocumented feature!";
            break;
            case "critical":
              var text = "Warnung: Kritische Phase erreicht!";
            break;
            case "maxelite":
              var text = "Elite Proxies gesehen wär' das jetzt ein Lottogewinn.";
            break;
            case "noelite":
              var text = "Elite Proxies gesehen wärst du jetzt obdachlos.";
            break;
            case "googlelock":
              var text = "Heute Abend nur geschlossene Gesellschaft.";
            break;
            case "bonuscatch":
              var text = "Eifrige Helferlein - auch wenn sie nutzlos sind!";
            break;
            case "copypasta":
              var text = "STRG + C";
            break;
          }

          // Blende Erfolg ein
          achievementUnlocked(text);
        } else if(callback == "nichtNotwendig") {
          // Tue nichts
        } else if(callback == "fehlerSpeichernZaehler") {
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: false,
            type: 'error',
            title: 'Hoppla!',
            html: '<span class="purpur">Dein Erfolg konnte nicht aktualisiert werden! Bitte prüfe deine Internetverbindung. Ansonsten versuche es noch einmal!</span> <i class="far fa-frown"></i>',
            footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '/' + erfolg + '</em></span>',
            showConfirmButton: true,
            confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen <span style="font-size: small; color: rgb(145,11,67);">(und Erfolg verlieren)</span>',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if (result.value) {
              manageAchievements(erfolg);
            }
          });
        } else if(callback == "fehlerSpeichern") {
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: false,
            type: 'error',
            title: 'Hoppla!',
            html: '<span class="purpur">Dein Erfolg konnte nicht gespeichert werden! Bitte prüfe deine Internetverbindung. Ansonsten versuche es noch einmal!</span> <i class="far fa-frown"></i>',
            footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '/' + erfolg + '</em></span>',
            showConfirmButton: true,
            confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen <span style="font-size: small; color: rgb(145,11,67);">(und Erfolg verlieren)</span>',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if (result.value) {
              manageAchievements(erfolg);
            }
          });
        } else if(callback == "fehlerMailUnbekannt") {
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: false,
            type: 'error',
            title: 'Hoppla!',
            html: '<span class="purpur">Du bist entweder nicht (mehr) eingeloggt oder nicht registriert!</span> <i class="far fa-frown"></i>',
            footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '/MailUnbekannt</em></span>',
            showConfirmButton: true,
            confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Seite neu laden',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if (result.value) {
              location.href = "index.php";
            }
          });
        } else if(callback == "fehlerDatenbank") {
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: false,
            type: 'error',
            title: 'Hoppla!',
            html: '<span class="purpur">Dein Erfolg konnte nicht gespeichert werden! Bitte prüfe deine Internetverbindung. Ansonsten versuche es noch einmal!</span> <i class="far fa-frown"></i>',
            footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + callback + '/' + erfolg + '</em></span>',
            showConfirmButton: true,
            confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen <span style="font-size: small; color: rgb(145,11,67);">(und Erfolg verlieren)</span>',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if (result.value) {
              manageAchievements(erfolg);
            }
          });
        } else {
          Swal.fire({
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: false,
            type: 'error',
            title: 'Hoppla!',
            html: '<span class="purpur">Dein Erfolg konnte nicht gespeichert werden und ich weiß nicht warum. Was auch immer du gemacht hast, durfte nicht passieren.</span> <i class="far fa-dizzy"></i>',
            footer: '<span style="font-size; small;">Sollte das Problem nach Neuladen der Seite weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: oookayWTF?!/' + erfolg + '</em></span>',
            showConfirmButton: true,
            confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
            confirmButtonColor: 'rgb(145,11,67)',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen <span style="font-size: small; color: rgb(145,11,67);">(und Erfolg verlieren)</span>',
            cancelButtonColor: '#333',
            backdrop:	`
                      linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                      center
                      no-repeat
                      `
          }).then((result) => {
            if (result.value) {
              manageAchievements(erfolg);
            }
          });
        }
    },
    error: function (jqXHR, exception) {
      var msg = '',
          cde = '';

      if(jqXHR.status === 0) {
        msg = 'Nicht verbunden. Überprüfe das Netzwerk.';
        cde = 0;
      } else if(jqXHR.status == 404) {
        msg = 'Angeforderte Seite nicht gefunden.';
        cde = 404;
      } else if(jqXHR.status == 500) {
        msg = 'Interner Serverfehler.';
        cde = 500;
      } else if(exception === 'parsererror') {
        msg = 'Angeforderte JSON-Analyse fehlgeschlagen.';
        cde = parsererror;
      } else if(exception === 'timeout') {
        msg = 'Timeout-Fehler.';
        cde = timeout;
      } else if(exception === 'abort') {
        msg = 'Ajax-Anfrage abgebrochen.';
        cde = abort;
      } else {
        msg = 'Nicht erfasster Fehler.';
        cde = jqXHR.responseText;
      }

      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        type: 'error',
        title: 'Hoppla!',
        html: '<span class="purpur">Fehler: ' + msg + '</span> <i class="far fa-frown"></i>',
        footer: '<span style="font-size; small;">Sollte das Problem weiterhin bestehen, so kontaktiere den Webmaster!<br /><br /><em>Fehlercode: ' + cde + '/' + erfolg + '</em></span>',
        showConfirmButton: true,
        confirmButtonText: '<i style="color: #fff;" class="fas fa-redo"></i>&emsp;Anfrage erneut senden',
        confirmButtonColor: 'rgb(145,11,67)',
        showCancelButton: true,
        cancelButtonText: 'Abbrechen <span style="font-size: small; color: rgb(145,11,67);">(und Erfolg verlieren)</span>',
        cancelButtonColor: '#333',
        backdrop:	`
                  linear-gradient(145deg, rgba(205,205,205,.75), rgba(173,173,173,.75))
                  center
                  no-repeat
                  `
      }).then((result) => {
        if (result.value) {
          manageAchievements(erfolg);
        }
      });
    }
  });
}

function achievementUnlocked(text) {
  // https://codepen.io/killerek/pen/qqdZJp

  var hasClass = $('.ach').hasClass('achieved');
  if (hasClass) return;

  $('.title').html("Erfolg freigeschaltet!");
  $('.detail').html(text);
  $('.ach').addClass("achieved");

  setTimeout(function(){
    $('.ach').removeClass("achieved");
  }, 10000)
}
