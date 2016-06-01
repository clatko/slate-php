<?
$error = $authObj->getValue('error');
if($error!='') {
	$authObj->delValue('error');
	$redirect = $authObj->getValue('redirect');
	if ($redirect != '') {
		$authObj->delValue('redirect');
		echo '{"error":{"text":"'.$error.'"},"redirect":"'.$redirect.'"}';
	} else {
		echo '{"error":{"text":"'.$error.'"}}';
	}
} else {
	// TODO: below
	echo '{"error":{"text":"Login Failure... Inspect this one.."}}';
}
?>
