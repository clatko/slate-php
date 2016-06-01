<?
require_once('fbx_listfunctions.php');
require_once('fbx_savecontent.php');
ob_start('ob_gzhandler');
$Fusebox = array();
if(!isset($isModule)) { $isModule = false; }
$Fusebox['isCustomTag'] = ($isModule)?true:false;
$Fusebox['isHomeCircuit'] = false;
$Fusebox['isTargetCircuit'] = false;
$Fusebox['fuseaction'] = '';
$Fusebox['circuit'] = '';
$Fusebox['homeCircuit'] = '';
$Fusebox['targetCircuit'] = '';
$Fusebox['thisCircuit'] = '';
$Fusebox['thisLayoutPath'] = '';
$Fusebox['circuits'] = array();
$Fusebox['currentPath'] = '';
$Fusebox['rootPath'] = '';

$FB_ = array();

if(!isset($attributes) || !is_array($attributes)) {
	$attributes = array();
	$attributes = array_merge($_POST, $_GET);
}

include('fbx_circuits.php');

$FB_['reverseCircuitPath'] = array();
foreach($Fusebox['circuits'] as $aCircuitName => $aCircuitDefinition) {
	$FB_['reverseCircuitPath'][$aCircuitDefinition] = $aCircuitName;
	if(ListLen($Fusebox['circuits'][$aCircuitName], '/') == 1) {
		$Fusebox['homeCircuit'] = $aCircuitName;
		$Fusebox['isHomeCircuit'] = true;
	}
}

include('fbx_settings.php');

$FB_['rawFA'] = $attributes['fuseaction'];
if(ListLen($FB_['rawFA'], '.') == 1 && substr($FB_['rawFA'], -1) == '.') {
	$Fusebox['fuseaction'] = 'Fusebox.defaultFuseaction';
} else {
	$Fusebox['fuseaction'] = ListGetAt($FB_['rawFA'], 2, '.');
}
$Fusebox['circuit'] = ListGetAt($FB_['rawFA'], 1, '.');
$Fusebox['targetCircuit'] = $Fusebox['circuit'];

if(!array_key_exists($Fusebox['targetCircuit'],$Fusebox['circuits'])) {
	$Fusebox['targetCircuit'] = 'error';
}

$FB_['fullPath'] = ListRest($Fusebox['circuits'][$Fusebox['targetCircuit']], '/');
$FB_['corePath'] = '';
$Fusebox['thisCircuit'] = $Fusebox['homeCircuit'];
if(strlen($FB_['fullPath'])) {
	foreach(ListToArray($FB_['fullPath'], '/') as $aPath) {
		$FB_['corePath'] = ListAppend($FB_['corePath'], $aPath, '/');
		$Fusebox['isHomeCircuit'] = false;
		$Fusebox['currentPath'] = $FB_['corePath'] . '/';
		if(ListLen($Fusebox['currentPath'], '/') > 0) {
			$Fusebox['rootPath'] = str_repeat('../', ListLen($Fusebox['currentPath'], '/'));
		}
		$FB_['corePath'] = $FB_['corePath'] . '/';
		if(isset($FB_['reverseCircuitPath'][$Fusebox['circuits'][$Fusebox['homeCircuit']] . '/' . $FB_['corePath']])) {
			$Fusebox['thisCircuit'] = $FB_['reverseCircuitPath'][$Fusebox['circuits'][$Fusebox['homeCircuit']] . '/' . $FB_['corePath']];
			if($Fusebox['thisCircuit'] == $Fusebox['targetCircuit']) {
				$Fusebox['isTargetCircuit'] = true;
			} else {
				$Fusebox['isTargetCircuit'] = false;
			}
		}
		if(file_exists($FB_['corePath'].'fbx_settings.php')){
			include($FB_['corePath'].'fbx_settings.php');
		}
	}
}

$Fusebox['thisCircuit'] = $Fusebox['targetCircuit'];
$Fusebox['isTargetCircuit'] = true;
$FB_['fuseboxPath'] = $FB_['fullPath'];
if(strlen($FB_['fuseboxPath'])) {
	$FB_['fuseboxPath'] = $FB_['fuseboxPath'] . '/';
	$Fusebox['isHomeCircuit'] = false;
} else {
	$Fusebox['isHomeCircuit'] = true;
}
$Fusebox['currentPath'] = $FB_['fuseboxPath'];
if(ListLen($FB_['fuseboxPath'], '/') > 0) {
	$Fusebox['rootPath'] = str_repeat('../', ListLen($FB_['fuseboxPath'], '/'));
}
$FB_['SC'] = new SaveContent();
	$FB_['appRootPath'] = getcwd().'/';
	chdir($FB_['appRootPath'].$FB_['fuseboxPath']);
	include($FB_['appRootPath'].$FB_['fuseboxPath'].'fbx_switch.php');
	chdir($FB_['appRootPath']);
$Fusebox['layout'] = $FB_['SC']->close();

$FB_['circuitAlias'] = $Fusebox['circuits'][$Fusebox['targetCircuit']];
$FB_['layoutPath'] = $FB_['circuitAlias'];
while(strlen($FB_['layoutPath']) > 0) {
	$Fusebox['thisCircuit'] = (isset($FB_['reverseCircuitPath'][$FB_['circuitAlias']])) ? $FB_['reverseCircuitPath'][$FB_['circuitAlias']]: '';
	$Fusebox['isTargetCircuit'] = ($Fusebox['thisCircuit'] == $Fusebox['targetCircuit']) ? true: false;
	$Fusebox['isHomeCircuit'] = ($Fusebox['thisCircuit'] == $Fusebox['homeCircuit']) ? true: false;
	$Fusebox['thisLayoutPath'] = ListRest($FB_['layoutPath'], '/');
	if(strlen($Fusebox['thisLayoutPath']) > 0) {
		$Fusebox['thisLayoutPath'] = $Fusebox['thisLayoutPath'] . '/';
	}
	$Fusebox['currentPath'] = $Fusebox['thisLayoutPath'];
	if(ListLen($Fusebox['thisLayoutPath'], '/')) {
		$Fusebox['rootPath'] = str_repeat('../', ListLen($Fusebox['thisLayoutPath'], '/'));
	}
	if(file_exists($Fusebox['thisLayoutPath'].'fbx_layouts.php')) {
		include($Fusebox['thisLayoutPath'].'fbx_layouts.php');
	} else {
		$Fusebox['layoutFile'] = '';
		$Fusebox['layoutDir'] = '';
	}
	if(strlen($Fusebox['layoutFile']) > 0) {
		$FB_['SC'] = new SaveContent();
			include($Fusebox['thisLayoutPath'].$Fusebox['layoutDir'].$Fusebox['layoutFile']);
		$Fusebox['layout'] = $FB_['SC']->close();
	}
	$FB_['layoutPath'] = ListDeleteAt($FB_['layoutPath'], ListLen($FB_['layoutPath'], '/'), '/');
	$FB_['circuitAlias'] = ListDeleteAt($FB_['circuitAlias'], ListLen($FB_['circuitAlias'], '/'), '/');
}

echo trim($Fusebox['layout']);
ob_flush();
flush();
exit(0);
?>
