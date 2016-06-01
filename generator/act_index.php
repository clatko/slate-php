<?
// pull in index
$key = 'api-docs/';
$output = $restObj->get($key);
$json = $output['body'];
if(json_decode($json)) {
	$cacheObj->set($key, $json);
}

// pull in the rest
$index = json_decode($json, true);
foreach($index['apis'] as $v) {
	$key = 'api-docs/'.$v['path'];
	$output = $restObj->get($key);
	$json = $output['body'];
	if(json_decode($json)) {
		$cacheObj->set($key, $json);
	}
	echo $v['path'].'<br/>';
}
