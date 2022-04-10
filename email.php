<?php
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\SMTP;

function sendmail($name,$password,$email){

	require '/opt/bitnami/projects/ctf/vendor/autoload.php';

	$mail = new PHPMailer();

	$mail->isSMTP();

	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 465;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->SMTPAuth = true;
	$mail->Username = 'leo950413666@gmail.com';
	$mail->Password = 'qccufobjwdyaxfqh';

	$mail->setFrom('from@example.com', 'noreply@cmsctf.com');
	$mail->addReplyTo('replyto@example.com', 'noreply@cmsctf.com');
	$mail->addAddress('j070431@my.cmsh.cyc.edu.tw', 'John Doe');
	$mail->Subject = 'PHPMailer GMail SMTP test';
	$mail->AltBody = 'This is a plain-text message body';
	$mail->Body = 'This is your validation link <a href="'.'>.';

	if (!$mail->send()) {
	    return  'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    return  'Message sent!';
	}
}
?>
