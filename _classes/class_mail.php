<?
/**
* @package CORE
* @version: class_mail.php,v 0.4 2005/11/01 clatko
*/
/**
* All mail is done through the class.
* @package CORE
* @access public
*/
class class_mail {
/*********************************************************
PROPERTIES
**********************************************************/
	/**
	* I am the administrator name (I come from sitewide cfg)
	* @var string
	* @access private
	*/
	private $admin_name;
	/**
	* I am the administrator email (I come from sitewide cfg)
	* @var string
	* @access private
	*/
	private $admin_email;
	/**
	* I am the administrator that gets the mail (I come from sitewide cfg)
	* @var string
	* @access private
	*/
	private $admin_receiver;
	/**
	* I am the site root
	* @var string
	* @access private
	*/
	private $site_root;
	/**
	* I am the attachment boundary
	* @var string
	* @access private
	*/
	private $boundary;
/*********************************************************
CONSTRUCTOR/DESTRUCTOR
**********************************************************/
	/**
	* class_mail constructor
	* @access public
	*/
	function __construct() {
		$this->admin_name = EMAIL_ADMINNAME;
		$this->admin_email = EMAIL_ADMINEMAIL;
		$this->admin_receiver = EMAIL_ADMINRECEIVER;
		$this->site_root = SITE_ROOT;
		$this->boundary = '-----' . md5(uniqid('EMAIL'));
	}
/*********************************************************
PUBLIC
**********************************************************/
	/**
	* Sends an email template
	* @param template the name of the template file
	* @param email the broker's email
	* @param array the context array
	* @return void
	* @access public
	*/
	public function sendTemplate($subject,$template,$email,$array,$html = true) {
		$header = $this->prepHeader($this->admin_name,$this->admin_email,$html,false,false);

		// first include core template
		ob_start();
			include SITE_DIR.'lib/email/'.$template.'.php';
		$html_content = ob_get_contents();
		ob_end_clean();

		if($html) {
			// then wrap it in outer template
			ob_start();
				include SITE_DIR.'lib/email/template.php';
			$html_content = ob_get_contents();
			ob_end_clean();
		}
		
		mail($email,$subject,$html_content,$header,'-f '.$this->admin_email);
	}

	/**
	* Sends the admin the contents of a submitted form
	* @param array form contents
	* @param string subject
	* @param array of attachments
	* @return void
	* @access public
	*/
	public function sendForm(array $form_array,$subject,$array=array(),$sendToName=false,$sendToEmail=false) {
		$attachments = (count($array)>0) ? true: false;
		
		// temp short circuit
		$header = $this->prepHeader($this->admin_name,$this->admin_email,false,true);
		$subject='[SLATE]: '.$subject;
		$html_content='Date Submitted: '. date('r',mktime())."\n";
		
		foreach($form_array as $key=>$value) {
			$html_content .= $key.': '.$value."\n";
		}

		$html_content = '--'.$this->boundary."\n".
				'Content-Type: text/plain; charset=iso-8859-1'."\n".
				'Content-Transfer-Encoding: 8bit'."\n\n".
				$html_content."\n\n";

		if($attachments) {
			foreach($array as $v) {
				$html_content .= '--'.$this->boundary."\n".$this->prepAttachmentHeader($v)."\n";
			}
		}

		$html_content .= '--'.$this->boundary.'--';

		mail($this->admin_receiver,$subject,$html_content,$header,'-f '.$this->admin_email);
		
		if($sendToName && $sendToEmail){
			$header = $this->prepHeader($sendToName,$sendToEmail,false,true,false);
			mail($sendToEmail,$subject,$html_content,$header,'-f '.$sendToEmail);
		}
	}

	/**
	* Sends the admin info about an error
	* @param email the user's email
	* @param loginID the generate userID
	* @return void
	* @access public
	*/
	public function sendError($type) {
		$header = $this->prepHeader($this->admin_name,$this->admin_email,false,false,false);
		$subject = '[ERROR]: Type '.$type.' ('.date('c',time()).')';
		$html_content = '
POST:
'.$this->print_array($_POST).'

GET:
'.$this->print_array($_GET).'

COOKIE:
'.$this->print_array($_COOKIE).'

SERVER:
'.$this->print_array($_SERVER);

		mail($this->admin_receiver,$subject,$html_content,$header,'-f '.$this->admin_email);
	}

	/**
	* Send general email
	* @param string from_name
	* @param string from_email
	* @param string to_email
	* @param string subject
	* @param string content
	* @return void
	* @access public
	*/
	public function sendGeneral($from_name,$from_email,$to_email,$subject,$html_content) {
		$header = $this->prepHeader($from_name,$from_email,false,false,false);

		// create content
		$mail_content = '';
		if(is_array($html_content)) {
			foreach($form_array as $k=>$v) {
				$mail_content .= $k.': '.$v."\n";
			}
		} else {
			$mail_content = $html_content;
		}

		mail($to_email,$subject,trim($mail_content),$header,'-f '.$from_email);
	}
/*********************************************************
PRIVATE
**********************************************************/
	/**
	* Prepares email header
	* @param string $from_name sender name
	* @param string $from_email sender email address
	* @param boolean html if the email is html
	* @return string prepared header
	* @access private
	*/
	private function prepHeader($from_name,$from_email,$html,$attachments=false) {
		$generic_header='From: "'.$from_name.'" <'.$from_email.'>'."\n";
			$generic_header.='Bcc: "'.$this->admin_name.'" <'.$this->admin_receiver.'>'."\n";
		$generic_header.='Reply-To: "'.$from_name.'" <'.$from_email.'>'."\n";
		$generic_header.='Return-path: "'.$from_name.'" <'.$from_email.'>'."\n";
		if($attachments) {
			$header = 'Content-Type: multipart/alternative; boundary="'.$this->boundary.'"'."\n".$generic_header."\n\n";
		} else {
			if($html) {
				$header = 'Content-type: text/html; charset=iso-8859-1'."\n".$generic_header;
			} else {
				$header = 'Content-type: text/plain; charset=iso-8859-1'."\n".$generic_header;
			}
		}
		return $header;
	}

	private function prepAttachmentHeader($array) {
		if(!$attachmentData = file_get_contents($array[0].'/'.$array[1])) {
			return null;
		}

		$header = 'Content-Type: '.$array[2].'; name="'.$array[1].'"'."\n";
		$header .= 'Content-Transfer-Encoding: base64'."\n\n";
		$header .= chunk_split(base64_encode($attachmentData), 76, "\n")."\n";

		return $header;
	}

	/**
	* Determines if the text has no new lines (to prevent header injection)
	* @param string $text the text to check
	* @return boolean
	* @access private
	*/
	private function hasNoNewLines($text) {
		return preg_match("/(%0A|%0D|\n+|\r+)/i", $text);
	}

	private function print_array($array) {
		$ret_string = '';
		foreach($array as $key=>$value) {
			if(!is_object($value)) {
				$ret_string .= $key.': '.$value."\n";
			}
		}
		return $ret_string;
	}
}
?>
