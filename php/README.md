# Pinarkive PHP SDK

PHP client for the Pinarkive API.

## Installation

Install Guzzle:

```
composer require guzzlehttp/guzzle
```

Copy `PinarkiveClient.php` to your project.

## Usage

```php
require 'PinarkiveClient.php';
$client = new PinarkiveClient(null, 'YOUR_API_KEY');

// Upload a file
$client->uploadFile('document.pdf');

// List files
$client->listUploads();
```

## Authentication
- JWT: first parameter of the constructor
- API Key: second parameter of the constructor

## Documentation
See [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 