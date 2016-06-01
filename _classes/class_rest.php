<?
/**
* @package CORE
* @version: class_rest.php,v 0.4 2013/08/06
*/
/**
* The rest layer
* @package CORE
* @access public
*/
class class_rest {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the core
	* @var object
	* @access private
	*/
	const RESPONSE_CODE = 'code';
	const RESPONSE_OBJ = 'body';

	private $user;
	private $pass;
	private $grant;
	private $token;
	private $accept;
	private $oAuthPath;
	private $restUrl;
	private $curl_opts;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_rest constructor
	* @param object database connector
	* @param string location to redirect on login success.
	* @param string location to redirect on login failure.
	* @param string hashkey for md5 encryption.
	* @param boolean if we should md5 the stored password.
	* @access public
	*/
	function __construct($restUrl) {
		$this->restUrl = $restUrl;
		$this->oAuthPath = OAUTH_PATH;
		$this->user = OAUTH_USER;
		$this->pass = OAUTH_PASS;
		$this->grant = OAUTH_GRANT;
		$this->accept = API_ACCEPT;
		
		$options = array(
			 CURLOPT_RETURNTRANSFER => true
		);

		$this->curl_opts = $options;
	}
/*********************************************************
PUBLIC METHODS
**********************************************************/
	public function post($path, $json = '', $ignore_errors = FALSE, $header = null, $url = null) {
		$session = $this->newCurl($path, $url);

		// http_build_query
		$query_string = $this->generateQueryString($json);
		curl_setopt($session, CURLOPT_POST, TRUE);
		curl_setopt($session, CURLOPT_POSTFIELDS, $query_string);

		if($header!=null) {
			curl_setopt($session, CURLOPT_HTTPHEADER, $header);
		}
		
//		echo 'curl -d "'.$json.'" '.$url.$path;
		return $this->exec($session, $ignore_errors);
	}

	public function put($path, $json = '', $header = null, $url = null) {
		$session = $this->newCurl($path, $url);

		$query_string = $this->generateQueryString($json);
		curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'PUT');
		curl_setopt($session, CURLOPT_POSTFIELDS, $query_string);
		if($header!=null) {
			curl_setopt($session, CURLOPT_HTTPHEADER, $header);
		}

		return $this->exec($session);
	}

	public function get($path, $ignore_errors = FALSE, $header = null, $url = null) {
		// TODO: add params
		$session = $this->newCurl($path, $url);
		if($header!=null) {
			curl_setopt($session, CURLOPT_HTTPHEADER, $header);
		}

//		echo 'curl -i -w -v -H "'.implode('',$header).'" -X GET "'.$path.'"';

		return $this->exec($session, $ignore_errors);
	}

	public function delete($path, $header = null, $url = null) {
		// TODO: add params
		$session = $this->newCurl($path, $url);
		curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'DELETE');
		if($header!=null) {
			curl_setopt($session, CURLOPT_HTTPHEADER, $header);
		}

		return $this->exec($session);
	}

	public function head($path, $ignore_errors = FALSE, $header = null, $url = null) {
		// TODO: add params
		$session = $this->newCurl($path, $url);
		curl_setopt($session, CURLOPT_NOBODY, TRUE);
		if($header!=null) {
			curl_setopt($session, CURLOPT_HTTPHEADER, $header);
		}
		
		return $this->exec($session, $ignore_errors);
	}

/*********************************************************
PRIVATE METHODS
**********************************************************/
	/**
	* Stores authentication credentials
	* @param string userID
	* @param string username
	* @param string email
	* @param string password
	* @return void
	* @access private
	*/
	private function newCurl($path, $baseUrl, $type=null) {
		$requestUrl = ($baseUrl===NULL) ? $this->restUrl.$path: $baseUrl.$path;
		$session = curl_init($requestUrl);
		curl_setopt_array($session, $this->curl_opts);
		return $session;
	}

	private function exec($session, $ignore_errors = FALSE) {
		$start = microtime(TRUE);
		$response = $this->wrapped_curl_exec($session);
		$response_code = curl_getinfo($session, CURLINFO_HTTP_CODE);

		if($response_code == 401) {
			// get a token
			$params = array(
				'client_id'		=>	$this->user,
				'client_secret'	=>	$this->pass,
				'grant_type'	=>	$this->grant
			);

			$auth = $this->post($this->oAuthPath, $params, FALSE, null, $this->restUrl);

			// see if oauth gave us a valid response
			if($auth['code']!=200) {
				echo 'oops ... oauth failed with http code: '.$auth['http_code'];
				return false;
			}

			// check to make sure we get a token
			$payload = json_decode($auth['body']);
			if(!isset($payload->access_token) || $payload->access_token=='') {
				echo 'oops... no bearer token found.';
				return false;
			}

			$this->token = $payload->access_token;
			
			// TODO: could use curl_getinfo with CURLINFO_HEADER_OUT to merge headers
			$mail_header = array(
				'Authorization: Bearer '.$this->token,
				'Accept: '.$this->accept
			);
			curl_setopt($session, CURLOPT_HTTPHEADER, $mail_header);
			$response = $this->wrapped_curl_exec($session);
			$response_code = curl_getinfo($session, CURLINFO_HTTP_CODE);
		}
		
		// 503 - retry
		// exponential backoff will stop if sleeptime goes above curl timeout
		$retryTimedOut = FALSE;
		$retryCount = 0;
		$log503error = FALSE;
		$sleepTime = 10000; // in microseconds
		while($response_code == 503 && !$retryTimedOut) {
			$log503error = TRUE;
			$retryCount++;
			// retry
			$response = $this->wrapped_curl_exec($session);
			$response_code = curl_getinfo($session, CURLINFO_HTTP_CODE);
			// keep retrying for 500ms or a 503 response, whichever comes first
			$retryTimedOut = (microtime(TRUE) - $start > 0.5);
			// sleep for 10ms between retries
			usleep($sleepTime);
			// double the sleep time every iteration
			$sleepTime *= 2;
		}
		
		// only log if it failed after the last retry
		if ($log503error && $response_code == 503) {
			$info = curl_getinfo($session);
			$url = isset($info['url']) ? $info['url'] : 'fail';
			error_log("(RE) API error: 503 on first attempt - retryCount=$retryCount - ($response_code) response=$response - url=[$url]");
		}

		// log curl errors
		if(curl_errno($session) != 0) {
			error_log('(II) Curl Error: ' . curl_error($session));

			$response = $this->wrapped_curl_exec($session);
			$response_code = curl_getinfo($session, CURLINFO_HTTP_CODE);

			if(curl_errno($session) != 0) {
				error_log('(II) Curl Error: ' . curl_error($session));
			}
		}
		
		//
		// will have to deal with these
		//		
		// 200 - ok
		// 400 - bad request
		// 404 - not found
		// 405 - method not allowed
		// 406 - not acceptable
		// 409 - id already exists
		// 415 - unsupported media type
		// 500 - internal server error
		// 503 - retry
		if ($response_code != 200) {
			if ($response_code >= 400 && $response_code < 500 && $response_code != 404) {
				$this->logError('(II)', $session, $response);
			}
			
			if (($response_code >= 500 || $response_code < 400) && $response_code != 503) {
				$this->logError('(EE)', $session, $response);
			}
	
			// only suppress 404's when $ignore_errors = true
			if(!$ignore_errors && $response_code == 404) {
				$this->logError('(II)', $session, $response);
			}
		}
		
		$end = microtime(TRUE);

		$duration = $start - $end;
		if($duration > 2)
			{
				$info = curl_getinfo($session);
				error_log('(TT) SLOW REQUEST: ' . $info['url']
						  . '  [' . $duration . ']');
			}

		return array(class_rest::RESPONSE_CODE => $response_code,
					 class_rest::RESPONSE_OBJ => $response);
	}

	private function wrapped_curl_exec($ch) {
		// set a 7 sec gloabl curl timeout, umm.... heh
		curl_setopt($ch, CURLOPT_TIMEOUT, 120);
		$result = curl_exec($ch);
		$info = curl_getinfo($ch);
		$total_time = $info['total_time'];
		// log responses that take longer than 1 sec
		if ($total_time > 1) {
			error_log("(SC) - slow curl - $total_time sec [{$info['url']}]");
		}
		return $result;
	}

	private function logError($trackingCode, $curlSession, $response) {
		error_log($trackingCode.' Curl Response Not OK: '. $response . '\n');
		
		$info = curl_getinfo($curlSession);
		$url = isset($info['url']) ? $info['url'] : 'fail';
		$httpCode = isset($info['http_code']) ? $info['http_code'] : 'fail';
		
		error_log("$trackingCode Curl URL: $url ($httpCode)");
	}

	private function generateQueryString($json) {
		$query_string = '';
		if($json!=null) {
			if(@json_decode($json)) {
				$query_string = $json;
			} else if(is_array($json)) {
				$query_string = http_build_query($json);
			}
		}
		return $query_string;
	}

}
?>
