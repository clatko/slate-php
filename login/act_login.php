<?
$email = (isset($_POST['email'])) ? trim($_POST['email']): '';
$password = (isset($_POST['password'])) ? trim($_POST['password']): '';

if(!empty($email) && !empty($password)) {
	$authObj->login($email,$password,true);
	exit;
}
?>
