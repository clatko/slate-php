<?
/**
* @package CORE
* @version: class_redis.php,v 0.4 2014/03/20 clatko
*/
/**
* Access to redis...
* @package CORE
* @access public
*/
class class_redis {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the host
	* @var string
	* @access private
	*/
	private $host;
	/**
	* I am the Redis DB
	* @var string
	* @access private
	*/
	private $db;
	/**
	* I am the user
	* @var string
	* @access private
	*/
	private $user;
	/**
	* I am the password
	* @var string
	* @access private
	*/
	private $pass;
	/**
	* I am the connection resource
	* @var object
	* @access private
	*/
	private $redisObj;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_data constructor
	* @access public
	*/
	function __construct($host='',$port='',$db='',$user='',$pass='') {
		if($host=='') { $host = DB_HOST; }
		if($host=='') { $host = DB_PORT; }
		if($db=='') { $db = DB_DB; }
		if($user=='') { $user = DB_USER; }
		if($pass=='') { $pass = DB_PASS; }
		
		$this->host=$host;
		$this->db=$db;
		$this->user=$user;
		$this->pass=$pass;
		
		$this->dbConnect();
	}

	/**
	* class_data shutdown
	* @access public
	*/
	function __destruct() {
		$this->redisObj->close();
	}
/*********************************************************
PUBLIC METHODS
**********************************************************/
	/**
	* Inserts the key/value
	* @param string key
	* @param string value
	* @param int ttl
	* @return void
	* @access public
	*/
	public function set($key, $value, $ttl=0) {
		$this->redisObj->set($key, $value);
		if($ttl>0) {
			$this->redisObj->setTimeout($key, $ttl);
		}
	}

	/**
	* Sets the timeout (passthrougk)
	* @param string key
	* @param int ttl
	* @return void
	* @access public
	*/
	public function setTimeout($key, $ttl=0) {
		if($ttl>0) {
			$this->redisObj->setTimeout($key, $ttl);
		}
	}

	/**
	* Gets the value
	* @param string key
	* @return string|boolean
	* @access public
	*/
	public function get($key) {
		return $this->redisObj->get($key);
	}

	/**
	* Rename a key
	* @param string old key name
	* @param string new key name
	* @return void
	* @access public
	*/
	public function rename($old, $new) {
		return $this->redisObj->rename($old, $new);
	}

	/**
	* Get all keys that match
	* @param string search
	* @return void
	* @access public
	*/
	public function keys($search) {
		return $this->redisObj->keys($search);
	}

	/**
	* Get all values for keys that match
	* @param string search
	* @return void
	* @access public
	*/
	public function values($search, $strip=true) {
		$key_array = $this->redisObj->keys($search);
		$ret_array = array();
		if(is_array($key_array) && count($key_array)>0) {
			foreach($key_array as $v) {
				if($strip) {
					$ret_array[] = str_replace(substr($search,0,-1), '', $v);
				} else {
					$ret_array[] = $this->get($v);
				}
			}
		}
		return $ret_array;
	}

	/**
	* Fuzzies the string
	* @param string string to fuzzy
	* @return string fuzzy string
	* @access public
	*/
	public function fuzzify($string) {
		$string = transliterator_transliterate('Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC; [:Punctuation:] Remove; Lower();', $string);
		$string = preg_replace('/\(.*?\)/i', '', $string);
		$string = preg_replace('~[^\p{L}\p{N}]++~u', '', $string);
		$string = preg_replace('/[0-9](nd|th|st|rd)?/i', '', $string);
		return strtolower($string);
	}

/*********************************************************
PRIVATE METHODS
**********************************************************/
	/**
	* Establishes the DB connection
	* @return void
	* @access private
	*/
	private function dbConnect() {
		$this->redisObj = new Redis();
		$this->redisObj->connect(DB_HOST, DB_PORT);
		
		// add password stuff
		
		$this->redisObj->select($this->db);
	}
}
?>
