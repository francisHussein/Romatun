<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $message = $_POST["message"];

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
  $mail->Body = "<h1>New message from website</h1><p>Name: $name</p><p>Email: $email</p><p>Phone: $phone</p><p>Message: $message</p>";
  $mail->send();

  // Send confirmation email to user
  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPSecure = "tls";
  $mail->Host = "mail.romatun.co.tz";
  $mail->Port = 587;
  $mail->Username = "no-reply@romatun.co.tz";
  $mail->Password = "PCpLvnyh?~wx";
  $mail->setFrom("romatun@romatun.co.tz", "Romatun Company Limited");
  $mail->addAddress($email);
  $mail->isHTML(true);
  $mail->Subject = "Thank you for contacting us";
  $mail->Body = "<h1>Thank you for contacting us</h1><p> We appreciate your interest in our company and look foward to connect with you soon.
Our team will review your information and get back to you as soon as possible. <br>
In the meantime, feel free to explore our website to learn more about our products and services.</p>";
  $mail->send();

  // Redirect to thank you page
  header("Location: thank-you.html");
  exit();
}

?>
