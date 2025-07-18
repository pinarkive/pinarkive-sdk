# Pinarkive TypeScript SDK

TypeScript client for the Pinarkive API.

## Installation

```
npm install axios
```

Copy `index.ts` to your project or install from your repository if you publish it.

## Usage

```typescript
import { PinarkiveClient } from './index';

const client = new PinarkiveClient({ token: 'YOUR_TOKEN' });

// Upload a file
const file = new File([/* data */], 'document.pdf');
client.uploadFile(file).then(console.log);

// List files
client.listUploads().then(console.log);
```

## Authentication
- JWT: `{ token: '...' }`
- API Key: `{ apiKey: '...' }`

## Documentation
See [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 