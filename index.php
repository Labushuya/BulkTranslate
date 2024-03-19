<?php
	// Starte Session
	if(session_status() == PHP_SESSION_NONE) {
		session_start();
	}

	if(!isset($_SESSION['login']) || $_SESSION['login'] == "") {
		$_SESSION['login'] = "";

		// Zeige Login
		$login =	"";

		// Verberge Logout
		$logout = "style=\"display: none;\"";

		// Erfolge blockieren
		$erfolgeFreischalten = 0;
	} else {
		// Zeige Logout
		$login =	"style=\"display: none;\"";

		// Verberge Login
		$logout = "";

		// Erfolge freischalten
		$erfolgeFreischalten = 1;
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Massen-Übersetzer</title>

		<meta name="description" content="Bulk Translation">
		<meta name="author" content="Ultraviolent (www.mindsources.net)" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width">

		<!-- FontAwesome -->
		<link type="text/css" rel="stylesheet" href="assets/css/all.css" />
		<link type="text/css" rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body>
		<div id="container">
			<table width="100%" cellspacing="5px" cellpadding="0" border="0">
				<tr>
					<td>
						<fieldset>
							<textarea cols="90" rows="5" name="uebersetzung" id="textSource" placeholder="Was übersetzen wir heute?"></textarea>
							<br />
							<br />
							<table class="inhalt" width="100%" cellspacing="5px" cellpadding="0" border="0">
								<tr>
									<td><span class="purpur">Quellsprache</span></td>
									<td colspan="3">&nbsp;</td>
								</tr>
								<tr>
									<td><input type="radio" name="qsprache" id="qde" /><span> deutsch</span></td>
									<td><input type="radio" name="qsprache" id="qen" value="en" checked /><span> englisch</span></td>
									<td align="right"><span id="wenigEliteProxies" class="pulse" style="display: none; border: 1px solid rgb(145,11,67); color: rgb(145,11,67); padding: 5px; font-weight: bold;"><i class="purpur fas fa-ban"></i> Nutzung zur Zeit riskant!</span></td>
									<td align="right"><i id="proxyStatus" class="fas fa-user-ninja" style="display: none;"></i></td>
								</tr>
								<tr>
									<td colspan="4">&nbsp;</td>
								</tr>
								<tr>
									<td><span class="purpur">Zielsprache</span></td>
									<td colspan="3">&nbsp;</td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="bg" class="sprache" /><span> bulgarisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="id" class="sprache" /><span> indonesisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="nl" class="sprache" /><span> niederländisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="sr" class="sprache" /><span> serbisch</span> (lat.)</td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="zh-TW" class="sprache" /><span> chinesisch</span> (<em>Taiwan</em>)</td>
									<td><input type="checkbox" name="sprache[]" value="it" class="sprache" /><span> italienisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="no" class="sprache" /><span> norwegisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="sk" class="sprache" /><span> slowakisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="zh-CN" class="sprache" /><span> chinesisch</span> (<em>VR China</em>)</td>
									<td><input type="checkbox" name="sprache[]" value="ja" class="sprache" /><span> japanisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="pl" class="sprache" /><span> polnisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="sl" class="sprache" /><span> slowenisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="da" class="sprache" /><span> dänisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="ko" class="sprache" /><span> koreanisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="pt" class="sprache" /><span> portugiesisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="es" class="sprache" /><span> spanisch</span></td>
								</tr>
								<tr>
									<td>
										<span id="zuDeutsch">
											<input type="checkbox" name="sprache[]" value="de" id="de" class="sprache" /><span> deutsch</span>
										</span>
										<span id="zuEnglisch" style="display: none;">
											<input type="checkbox" name="sprache[]" value="en" id="en" /><span> englisch</span>
										</span>
									</td>
									<td><input type="checkbox" name="sprache[]" value="hr" class="sprache" /><span> kroatisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="pt-BR" class="sprache" /><span> portugiesisch</span> (<em>Brasilien</em>)</td>
									<td><input type="checkbox" name="sprache[]" value="th" class="sprache" /><span> thailändisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="et" class="sprache" /><span> estnisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="lv" class="sprache" /><span> lettisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="ro" class="sprache" /><span> rumänisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="cs" class="sprache" /><span> tschechisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="fi" class="sprache" /><span> finnisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="lt" class="sprache" /><span> litauisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="ru" class="sprache" /><span> russisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="tr" class="sprache" /><span> türkisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="fr" class="sprache" /><span> französisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="ms" class="sprache" /><span> malaisisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="sv" class="sprache" /><span> schwedisch</span></td>
									<td><input type="checkbox" name="sprache[]" value="hu" class="sprache" /><span> ungarisch</span></td>
								</tr>
								<tr>
									<td><input type="checkbox" name="sprache[]" value="el" class="sprache" /><span> griechisch</span></td>
									<td colspan="3">&nbsp;</td>
								</tr>
								<tr>
									<td colspan="4"><hr /></td>
								</tr>
								<tr>
									<td>
										<span id="zeigeAlle">
											<input type="checkbox" name="sprache[]" value="alle" id="alle" /> <span class="purpur">Alle</span>
										</span>
										<span id="zeigeKeine" style="display: none;">
											<input type="checkbox" value="keine" id="keine" /> <span class="purpur">Keine</span>
										</span>
									</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</table>
							<br />
							<button type="button" id="uebersetzen" disabled>Bitte mindestens eine Sprache auswählen!</button>
						</fieldset>
					</td>
				</tr>
			</table>
			<p class="top bottom" id="ergebnis">
				<!-- Hier werden alle Übersetzungen nacheinander eingefügt -->
			</p>
			<table width="100%" cellspacing="5px" cellpadding="0" border="0" id="loader" style="display: none !important;">
				<tr>
					<td>
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent none repeat scroll 0% 0%; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							<path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#910b43" stroke="none">
								<animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
							</path>
						</svg>
					</td>
				</tr>
			</table>
			<!-- Container Erfolge -->
			<div class="ach">
				<div class="icon"><i class="fa fa-flag" aria-hidden="true"></i></div>
				<div class="text_wrap">
					<p class="title">Button Clicker!</p>
					<span class="detail">you clicked a button</span>
				</div>
			</div>
			<!-- Login -->
			<a href="#" class="float" id="login" <?php echo $login; ?>>
				<i class="fas fa-sign-in-alt floatIcon"></i>
			</a>

			<a href="#" class="float" id="logout" <?php echo $logout; ?>>
				<i class="fas fa-sign-out-alt floatIcon"></i>
			</a>
		</div>
	</body>
	<script>
		var erfolgeFreischalten = '<?php echo $erfolgeFreischalten; ?>';
	</script>
	<script src="assets/js/jQuery-3.4.1.min.js"></script>
	<script src="assets/js/sweetalert2.min.js"></script>
	<script src="assets/js/clipboard.min.js"></script>
	<script src="assets/js/runtime.js"></script>
</html>
