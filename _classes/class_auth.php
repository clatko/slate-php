<?
/**
* @package CORE
* @version: class_auth.php,v 0.4 2004/08/11 clatko
*/
/**
* The session auth for logged in users...
* @package CORE
* @access public
*/
class class_auth {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* rest object to access central authority
	* @var object
	* @access private
	*/
	private $restObj;
	/**
	* Location to redirect to on a login success.
	* @var string
	* @access private
	*/
	private $success;
	/**
	* Location to redirect to on a login failure.
	* @var string
	* @access private
	*/
	private $failure;
	/**
	* Hashkey for the md5 encryption - currently this is always '*******'
	* @var string
	* @access private
	*/
	private $hashkey;
	/**
	* central authority path (dev for now)
	* @var string
	* @access private
	*/
	private $ca_path;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_auth constructor
	* @param object database connector
	* @param string location to redirect on login success.
	* @param string location to redirect on login failure.
	* @param string hashkey for md5 encryption.
	* @param boolean if we should md5 the stored password.
	* @access public
	*/
	function __construct(class_rest $restObj, $success, $failure, $hashkey) {
		session_name('sample-api');
		session_start();
		$this->restObj = $restObj;
		$this->success = $success;
		$this->failure = $failure;
		$this->hashkey = $hashkey;
		$this->ca_path = CA_PATH;
	}
/*********************************************************
PUBLIC METHODS
**********************************************************/
////////////////////////////// SET/GET METHODS START
	/**
	* Gets specified name
	* @param string name to get
	* @return mixed value of the name
	* @access public
	*/
	public function getValue($name) {
		if(isset($_SESSION[$name])) {
			return $_SESSION[$name];
		} else {
			return false;
		}
	}

	/**
	* Sets specified name
	* @param string name to set
	* @param string value to set name to
	* @return void
	* @access public
	*/
	public function setValue($name,$value) {
		$_SESSION[$name] = $value;
	}

	/**
	* Deletes session value
	* @param string name of session name to delete
	* @return mixed returns false if delete fails
	* @access public
	*/
	public function delValue($name) {
		if(isset($_SESSION[$name])) {
			unset($_SESSION[$name]);
		} else {
			return false;
		}
	}
////////////////////////////// SET/GET METHODS END


////////////////////////////// CORE METHODS START
	/**
	* Checks if the user has proper credentials
	* @param boolean if the user should be redirected if login fails
	* @return mixed true if user passes, redirects if not
	* @access public
	*/
	public function checkStatus($redirect=true,$location=false) {
		if(!$location) {
			$location = $this->failure;
		}
		if($this->getValue('email') && $this->getValue('email')!='') {
			if($this->getValue('timestamp') && (date('U') - $this->getValue('timestamp')) > EXPIREINSECONDS) {
				$this->setValue('error','Your session has expired.');
				$this->logout();
			} else {
				$this->setValue('timestamp',date('U'));
				return true;
			}
		} else {
			if($redirect) {
				$this->redirect($location,true);
			} else {
				return false;
			}
		}
	}

	/**
	* Checks if email already exists
	* @param string email
	* @return boolean
	* @access public
	*/
	public function checkEmail($email) {
		// construct json
		$requestObj = new stdClass;
		$requestObj->email = $email;
		$request = json_encode($requestObj);

		// rest up
		$output = $this->restObj->post($this->ca_path.'/find', $request);
		$result = json_decode($output['body'],true);

		return (count($result)>=1);
	}

	/**
	* Checks email and password against Central Auth
	* @param string email
	* @param string password
	* @return mixed redirects user to $this->success or $this->failure
	* @access public
	*/
	public function login($email,$password,$redirect=true,$success='',$failure='') {
		$auth = true;
		$secretKey = '';

		$success = ($success=='') ? $this->success: $success;
		$failure = ($failure=='') ? $this->failure: $failure;
		if($email=='' || $password=='') {
			if($redirect) { $this->redirect($failure); }
		}

		// add to session in case of redirect to login
		$this->setValue('email',$email);
		$this->setValue('password',$password);

		// construct json for auth
		// 1) find the man
		$requestObj = new stdClass;
		$requestObj->email = $email;
		$requestObj->password = $password;
		$request = json_encode($requestObj);

		$output = $this->restObj->post($this->ca_path.'/auth', $request);
		$result = json_decode($output['body'],true);
		
		if($output['code']==400) {
			$auth = false;
			$this->setValue('error',$result['message']);
		}

		// check if account is enabled
		if($auth && !$this->getAttribute('enabled', $result)) {
			$auth = false;
			$this->setValue('error','Your account is not yet enabled.');
		}

		if($auth) {
			$this->storeAuth($email, $password, $this->getAttribute('secretKey', $result));
			$this->setValue('timestamp',date('U'));
			if($redirect) { $this->redirect($success); }
		} else {
			if($redirect) { $this->redirect($failure); }
		}
		
	}

	/**
	* Logs user out of the system
	* @param boolean (optional) if we should redirect
	* @param string (optional) location of redirect
	* @return void
	* @access public
	*/
	public function logout($redirect=true,$location='failure') {
		$this->delValue('email');
		$this->delValue('password');
		$this->delValue('login_hash');
		$this->delValue('timestamp');
		$_SESSION = array();
		session_destroy();
		if($redirect) {
			if($location=='failure') {
				$this->setValue('error','You logged out.');
				$location = $this->failure;
			}
			$this->redirect($location,true);
		}
	}
////////////////////////////// CORE METHODS END
/*********************************************************
PRIVATE METHODS
**********************************************************/
	/**
	* Extract attribute from user obj
	* @param string attribute name
	* @param object user array
	* @return string
	* @access private
	*/
	private function getAttribute($name, $user) {
		$retString = '';
		foreach($user['attributes'] as $v) {
			if($v['key']==$name) {
				$retString = $v['value'];
			}
		}
		return $retString;
	}
	
	/**
	* Stores authentication credentials
	* @param string email
	* @param string password
	* @return void
	* @access private
	*/
	private function storeAuth($email, $password, $secretKey) {
		$this->setValue('email',$email);
		$this->setValue('password',$password);
		$this->setValue('secretKey',$secretKey);
		$hashkey = md5($this->hashkey.$email.$password.$secretKey);
		$this->setValue('login_hash',$hashkey);
	}

	/**
	* Redirects the user to success/failure/from pages
	* @return void
	* @access private
	*/
	private function redirect($location) {
		header('Location: '.$location);
		exit();
	}
}
?>
