<?
define('EXPIREINSECONDS',3600 * 60);

switch($_SERVER['SERVER_NAME']) {
	case 'localhost':
	case 'slate.sample.org':
		define('EMAIL_ADMINNAME','Administrator');
		define('EMAIL_ADMINEMAIL','chris@latko.org');
		define('EMAIL_ADMINRECEIVER','chris@latko.org');
		
		define('SITE_DIR', $_SERVER['DOCUMENT_ROOT'].'/');
		define('SITE_ROOT', 'http://'.$_SERVER['HTTP_HOST'].'/');
		define('SITE_DEBUGMODE',true);

		define('SAMPLE_DIR',SITE_DIR.'content/samples/');

		define('CACHE_DIR', $_SERVER['DOCUMENT_ROOT'].'/cache/');
		define('TTL', 99986400);

		define('OAUTH_PATH', 'oauth/token');
		define('OAUTH_USER', '{user}');
		define('OAUTH_PASS', '{pass}');
		define('OAUTH_GRANT', 'client_credentials');

		define('CA_PATH', 'dev/users');
		define('ACCESS_PATH', 'backend/api/access');
		define('FORGOT_PATH', 'backend/password/forgot');

		define('API_ROOT', 'https://api.sample.org/');
		define('API_ACCEPT', 'application/vnd.org.sample+json');

		define('DB_HOST','localhost');
		define('DB_PORT','6379');
		define('DB_DB','0');
		define('DB_USER','{user}');
		define('DB_PASS','{pass}');

		define('SALT','{salt}');

		define('LANGUAGES', 'curl,javascript,node');

	break;
}
?>
