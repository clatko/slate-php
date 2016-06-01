<?
// pull in example json
$key = 'api-docs/';
$json = $cacheObj->get($key);

$index = json_decode($json, true);
foreach($index['apis'] as $v) {
	$group = json_decode($cacheObj->get('api-docs/'.$v['path']), true);
	foreach($group['apis'] as $vv) {
		$cacheObj->get($vv['sample']);
		echo $vv['sample'].'<br/>';
	}
}
