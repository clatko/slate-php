<?
if(!class_exists('SaveContent')) {
	class SaveContent {
		var $content;
		
		function SaveContent() {
			ob_start();
		}
		function clear() {
			ob_end_clean();
		}

		function forward($location) {
			ob_end_clean();
			header('Location: '.$location);
			exit;
		}

		function close() {
			$buf = ob_get_contents();
			ob_end_clean();
			return $buf;
		}
		
		function module($filePath, $attributes) {
			$isModule = true;
			$myPath = getcwd().'/';
			$aryPath = split('/', $filePath);
			$fileName = array_pop($aryPath);
			$modPath = join('/', $aryPath);
			chdir($myPath.$modPath);
			include($fileName);
			chdir($myPath);
			$this->content = $this->close();
		}
	}
}
?>
