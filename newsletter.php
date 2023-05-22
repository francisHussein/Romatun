<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  

  // Send email to company
  require_once "phpmailer/vendor/autoload.php";

  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPSecure = "tls";
  $mail->Host = "mail.romatun.co.tz";
  $mail->Port = 587;
  $mail->Username = "no-reply@romatun.co.tz";
  $mail->Password = "PCpLvnyh?~wx";
  $mail->setFrom("romatun@romatun.co.tz", "Romatun Company Limited");
  $mail->addAddress("no-reply@romatun.co.tz");
  $mail->isHTML(true);
  $mail->Subject = "New message from website";
  $mail->Body = "<h1>A Request for Newsletter</h1><p><p>Email: $email</p><p>";
  $mail->send();


  // Redirect to thank you page
  header("Location: contact.html");
  exit();
}

?>
