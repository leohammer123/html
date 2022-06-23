<?php

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	require 'vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createMutable(__DIR__, '.env');
	$dotenv->load();


	function sendmail($name,$password,$email){

		$mail = new PHPMailer();

		$mail->isSMTP();

		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 465;
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		$mail->SMTPAuth = true;
		$mail->Username = 'leo950413666@gmail.com';
		$mail->Password = $_ENV["email_passwd"];
		$mail->setFrom('from@example.com', 'noreply@cmsctf.com');
		$mail->addReplyTo('replyto@example.com', 'noreply@cmsctf.com');
		$mail->addAddress($email, 'John Doe');
		$mail->Subject = 'Thank you for regist cmsctf';
		$mail->AltBody = 'This is a plain-text message body';
		$mail->isHTML(true);
		$link = hash('sha256',$password.$_ENV["db_salt"].$name);
		$mail->Body = 'Hello '.$name.'! This is your validation <a href="'.'https://cmsctf.com/validate.php?check='.$link.'">link</a>.';
		if (!$mail->send()) {
	    	return  json_encode(array('success'=>false, 'error'=>'Mailer Error: ' . $mail->ErrorInfo));
		} else {
	    	return  json_encode(array('success'=>true));
		}
	}
?>
