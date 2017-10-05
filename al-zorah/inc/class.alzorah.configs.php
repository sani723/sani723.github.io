<?php
class AlzorahConfigs {

	//For Mail Configs
	public $SMTPDebug = 1;  // debugging: 1 = errors and messages, 2 = messages only
	public $SMTPAuth = true;  // authentication enabled
	public $EmailHost = 'mail.alzorah.ae';

	public $EmailUsername = "Webmaster@alzorah.ae";  // SMTP username
	public $EmailPassword = "web@zor"; // SMTP password

	public $MessageFrom = "Webmaster@alzorah.ae";
	public $MessageFromName = "Webmaster - Al Zorah";
	
	public $CallBackReceiverEmail = "sales@alzorah.ae"; //Default:   sales@alzorah.ae
	public $CallBackReceiverName = "Al Zorah Sales";	//Default:   Al Zorah Sales
	
	public $MessageReceiverEmail = "info@alzorah.ae";  //Default:   info@alzorah.ae
	public $MessageReceiverName = "Al zorah";	//Default:   Al zorah
	
	public $EmailWordWrap = 500;
	//For Mail Configs
	
	
	//Captcha configs
	public $CaptchaPublickey = "6Lf1cPoSAAAAANtCULmO7DfCxa5clqDOlZ8raPNh";
	public $CaptchaPrivatekey = "6Lf1cPoSAAAAAFFeNqFfpTsA2C_En47YwWVIUKje";


}
?>