<!DOCTYPE html>
<html lang="en">
<head>
    <title>Password Reset</title>
</head>
<body>
<p>To reset your password, please click on the link below:</p>
<a href="{{ env('APP_URL') }}/password/reset?token={{$token}}">Reset Password</a>
</body>
</html>
