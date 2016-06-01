<?
$attributes['layout']='none';

switch($Fusebox['fuseaction']) {
	case 'index':
		include('act_index.php');
		break;

	default:
		header('location: /error.404');
		break;
}
?>
