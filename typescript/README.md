# Pinarkive TypeScript SDK

Cliente TypeScript para la API de Pinarkive.

## Instalación

```
npm install axios
```

Copia `index.ts` a tu proyecto o instala desde tu repositorio si lo publicas.

## Uso

```typescript
import { PinarkiveClient } from './index';

const client = new PinarkiveClient({ token: 'TU_TOKEN' });

// Subir un archivo
const file = new File([/* datos */], 'document.pdf');
client.uploadFile(file).then(console.log);

// Listar archivos
client.listUploads().then(console.log);
```

## Autenticación
- JWT: `{ token: '...' }`
- API Key: `{ apiKey: '...' }`

## Documentación
Consulta [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 