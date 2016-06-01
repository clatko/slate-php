<?
if(!isset($attributes['layout'])) {
	$attributes['layout']='';
}

$Fusebox['layoutDir'] = 'layouts/';

switch($attributes['layout']) {
	case 'main':
		$Fusebox['layoutFile'] = 'lay_main.php';
		break;

	case 'login':
		$Fusebox['layoutFile'] = 'lay_login.php';
		break;

	case 'none':
		$Fusebox['layoutFile'] = 'lay_none.php';
		break;
}
?>