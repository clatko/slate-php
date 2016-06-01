<?
$attributes['layout']='main';

switch($Fusebox['fuseaction']) {
	case 'index':
	case 'php':
		include('act_index.php');
		break;

	default:
		header('location: /error.404');
		break;
}
?>
