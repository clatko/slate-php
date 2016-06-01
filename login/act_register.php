<?
$validation_array = array();
$field_array = array(
	'company',
	'email',
	'password',

	'code'
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
	if($authObj->checkEmail($email)) {
		$validation_array['email'] = 'Email addresses is already in use.';
	}
	if($password == '') { $validation_array['password'] = 'Password is a required field.'; }
	if(strlen($password) < 6) {
		$validation_array['password'] = 'Password is too short.';
	}

	if(sizeof($validation_array) === 0) {
		$roles = array();
		$enabled_array = array(
			'key'		=> 'enabled',
			'value'		=> false
		);
		$company_array = array(
			'key'		=> 'company',
			'value'		=> $company
		);
		$roles_array = array(
			'key'		=> 'roles',
			'value'		=> $roles
		);
		$origin_array = array(
			'key'		=> 'origin',
			'value'		=> 'docs'
		);
		$modified_array = array(
			'key'		=> 'modified',
			'value'		=> time()
		);
		$new_array = array(
			'key'		=> 'new',
			'value'		=> true
		);
		
		$attributes_array = array(
			$enabled_array,
			$company_array,
			$roles_array,
			$origin_array,
			$modified_array,
			$new_array
		);
		$user_array = array(
			'username'		=>	$email,
			'email'			=>	$email,
			'password'		=>	$password,
			'attributes'	=>	$attributes_array
		);

		$userObj->create($user_array);
		header('Location: /login.thankyou');
		exit;
	}
}
?>
