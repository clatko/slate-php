<?
$validation_array = array();
$field_array = array(
	'email'
);
foreach($field_array as $value) {
	$$value = (isset($_POST[$value])) ? trim($_POST[$value]) : '';
}

if(isset($_POST['email'])) {
	if($email == '') {
		$validation_array['email'] = 'Email is a required field.';
	} elseif(!$userObj->is_email($email)) {
		$validation_array['email'] = 'Email address must be valid.';
	}

	if(sizeof($validation_array) === 0) {
		if($authObj->checkEmail($email)) {
			$userObj->sendPassword($email);
		}
		header('Location: /login.pass_thankyou');
		exit;
	}
}
?>
