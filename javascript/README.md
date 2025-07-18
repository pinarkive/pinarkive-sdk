# Pinarkive JavaScript SDK

JavaScript client for the Pinarkive API.

## Installation

```
npm install axios
```

Copy `index.js` to your project or install from your repository if you publish it.

## Usage

```js
const PinarkiveClient = require('./index');
const client = new PinarkiveClient({ apiKey: 'YOUR_API_KEY' });

// Upload a file (in Node.js use fs.createReadStream)
const fs = require('fs');
const file = fs.createReadStream('document.pdf');
client.uploadFile(file).then(console.log);

// List files
client.listUploads().then(console.log);
```

## Authentication
- JWT: `{ token: '...' }`
- API Key: `{ apiKey: '...' }`

## Documentation
See [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 