# Pinarkive JavaScript SDK

Cliente JavaScript para la API de Pinarkive.

## Instalación

```
npm install axios
```

Copia `index.js` a tu proyecto o instala desde tu repositorio si lo publicas.

## Uso

```js
const PinarkiveClient = require('./index');
const client = new PinarkiveClient({ apiKey: 'TU_API_KEY' });

// Subir un archivo (en Node.js usa fs.createReadStream)
const fs = require('fs');
const file = fs.createReadStream('document.pdf');
client.uploadFile(file).then(console.log);

// Listar archivos
client.listUploads().then(console.log);
```

## Autenticación
- JWT: `{ token: '...' }`
- API Key: `{ apiKey: '...' }`

## Documentación
Consulta [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 