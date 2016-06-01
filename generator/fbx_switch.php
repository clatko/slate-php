<?
$attributes['layout']='none';

switch($Fusebox['fuseaction']) {
	case 'index':
		include('act_index.php');
		break;

	case 'examples':
		include('act_examples.php');
		break;

	case 'pretty':
		$attributes['layout']='main';
		include('act_pretty.php');
		break;

	default:
		header('location: /error.404');
		break;
}
?>
