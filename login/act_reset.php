<?
$validation_array = array();
$field_array = array(
	'email',
	'key',
	'password'
);
foreach($field_array as $value) {
	$$value = (isset($attributes[$value])) ? trim($attributes[$value]) : '';
}

if(isset($_POST['email'])) {
	if($email == '') { $validation_array['password'] = 'Invalid request (sorry).'; }
	if($key == '') { $validation_array['password'] = 'Invalid request (sorry).'; }
	if($password == '') { $validation_array['password'] = 'Password is a required field.'; }
	if(strlen($password) < 6) {
		$validation_array['password'] = 'Password is too short.';
	}

	if(sizeof($validation_array) === 0) {
		if($authObj->checkEmail($email)) {
			$authObj->setValue('result', ($userObj->updatePassword($email, $key, $password)) ? 'We updated your password.': 'Oops. Something went wrong.');
		}

		header('Location: /login.reset_thankyou');
		exit;
	}
}
?>
