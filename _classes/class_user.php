<?
/**
* @package CORE
* @version: class_user.php,v 0.4 2015/01/07 clatko
*/
/**
* All user changes are done through the class.
* @package CORE
* @access public
*/
class class_user {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the rest access to api
	* @var object composite obj
	* @access private
	*/
	private $restObj;
	/**
	* array of allowed fields
	* @var object
	* @access private
	*/
	private $field_array = array(
		'id',
		'username',
		'email',
		'password',
		'attributes'
	);
	/**
	* central authority path
	* @var string
	* @access private
	*/
	private $ca_path;
	/**
	* api access path
	* @var string
	* @access private
	*/
	private $access_path;
	/**
	* forgot password path
	* @var string
	* @access private
	*/
	private $forgot_path;
	/**
	* Hashkey for the md5 encryption - currently this is always '*******'
	* @var string
	* @access private
	*/
	private $hashkey;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_users constructor
	* @access public
	*/
	function __construct(class_rest $restObj, $hashkey) {
		$this->restObj = $restObj;
		$this->ca_path = CA_PATH;
		$this->access_path = ACCESS_PATH;
		$this->forgot_path = FORGOT_PATH;
		$this->hashkey = $hashkey;
	}
/*********************************************************
CRUD
**********************************************************/

	/**
	* Create a user
	* @param manipulated POST array
	* @return resource
	* @access public
	*/
	public function create(array $array) {
		$request = json_encode($array);
		$output = $this->restObj->post($this->ca_path, $request);
		$result = json_decode($output['body'],true);

		// send api access request
		if(isset($result['id'])) {
			$request = json_encode($result);
			$output = $this->restObj->post($this->access_path, $request);
		}
		return $userId;		
	}

	/**
	* Send forgotten password reset to user
	* @param string email of user
	* @access public
	*/
	public function sendPassword($email) {
		$key = $this->generateKey($email, true);

		// construct json
		$requestObj = new stdClass;
		$requestObj->email = $email;
		$requestObj->key = $key;
		$request = json_encode($requestObj);

		// rest up
		$output = $this->restObj->post($this->forgot_path, $request);
		$result = json_decode($output['body'],true);

		// we don't care about the result...
	}


	/**
	* Send forgotten password reset to user
	* @param string email of user
	* @access public
	*/
	public function updatePassword($email, $key, $password) {
		$success = false;
		$newKey = $this->generateKey($email, true);
		$newKey2 = $this->generateKey($email, false);
		
		if($key==$newKey || $key==$newKey2) {
			// get user

			// construct json
			$requestObj = new stdClass;
			$requestObj->email = $email;
			$request = json_encode($requestObj);

			$output = $this->restObj->post($this->ca_path.'/find', $request);
			
			if($output['code']==200) {
				$result = json_decode($output['body'],true);
				if(count($result)==1) {
					$result[0]['password'] = $password;
					$request = json_encode($result[0]);
					$output = $this->restObj->put($this->ca_path.'/'.$result[0]['id'], $request);
					$success = true;
				}
			}
		}
	
		return $success;
	}


/*********************************************************
PRIVATE
**********************************************************/
	/**
	* generate forgot password hash
	* @param string
	* @return array
	* @access public
	*/
	private function generateKey($email, $thisHour) {
		$key = ($thisHour) ? hash('sha256', date('Y-m-d:H').$this->hashkey.$email): hash('sha256', date('Y-m-d:H', time() - 3600).$this->hashkey.$email);
		return $key;
	}


/*********************************************************
UTILITIES
**********************************************************/
	/**
	* Determines if an email address is valid
	* @param string email
	* @return string public
	* @access public
	*/
	public function is_email($email) {
		return filter_var($email,FILTER_VALIDATE_EMAIL); 
	}


}
?>
