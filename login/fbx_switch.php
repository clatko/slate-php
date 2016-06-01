<?
switch($Fusebox['fuseaction']) {
	case 'login':
		$attributes['layout']='login';
		include('act_login.php');
		include('dsp_login.php');
		break;

	case 'register':
		$attributes['layout']='login';
		include('act_register.php');
		include('dsp_register.php');
		break;

	case 'password':
		$attributes['layout']='login';
		include('act_password.php');
		include('dsp_password.php');
		break;

	case 'reset':
		$attributes['layout']='login';
		include('act_reset.php');
		include('dsp_reset.php');
		break;

	case 'reset_thankyou':
		$attributes['layout']='login';
		include('dsp_reset_thankyou.php');
		break;

	case 'pass_thankyou':
		$attributes['layout']='login';
		include('dsp_pass_thankyou.php');
		break;

	case 'thankyou':
		$attributes['layout']='login';
		include('dsp_thankyou.php');
		break;

	case 'logout':
		$attributes['layout']='none';
		include('act_logout.php');
		break;

	default:
		header('location: /error.404');
		break;
}
?>
