<?
if(!isset($attributes['fuseaction'])) {
	$attributes['fuseaction'] = 'index.index';
}

if(!isset($GLOBALS['self'])) {
	$GLOBALS['self'] = 'index.php';
}

$Fusebox['layoutDir'] = 'layouts/';
$Fusebox['layoutFile'] = 'lay_default.php';
$XFA = array();

/***************** SITEWIDE CONFIG *********************/
require_once('_var/global.php');

if(SITE_DEBUGMODE) {
	error_reporting(E_ALL);
	ini_set('display_errors', 'on');
//	require_once('lib/compiler.php');
}

/***************** CLASS AUTOLOADER ********************/
function __autoload($class) {
	require_once(SITE_DIR.'_classes/'.$class.'.php');
}
/***************** SITEWIDE OBJECTS ********************/
$languages = explode(',', LANGUAGES);

/***************** SITEWIDE OBJECTS ********************/
// $mailObj = new class_mail(); // mail
$redisObj = new class_redis(); // DAO
$restObj = new class_rest(API_ROOT);
$cacheObj = new class_cache($redisObj, $restObj);
$userObj = new class_user($restObj,SALT);
$authObj = new class_auth($restObj, '/index.index','/login.login',SALT);
?>
