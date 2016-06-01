<?
/**
* @package CORE
* @version: class_cache.php,v 0.4 2014/11/20 clatko
*/
/**
* Access to cache...
* @package CORE
* @access public
*/
class class_cache {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the ffs cache root
	* @var string
	* @access private
	*/
	private $ttl;
	/**
	* I am the fs cache root
	* @var string
	* @access private
	*/
	private $cache_path;
	/**
	* I am the connection resource
	* @var object
	* @access private
	*/
	private $redisObj;
	/**
	* I am the rest resource
	* @var object
	* @access private
	*/
	private $restObj;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_data constructor
	* @access public
	*/
	function __construct(class_redis $redisObj, class_rest $restObj, $cache_path = '', $ttl = '') {
		$this->redisObj = $redisObj;
		$this->restObj = $restObj;
		if($cache_path=='') { $cache_path = CACHE_DIR; }
		if($ttl=='') { $ttl = TTL; }
		
		$this->cache_path=$cache_path;
		$this->ttl=$ttl;
	}

	/**
	* class_data shutdown
	* @access public
	*/
	function __destruct() {}
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
		$key = $this->fudgeKey($key);

		// level 1 cache
		$this->setLevel1($key, $value, $ttl);
		
		// level 2 cache
		$this->setLevel2($key, $value);
	}

	/**
	* Gets the value
	* @param string key
	* @return string
	* @access public
	*/
	public function get($key) {
		// try level 1
		$json = $this->getLevel1($key);

		// then level 2
		if($json==null) {
			$json = $this->getLevel2($key);
			if($json!=null) {
				$this->setLevel1($key, $json);		// set just level 1
			}
		}

		
		// then level 3
		if($json==null) {
			$json = $this->getLevel3($key);
			if($json!=null) {
				$this->set($key, $json);			// set both level 1 and 2
			}
		}
		
		return $json;
	}

/*********************************************************
PRIVATE METHODS
**********************************************************/

	private function getLevel1($key) {
		$key = $this->fudgeKey($key);
		return $this->redisObj->get($key);
	}
	private function getLevel2($key) {
		$key = $this->fudgeKey($key);
		$json = null;
		$path = $this->cache_path.$key.'.json';
		if(file_exists($path)) {
			if(time() - filectime($path) < $this->ttl) {
				$json = file_get_contents($path);
			}
		}
		return $json;
	}
	private function getLevel3($key) {
		$result = $this->restObj->get($key);
		if($result['code']!=200) {
			// email or something
			return null;
		}

		if(!json_decode($result['body'])) {
			// email or something
			return null;
		}

		return $result['body'];
	}


	private function setLevel1($key, $value, $ttl=0) {
		if($ttl==0) {
			$ttl = $this->ttl;
		}
		$this->redisObj->set($key, $value, $ttl);
	}
	private function setLevel2($key, $value) {
		$path = $this->cache_path.$key.'.json';
		file_put_contents($path, $value);
	}

	// in honor of zap
	private function fudgeKey($key) {
		return str_replace('/', '|', $key);
	}
	private function unFudgeKey($key) {
		return str_replace('|', '/', $key);
	}

}
?>
