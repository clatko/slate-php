<?
$responseObj = new stdClass;
$responseObj->response = new stdClass;
$responseObj->response->code = "200";
$responseObj->response->data = "";
$responseObj->request = new stdClass;
$responseObj->request->method = "GET";
$responseObj->info = new stdClass;

$path = (isset($_POST['path'])) ? $_POST['path']: '';

// return error
if($path=='') {
	$responseObj->response->code = "400";
	$responseObj->response->status = "no path";
	echo json_encode($responseObj);
	die();
}

foreach($_POST as $k=>$v) {
	if(substr($k, 0, 4)=='api_') {
		$param = explode('_', $k);
		if($param[1]=='p') {
			$value = ($param[2]=='t' && trim($v)=='') ? 'ERROR': $v;
			$path = str_replace('{'.$param[3].'}', urlencode(trim($value)), $path);
		} else if($param[1]=='q') {
			$appender = (strpos($path,'?')) ? '&': '?';
			$path .= $appender.$param[3].'='.urlencode(trim($v));
		}
	}
}

// clean path
$path = str_replace('//','/',$path);
$path = str_replace('/?','?',$path);
$path = substr($path,1);

//$apiResponse = json_decode($restObj->get($path)['body']);
$output = $restObj->get($path);
$apiResponse = $output['body'];

// return error
if(strpos($path, 'ERROR')) {
	$responseObj->response->code = "400";
	$responseObj->response->status = "required variable missing";
	echo json_encode($responseObj);
	die();
}

// return ok
$responseObj->response->data = $displayObj->prettyPrint($apiResponse,'json');
$responseObj->info = new stdClass;
$responseObj->info->url = API_ROOT.$path;
echo json_encode($responseObj,JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES);
die();
?>
