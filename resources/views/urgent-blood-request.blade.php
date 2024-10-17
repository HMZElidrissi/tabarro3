<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerte de besoin de sang urgent - tabarro3</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #e74c3c;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .button {
            display: inline-block;
            background-color: #e74c3c;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #c0392b;
        }
        .footer {
            background-color: #f8f8f8;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>tabarro3</h1>
    </div>
    <div class="content">
        <h2>Alerte de besoin de sang urgent</h2>
        <p>Bonjour,</p>
        <p>Une donation de sang urgente est nécessaire. Voici les détails :</p>
        <p><strong>Description:</strong> {{ $bloodRequest->description }}</p>
        <p><strong>Groupe sanguin:</strong> {{ $bloodRequest->blood_group }}</p>
        <p><strong>Ville:</strong> {{ $bloodRequest->city }}</p>
        <p>Votre aide peut sauver une vie. Si vous êtes en mesure de donner, veuillez agir rapidement.</p>
        <a href="{{ env('APP_URL') }}/requests" class="button">Voir les détails</a>
        <p>Merci pour votre attention à ce besoin urgent!</p>
    </div>
    <div class="footer">
        <p>&copy; {{ date('Y') }} tabarro3. Tous droits réservés.</p>
        <p>Ensemble, nous pouvons faire la différence grâce au don de sang.</p>
    </div>
</div>
</body>
</html>
