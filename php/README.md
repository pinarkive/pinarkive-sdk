# Pinarkive PHP SDK

Cliente PHP para la API de Pinarkive.

## Instalación

Instala Guzzle:

```
composer require guzzlehttp/guzzle
```

Copia `PinarkiveClient.php` a tu proyecto.

## Uso

```php
require 'PinarkiveClient.php';
$client = new PinarkiveClient(null, 'TU_API_KEY');

// Subir un archivo
$client->uploadFile('document.pdf');

// Listar archivos
$client->listUploads();
```

## Autenticación
- JWT: primer parámetro del constructor
- API Key: segundo parámetro del constructor

## Documentación
Consulta [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 