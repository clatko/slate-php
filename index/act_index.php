<?
// get index
$index = json_decode($cacheObj->get('api-docs/'),true);

foreach($index['apis'] as $v) {
	// api category
	echo '<h1 id="'.$displayObj->dashCase($v['title']).'">'.$v['title'].'</h1>';
	echo '<p>'.$v['description'].'</p>';

	// endpoints
	$subindex = json_decode($cacheObj->get('api-docs/'.$v['path']), true);
	foreach($subindex['apis'] as $vv) {
		$operations = $vv['operations'][0];
		$apiId = $displayObj->dashCase($operations['summary']);
		$path = $vv['path'];
		
		// title
		echo '<h2 id="'.$apiId.'">'.$operations['summary'].'</h2>'."\n";

		// try me
		$displayObj->displayForm($operations, $apiId, $path);

		// example request
		$displayObj->displayRequest($operations);
		
		// example response
		$displayObj->displayResponse($vv['sample']);
		
		// http method
		echo '<p>'.$operations['notes'].'</p>'."\n";
		echo '<h3 id="http-request">HTTP Request</h3>'."\n";
		echo '<p><code class="prettyprint">'.$operations['method'].' '.$path.'</code></p>'."\n";

		// display params
		$displayObj->displayParams($operations);

		// display response models
		$displayObj->displayModels($operations, $subindex);
	}
}
?>
